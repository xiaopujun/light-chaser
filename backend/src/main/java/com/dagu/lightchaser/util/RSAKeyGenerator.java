package com.dagu.lightchaser.util;

import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyPair;

/**
 * RSA密钥生成器
 * 用于生成RSA密钥对并保存为PEM文件
 * 
 * @author lightchaser
 */
public class RSAKeyGenerator {
    
    public static void main(String[] args) {
        try {
            System.out.println("=== 生成RSA密钥对并保存为PEM文件 ===");
            
            // 生成RSA密钥对
            KeyPair keyPair = CryptoUtil.generateRSAKeyPair();
            String publicKeyBase64 = CryptoUtil.getPublicKeyString(keyPair);
            String privateKeyBase64 = CryptoUtil.getPrivateKeyString(keyPair);
            
            // 转换为PEM格式
            String publicKeyPem = convertToPemFormat(publicKeyBase64, "PUBLIC KEY");
            String privateKeyPem = convertToPemFormat(privateKeyBase64, "PRIVATE KEY");
            
            // 创建keys目录
            String keysDir = "src/main/resources/keys";
            Files.createDirectories(Paths.get(keysDir));
            
            // 保存公钥文件
            String publicKeyPath = keysDir + "/public_key.pem";
            try (FileWriter writer = new FileWriter(publicKeyPath)) {
                writer.write(publicKeyPem);
            }
            System.out.println("公钥已保存到: " + publicKeyPath);
            
            // 保存私钥文件
            String privateKeyPath = keysDir + "/private_key.pem";
            try (FileWriter writer = new FileWriter(privateKeyPath)) {
                writer.write(privateKeyPem);
            }
            System.out.println("私钥已保存到: " + privateKeyPath);
            
            // 显示公钥内容（供前端使用）
            System.out.println("\n=== 公钥内容（供前端使用）===");
            System.out.println(publicKeyPem);
            
            // 显示配置信息
            System.out.println("\n=== application.yml 配置 ===");
            System.out.println("light-chaser:");
            System.out.println("  crypto:");
            System.out.println("    rsa:");
            System.out.println("      public-key-path: keys/public_key.pem");
            System.out.println("      private-key-path: keys/private_key.pem");
            System.out.println("    aes:");
            System.out.println("      key: YmVVaTJUNGdvV3huQnZXZzlEUE9kdnBaaS9ZcTZ0UzZtWXl2TWVXTzQ0Qz0=");
            
            System.out.println("\n=== 密钥生成完成 ===");
            System.out.println("请重启应用以使用新的密钥对");
            
        } catch (Exception e) {
            System.err.println("生成密钥对时发生错误: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * 将Base64密钥转换为PEM格式
     * 
     * @param base64Key Base64编码的密钥
     * @param keyType 密钥类型（PUBLIC KEY 或 PRIVATE KEY）
     * @return PEM格式的密钥
     */
    private static String convertToPemFormat(String base64Key, String keyType) {
        StringBuilder pem = new StringBuilder();
        pem.append("-----BEGIN ").append(keyType).append("-----\n");
        
        // 每64个字符换行
        for (int i = 0; i < base64Key.length(); i += 64) {
            int end = Math.min(i + 64, base64Key.length());
            pem.append(base64Key.substring(i, end)).append("\n");
        }
        
        pem.append("-----END ").append(keyType).append("-----");
        return pem.toString();
    }
}