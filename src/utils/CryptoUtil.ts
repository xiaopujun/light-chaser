/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import CryptoJS from 'crypto-js';
import forge from 'node-forge';

/**
 * 加密工具类
 * 提供AES和RSA加密功能
 */
export default class CryptoUtil {
    
    /**
     * 生成随机AES密钥（256位）
     * @returns {string} Base64编码的AES密钥
     */
    static generateAESKey(): string {
        // 生成256位（32字节）的随机密钥
        const key = CryptoJS.lib.WordArray.random(32);
        return CryptoJS.enc.Base64.stringify(key);
    }
    
    /**
     * 生成随机IV（初始化向量）
     * @returns {string} Base64编码的IV
     */
    static generateIV(): string {
        // AES-CBC模式需要16字节的IV
        const iv = CryptoJS.lib.WordArray.random(16);
        return CryptoJS.enc.Base64.stringify(iv);
    }
    
    /**
     * 使用AES-256-CBC加密数据
     * @param {string} plaintext - 要加密的明文
     * @param {string} key - Base64编码的AES密钥
     * @returns {string} 加密结果，格式：iv:ciphertext（Base64编码）
     */
    static encryptAES(plaintext: string, key: string): string {
        try {
            // 解析密钥
            const keyWordArray = CryptoJS.enc.Base64.parse(key);
            
            // 生成随机IV
            const iv = CryptoJS.lib.WordArray.random(16); // 128位IV for CBC
            
            // 使用AES-256-CBC加密
            const encrypted = CryptoJS.AES.encrypt(plaintext, keyWordArray, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            
            // 组合结果：iv:ciphertext
            const result = [
                CryptoJS.enc.Base64.stringify(iv),
                encrypted.ciphertext.toString(CryptoJS.enc.Base64)
            ].join(':');
            
            return result;
        } catch (error) {
            console.error('AES加密失败:', error);
            throw new Error('AES加密失败');
        }
    }
    
    /**
     * 使用AES-256-CBC解密数据
     * @param {string} encryptedData - 加密的数据，格式：iv:ciphertext
     * @param {string} key - Base64编码的AES密钥
     * @returns {string} 解密后的明文
     */
    static decryptAES(encryptedData: string, key: string): string {
        try {
            // 分割加密数据
            const parts = encryptedData.split(':');
            if (parts.length !== 2) {
                throw new Error('加密数据格式错误');
            }
            
            const [ivBase64, ciphertextBase64] = parts;
            
            // 解析各部分
            const keyWordArray = CryptoJS.enc.Base64.parse(key);
            const iv = CryptoJS.enc.Base64.parse(ivBase64);
            const ciphertext = CryptoJS.enc.Base64.parse(ciphertextBase64);
            
            // 构造加密对象
            const encryptedObj = CryptoJS.lib.CipherParams.create({
                ciphertext: ciphertext
            });
            
            // 解密
            const decrypted = CryptoJS.AES.decrypt(encryptedObj, keyWordArray, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            
            return decrypted.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error('AES解密失败:', error);
            throw new Error('AES解密失败');
        }
    }
    
    /**
     * 使用RSA公钥加密数据
     * @param {string} plaintext - 要加密的明文
     * @param {string} publicKeyPem - PEM格式的RSA公钥
     * @returns {string} Base64编码的加密结果
     */
    static encryptRSA(plaintext: string, publicKeyPem: string): string {
        try {
            // 解析PEM格式的公钥
            const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
            
            // 使用OAEP填充进行RSA加密
            const encrypted = publicKey.encrypt(plaintext, 'RSA-OAEP', {
                md: forge.md.sha256.create(),
                mgf1: {
                    md: forge.md.sha256.create()
                }
            });
            
            // 转换为Base64
            return forge.util.encode64(encrypted);
        } catch (error) {
            console.error('RSA加密失败:', error);
            throw new Error('RSA加密失败');
        }
    }
    
    /**
     * 使用RSA私钥解密数据
     * @param {string} encryptedData - Base64编码的加密数据
     * @param {string} privateKeyPem - PEM格式的RSA私钥
     * @returns {string} 解密后的明文
     */
    static decryptRSA(encryptedData: string, privateKeyPem: string): string {
        try {
            // 解析PEM格式的私钥
            const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
            
            // 解码Base64
            const encrypted = forge.util.decode64(encryptedData);
            
            // 使用OAEP填充进行RSA解密
            const decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
                md: forge.md.sha256.create(),
                mgf1: {
                    md: forge.md.sha256.create()
                }
            });
            
            return decrypted;
        } catch (error) {
            console.error('RSA解密失败:', error);
            throw new Error('RSA解密失败');
        }
    }
    
    /**
     * 生成RSA密钥对（用于测试）
     * @param {number} bits - 密钥长度，默认2048位
     * @returns {object} 包含公钥和私钥的对象
     */
    static generateRSAKeyPair(bits: number = 2048): { publicKey: string, privateKey: string } {
        try {
            const keypair = forge.pki.rsa.generateKeyPair({ bits: bits });
            
            return {
                publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
                privateKey: forge.pki.privateKeyToPem(keypair.privateKey)
            };
        } catch (error) {
            console.error('生成RSA密钥对失败:', error);
            throw new Error('生成RSA密钥对失败');
        }
    }
}