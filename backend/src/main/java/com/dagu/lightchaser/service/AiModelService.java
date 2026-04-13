package com.dagu.lightchaser.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dagu.lightchaser.model.dto.AiModelListItemDTO;
import com.dagu.lightchaser.model.dto.AiModelSaveRequest;
import com.dagu.lightchaser.model.dto.AiModelRunRequest;
import com.dagu.lightchaser.model.dto.AiModelRunResponse;
import com.dagu.lightchaser.model.query.PageParamQuery;

import java.util.List;

public interface AiModelService {

    List<AiModelListItemDTO> listModels();

    Page<AiModelListItemDTO> pageModels(PageParamQuery pageParam);

    AiModelListItemDTO getModel(String id);

    Long createModel(AiModelSaveRequest request);

    Boolean updateModel(AiModelSaveRequest request);

    Boolean copyModel(String id);

    Boolean batchDeleteModels(List<String> ids);

    AiModelRunResponse run(AiModelRunRequest request);
}
