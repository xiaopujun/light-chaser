package com.dagu.lightchaser.service.impl;

import com.alibaba.fastjson2.JSON;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dagu.lightchaser.global.AppException;
import com.dagu.lightchaser.global.GlobalProperties;
import com.dagu.lightchaser.mapper.ProjectMapper;
import com.dagu.lightchaser.model.dto.*;
import com.dagu.lightchaser.model.po.ImagePO;
import com.dagu.lightchaser.model.po.ProjectPO;
import com.dagu.lightchaser.model.query.PageParamQuery;
import com.dagu.lightchaser.service.ImageService;
import com.dagu.lightchaser.service.ProjectService;
import com.dagu.lightchaser.util.FileUtil;
import com.dagu.lightchaser.util.PathUtil;
import com.dagu.lightchaser.util.ProjectUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

@Log4j2
@Service
@RequiredArgsConstructor
public class ProjectServiceImpl extends ServiceImpl<ProjectMapper, ProjectPO> implements ProjectService {

    private final ProjectMapper projectMapper;
    private final GlobalProperties globalProperties;
    private final ImageService imageService;

    @Override
    public Boolean updateProject(ProjectDTO project) {
        if (project == null || project.getId() == null)
            return false;
        ProjectPO po = new ProjectPO();
        BeanUtils.copyProperties(project, po);
        return updateById(po);
    }

    @Override
    public String getProjectData(Long id) {
        if (id == null)
            return null;
        LambdaQueryWrapper<ProjectPO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.select(ProjectPO::getDataJson).eq(ProjectPO::getId, id);
        return getBaseMapper().selectOne(queryWrapper).getDataJson();
    }

    @Override
    @Transactional
    public Long createProject(ProjectDTO project) {
        if (project == null)
            return null;
        ProjectPO po = new ProjectPO();
        BeanUtils.copyProperties(project, po);
        save(po);
        return po.getId();
    }

    @Override
    public Boolean deleteProject(Long id) {
        if (id == null)
            return false;
        return removeById(id);
    }

    @Override
    public Long copyProject(Long id) {
        if (id == null)
            return null;
        ProjectPO po = getById(id);
        if (po == null)
            return null;
        po.setId(null);
        po.setName(po.getName() + " - 副本");
        po.setCreateTime(null);
        po.setUpdateTime(null);
        save(po);
        return po.getId();
    }

    @Override
    public ProjectDTO getProjectInfo(Long id) {
        if (id == null)
            return null;
        ProjectPO po = getById(id);
        ProjectDTO dto = new ProjectDTO();
        BeanUtils.copyProperties(po, dto);
        return dto;
    }

    @Override
    public String uploadCover(ProjectDTO project) {
        if (project == null || project.getId() == null || project.getFile() == null)
            throw new AppException(500, "参数错误");
        MultipartFile file = project.getFile();
        if (file.getSize() > GlobalProperties.IMAGE_SIZE)
            throw new AppException(500, "图片大小不能超过5M");
        String fileName = file.getOriginalFilename();
        if (fileName == null)
            throw new AppException(500, "图片名称错误");
        String suffix = fileName.substring(fileName.lastIndexOf("."));
        if (!Arrays.asList(GlobalProperties.IMAGE_TYPE).contains(suffix))
            throw new AppException(500, "图片格式不支持");
        LambdaQueryWrapper<ProjectPO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(ProjectPO::getId, project.getId());
        ProjectPO record = getOne(queryWrapper);
        if (record != null && record.getCover() != null) {
            String oldFileName = record.getCover();
            String oldAbsolutePath = Path.of(globalProperties.getCoverAbsolutePath(), oldFileName).toString();
            //删除旧文件
            File oldFile = new File(oldAbsolutePath);
            if (oldFile.exists()) {
                boolean delete = oldFile.delete();
                if (!delete)
                    throw new AppException(500, "旧图片删除失败");
            }
        }
        //生成文件路径、文件名
        fileName = UUID.randomUUID().toString().replaceAll("-", "") + suffix;
        //保存文件
        File uploadDir = new File(globalProperties.getCoverAbsolutePath());
        if (!uploadDir.exists()) {
            boolean mkdirs = uploadDir.mkdirs();
            if (!mkdirs)
                throw new AppException(500, "封面目录创建失败");
        }
        File destFile = new File(uploadDir, fileName);
        try {
            file.transferTo(destFile);
        } catch (IOException e) {
            throw new AppException(500, "图片写入文件系统失败");
        }
        //数据入库
        ProjectPO po = new ProjectPO();
        po.setId(project.getId());
        po.setCover(fileName);
        updateById(po);
        return Path.of(globalProperties.getCoverPath(), fileName).toString();
    }

