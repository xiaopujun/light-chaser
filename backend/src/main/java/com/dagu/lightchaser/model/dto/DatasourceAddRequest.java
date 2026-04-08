package com.dagu.lightchaser.model.dto;

import com.dagu.lightchaser.model.constants.DataBaseEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;

/**
 * 数据源添加请求DTO
 * 用于接收前端传递的加密数据
 * 
 * @author lightchaser
 */
@Data
public class DatasourceAddRequest implements Serializable {
    
    /**
     * 数据源链接名称
     */
    private String name;

    /**
     * 数据源类型
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private DataBaseEnum type;

    /**
     * 用户名
     */
    private String username;

    /**
     * 前端RSA公钥加密 前端使用AES加密后的密码
     */
    private String password;

    /**
     * 数据源链接地址
     */
    private String url;

    /**
     * 数据源链接描述
     */
    private String des;
    
    /**
     * 前端AES密钥
     */
    private String aesKey;
    
    private static final long serialVersionUID = 1L;
}