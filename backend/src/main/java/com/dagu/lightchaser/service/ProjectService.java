package com.dagu.lightchaser.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.dagu.lightchaser.model.dto.ProjectDTO;
import com.dagu.lightchaser.model.dto.ProjectDependencyParamDTO;
import com.dagu.lightchaser.model.dto.ProjectImportParamDTO;
import com.dagu.lightchaser.model.po.ProjectPO;
import com.dagu.lightchaser.model.query.PageParamQuery;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface ProjectService extends IService<ProjectPO> {
    Boolean updateProject(ProjectDTO project);

    String getProjectData(Long id);

    Long createProject(ProjectDTO project);

    Boolean deleteProject(Long id);

    Long copyProject(Long id);

    ProjectDTO getProjectInfo(Long id);

    String uploadCover(ProjectDTO project);

    Page<ProjectDTO> getProjectPageList(PageParamQuery pageParam);

    ResponseEntity<byte[]> exportProject(ProjectDependencyParamDTO dependency) throws Exception;

    Boolean importProject(ProjectImportParamDTO importParam) throws IOException;
}
