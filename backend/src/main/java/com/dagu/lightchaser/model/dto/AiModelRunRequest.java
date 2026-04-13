package com.dagu.lightchaser.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AiModelRunRequest implements Serializable {

    /**
     * 模型标识，可为空，后端将自动使用默认模型。
     */
    private String modelId;

    /**
     * 场景标识，仅允许 style-optimize / data-optimize。
     */
    private String scene;

    /**
     * 系统提示词。
     */
    private String systemPrompt;

    /**
     * 用户提示词。
     */
    private String prompt;

    /**
     * 可选覆盖温度。
     */
    private Double temperature;

    /**
     * 可选覆盖最大输出 tokens。
     */
    private Integer maxTokens;
}
