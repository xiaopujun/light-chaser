//! 与前端加密协议配套的能力（RSA/AES 解密与密钥管理）。
//!
//! 前端（见 `CryptoUtil.ts`）：
//! - password 明文 -> AES-256-CBC(随机 key + 随机 iv, PKCS7) 得到 `iv:ciphertext`（Base64）
//! - 再用 RSA-OAEP-SHA256 对上述字符串加密（Base64 输出）
//! - aesKey 单独以 Base64 形式随请求一并上传
//!
//! 后端：
//! - 使用本地保存的 RSA 私钥解密 password，得到 AES 密文字符串
//! - 再用 aesKey 对 AES 密文进行解密，得到明文密码后入库

use std::path::Path;

use aes::Aes256;
use anyhow::{anyhow, Context};
use base64::engine::general_purpose::STANDARD as BASE64_STD;
use base64::Engine;
use cbc::Decryptor;
use cipher::block_padding::Pkcs7;
use cipher::{BlockDecryptMut, KeyIvInit};
use rand::rngs::OsRng;
use rsa::pkcs8::{DecodePrivateKey, EncodePrivateKey, EncodePublicKey};
use rsa::{Oaep, RsaPrivateKey, RsaPublicKey};

pub fn init_or_load_rsa_keys(app_data_dir: &Path) -> anyhow::Result<(RsaPrivateKey, String)> {
    let crypto_dir = app_data_dir.join("crypto");
    std::fs::create_dir_all(&crypto_dir).context("创建 crypto 目录失败")?;
    let private_key_path = crypto_dir.join("rsa_private_key.pem");

    let private_key = if private_key_path.exists() {
        let pem = std::fs::read_to_string(&private_key_path).context("读取 RSA 私钥失败")?;
        RsaPrivateKey::from_pkcs8_pem(&pem).context("解析 RSA 私钥失败")?
    } else {
        let mut rng = OsRng;
        let private_key = RsaPrivateKey::new(&mut rng, 2048).context("生成 RSA 密钥对失败")?;
        let pem = private_key
            .to_pkcs8_pem(rsa::pkcs8::LineEnding::LF)
            .context("导出 RSA 私钥失败")?;
        std::fs::write(&private_key_path, pem.as_bytes()).context("保存 RSA 私钥失败")?;
        private_key
    };

    let public_key = RsaPublicKey::from(&private_key);
    let public_pem = public_key
        .to_public_key_pem(rsa::pkcs8::LineEnding::LF)
        .context("导出 RSA 公钥失败")?;

    Ok((private_key, public_pem))
}

pub fn rsa_decrypt_base64(private_key: &RsaPrivateKey, encrypted_b64: &str) -> anyhow::Result<Vec<u8>> {
    let encrypted = BASE64_STD
        .decode(encrypted_b64.as_bytes())
        .context("Base64 解码失败")?;
    let padding = Oaep::new::<sha2::Sha256>();
    private_key.decrypt(padding, &encrypted).context("RSA 解密失败")
}

pub fn aes_decrypt_cbc_pkcs7(encrypted: &str, aes_key_b64: &str) -> anyhow::Result<String> {
    let parts: Vec<&str> = encrypted.split(':').collect();
    if parts.len() != 2 {
        return Err(anyhow!("AES 密文格式错误"));
    }
    let iv = BASE64_STD.decode(parts[0].as_bytes()).context("IV Base64 解码失败")?;
    let ciphertext = BASE64_STD
        .decode(parts[1].as_bytes())
        .context("Ciphertext Base64 解码失败")?;
    let key = BASE64_STD
        .decode(aes_key_b64.as_bytes())
        .context("AESKey Base64 解码失败")?;
    if key.len() != 32 {
        return Err(anyhow!("AESKey 长度错误"));
    }
    if iv.len() != 16 {
        return Err(anyhow!("IV 长度错误"));
    }
    let mut buf = ciphertext;
    let decrypted = Decryptor::<Aes256>::new_from_slices(&key, &iv)
        .map_err(|_| anyhow!("初始化 AES 失败"))?
        .decrypt_padded_mut::<Pkcs7>(&mut buf)
        .map_err(|_| anyhow!("AES 解密失败"))?;
    String::from_utf8(decrypted.to_vec()).context("明文不是 UTF-8")
}

