package com.dagu.lightchaser.config;

import com.dagu.lightchaser.factory.WebParamEnumFactory;
import com.dagu.lightchaser.global.GlobalProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import java.io.File;

@Configuration
@RequiredArgsConstructor
public class StaticSourceInterceptor extends WebMvcConfigurationSupport {

    private final GlobalProperties globalProperties;

    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/images/**").addResourceLocations(String.join("", "file:", globalProperties.getImageAbsolutPath(), File.separator));
        registry.addResourceHandler("/static/covers/**").addResourceLocations(String.join("", "file:", globalProperties.getCoverAbsolutePath(), File.separator));
        super.addResourceHandlers(registry);
    }

    @Override
    protected void addFormatters(FormatterRegistry registry) {
        registry.addConverterFactory(new WebParamEnumFactory());
    }
}
