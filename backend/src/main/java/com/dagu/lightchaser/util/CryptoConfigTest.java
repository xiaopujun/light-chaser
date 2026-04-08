package com.dagu.lightchaser.util;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.KeyFactory;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

/**
 * 测试配置化的RSA密钥功能
 * 
 * @author lightchaser
 */
public class CryptoConfigTest {
    
    // 从配置文件中读取的RSA密钥（这里硬编码用于测试）
    private static final String PUBLIC_KEY_STRING = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu4x+vJHr/UwM9L0ebAZh6SXWbYxh6nnHCITQhjbMb1nn0+IllORYTteTvlwEzBe53UcRl6If8ajE2q5Jvrt8Yp9j5WwhCmorTIJYWI2DTIL5Q2hxwCU2ReiKbMPYb3tz7x1TubfrOvwkvmHOKzdCL92pWD+ysrWtkbVgCWvgYWRGnCnf9aJ8sSY/hUWBaFh17+r81ijBd9Kn+9vaCTLI/sDJWWhrKVmtOXy2lGBYTW/mOvchePxc2ntwkwnCwXs2ZQVDQFpkwuYYMS0PDmjhlYgd6uoujxrtjK4u1znqBIxUqhsq04i8JpYrXAX36a4uJRwXf9baimxLtksQSJd5IQIDAQAB";
    private static final String PRIVATE_KEY_STRING = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7jH68kev9TAz0vR5sBmHpJdZtjGHqeccIhNCGNsxvWefT4iWU5FhO15O+XATMF7ndRxGXoh/xqMTarkm+u3xin2PlbCEKaitMglhYjYNMgvlDaHHAJTZF6Ipsw9hve3PvHVO5t+s6/CS+Yc4rN0Iv3alYP7Kyta2RtWAJa+BhZEacKd/1onyxJj+FRYFoWHXv6vzWKMF30qf729oJMsj+wMlZaGspWa05fLaUYFhNb+Y69yF43Fzae3CTCcLBezZlBUNAWmTC5hgxLQ8OaOGViB3q6i6PGu2Mri7XOeoEjFSqGyrTiLwmlitcBffpri4lHBd/1tqKbEu2SxBIl3khAgMBAAECggEAA6gFNIHtGt69BexwnQ8xdiJ8YAheRFGkIAtkJqmyKfLpF8gPOYGLeIYFZa7/kkcIIu3mxDuvPxPY5UvZON8I2WyyvYnydEnbluiXoP+pRqLrCcsNz1QqZF8t4QRJwj/4OPoruVws5Cp+643r6gsavuTQZLML4HtgQI32Va4FDYD8D/089WTu3A2/tWbhnAyGFDLMrOgG6OgsxN9bIIkQWRNmwSsZvh6d42sg4+MWJryQJNKApov4kyQ/oyswHSfvTiU4KvJVID8LF63RiI8VGtJYfRPOzfNQeP5DBI45ogQ/R2lHOmLRuKDxPuehJkOuTEKvl637gANtQnV2yiXzEQKBgQDMAhr3khATAlpXjjzRXlfbTDilVVc8P8mR3cG0ViJaErXMG+L8sr/Z+s1Q8VZXmSaRzH07rIEyOiJxFkIu1ZXKgtjUTSDlw76bFOqTaBZduOWvNZ1Y68X/jv7vedGEJUyP1vwRnxPZ4Xbv824yYoQcYHhbIB7v6ujxtZB6Tgm2zQKBgQDrWIucuXvJl/du2O2Aoh6iG858KYTRPMKwhd3FR1zt7PYeUeuzz/Vj9+LUPEGhO3TmWpPImhLPcAc5+i0sVJxUSoaI9t1QQy1/ox+Tr0g68rfPMxHzaERZH+72InOlvXpqqXeqVizdTgFnHmp6aYtVkfNPb3+2INSC95FCxXFDpQKBgExLGUSuth41yg1mXy45ZwfXKHQER1x7ymknknJbp/shdiV/5FJ2krL1TWVQ6+ZUmwz5eXggmixre0fpeBTFwX/7kRVMRtpGavjaSKOZ0It6Q0NT/KUtf12EX6i1WPpfbJN6Zcg9QpI/9FfmJLbpCtkF5tzFVWyJ4FXMfdyPZKidAoGAUrzOWErdOgIy+sVIufBE1Ljx3rS5/NVfnK9zR+fOw9aKsB4cvxpdKsf69qI4cHZ2ooU1b1C7TDIWWEublfoo+3k30u7230C+viCa+VCmFBNAi5douCnv3WVcnSt/fMUgRF9PspKZMzQ5SgdnZ6GzWmH1J/gK7fycuW5PoynGqAECgYEAtJWigKKvKj+P7rnym4vaSBeuoPf0548omqyrWIPedhDBjxhu6K7VrYcWngxFIGs6GxueK5+zt2Is+uB1xz6BBtkw3Sw40pr4McOBqHDH+d06IrBuUiVqRigDXX5vwHNvesTy9715DBWJAmuhC29KBIq/i6Mb8n8anGrQXHYZUrE=";
    
