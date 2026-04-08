package com.dagu.lightchaser.global;

import jakarta.annotation.PostConstruct;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.nio.file.Path;

/**
 * 全局配置参数（替代静态变量方式）
 */
@Data
@Component
@ConfigurationProperties(prefix = "light-chaser")
public class GlobalProperties {

    /**
     * 项目版本号
     */
    private String version = "1.7.0";

    /**
     * 项目资源路径，用于存储本项目相关的外部资源文件
     * application.yml/application.properties 配置项:
     * light-chaser.project-resource-path=xxx
     */
    private String projectResourcePath;

    /**
     * 图片资源路径，用于存储图片资源
     */
    private String imagePath = "/static/images";

    /**
     * 封面路径，用于存储项目封面图片
     */
    private String coverPath = "/static/covers";

    /**
     * 可接收的图片类型
     * 固定常量，不需要配置
     */
    public static final String[] IMAGE_TYPE = new String[]{".bmp", ".jpg", ".jpeg", ".png", ".gif"};

    /**
     * 图片大小限制（默认 5MB）
     */
    public static final long IMAGE_SIZE = 1024 * 1024 * 5;

    /**
     * 初始化默认值：如果配置项为空，则使用 user.dir
     */
    @PostConstruct
    public void initDefault() {
        if (projectResourcePath == null)
            projectResourcePath = System.getProperty("user.dir");

    }

    /**
     * 获取图片资源绝对路径（服务器存储路径）
     */
    public String getImageAbsolutPath() {
        return Path.of(projectResourcePath, imagePath).toAbsolutePath().toString();
    }

    /**
     * 获取封面资源绝对路径（服务器存储路径）
     */
    public String getCoverAbsolutePath() {
        return Path.of(projectResourcePath, coverPath).toAbsolutePath().toString();
    }

}