    @Override
    public Page<ProjectDTO> getProjectPageList(PageParamQuery pageParam) {
        if (pageParam == null)
            return new Page<>();
        long current = pageParam.getCurrent() == null ? 1 : pageParam.getCurrent();
        long size = pageParam.getSize() == null ? 10 : pageParam.getSize();
        Page<ProjectPO> page = new Page<>(current, size);
        LambdaQueryWrapper<ProjectPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.select(ProjectPO::getId, ProjectPO::getName, ProjectPO::getDes, ProjectPO::getCover);
        wrapper.orderByDesc(ProjectPO::getCreateTime);
        if (pageParam.getKeywords() != null)
            wrapper.like(ProjectPO::getName, pageParam.getKeywords());
        Page<ProjectPO> pageData = projectMapper.selectPage(page, wrapper);
        return (Page<ProjectDTO>) pageData.convert(po -> {
            ProjectDTO dto = new ProjectDTO();
            BeanUtils.copyProperties(po, dto);
            if (po.getCover() != null) {
                String coverPath = PathUtil.toWebPath(Path.of(globalProperties.getCoverPath(), po.getCover()).toString());
                dto.setCover(coverPath);
            }
            return dto;
        });
    }

    private ProjectDependenciesDTO calculateProjectDependency(ProjectDependencyParamDTO dependency) {
        if (dependency == null || dependency.getId() == null)
            return null;

        //字体依赖
        List<ProjectDependencyItemDTO> fontDep = new ArrayList<>();
        //图片依赖
        List<ProjectDependencyItemDTO> imageDep = new ArrayList<>();
        //项目json数据
        String dataJson = dependency.getProjectJson();

        //2. 导出图片
        List<String> images = dependency.getImages();
        if (images != null && !images.isEmpty()) {
            List<ImagePO> imagePoList = imageService.getImages(dependency.getImages());
            for (ImagePO imagePO : imagePoList) {
                Path imageZipPath = Path.of(globalProperties.getImagePath(), imagePO.getUrl());
                imageDep.add(new ProjectDependencyItemDTO(imagePO.getName(), FileUtil.removeBeginSeparator(FileUtil.normalizePath(imageZipPath.toString()))));
            }
        }

        //6. 导出项目json数据
        if (dataJson == null)
            dataJson = getProjectData(dependency.getId());

        ProjectDependenciesDTO dependencies = new ProjectDependenciesDTO();
        dependencies.setId(dependency.getId());
        dependencies.setName(dependency.getName());
        dependencies.setImages(imageDep);
        dependencies.setProjectJson(dataJson);
        dependencies.setVersion(globalProperties.getVersion());
        return dependencies;
    }

    @Override
    public ResponseEntity<byte[]> exportProject(ProjectDependencyParamDTO dependency) throws Exception {
        if (dependency == null || dependency.getProjectJson() == null || dependency.getProjectJson().isEmpty())
            throw new AppException(500, "无法导出项目数据，原因：项目数据为空");

        ProjectDependenciesDTO dependencies = calculateProjectDependency(dependency);
        List<String> warnings = new ArrayList<>();

        //1. 创建压缩包
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ZipOutputStream zipOutputStream = new ZipOutputStream(byteArrayOutputStream, StandardCharsets.UTF_8);

        //2. 导出图片
        if (dependencies.getImages() != null) {
            for (ProjectDependencyItemDTO item : dependencies.getImages()) {
                String zipPath = item.getValue();
                String fileName = zipPath.substring(zipPath.lastIndexOf("/") + 1);
                Path filePath = Path.of(globalProperties.getImageAbsolutPath(), fileName);
                try (InputStream in = Files.newInputStream(filePath)) {
                    zipOutputStream.putNextEntry(new ZipEntry(zipPath));
                    in.transferTo(zipOutputStream);
                    zipOutputStream.closeEntry();
                } catch (IOException e) {
                    warnings.add("【图片缺失】" + zipPath);
                }
            }
        }

        //3. 导出项目数据
        String jsonString = JSON.toJSONString(dependencies);
        zipOutputStream.putNextEntry(new ZipEntry(dependency.getName() + ".lc"));
        zipOutputStream.write(jsonString.getBytes(StandardCharsets.UTF_8));
        zipOutputStream.closeEntry();

        // 7. 写入警告日志（如果有）
        if (!warnings.isEmpty()) {
            zipOutputStream.putNextEntry(new ZipEntry("err.log"));
            for (String warning : warnings) {
                zipOutputStream.write((warning + "\n").getBytes(StandardCharsets.UTF_8));
            }
            zipOutputStream.closeEntry();
        }

        // 关闭 zip 输出流
        zipOutputStream.close();

        // 设置响应头
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        // 对文件名进行URL编码
        String encodedFileName = java.net.URLEncoder.encode(dependency.getName() + ".zip", StandardCharsets.UTF_8);
        headers.setContentDispositionFormData("attachment", encodedFileName);
        headers.setContentLength(byteArrayOutputStream.size());

        // 返回响应实体，包含压缩后的字节数组
        return new ResponseEntity<>(byteArrayOutputStream.toByteArray(), headers, HttpStatus.OK);
    }

