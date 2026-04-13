package com.dagu.lightchaser.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AiModelListItemDTO implements Serializable {

    private String id;
    private String name;
    private String label;
    private String provider;
    private String providerLabel;
    private String modelName;
    private String baseUrl;
    private String apiKeyHeader;
    private String apiKeyPrefix;
    private String chatCompletionsPath;
    private Boolean hasApiKey;
    private Boolean enabled;
    private Boolean isDefault;
    private Integer maxTokens;
    private Double temperature;
    private String description;
    private String createTime;
    private String updateTime;
}
