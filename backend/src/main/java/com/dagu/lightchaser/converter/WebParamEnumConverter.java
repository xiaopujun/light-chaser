package com.dagu.lightchaser.converter;

import com.dagu.lightchaser.model.constants.BaseWebParamEnum;
import org.springframework.core.convert.converter.Converter;

import java.util.*;

public class WebParamEnumConverter<T extends BaseWebParamEnum> implements Converter<String, T> {
    private final Map<String, T> webParamEnumMap = new HashMap<>();

    public WebParamEnumConverter(Class<T> enumType) {
        Arrays.stream(enumType.getEnumConstants()).forEach(item -> webParamEnumMap.put(item.getCode() + "", item));
    }

    @Override
    public T convert(String source) {
        return webParamEnumMap.get(source);
    }
}