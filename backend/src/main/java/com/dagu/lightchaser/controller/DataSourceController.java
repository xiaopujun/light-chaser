package com.dagu.lightchaser.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dagu.lightchaser.global.ApiResponse;
import com.dagu.lightchaser.model.dto.CommonDatasourceDTO;
import com.dagu.lightchaser.model.dto.DatasourceAddRequest;
import com.dagu.lightchaser.model.dto.DatasourceUpdateRequest;
import com.dagu.lightchaser.model.query.PageParamQuery;
import com.dagu.lightchaser.service.CommonDatasourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commonDatabase")
public class DataSourceController {

    @Autowired
    private CommonDatasourceService commonDatasourceService;

    @GetMapping("/get/{id}")
    public ApiResponse<CommonDatasourceDTO> getDataSource(@PathVariable Long id) {
        return ApiResponse.success(commonDatasourceService.getDataSource(id));
    }

    @GetMapping("/list")
    public ApiResponse<List<CommonDatasourceDTO>> getDataSourceList() {
        return ApiResponse.success(commonDatasourceService.getDataSourceList());
    }

    @PostMapping("/pageList")
    public ApiResponse<Page<CommonDatasourceDTO>> getDataSourcePageList(@RequestBody PageParamQuery pageParam) {
        return ApiResponse.success(commonDatasourceService.getDataSourcePageList(pageParam));
    }

    @PostMapping("/add")
    public ApiResponse<Long> addDataSource(@RequestBody DatasourceAddRequest request) {
        return ApiResponse.success(commonDatasourceService.addDataSource(request));
    }

    @PostMapping("/update")
    public ApiResponse<Boolean> updateDataSource(@RequestBody DatasourceUpdateRequest datasource) throws Exception {
        return ApiResponse.success(commonDatasourceService.updateDataSource(datasource));
    }

    @GetMapping("/copy/{id}")
    public ApiResponse<Boolean> copyDataSource(@PathVariable Long id) {
        return ApiResponse.success(commonDatasourceService.copyDataSource(id));
    }

    @PostMapping("/batchDel")
    public ApiResponse<Boolean> batchDeleteCommonDatabase(@RequestBody List<Long> ids) {
        return ApiResponse.success(commonDatasourceService.removeBatchByIds(ids));
    }

    @GetMapping("/test/{id}")
    public ApiResponse<Boolean> testDataSourceConnect(@PathVariable Long id) {
        return ApiResponse.success("链接正常", commonDatasourceService.testDataSourceConnect(id));
    }

}
