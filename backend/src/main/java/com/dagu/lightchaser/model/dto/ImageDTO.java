package com.dagu.lightchaser.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

/**
 * ImageDTO
 * <p>
 * Data Transfer Object（传输对象）
 * 用于接收前端参数或返回响应数据
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ImageDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    /***
     * 图片 ID
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    /**
     * 图片存储的 URL 地址
     */
    private String url;

    /**
     * 图片名称
     */
    private String name;

    /**
     * 图片文件
     */
    private MultipartFile file;
}
