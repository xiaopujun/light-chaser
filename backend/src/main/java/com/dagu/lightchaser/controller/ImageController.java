package com.dagu.lightchaser.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dagu.lightchaser.global.ApiResponse;
import com.dagu.lightchaser.model.dto.ImageDTO;
import com.dagu.lightchaser.model.query.PageParamQuery;
import com.dagu.lightchaser.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image")
public class ImageController {
    private final ImageService imageService;

    @PostMapping(value = "/upload")
    public ApiResponse<String> uploadImage(ImageDTO imageDTO) {
        return ApiResponse.success(imageService.uploadImage(imageDTO));
    }

    @PostMapping("/pageList")
    public ApiResponse<Page<ImageDTO>> getImagePageList(@RequestBody PageParamQuery pageParam) {
        return ApiResponse.success(imageService.getImagePageList(pageParam));
    }

    @PostMapping("/batchDelete")
    public ApiResponse<Boolean> delImageSource(@RequestBody List<Long> ids) {
        return ApiResponse.success(imageService.batchDeleteImage(ids));
    }
}
