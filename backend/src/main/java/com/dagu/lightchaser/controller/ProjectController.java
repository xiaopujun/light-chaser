package com.dagu.lightchaser.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dagu.lightchaser.global.ApiResponse;
import com.dagu.lightchaser.model.dto.ProjectDTO;
import com.dagu.lightchaser.model.dto.ProjectDependencyParamDTO;
import com.dagu.lightchaser.model.dto.ProjectImportParamDTO;
import com.dagu.lightchaser.model.query.PageParamQuery;
import com.dagu.lightchaser.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/project")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping("/pageList")
    public ApiResponse<Page<ProjectDTO>> getProjectPageList(@RequestBody PageParamQuery pageParam) {
        return ApiResponse.success(projectService.getProjectPageList(pageParam));
    }

    @GetMapping("/getProjectData/{id}")
    public ApiResponse<String> getProjectData(@PathVariable(name = "id") Long id) {
        return ApiResponse.success(projectService.getProjectData(id));
    }

    @GetMapping("/getProjectInfo/{id}")
    public ApiResponse<ProjectDTO> getProjectInfo(@PathVariable(name = "id") Long id) {
        return ApiResponse.success(projectService.getProjectInfo(id));
    }

    @PostMapping("/update")
    public ApiResponse<Boolean> updateProject(@RequestBody ProjectDTO project) {
        return ApiResponse.success(projectService.updateProject(project));
    }

    @PostMapping("/create")
    public ApiResponse<Long> createProject(@RequestBody ProjectDTO project) {
        return ApiResponse.success(projectService.createProject(project));
    }

    @GetMapping("/del/{id}")
    public ApiResponse<Boolean> deleteProject(@PathVariable(name = "id") Long id) {
        return ApiResponse.success(projectService.deleteProject(id));
    }

    @GetMapping("/copy/{id}")
    public ApiResponse<Long> copyProject(@PathVariable(name = "id") Long id) {
        return ApiResponse.success(projectService.copyProject(id));
    }

    @PostMapping(value = "/cover")
    public ApiResponse<String> uploadCover(ProjectDTO project) {
        return ApiResponse.success(projectService.uploadCover(project));
    }

    @PostMapping("/exportProject")
    public ResponseEntity<byte[]> exportProject(@RequestBody ProjectDependencyParamDTO dependency) throws Exception {
        return projectService.exportProject(dependency);
    }

    @PostMapping("/importProject")
    public ApiResponse<Boolean> importProject(ProjectImportParamDTO importParam) throws IOException {
        return ApiResponse.success(projectService.importProject(importParam));
    }
}
