package com.dagu.lightchaser.controller;

import com.dagu.lightchaser.config.CryptoConfig;
import com.dagu.lightchaser.global.ApiResponse;
import com.dagu.lightchaser.util.CryptoUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.KeyPair;

/**
 * 调试控制器
 * 用于调试加密解密问题
 *
 * @author zhenglin
 * @date 2025/07/27
 */
@RestController
@RequestMapping("/api/debug")
public class DebugController {

    private static final Logger logger = LoggerFactory.getLogger(DebugController.class);

    @Autowired
    private CryptoConfig cryptoConfig;

    /**
     * 获取当前公钥的Base64格式（不含PEM头尾）
     */
    @GetMapping("/public-key-raw")
    public ApiResponse<String> getPublicKeyRaw() {
        try {
            String publicKey = cryptoConfig.getRsa().getPublicKey();
            return ApiResponse.success(publicKey);
        } catch (Exception e) {
            logger.error("获取原始公钥失败", e);
            return ApiResponse.error(500, "获取原始公钥失败: " + e.getMessage());
        }
    }

    /**
     * 测试RSA加密解密
     */
    @PostMapping("/test-rsa")
    public ApiResponse<String> testRSA(@RequestBody TestRSARequest request) {
        try {
            logger.info("收到RSA测试请求，加密数据长度: {}", request.getEncryptedData().length());
            
            String privateKey = cryptoConfig.getRsa().getPrivateKey();
            String decrypted = CryptoUtil.decryptByRSAPrivateKey(request.getEncryptedData(), privateKey);
            
            logger.info("RSA解密成功: {}", decrypted);
            return ApiResponse.success(decrypted);
            
        } catch (Exception e) {
            logger.error("RSA解密失败", e);
            return ApiResponse.error(500, "RSA解密失败: " + e.getMessage());
        }
    }

    /**
     * 生成新的密钥对用于测试
     */
    @PostMapping("/generate-new-keypair")
    public ApiResponse<KeyPairResponse> generateNewKeyPair() {
        try {
            KeyPair keyPair = CryptoUtil.generateRSAKeyPair();
            String publicKey = CryptoUtil.getPublicKeyString(keyPair);
            String privateKey = CryptoUtil.getPrivateKeyString(keyPair);

            // 将公钥转换为PEM格式
            String pemPublicKey = convertToPemFormat(publicKey);

            KeyPairResponse response = new KeyPairResponse();
            response.setPublicKeyPem(pemPublicKey);
            response.setPublicKeyRaw(publicKey);
            response.setPrivateKeyRaw(privateKey);

            logger.info("生成新密钥对，公钥长度: {}", publicKey.length());
            return ApiResponse.success(response);

        } catch (Exception e) {
            logger.error("生成密钥对失败", e);
            return ApiResponse.error(500, "生成密钥对失败: " + e.getMessage());
        }
    }

    /**
     * 完整测试加密解密流程
     */
    @PostMapping("/test-full-flow")
    public ApiResponse<TestFlowResponse> testFullFlow(@RequestBody TestFlowRequest request) {
        try {
            logger.info("开始完整流程测试");
            logger.info("测试密码: {}", request.getTestPassword());
            logger.info("AES密钥: {}", request.getAesKey());
            logger.info("RSA加密数据长度: {}", request.getRsaEncryptedData().length());

            // 1. RSA解密
            String privateKey = cryptoConfig.getRsa().getPrivateKey();
            String aesEncryptedPassword = CryptoUtil.decryptByRSAPrivateKey(request.getRsaEncryptedData(), privateKey);
            logger.info("RSA解密得到AES加密密码: {}", aesEncryptedPassword);

            // 2. AES解密
            String finalPassword = CryptoUtil.decryptByAESWithIV(aesEncryptedPassword, request.getAesKey());
            logger.info("最终解密得到密码: {}", finalPassword);

            TestFlowResponse response = new TestFlowResponse();
            response.setAesEncryptedData(aesEncryptedPassword);
            response.setFinalPassword(finalPassword);
            response.setSuccess(request.getTestPassword().equals(finalPassword));

            return ApiResponse.success(response);

        } catch (Exception e) {
            logger.error("完整流程测试失败", e);
            TestFlowResponse errorResponse = new TestFlowResponse();
            errorResponse.setErrorMessage(e.getMessage());
            errorResponse.setSuccess(false);
            return ApiResponse.success(errorResponse);
        }
    }

    /**
     * 将Base64公钥转换为PEM格式
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

    // DTO 类
    public static class TestRSARequest {
        private String encryptedData;

        public String getEncryptedData() {
            return encryptedData;
        }

        public void setEncryptedData(String encryptedData) {
            this.encryptedData = encryptedData;
        }
    }

    public static class KeyPairResponse {
        private String publicKeyPem;
        private String publicKeyRaw;
        private String privateKeyRaw;

        public String getPublicKeyPem() {
            return publicKeyPem;
        }

        public void setPublicKeyPem(String publicKeyPem) {
            this.publicKeyPem = publicKeyPem;
        }

        public String getPublicKeyRaw() {
            return publicKeyRaw;
        }

        public void setPublicKeyRaw(String publicKeyRaw) {
            this.publicKeyRaw = publicKeyRaw;
        }

        public String getPrivateKeyRaw() {
            return privateKeyRaw;
        }

        public void setPrivateKeyRaw(String privateKeyRaw) {
            this.privateKeyRaw = privateKeyRaw;
        }
    }

    public static class TestFlowRequest {
        private String testPassword;
        private String aesKey;
        private String rsaEncryptedData;

        public String getTestPassword() {
            return testPassword;
        }

        public void setTestPassword(String testPassword) {
            this.testPassword = testPassword;
        }

        public String getAesKey() {
            return aesKey;
        }

        public void setAesKey(String aesKey) {
            this.aesKey = aesKey;
        }

        public String getRsaEncryptedData() {
            return rsaEncryptedData;
        }

        public void setRsaEncryptedData(String rsaEncryptedData) {
            this.rsaEncryptedData = rsaEncryptedData;
        }
    }

    public static class TestFlowResponse {
        private String aesEncryptedData;
        private String finalPassword;
        private boolean success;
        private String errorMessage;

        public String getAesEncryptedData() {
            return aesEncryptedData;
        }

        public void setAesEncryptedData(String aesEncryptedData) {
            this.aesEncryptedData = aesEncryptedData;
        }

        public String getFinalPassword() {
            return finalPassword;
        }

        public void setFinalPassword(String finalPassword) {
            this.finalPassword = finalPassword;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getErrorMessage() {
            return errorMessage;
        }

        public void setErrorMessage(String errorMessage) {
            this.errorMessage = errorMessage;
        }
    }
}