package com.dagu.lightchaser.model.dto;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("project")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectDTO implements Serializable {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    private String des;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    @TableLogic
    private int deleted;
    private String dataJson;
    private String cover;
    @TableField(exist = false)
    private MultipartFile file;
}
