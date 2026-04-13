package com.dagu.lightchaser.config;

import com.dagu.lightchaser.global.GlobalProperties;
import com.dagu.lightchaser.util.CryptoUtil;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.security.KeyPair;

/**
 * 加密配置类。
 * 启动时优先加载持久化的 RSA 密钥文件，若文件缺失则自动生成并写入到项目资源目录。
 *
 * @author lightchaser
 */
@Component
@ConfigurationProperties(prefix = "light-chaser.crypto")
public class CryptoConfig {

    private static final Logger logger = LoggerFactory.getLogger(CryptoConfig.class);

    private static final String DEFAULT_PUBLIC_KEY_PATH = "keys/public_key.pem";
    private static final String DEFAULT_PRIVATE_KEY_PATH = "keys/private_key.pem";
    private static final String DEFAULT_AES_KEY = "YmVVaTJUNGdvV3huQnZXZzlEUE9kdnBaaS9ZcTZ0UzZtWXl2TWVXTzQ0Qz0=";

    @Autowired
    private GlobalProperties globalProperties;
    
    private Rsa rsa = new Rsa();
    private Aes aes = new Aes();
    
    @PostConstruct
    public void init() {
        try {
            String publicKeyPath = resolvePath(rsa.getPublicKeyPath(), DEFAULT_PUBLIC_KEY_PATH);
            String privateKeyPath = resolvePath(rsa.getPrivateKeyPath(), DEFAULT_PRIVATE_KEY_PATH);

            Path publicKeyFile = resolveRuntimePath(publicKeyPath);
            Path privateKeyFile = resolveRuntimePath(privateKeyPath);

            if (Files.isRegularFile(publicKeyFile) && Files.isRegularFile(privateKeyFile)) {
                loadExistingKeyPair(publicKeyFile, privateKeyFile);
                logger.info("Loaded RSA key pair from {}", publicKeyFile.getParent());
                return;
            }

            logger.warn("RSA key pair is missing, generating a new pair under {}", publicKeyFile.getParent());
            KeyPair keyPair = CryptoUtil.generateRSAKeyPair();
            String publicKey = CryptoUtil.getPublicKeyString(keyPair);
            String privateKey = CryptoUtil.getPrivateKeyString(keyPair);

            persistPem(publicKeyFile, convertToPemFormat(publicKey, "PUBLIC KEY"));
            persistPem(privateKeyFile, convertToPemFormat(privateKey, "PRIVATE KEY"));

            rsa.setPublicKey(publicKey);
            rsa.setPrivateKey(privateKey);
        } catch (Exception e) {
            throw new RuntimeException(
                "Failed to initialize RSA key pair. " +
                    "Please make sure light-chaser.project-resource-path is writable so the generated keys can be persisted.",
                e
            );
        }
    }

    private void loadExistingKeyPair(Path publicKeyFile, Path privateKeyFile) throws IOException {
        String publicKeyContent = Files.readString(publicKeyFile, StandardCharsets.UTF_8);
        String privateKeyContent = Files.readString(privateKeyFile, StandardCharsets.UTF_8);

        rsa.setPublicKey(extractPemBody(publicKeyContent, "PUBLIC KEY"));
        rsa.setPrivateKey(extractPemBody(privateKeyContent, "PRIVATE KEY"));
    }

    private void persistPem(Path target, String pemContent) throws IOException {
        Path parent = target.getParent();
        if (parent != null) {
            Files.createDirectories(parent);
        }
        Files.writeString(
            target,
            pemContent,
            StandardCharsets.UTF_8,
            StandardOpenOption.CREATE,
            StandardOpenOption.TRUNCATE_EXISTING,
            StandardOpenOption.WRITE
        );
    }

    private String resolvePath(String configuredPath, String defaultPath) {
        return StringUtils.hasText(configuredPath) ? configuredPath.trim() : defaultPath;
    }

    private Path resolveRuntimePath(String configuredPath) {
        Path path = Path.of(configuredPath);
        if (path.isAbsolute()) {
            return path.normalize();
        }

        String baseDir = globalProperties != null ? globalProperties.getProjectResourcePath() : null;
        if (!StringUtils.hasText(baseDir)) {
            baseDir = System.getProperty("user.dir");
        }
        return Path.of(baseDir).resolve(path).normalize();
    }

    private String extractPemBody(String pemContent, String keyType) {
        return pemContent
            .replace("-----BEGIN " + keyType + "-----", "")
            .replace("-----END " + keyType + "-----", "")
            .replaceAll("\\s+", "");
    }

    private String convertToPemFormat(String base64Key, String keyType) {
        StringBuilder pem = new StringBuilder();
        pem.append("-----BEGIN ").append(keyType).append("-----\n");
        for (int i = 0; i < base64Key.length(); i += 64) {
            int end = Math.min(i + 64, base64Key.length());
            pem.append(base64Key, i, end).append("\n");
        }
        pem.append("-----END ").append(keyType).append("-----");
        return pem.toString();
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
        private String publicKeyPath = DEFAULT_PUBLIC_KEY_PATH;
        private String privateKeyPath = DEFAULT_PRIVATE_KEY_PATH;
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
        private String key = DEFAULT_AES_KEY;
        
        public String getKey() {
            return key;
        }
        
        public void setKey(String key) {
            this.key = key;
        }
    }
}
