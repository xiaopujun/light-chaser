package com.dagu.lightchaser.model.dto;

import com.dagu.lightchaser.model.constants.DataBaseEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;

/**
 * 数据源管理
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommonDatasourceDTO implements Serializable {
    /**
     * id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

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
     * 数据源链接密码
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

}