package com.dagu.lightchaser.factory;

import com.dagu.lightchaser.model.constants.BaseWebParamEnum;
import com.dagu.lightchaser.converter.WebParamEnumConverter;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterFactory;

import java.util.HashMap;
import java.util.Map;

public class WebParamEnumFactory implements ConverterFactory<String, BaseWebParamEnum> {

    private static final Map<Class<? extends BaseWebParamEnum>, Converter<String, ? extends BaseWebParamEnum>> factoryMap = new HashMap<>();

    @Override
    public <T extends BaseWebParamEnum> Converter<String, T> getConverter(Class<T> targetType) {
        Converter<String, ? extends BaseWebParamEnum> converter = factoryMap.get(targetType);
        if (converter == null) {
            converter = new WebParamEnumConverter<>(targetType);
            factoryMap.put(targetType, converter);
        }
        return (Converter<String, T>) converter;
    }
}