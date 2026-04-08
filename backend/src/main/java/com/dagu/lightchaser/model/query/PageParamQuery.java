package com.dagu.lightchaser.model.query;

import lombok.Data;

@Data
public class PageParamQuery {
    private Long size;
    private Long current;
    private String keywords;
}
