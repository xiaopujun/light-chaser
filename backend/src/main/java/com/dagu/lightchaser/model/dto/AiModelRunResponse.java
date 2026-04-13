package com.dagu.lightchaser.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.io.Serializable;
import java.util.Map;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AiModelRunResponse implements Serializable {

    private String modelId;
    private String modelName;
    private String provider;
    private String baseUrl;
    private String scene;
    private String prompt;
    private String reply;
    private String reasoningContent;
    private Map<String, Object> usage;
    private JsonNode rawResponse;
}
