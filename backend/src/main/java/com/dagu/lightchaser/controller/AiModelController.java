package com.dagu.lightchaser.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dagu.lightchaser.global.ApiResponse;
import com.dagu.lightchaser.model.dto.AiModelListItemDTO;
import com.dagu.lightchaser.model.dto.AiModelSaveRequest;
import com.dagu.lightchaser.model.dto.AiModelRunRequest;
import com.dagu.lightchaser.model.dto.AiModelRunResponse;
import com.dagu.lightchaser.model.query.PageParamQuery;
import com.dagu.lightchaser.service.AiModelService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aiModel")
public class AiModelController {

    @Resource
    private AiModelService aiModelService;

    @GetMapping("/list")
    public ApiResponse<List<AiModelListItemDTO>> list() {
        return ApiResponse.success(aiModelService.listModels());
    }

    @PostMapping("/pageList")
    public ApiResponse<Page<AiModelListItemDTO>> pageList(@RequestBody PageParamQuery pageParam) {
        return ApiResponse.success(aiModelService.pageModels(pageParam));
    }

    @GetMapping("/get/{id}")
    public ApiResponse<AiModelListItemDTO> get(@PathVariable String id) {
        return ApiResponse.success(aiModelService.getModel(id));
    }

    @PostMapping("/create")
    public ApiResponse<Long> create(@RequestBody AiModelSaveRequest request) {
        return ApiResponse.success(aiModelService.createModel(request));
    }

    @PostMapping("/update")
    public ApiResponse<Boolean> update(@RequestBody AiModelSaveRequest request) {
        return ApiResponse.success(aiModelService.updateModel(request));
    }

    @GetMapping("/copy/{id}")
    public ApiResponse<Boolean> copy(@PathVariable String id) {
        return ApiResponse.success(aiModelService.copyModel(id));
    }

    @PostMapping("/batchDel")
    public ApiResponse<Boolean> batchDelete(@RequestBody List<String> ids) {
        return ApiResponse.success(aiModelService.batchDeleteModels(ids));
    }

    @PostMapping("/run")
    public ApiResponse<AiModelRunResponse> run(@RequestBody AiModelRunRequest request) {
        return ApiResponse.success(aiModelService.run(request));
    }
}