    @Override
    @Transactional
    public Boolean importProject(ProjectImportParamDTO importParam) throws IOException {
        if (importParam == null)
            return false;

        //1. 初始化
        String dataJson = null;
        ProjectDependenciesDTO dependencies = null;
        ArrayList<String> imagesUrls = new ArrayList<>();
        MultipartFile file = importParam.getFile();
        //2. 存储为临时文件
        Path tempFile = Files.createTempFile("upload-" + UUID.randomUUID(), ".zip");
        Files.write(tempFile, file.getBytes());

        try (ZipInputStream filterZis = new ZipInputStream(Files.newInputStream(tempFile));
             ZipInputStream saveZis = new ZipInputStream(Files.newInputStream(tempFile))) {
            ZipEntry zipEntry;
            //3. 首次读取并计算初始化参数
            while ((zipEntry = filterZis.getNextEntry()) != null) {
                String entryName = String.join("", File.separator, zipEntry.getName()).replaceAll("\\\\", "/");
                if (entryName.contains(globalProperties.getImagePath().replaceAll("\\\\", "/")))
                    imagesUrls.add(entryName.substring(entryName.lastIndexOf("/") + 1));
                if (entryName.endsWith(".lc")) {
                    StringBuilder sb = new StringBuilder();
                    try (BufferedReader reader = new BufferedReader(
                            new InputStreamReader(new FilterInputStream(filterZis) {
                                @Override
                                public void close() {
                                }
                            }))) {
                        String line;
                        while ((line = reader.readLine()) != null) {
                            sb.append(line);
                        }
                    }
                    dataJson = sb.toString();
                    dependencies = JSON.parseObject(dataJson, ProjectDependenciesDTO.class);
                }
                filterZis.closeEntry();
            }

            //4. 过滤掉系统中已经存在的资源（无需重复上传）
            if (!imagesUrls.isEmpty()) {
                List<ImagePO> imagePOList = imageService.getImages(imagesUrls);
                imagesUrls.removeIf((url) -> imagePOList.stream().anyMatch((po) -> po.getUrl().equals(url)));
            }

            if (dependencies == null)
                throw new RuntimeException("未找到依赖文件");

            //5. 第二次读取压缩包内容，将传入文件存储到系统中并记录
            List<ProjectDependencyItemDTO> imageDepList = dependencies.getImages();
            while ((zipEntry = saveZis.getNextEntry()) != null) {
                String entryName = zipEntry.getName();
                String imageName = imagesUrls.stream().filter(entryName::contains).findFirst().orElse(null);
                if (StringUtils.isNotEmpty(imageName)) {
                    Path imageSavePath = Path.of(globalProperties.getImageAbsolutPath(), imageName);
                    if (!Files.exists(imageSavePath))
                        Files.createDirectories(imageSavePath.getParent());
                    Files.copy(saveZis, imageSavePath, StandardCopyOption.REPLACE_EXISTING);
                    ImagePO imagePO = new ImagePO();
                    imagePO.setUrl(imageName);
                    String depFileName = ProjectUtil.getDepFileName(imageDepList, imageName);
                    if (StringUtils.isNotEmpty(depFileName))
                        imagePO.setName(depFileName);
                    else
                        imagePO.setName(imageName);
                    imageService.createImage(imagePO);
                }
                saveZis.closeEntry();
            }
            // 更新dataJson
            ProjectPO projectPO = new ProjectPO();
            projectPO.setId(importParam.getProjectId());
            projectPO.setDataJson(dependencies.getProjectJson());
            projectMapper.updateById(projectPO);
        } catch (Exception e) {
            log.error("导入失败:{}", e.getMessage(), e);
            throw new RuntimeException("导入失败,失败原因: " + e.getMessage());
        } finally {
            try {
                Files.deleteIfExists(tempFile);
            } catch (IOException e) {
                log.warn("临时文件删除失败: {}", tempFile, e);
            }
        }
        return true;
    }

}
