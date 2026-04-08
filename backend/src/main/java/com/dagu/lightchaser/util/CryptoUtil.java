package com.dagu.lightchaser.util;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.OAEPParameterSpec;
import javax.crypto.spec.PSource;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.spec.MGF1ParameterSpec;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

/**
 * 加密工具类
 * 提供RSA和AES加密解密功能
 * 
 * @author lightchaser
 */
public class CryptoUtil {
    
    private static final String RSA_ALGORITHM = "RSA";
    private static final String AES_ALGORITHM = "AES";
    private static final int RSA_KEY_SIZE = 2048;
    private static final int AES_KEY_SIZE = 256;
    
    /**
     * 生成RSA密钥对
     * 
     * @return RSA密钥对
     * @throws Exception 生成异常
     */
    public static KeyPair generateRSAKeyPair() throws Exception {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(RSA_ALGORITHM);
        keyPairGenerator.initialize(RSA_KEY_SIZE);
        return keyPairGenerator.generateKeyPair();
    }

    /**
     * 获取RSA公钥字符串
     * 
     * @param keyPair RSA密钥对
     * @return Base64编码的公钥字符串
     */
    public static String getPublicKeyString(KeyPair keyPair) {
        PublicKey publicKey = keyPair.getPublic();
        return Base64.getEncoder().encodeToString(publicKey.getEncoded());
    }
    
    /**
     * 获取私钥字符串
     * 
     * @param keyPair RSA密钥对
     * @return 私钥字符串
     */
    public static String getPrivateKeyString(KeyPair keyPair) {
        PrivateKey privateKey = keyPair.getPrivate();
        return Base64.getEncoder().encodeToString(privateKey.getEncoded());
    }
    
    /**
     * 从字符串获取私钥对象
     * 
     * @param privateKeyString 私钥字符串
     * @return PrivateKey对象
     */
    public static PrivateKey getPrivateKeyFromString(String privateKeyString) {
        try {
            byte[] keyBytes = Base64.getDecoder().decode(privateKeyString);
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return keyFactory.generatePrivate(keySpec);
        } catch (Exception e) {
            throw new RuntimeException("从字符串创建私钥失败: " + e.getMessage(), e);
        }
    }
    
