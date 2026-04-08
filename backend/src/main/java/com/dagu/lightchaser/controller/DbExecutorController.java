package com.dagu.lightchaser.controller;

import com.dagu.lightchaser.model.entity.DbExecutorEntity;
import com.dagu.lightchaser.global.ApiResponse;
import com.dagu.lightchaser.service.DbExecutorService;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/db/executor")
public class DbExecutorController {

    @Autowired
    private DbExecutorService dbExecutorService;

    @PostMapping("/execute")
    public ApiResponse<Object> executeSql(@RequestBody DbExecutorEntity dbExecutorEntity) {
        return ApiResponse.success(dbExecutorService.executeSql(dbExecutorEntity));
    }

}
