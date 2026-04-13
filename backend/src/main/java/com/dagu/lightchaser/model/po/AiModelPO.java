package com.dagu.lightchaser.model.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName(value = "ai_model", autoResultMap = true)
public class AiModelPO implements Serializable {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String name;

    private String provider;

    private String modelName;

    private String baseUrl;

    private String apiKey;

    private String apiKeyHeader;

    private String apiKeyPrefix;

    private String chatCompletionsPath;

    private String description;

    private Double temperature;

    private Integer maxTokens;

    private Integer enabled;

    private Integer isDefault;

    @TableField(value = "create_time", typeHandler = com.dagu.lightchaser.model.handler.SqliteFlexibleLocalDateTimeTypeHandler.class)
    private LocalDateTime createTime;

    @TableField(value = "update_time", typeHandler = com.dagu.lightchaser.model.handler.SqliteFlexibleLocalDateTimeTypeHandler.class)
    private LocalDateTime updateTime;

    @TableLogic
    private int deleted;
}
