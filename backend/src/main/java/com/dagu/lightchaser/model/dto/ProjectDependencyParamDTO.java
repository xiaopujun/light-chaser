package com.dagu.lightchaser.model.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class ProjectDependencyParamDTO implements Serializable {
    private Long id; // 项目id
    private String name; // 项目名称
    private String projectJson; // 项目json数据
    private List<String> images; // 项目所使用的图片列表
    private List<String> fonts; // 项目所使用的字体列表
}
