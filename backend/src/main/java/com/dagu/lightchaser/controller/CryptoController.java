package com.dagu.lightchaser.controller;

import com.dagu.lightchaser.config.CryptoConfig;
import com.dagu.lightchaser.global.ApiResponse;
import com.dagu.lightchaser.util.CryptoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.PrivateKey;
import java.security.PublicKey;

/**
 * 加密控制器
 * 提供RSA公钥获取和AES密钥解密功能
 * 
 * @author lightchaser
 */
@RestController
@RequestMapping("/api/crypto")
public class CryptoController {
    
    @Autowired
    private CryptoConfig cryptoConfig;
    
    /**
     * 获取RSA公钥
     * 前端调用此接口获取公钥，用于加密AES密钥
     * 
     * @return RSA公钥PEM格式字符串
     */
    @GetMapping("/public-key")
    public ApiResponse<String> getPublicKey() {
        try {
            String publicKeyString = cryptoConfig.getRsa().getPublicKey();
            // 将Base64公钥转换为PEM格式
            String pemPublicKey = convertToPemFormat(publicKeyString);
            return ApiResponse.success(pemPublicKey);
        } catch (Exception e) {
            return ApiResponse.error(500, "获取公钥失败: " + e.getMessage());
        }
    }
    
    /**
     * 将Base64公钥转换为PEM格式
     * 
     * @param base64PublicKey Base64编码的公钥
     * @return PEM格式的公钥
     */
    private String convertToPemFormat(String base64PublicKey) {
        StringBuilder pem = new StringBuilder();
        pem.append("-----BEGIN PUBLIC KEY-----\n");
        
        // 每64个字符换行
        for (int i = 0; i < base64PublicKey.length(); i += 64) {
            int end = Math.min(i + 64, base64PublicKey.length());
            pem.append(base64PublicKey.substring(i, end)).append("\n");
        }
        
        pem.append("-----END PUBLIC KEY-----");
        return pem.toString();
    }
    
}