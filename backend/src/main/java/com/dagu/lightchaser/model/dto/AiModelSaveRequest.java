package com.dagu.lightchaser.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AiModelSaveRequest implements Serializable {

    private String id;
    private String name;
    private String provider;
    private String modelName;
    private String baseUrl;
    private String apiKey;
    private Boolean clearApiKey;
    private String apiKeyHeader;
    private String apiKeyPrefix;
    private String chatCompletionsPath;
    private String description;
    private Double temperature;
    private Integer maxTokens;
    private Boolean enabled;
    private Boolean isDefault;
}
