package com.dagu.lightchaser.model.constants;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum DataBaseEnum {
    SQLite(0, "SQLite"),
    MySQL(1, "MySQL"),
    PostgresSQL(2, "PostgresSQL"),
    ORACLE(3, "ORACLE"),
    SQLServer(4, "SQLServer"),
    ;

    @JsonValue
    @EnumValue
    private final int code;

    private final String name;

    DataBaseEnum(int code, String name) {
        this.code = code;
        this.name = name;
    }
}