    /**
     * 使用RSA公钥加密
     * 
     * @param data 待加密数据
     * @param publicKeyString Base64编码的公钥字符串
     * @return Base64编码的加密结果
     * @throws Exception 加密异常
     */
    public static String encryptByRSAPublicKey(String data, String publicKeyString) throws Exception {
        byte[] publicKeyBytes = Base64.getDecoder().decode(publicKeyString);
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicKeyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance(RSA_ALGORITHM);
        PublicKey publicKey = keyFactory.generatePublic(keySpec);
        
        // 使用RSA/ECB/OAEPWithSHA-256AndMGF1Padding以匹配前端的RSA-OAEP+SHA256填充模式
        Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] encryptedBytes = cipher.doFinal(data.getBytes());
        
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }
    
    /**
     * 使用RSA私钥解密
     * 
     * @param encryptedData Base64编码的加密数据
     * @param privateKeyString Base64编码的私钥字符串
     * @return 解密后的原始数据
     * @throws Exception 解密异常
     */
    public static String decryptByRSAPrivateKey(String encryptedData, String privateKeyString) throws Exception {
        // 确保私钥是纯Base64格式（没有PEM头尾）
        String cleanPrivateKey = privateKeyString
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s", "");

        byte[] privateKeyBytes = Base64.getDecoder().decode(cleanPrivateKey);
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(privateKeyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PrivateKey privateKey = keyFactory.generatePrivate(keySpec);

        // 使用标准的OAEP填充模式
        Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPPadding");

        // 配置OAEP参数以匹配前端的SHA-256
        OAEPParameterSpec oaepParams = new OAEPParameterSpec(
                "SHA-256", "MGF1", MGF1ParameterSpec.SHA256, PSource.PSpecified.DEFAULT);
        cipher.init(Cipher.DECRYPT_MODE, privateKey, oaepParams);

        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);

        return new String(decryptedBytes, StandardCharsets.UTF_8);
    }
    
    /**
     * 生成AES密钥
     * 
     * @return Base64编码的AES密钥
     * @throws Exception 生成异常
     */
    public static String generateAESKey() throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance(AES_ALGORITHM);
        keyGenerator.init(AES_KEY_SIZE);
        SecretKey secretKey = keyGenerator.generateKey();
        return Base64.getEncoder().encodeToString(secretKey.getEncoded());
    }
    
    /**
     * 使用AES加密
     * 
     * @param data 待加密数据
     * @param keyString Base64编码的AES密钥
     * @return Base64编码的加密结果
     * @throws Exception 加密异常
     */
    public static String encryptByAES(String data, String keyString) throws Exception {
        // 第一次Base64解码
        byte[] firstDecode = Base64.getDecoder().decode(keyString);
        String secondBase64 = new String(firstDecode, StandardCharsets.UTF_8);

        // 第二次Base64解码得到真正的密钥
        byte[] keyBytes = Base64.getDecoder().decode(secondBase64);

        SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");

        // 生成随机IV
        byte[] iv = new byte[16];
        SecureRandom.getInstanceStrong().nextBytes(iv);
        IvParameterSpec ivSpec = new IvParameterSpec(iv);

        // 使用AES/CBC/PKCS5Padding模式
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivSpec);
        byte[] encryptedBytes = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));

        // 组合结果：iv:ciphertext
        String ivBase64 = Base64.getEncoder().encodeToString(iv);
        String ciphertextBase64 = Base64.getEncoder().encodeToString(encryptedBytes);

        return ivBase64 + ":" + ciphertextBase64;
    }

    
    /**
     * 使用AES解密
     * 
     * @param encryptedData Base64编码的加密数据
     * @param keyString Base64编码的AES密钥
     * @return 解密后的原始数据
     * @throws Exception 解密异常
     */
    public static String decryptByAES(String encryptedData, String keyString) throws Exception {
        // 检查数据格式
        if (encryptedData.contains(":")) {
            // 新格式：iv:ciphertext，使用CBC模式
            return decryptByAESWithIV(encryptedData, keyString);
        } else {
            // 旧格式：纯密文，使用ECB模式（不推荐）
            // 双重Base64解码密钥
            byte[] firstDecode = Base64.getDecoder().decode(keyString);
            String secondBase64 = new String(firstDecode, StandardCharsets.UTF_8);
            byte[] keyBytes = Base64.getDecoder().decode(secondBase64);

            SecretKeySpec secretKey = new SecretKeySpec(keyBytes, AES_ALGORITHM);

            Cipher cipher = Cipher.getInstance(AES_ALGORITHM); // 默认ECB模式
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] encryptedBytes = Base64.getDecoder().decode(encryptedData);
            byte[] decryptedBytes = cipher.doFinal(encryptedBytes);

            return new String(decryptedBytes, StandardCharsets.UTF_8);
        }
    }
    
    /**
     * 使用AES解密（支持IV:密文格式）
     * 
     * @param encryptedData IV:密文格式的加密数据，或纯Base64编码的加密数据
     * @param keyString Base64编码的AES密钥
     * @return 解密后的原始数据
     * @throws Exception 解密异常
     */
    public static String decryptByAESWithIV(String encryptedData, String keyString) throws Exception {
        // 检查是否包含IV（格式：iv:ciphertext）
        if (encryptedData.contains(":")) {
            String[] parts = encryptedData.split(":", 2);
            if (parts.length != 2) {
                throw new IllegalArgumentException("无效的加密数据格式，期望格式：iv:ciphertext");
            }

            String ivBase64 = parts[0];
            String ciphertextBase64 = parts[1];

            // 解码密钥、IV和密文
            byte[] keyBytes = Base64.getDecoder().decode(keyString);
            byte[] ivBytes = Base64.getDecoder().decode(ivBase64);
            byte[] ciphertextBytes = Base64.getDecoder().decode(ciphertextBase64);

            // 创建密钥和IV规范
            SecretKeySpec secretKey = new SecretKeySpec(keyBytes, AES_ALGORITHM);
            javax.crypto.spec.IvParameterSpec ivSpec = new javax.crypto.spec.IvParameterSpec(ivBytes);

            // 使用AES-256-CBC模式解密
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKey, ivSpec);
            byte[] decryptedBytes = cipher.doFinal(ciphertextBytes);

            return new String(decryptedBytes);
        } else {
            // 没有IV，使用原有的解密方法
            return decryptByAES(encryptedData, keyString);
        }
    }

    public static String decryptByAESWithIV2(String encryptedData, String keyString) throws Exception {
        // 检查是否包含IV（格式：iv:ciphertext）
        if (encryptedData.contains(":")) {
            String[] parts = encryptedData.split(":", 2);
            if (parts.length != 2) {
                throw new IllegalArgumentException("无效的加密数据格式，期望格式：iv:ciphertext");
            }

            String ivBase64 = parts[0];
            String ciphertextBase64 = parts[1];

            // 【修正】双重Base64解码密钥 - 与加密函数保持一致
            byte[] firstDecode = Base64.getDecoder().decode(keyString);
            String secondBase64 = new String(firstDecode, StandardCharsets.UTF_8);
            byte[] keyBytes = Base64.getDecoder().decode(secondBase64);

            // 解码IV和密文
            byte[] ivBytes = Base64.getDecoder().decode(ivBase64);
            byte[] ciphertextBytes = Base64.getDecoder().decode(ciphertextBase64);

            // 创建密钥和IV规范
            SecretKeySpec secretKey = new SecretKeySpec(keyBytes, AES_ALGORITHM);
            IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);

            // 使用AES-256-CBC模式解密
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKey, ivSpec);
            byte[] decryptedBytes = cipher.doFinal(ciphertextBytes);

            return new String(decryptedBytes, StandardCharsets.UTF_8); // 【修正】指定UTF-8编码
        } else {
            // 没有IV，使用原有的解密方法
            return decryptByAES(encryptedData, keyString);
        }
    }

}