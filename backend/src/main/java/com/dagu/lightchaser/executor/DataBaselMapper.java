package com.dagu.lightchaser.executor;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;
import java.util.Map;

public interface DataBaselMapper {

    @SelectProvider(type = CustomSQLProvider.class, method = "getCustomSQL")
    List<Map<String, Object>> executeQuery(@Param("sql") String sql);
}



