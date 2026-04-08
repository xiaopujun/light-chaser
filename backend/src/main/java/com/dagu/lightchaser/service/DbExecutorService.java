package com.dagu.lightchaser.service;

import com.dagu.lightchaser.model.entity.DbExecutorEntity;

public interface DbExecutorService {
    Object executeSql(DbExecutorEntity dbExecutorEntity);
}
