package com.dagu.lightchaser.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Data
@Component
@ConfigurationProperties(prefix = "light-chaser.ai")
public class AiModelProperties {

    /**
     * 是否启用 AI 功能。
     */
    private boolean enabled = true;

    /**
     * 可用模型列表。
     */
    private List<Model> models = new ArrayList<>();

    @Data
    public static class Model {
        /**
         * 模型唯一标识。
         */
        private String id;

        /**
         * 前端展示名称。
         */
        private String label;

        /**
         * 供应商标识，仅用于展示与日志。
         */
        private String provider = "openai-compatible";

        /**
         * 实际调用的模型名称。
         */
        private String modelName;

        /**
         * OpenAI 兼容接口基础地址，例如 https://api.openai.com/v1。
         */
        private String baseUrl;

        /**
         * 可选的接口路径，默认 /chat/completions。
         */
        private String chatCompletionsPath = "/chat/completions";

        /**
         * API Key。
         */
        private String apiKey;

        /**
         * 鉴权 Header，默认 Authorization。
         */
        private String apiKeyHeader = "Authorization";

        /**
         * 鉴权前缀，默认 Bearer 。
         */
        private String apiKeyPrefix = "Bearer ";

        /**
         * 是否启用。
         */
        private Boolean enabled = true;

        /**
         * 是否默认选中。
         */
        private Boolean isDefault = false;

        /**
         * 默认温度。
         */
        private Double temperature = 0.3;

        /**
         * 默认最大输出 tokens。
         */
        private Integer maxTokens = 2048;

        /**
         * 模型说明。
         */
        private String description;
    }
}