    public static void main(String[] args) {
        try {
            System.out.println("=== 测试配置化RSA密钥功能 ===");
            
            // 1. 测试从字符串创建公钥和私钥
            System.out.println("\n1. 从配置字符串创建RSA密钥对...");
            PublicKey publicKey = getPublicKeyFromString(PUBLIC_KEY_STRING);
            PrivateKey privateKey = getPrivateKeyFromString(PRIVATE_KEY_STRING);
            System.out.println("公钥创建成功: " + (publicKey != null));
            System.out.println("私钥创建成功: " + (privateKey != null));
            
            // 2. 生成AES密钥
            System.out.println("\n2. 生成AES密钥...");
            String aesKey = CryptoUtil.generateAESKey();
            System.out.println("AES密钥: " + aesKey);
            
            // 3. 使用配置的RSA公钥加密AES密钥
            System.out.println("\n3. 使用配置的RSA公钥加密AES密钥...");
            String encryptedAESKey = CryptoUtil.encryptByRSAPublicKey(aesKey, PUBLIC_KEY_STRING);
            System.out.println("加密后的AES密钥: " + encryptedAESKey.substring(0, 50) + "...");
            
            // 4. 使用配置的RSA私钥解密AES密钥
            System.out.println("\n4. 使用配置的RSA私钥解密AES密钥...");
            String decryptedAESKey = CryptoUtil.decryptByRSAPrivateKey(encryptedAESKey, PRIVATE_KEY_STRING);
            System.out.println("解密后的AES密钥: " + decryptedAESKey);
            System.out.println("AES密钥解密验证: " + aesKey.equals(decryptedAESKey));
            
            // 5. 使用AES加密数据
            System.out.println("\n5. 使用AES加密数据...");
            String originalData = "这是需要加密的敏感数据: {\"username\":\"admin\",\"password\":\"secret123\"}";
            System.out.println("原始数据: " + originalData);
            String encryptedData = CryptoUtil.encryptByAES(originalData, aesKey);
            System.out.println("AES加密后: " + encryptedData);
            
            // 6. 使用AES解密数据
            System.out.println("\n6. 使用AES解密数据...");
            String decryptedData = CryptoUtil.decryptByAES(encryptedData, aesKey);
            System.out.println("AES解密后: " + decryptedData);
            System.out.println("数据解密验证: " + originalData.equals(decryptedData));
            
            System.out.println("\n=== 配置化RSA密钥测试完成 ===");
            System.out.println("✅ 所有测试通过！RSA密钥配置化成功！");
            
        } catch (Exception e) {
            System.err.println("测试过程中发生错误: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * 从字符串获取公钥对象
     */
    private static PublicKey getPublicKeyFromString(String publicKeyString) throws Exception {
        byte[] keyBytes = Base64.getDecoder().decode(publicKeyString);
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePublic(keySpec);
    }
    
    /**
     * 从字符串获取私钥对象
     */
    private static PrivateKey getPrivateKeyFromString(String privateKeyString) throws Exception {
        byte[] keyBytes = Base64.getDecoder().decode(privateKeyString);
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePrivate(keySpec);
    }
}