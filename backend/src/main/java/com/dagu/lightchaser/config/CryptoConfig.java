package com.dagu.lightchaser.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * 加密配置类
 * 从配置文件指定的.pem文件读取RSA密钥配置
 * 
 * @author lightchaser
 */
@Component
@ConfigurationProperties(prefix = "light-chaser.crypto")
public class CryptoConfig {
    
    private Rsa rsa = new Rsa();
    private Aes aes = new Aes();
    
    @PostConstruct
    public void init() {
        try {
            // 从配置文件指定的路径读取公钥文件
            ClassPathResource publicKeyResource = new ClassPathResource(rsa.getPublicKeyPath());
            String publicKeyContent = FileCopyUtils.copyToString(
                new InputStreamReader(publicKeyResource.getInputStream(), StandardCharsets.UTF_8)
            );
            
            // 从配置文件指定的路径读取私钥文件
            ClassPathResource privateKeyResource = new ClassPathResource(rsa.getPrivateKeyPath());
            String privateKeyContent = FileCopyUtils.copyToString(
                new InputStreamReader(privateKeyResource.getInputStream(), StandardCharsets.UTF_8)
            );
            
            // 移除PEM格式的头尾标识，只保留Base64编码的密钥内容
            // 这是必需的，因为Java的KeyFactory.generatePublic/generatePrivate方法
            // 需要纯Base64编码的密钥数据，而不是完整的PEM格式
            String publicKey = publicKeyContent
                .replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s+", "");
                
            String privateKey = privateKeyContent
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s+", "");
            
            rsa.setPublicKey(publicKey);
            rsa.setPrivateKey(privateKey);
            
        } catch (IOException e) {
            throw new RuntimeException("Failed to load RSA keys from PEM files", e);
        }
    }
    
    public Rsa getRsa() {
        return rsa;
    }
    
    public void setRsa(Rsa rsa) {
        this.rsa = rsa;
    }
    
    public Aes getAes() {
        return aes;
    }
    
    public static class Rsa {
        private String publicKeyPath;
        private String privateKeyPath;
        private String publicKey;
        private String privateKey;
        
        public String getPublicKeyPath() {
            return publicKeyPath;
        }
        
        public void setPublicKeyPath(String publicKeyPath) {
            this.publicKeyPath = publicKeyPath;
        }
        
        public String getPrivateKeyPath() {
            return privateKeyPath;
        }
        
        public void setPrivateKeyPath(String privateKeyPath) {
            this.privateKeyPath = privateKeyPath;
        }
        
        public String getPublicKey() {
            return publicKey;
        }
        
        public void setPublicKey(String publicKey) {
            this.publicKey = publicKey;
        }
        
        public String getPrivateKey() {
            return privateKey;
        }
        
        public void setPrivateKey(String privateKey) {
            this.privateKey = privateKey;
        }
    }
    
    public static class Aes {
        private String key;
        
        public String getKey() {
            return key;
        }
        
        public void setKey(String key) {
            this.key = key;
        }
    }
}