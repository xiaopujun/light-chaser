package com.dagu.lightchaser.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dagu.lightchaser.config.AiModelProperties;
import com.dagu.lightchaser.global.AppException;
import com.dagu.lightchaser.mapper.AiModelMapper;
import com.dagu.lightchaser.model.dto.AiModelListItemDTO;
import com.dagu.lightchaser.model.dto.AiModelSaveRequest;
import com.dagu.lightchaser.model.dto.AiModelRunRequest;
import com.dagu.lightchaser.model.dto.AiModelRunResponse;
import com.dagu.lightchaser.service.AiModelService;
import com.dagu.lightchaser.model.po.AiModelPO;
import com.dagu.lightchaser.model.query.PageParamQuery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

@Log4j2
@Service
public class AiModelServiceImpl extends ServiceImpl<AiModelMapper, AiModelPO> implements AiModelService {

    private static final String[] ALLOWED_SCENES = new String[]{"style-optimize", "data-optimize"};
    private static final String AI_MODEL_META_KEY = "seeded";

    @Resource
    private AiModelProperties aiModelProperties;

    @Resource
    private ObjectMapper objectMapper;

    @Resource
    private JdbcTemplate jdbcTemplate;

    @Resource
    @Qualifier("aiModelRestTemplate")
    private RestTemplate restTemplate;

    @Override
    public List<AiModelListItemDTO> listModels() {
        ensureSeedModels();
        if (!aiModelProperties.isEnabled()) {
            return List.of();
        }
        return queryEnabledModels().stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public Page<AiModelListItemDTO> pageModels(PageParamQuery pageParam) {
        ensureSeedModels();
        if (pageParam == null) {
            return new Page<>();
        }
        long current = pageParam.getCurrent() == null || pageParam.getCurrent() <= 0 ? 1L : pageParam.getCurrent();
        long size = pageParam.getSize() == null || pageParam.getSize() <= 0 ? 10L : pageParam.getSize();
        Page<AiModelPO> page = new Page<>(current, size);
        LambdaQueryWrapper<AiModelPO> wrapper = buildSearchWrapper(pageParam.getKeywords());
        wrapper.orderByDesc(AiModelPO::getIsDefault)
                .orderByDesc(AiModelPO::getUpdateTime)
                .orderByDesc(AiModelPO::getId);
        Page<AiModelPO> poPage = page(page, wrapper);
        Page<AiModelListItemDTO> result = new Page<>();
        result.setCurrent(poPage.getCurrent());
        result.setSize(poPage.getSize());
        result.setTotal(poPage.getTotal());
        result.setRecords(poPage.getRecords().stream()
                .map(this::toDto)
                .toList());
        return result;
    }

    @Override
    public AiModelListItemDTO getModel(String id) {
        ensureSeedModels();
        AiModelPO model = findModelById(id);
        if (model == null) {
            return null;
        }
        return toDto(model);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createModel(AiModelSaveRequest request) {
        ensureSeedModels();
        AiModelPO model = buildEntityForSave(request, null);
        if (!save(model)) {
            throw new AppException(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "创建 AI 模型失败");
        }
        if (Boolean.TRUE.equals(request != null ? request.getIsDefault() : Boolean.FALSE)) {
            clearDefaultFlagExcept(model.getId());
        }
        return model.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean updateModel(AiModelSaveRequest request) {
        ensureSeedModels();
        Long id = parseId(request == null ? null : request.getId());
        if (id == null) {
            throw new AppException(HttpServletResponse.SC_BAD_REQUEST, "模型ID不能为空");
        }
        AiModelPO current = getById(id);
        if (current == null) {
            throw new AppException(HttpServletResponse.SC_NOT_FOUND, "未找到该 AI 模型");
        }
        AiModelPO next = buildEntityForSave(request, current);
        boolean updated = updateById(next);
        if (!updated) {
            throw new AppException(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "更新 AI 模型失败");
        }
        if (Boolean.TRUE.equals(request != null ? request.getIsDefault() : Boolean.FALSE)) {
            clearDefaultFlagExcept(id);
        }
        return updated;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean copyModel(String id) {
        ensureSeedModels();
        AiModelPO current = findModelById(id);
        if (current == null) {
            throw new AppException(HttpServletResponse.SC_NOT_FOUND, "未找到该 AI 模型");
        }
        Set<String> existingNames = queryAllModelNames();
        AiModelPO copy = cloneModel(current);
        copy.setId(null);
        copy.setName(buildCopyName(current.getName(), existingNames));
        copy.setApiKey(null);
        copy.setEnabled(1);
        copy.setIsDefault(0);
        LocalDateTime now = LocalDateTime.now();
        copy.setCreateTime(now);
        copy.setUpdateTime(now);
        if (!save(copy)) {
            throw new AppException(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "复制 AI 模型失败");
        }
        return true;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean batchDeleteModels(List<String> ids) {
        ensureSeedModels();
        if (ids == null || ids.isEmpty()) {
            return false;
        }
        List<Long> idValues = ids.stream()
                .map(this::parseId)
                .filter(Objects::nonNull)
                .toList();
        if (idValues.isEmpty()) {
            return false;
        }
        boolean removed = removeBatchByIds(idValues);
        if (!removed) {
            throw new AppException(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "删除 AI 模型失败");
        }
        return true;
    }

    @Override
    public AiModelRunResponse run(AiModelRunRequest request) {
        if (request == null) {
            throw new AppException(HttpServletResponse.SC_BAD_REQUEST, "AI 请求参数不能为空");
        }
        if (!aiModelProperties.isEnabled()) {
            throw new AppException(HttpServletResponse.SC_BAD_REQUEST, "AI 功能未启用");
        }
        String scene = normalizeScene(request.getScene());
        if (scene == null) {
            throw new AppException(HttpServletResponse.SC_BAD_REQUEST, "不支持的 AI 场景");
        }
        if (!StringUtils.hasText(request.getPrompt())) {
            throw new AppException(HttpServletResponse.SC_BAD_REQUEST, "AI 提示词不能为空");
        }

        ensureSeedModels();
        AiModelPO model = resolveModelEntity(request.getModelId());
        if (model == null) {
            throw new AppException(HttpServletResponse.SC_BAD_REQUEST, "未找到可用的 AI 模型，请先在模型管理页配置");
        }
        if (!StringUtils.hasText(model.getBaseUrl())) {
            throw new AppException(HttpServletResponse.SC_BAD_REQUEST, "AI 模型基础地址不能为空");
        }
        if (!StringUtils.hasText(model.getModelName())) {
            throw new AppException(HttpServletResponse.SC_BAD_REQUEST, "AI 模型名称不能为空");
        }

        String endpoint = buildEndpoint(model.getBaseUrl(), resolveChatCompletionsPath(model));
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("model", model.getModelName());
        payload.put("messages", List.of(
                Map.of("role", "system", "content", Optional.ofNullable(request.getSystemPrompt()).orElse("")),
                Map.of("role", "user", "content", request.getPrompt())
        ));
        payload.put("temperature", request.getTemperature() != null ? request.getTemperature() : resolveTemperature(model));
        Integer maxTokens = request.getMaxTokens() != null ? request.getMaxTokens() : model.getMaxTokens();
        if (maxTokens != null) {
            payload.put("max_tokens", maxTokens);
        }
        payload.put("stream", false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (StringUtils.hasText(model.getApiKey())) {
            String headerName = resolveApiKeyHeader(model);
            String prefix = resolveApiKeyPrefix(model);
            if (StringUtils.hasText(prefix) && !prefix.endsWith(" ")) {
                prefix = prefix + " ";
            }
            headers.set(headerName, prefix + model.getApiKey().trim());
        }

        ResponseEntity<JsonNode> responseEntity;
        try {
            responseEntity = restTemplate.exchange(
                    endpoint,
                    HttpMethod.POST,
                    new HttpEntity<>(payload, headers),
                    JsonNode.class
            );
        } catch (HttpStatusCodeException e) {
            String message = extractRemoteErrorMessage(e.getResponseBodyAsString());
            log.error("AI 调用失败, endpoint: {}, scene: {}, model: {}", endpoint, scene, model.getModelName(), e);
            throw new AppException(HttpServletResponse.SC_BAD_GATEWAY, "AI 服务调用失败: " + message);
        } catch (ResourceAccessException e) {
            log.error("AI 连接失败, endpoint: {}, scene: {}, model: {}", endpoint, scene, model.getModelName(), e);
            throw new AppException(HttpServletResponse.SC_BAD_GATEWAY, "AI 服务连接失败: " + e.getMessage());
        } catch (Exception e) {
            log.error("AI 调用异常, endpoint: {}, scene: {}, model: {}", endpoint, scene, model.getModelName(), e);
            throw new AppException(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "AI 服务调用异常: " + e.getMessage());
        }

        JsonNode rawResponse = responseEntity.getBody();
        if (rawResponse == null) {
            throw new AppException(HttpServletResponse.SC_BAD_GATEWAY, "AI 服务未返回有效响应");
        }

        String reply = extractReplyText(rawResponse);
        String reasoningContent = extractReasoningContent(rawResponse);
        Map<String, Object> usage = extractUsage(rawResponse);

        AiModelRunResponse response = new AiModelRunResponse();
        response.setModelId(String.valueOf(model.getId()));
        response.setModelName(model.getModelName());
        response.setProvider(model.getProvider());
        response.setBaseUrl(model.getBaseUrl());
        response.setScene(scene);
        response.setPrompt(request.getPrompt());
        response.setReply(reply);
        response.setReasoningContent(reasoningContent);
        response.setUsage(usage);
        response.setRawResponse(rawResponse);
        return response;
    }

    private void ensureSeedModels() {
        if (isSeedInitialized()) {
            return;
        }

        long count = count();
        if (count > 0) {
            markSeedInitialized();
            return;
        }

        List<AiModelPO> seedModels = normalizeModels(aiModelProperties.getModels()).stream()
                .map(this::toSeedEntity)
                .toList();
        if (seedModels.isEmpty()) {
            return;
        }

        saveBatch(seedModels);
        markSeedInitialized();
    }

    private boolean isSeedInitialized() {
        try {
            List<String> values = jdbcTemplate.queryForList(
                    "select meta_value from ai_model_meta where meta_key = ? limit 1",
                    String.class,
                    AI_MODEL_META_KEY
            );
            return !values.isEmpty();
        } catch (Exception e) {
            log.debug("AI 模型初始化标记检查失败: {}", e.getMessage());
            return false;
        }
    }

    private void markSeedInitialized() {
        try {
            jdbcTemplate.update(
                    "insert or replace into ai_model_meta(meta_key, meta_value, update_time) values (?, ?, CURRENT_TIMESTAMP)",
                    AI_MODEL_META_KEY,
                    "true"
            );
        } catch (Exception e) {
            log.warn("写入 AI 模型初始化标记失败: {}", e.getMessage());
        }
    }

    private List<AiModelPO> queryEnabledModels() {
        LambdaQueryWrapper<AiModelPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(AiModelPO::getEnabled, 1)
                .orderByDesc(AiModelPO::getIsDefault)
                .orderByDesc(AiModelPO::getUpdateTime)
                .orderByDesc(AiModelPO::getId);
        return list(wrapper);
    }

    private LambdaQueryWrapper<AiModelPO> buildSearchWrapper(String keywords) {
        LambdaQueryWrapper<AiModelPO> wrapper = new LambdaQueryWrapper<>();
        if (!StringUtils.hasText(keywords)) {
            return wrapper;
        }
        String keyword = keywords.trim();
        wrapper.and(item -> item.like(AiModelPO::getName, keyword)
                .or()
                .like(AiModelPO::getProvider, keyword)
                .or()
                .like(AiModelPO::getModelName, keyword)
                .or()
                .like(AiModelPO::getBaseUrl, keyword)
                .or()
                .like(AiModelPO::getDescription, keyword));
        return wrapper;
    }

    private AiModelPO findModelById(String id) {
        Long modelId = parseId(id);
        if (modelId == null) {
            return null;
        }
        return getById(modelId);
    }

    private AiModelPO resolveModelEntity(String modelId) {
        List<AiModelPO> models = queryEnabledModels();
        if (models.isEmpty()) {
            return null;
        }
        Long id = parseId(modelId);
        if (id != null) {
            for (AiModelPO model : models) {
                if (Objects.equals(model.getId(), id)) {
                    return model;
                }
            }
        }
        for (AiModelPO model : models) {
            if (model.getIsDefault() != null && model.getIsDefault() != 0) {
                return model;
            }
        }
        return models.get(0);
    }

    private AiModelPO buildEntityForSave(AiModelSaveRequest request, AiModelPO source) {
        AiModelPO entity = source == null ? new AiModelPO() : cloneModel(source);
        if (request != null && StringUtils.hasText(request.getId())) {
            entity.setId(parseId(request.getId()));
        }
        entity.setName(resolveTextValue(request == null ? null : request.getName(), source == null ? null : source.getName(), "未命名模型"));
        entity.setProvider(resolveProviderValue(request == null ? null : request.getProvider(), source == null ? null : source.getProvider()));
        entity.setModelName(resolveModelNameValue(request == null ? null : request.getModelName(), source == null ? null : source.getModelName(), entity.getProvider()));
        entity.setBaseUrl(resolveBaseUrlValue(request == null ? null : request.getBaseUrl(), source == null ? null : source.getBaseUrl(), entity.getProvider()));
        entity.setApiKey(resolveApiKeyValue(request, source));
        entity.setApiKeyHeader(resolveTextValue(request == null ? null : request.getApiKeyHeader(), source == null ? null : source.getApiKeyHeader(), "Authorization"));
        entity.setApiKeyPrefix(resolveTextValue(request == null ? null : request.getApiKeyPrefix(), source == null ? null : source.getApiKeyPrefix(), "Bearer"));
        entity.setChatCompletionsPath(resolveTextValue(request == null ? null : request.getChatCompletionsPath(), source == null ? null : source.getChatCompletionsPath(), "/chat/completions"));
        entity.setDescription(request != null && request.getDescription() != null ? request.getDescription().trim() : source == null ? null : source.getDescription());
        entity.setTemperature(resolveTemperatureValue(request == null ? null : request.getTemperature(), source == null ? null : source.getTemperature()));
        entity.setMaxTokens(resolveMaxTokensValue(request == null ? null : request.getMaxTokens(), source == null ? null : source.getMaxTokens()));
        entity.setEnabled(resolveEnabledValue(request == null ? null : request.getEnabled(), source == null ? null : source.getEnabled()));
        entity.setIsDefault(resolveDefaultValue(request == null ? null : request.getIsDefault(), source == null ? null : source.getIsDefault()));
        if (entity.getIsDefault() != null && entity.getIsDefault() != 0) {
            entity.setEnabled(1);
        }
        LocalDateTime now = LocalDateTime.now();
        if (source == null) {
            entity.setCreateTime(now);
        } else {
            entity.setCreateTime(source.getCreateTime());
        }
        entity.setUpdateTime(now);
        return entity;
    }

    private AiModelPO toSeedEntity(AiModelProperties.Model model) {
        AiModelPO entity = new AiModelPO();
        entity.setName(resolveTextValue(model.getLabel(), model.getModelName(), "未命名模型"));
        entity.setProvider(resolveProviderValue(model.getProvider(), null));
        entity.setModelName(resolveTextValue(model.getModelName(), null, resolveDefaultModelName(entity.getProvider())));
        entity.setBaseUrl(resolveTextValue(model.getBaseUrl(), null, resolveDefaultBaseUrl(entity.getProvider())));
        entity.setApiKey(resolveTextValue(model.getApiKey(), null, null));
        entity.setApiKeyHeader(resolveTextValue(model.getApiKeyHeader(), null, "Authorization"));
        entity.setApiKeyPrefix(resolveTextValue(model.getApiKeyPrefix(), null, "Bearer"));
        entity.setChatCompletionsPath(resolveTextValue(model.getChatCompletionsPath(), null, "/chat/completions"));
        entity.setDescription(model.getDescription());
        entity.setTemperature(model.getTemperature() == null ? 0.3 : model.getTemperature());
        entity.setMaxTokens(model.getMaxTokens());
        entity.setEnabled(Boolean.TRUE.equals(model.getEnabled()) ? 1 : 0);
        entity.setIsDefault(Boolean.TRUE.equals(model.getIsDefault()) ? 1 : 0);
        return entity;
    }

    private AiModelPO cloneModel(AiModelPO source) {
        AiModelPO model = new AiModelPO();
        model.setId(source.getId());
        model.setName(source.getName());
        model.setProvider(source.getProvider());
        model.setModelName(source.getModelName());
        model.setBaseUrl(source.getBaseUrl());
        model.setApiKey(source.getApiKey());
        model.setApiKeyHeader(source.getApiKeyHeader());
        model.setApiKeyPrefix(source.getApiKeyPrefix());
        model.setChatCompletionsPath(source.getChatCompletionsPath());
        model.setDescription(source.getDescription());
        model.setTemperature(source.getTemperature());
        model.setMaxTokens(source.getMaxTokens());
        model.setEnabled(source.getEnabled());
        model.setIsDefault(source.getIsDefault());
        model.setCreateTime(source.getCreateTime());
        model.setUpdateTime(source.getUpdateTime());
        model.setDeleted(source.getDeleted());
        return model;
    }

    private Set<String> queryAllModelNames() {
        return list().stream()
                .map(AiModelPO::getName)
                .filter(StringUtils::hasText)
                .map(String::trim)
                .collect(Collectors.toCollection(HashSet::new));
    }

    private Long parseId(String value) {
        if (!StringUtils.hasText(value)) {
            return null;
        }
        try {
            return Long.parseLong(value.trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private String resolveProviderValue(String value, String fallback) {
        String provider = StringUtils.hasText(value) ? value.trim() : null;
        if (provider != null) {
            return provider;
        }
        if (StringUtils.hasText(fallback)) {
            return fallback.trim();
        }
        return "openai-compatible";
    }

    private String resolveDefaultModelName(String provider) {
        return switch (normalizeProviderKey(provider)) {
            case "openai" -> "gpt-4o-mini";
            case "deepseek" -> "deepseek-chat";
            case "ollama" -> "llama3.1";
            default -> "gpt-4o-mini";
        };
    }

    private String resolveDefaultBaseUrl(String provider) {
        return switch (normalizeProviderKey(provider)) {
            case "openai" -> "https://api.openai.com/v1";
            case "deepseek" -> "https://api.deepseek.com";
            case "ollama" -> "http://localhost:11434/v1";
            default -> "https://api.openai.com/v1";
        };
    }

    private String resolveTextValue(String value, String fallback, String defaultValue) {
        if (StringUtils.hasText(value)) {
            return value.trim();
        }
        if (StringUtils.hasText(fallback)) {
            return fallback.trim();
        }
        return defaultValue;
    }

    private String resolveModelNameValue(String value, String fallback, String provider) {
        String modelName = resolveTextValue(value, fallback, null);
        if (StringUtils.hasText(modelName)) {
            return modelName;
        }
        return resolveDefaultModelName(provider);
    }

    private String resolveBaseUrlValue(String value, String fallback, String provider) {
        String baseUrl = resolveTextValue(value, fallback, null);
        if (StringUtils.hasText(baseUrl)) {
            return baseUrl;
        }
        return resolveDefaultBaseUrl(provider);
    }

    private String resolveApiKeyValue(AiModelSaveRequest request, AiModelPO source) {
        if (request == null) {
            return source == null ? null : source.getApiKey();
        }
        if (Boolean.TRUE.equals(request.getClearApiKey())) {
            return null;
        }
        if (StringUtils.hasText(request.getApiKey())) {
            return request.getApiKey().trim();
        }
        if (source != null && StringUtils.hasText(source.getApiKey())) {
            return source.getApiKey();
        }
        return null;
    }

    private Double resolveTemperatureValue(Double value, Double fallback) {
        Double next = value != null ? value : fallback;
        if (next == null || !Double.isFinite(next)) {
            return null;
        }
        double clamped = Math.max(0.0d, Math.min(next, 2.0d));
        return Math.round(clamped * 10.0d) / 10.0d;
    }

    private Integer resolveMaxTokensValue(Integer value, Integer fallback) {
        Integer next = value != null ? value : fallback;
        if (next == null || next <= 0) {
            return null;
        }
        return next;
    }

    private Integer resolveEnabledValue(Boolean value, Integer fallback) {
        if (value != null) {
            return value ? 1 : 0;
        }
        return fallback == null ? 1 : (fallback != 0 ? 1 : 0);
    }

    private Integer resolveDefaultValue(Boolean value, Integer fallback) {
        if (value != null) {
            return value ? 1 : 0;
        }
        return fallback == null ? 0 : (fallback != 0 ? 1 : 0);
    }

    private String resolveApiKeyHeader(AiModelPO model) {
        return StringUtils.hasText(model.getApiKeyHeader()) ? model.getApiKeyHeader().trim() : "Authorization";
    }

    private String resolveApiKeyPrefix(AiModelPO model) {
        return StringUtils.hasText(model.getApiKeyPrefix()) ? model.getApiKeyPrefix().trim() : "Bearer";
    }

    private String resolveChatCompletionsPath(AiModelPO model) {
        return StringUtils.hasText(model.getChatCompletionsPath()) ? model.getChatCompletionsPath().trim() : "/chat/completions";
    }

    private Double resolveTemperature(AiModelPO model) {
        return model.getTemperature() == null ? 0.3d : model.getTemperature();
    }

    private void clearDefaultFlagExcept(Long id) {
        com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper<AiModelPO> updateWrapper =
                new com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper<>();
        updateWrapper.set(AiModelPO::getIsDefault, 0)
                .eq(AiModelPO::getIsDefault, 1);
        if (id != null) {
            updateWrapper.ne(AiModelPO::getId, id);
        }
        update(null, updateWrapper);
    }

    private AiModelListItemDTO toDto(AiModelPO model) {
        AiModelListItemDTO dto = new AiModelListItemDTO();
        dto.setId(model.getId() == null ? null : String.valueOf(model.getId()));
        dto.setName(model.getName());
        dto.setLabel(buildDisplayLabel(model));
        dto.setProvider(model.getProvider());
        dto.setProviderLabel(resolveProviderLabel(model.getProvider()));
        dto.setModelName(model.getModelName());
        dto.setBaseUrl(model.getBaseUrl());
        dto.setApiKeyHeader(model.getApiKeyHeader());
        dto.setApiKeyPrefix(model.getApiKeyPrefix());
        dto.setChatCompletionsPath(model.getChatCompletionsPath());
        dto.setHasApiKey(StringUtils.hasText(model.getApiKey()));
        dto.setEnabled(model.getEnabled() == null ? null : model.getEnabled() != 0);
        dto.setIsDefault(model.getIsDefault() == null ? null : model.getIsDefault() != 0);
        dto.setMaxTokens(model.getMaxTokens());
        dto.setTemperature(model.getTemperature());
        dto.setDescription(model.getDescription());
        dto.setCreateTime(model.getCreateTime() == null ? null : model.getCreateTime().toString());
        dto.setUpdateTime(model.getUpdateTime() == null ? null : model.getUpdateTime().toString());
        return dto;
    }

    private String buildDisplayLabel(AiModelPO model) {
        String name = StringUtils.hasText(model.getName()) ? model.getName().trim() : model.getModelName();
        String providerLabel = resolveProviderLabel(model.getProvider());
        String modelName = StringUtils.hasText(model.getModelName()) ? model.getModelName().trim() : "未配置模型标识";
        String label = name;
        if (StringUtils.hasText(providerLabel) || StringUtils.hasText(modelName)) {
            label += " · " + providerLabel + " / " + modelName;
        }
        if (model.getIsDefault() != null && model.getIsDefault() != 0) {
            label += "（默认）";
        }
        return label;
    }

    private String resolveProviderLabel(String provider) {
        String normalized = normalizeProviderKey(provider);
        if (normalized == null) {
            return StringUtils.hasText(provider) ? provider.trim() : "OpenAI 兼容";
        }
        return switch (normalized) {
            case "openai" -> "OpenAI";
            case "deepseek" -> "DeepSeek";
            case "ollama" -> "Ollama";
            default -> "OpenAI 兼容";
        };
    }

    private String normalizeProviderKey(String provider) {
        if (!StringUtils.hasText(provider)) {
            return "openai-compatible";
        }
        String normalized = provider.trim().toLowerCase();
        return switch (normalized) {
            case "openai" -> "openai";
            case "deepseek" -> "deepseek";
            case "ollama" -> "ollama";
            case "compatible", "openai-compatible", "custom" -> "openai-compatible";
            default -> normalized;
        };
    }

    private String buildCopyName(String sourceName, Set<String> existingNames) {
        String baseName = StringUtils.hasText(sourceName) ? sourceName.trim() : "未命名模型";
        String normalizedBaseName = baseName.endsWith("（副本）")
                ? baseName.substring(0, baseName.length() - "（副本）".length()).trim()
                : baseName;
        if (!StringUtils.hasText(normalizedBaseName)) {
            normalizedBaseName = "未命名模型";
        }
        String nextName = normalizedBaseName + "（副本）";
        int index = 2;
        while (existingNames.contains(nextName)) {
            nextName = normalizedBaseName + "（副本" + index + "）";
            index++;
        }
        return nextName;
    }

    private List<AiModelProperties.Model> normalizeModels(List<AiModelProperties.Model> models) {
        if (models == null || models.isEmpty()) {
            return List.of();
        }
        List<AiModelProperties.Model> result = new ArrayList<>();
        for (AiModelProperties.Model model : models) {
            if (model == null || !Boolean.TRUE.equals(model.getEnabled())) {
                continue;
            }
            if (!StringUtils.hasText(model.getId())) {
                continue;
            }
            result.add(model);
        }
        result.sort(Comparator.comparing((AiModelProperties.Model item) -> !Boolean.TRUE.equals(item.getIsDefault()))
                .thenComparing(
                        item -> Optional.ofNullable(item.getLabel())
                                .filter(StringUtils::hasText)
                                .orElse(Optional.ofNullable(item.getModelName()).orElse("")),
                        String.CASE_INSENSITIVE_ORDER
                )
        );
        return result;
    }

    private AiModelProperties.Model resolveModel(String modelId) {
        List<AiModelProperties.Model> models = normalizeModels(aiModelProperties.getModels());
        if (models.isEmpty()) {
            return null;
        }
        if (StringUtils.hasText(modelId)) {
            for (AiModelProperties.Model model : models) {
                if (modelId.trim().equals(model.getId())) {
                    return model;
                }
            }
        }
        for (AiModelProperties.Model model : models) {
            if (Boolean.TRUE.equals(model.getIsDefault())) {
                return model;
            }
        }
        return models.get(0);
    }

    private AiModelListItemDTO toDto(AiModelProperties.Model model) {
        AiModelListItemDTO dto = new AiModelListItemDTO();
        dto.setId(model.getId());
        dto.setLabel(StringUtils.hasText(model.getLabel()) ? model.getLabel() : model.getModelName());
        dto.setProvider(model.getProvider());
        dto.setModelName(model.getModelName());
        dto.setBaseUrl(model.getBaseUrl());
        dto.setEnabled(model.getEnabled());
        dto.setIsDefault(model.getIsDefault());
        dto.setMaxTokens(model.getMaxTokens());
        dto.setTemperature(model.getTemperature());
        dto.setDescription(model.getDescription());
        return dto;
    }

    private String normalizeScene(String scene) {
        if (!StringUtils.hasText(scene)) {
            return null;
        }
        String normalized = scene.trim().toLowerCase();
        for (String allowedScene : ALLOWED_SCENES) {
            if (Objects.equals(allowedScene, normalized)) {
                return allowedScene;
            }
        }
        return null;
    }

    private String buildEndpoint(String baseUrl, String path) {
        String normalizedBaseUrl = baseUrl.trim();
        String normalizedPath = StringUtils.hasText(path) ? path.trim() : "/chat/completions";
        if (!normalizedBaseUrl.endsWith("/")) {
            normalizedBaseUrl = normalizedBaseUrl + "/";
        }
        if (normalizedPath.startsWith("/")) {
            normalizedPath = normalizedPath.substring(1);
        }
        return normalizedBaseUrl + normalizedPath;
    }

    private String extractReplyText(JsonNode rawResponse) {
        JsonNode choicesNode = rawResponse.path("choices");
        if (choicesNode.isArray() && !choicesNode.isEmpty()) {
            JsonNode firstChoice = choicesNode.get(0);
            JsonNode messageNode = firstChoice.path("message");
            if (messageNode.isObject()) {
                JsonNode contentNode = messageNode.path("content");
                if (!contentNode.isMissingNode() && !contentNode.isNull()) {
                    if (contentNode.isTextual()) {
                        return contentNode.asText();
                    }
                    return contentNode.toString();
                }
            }
            JsonNode textNode = firstChoice.path("text");
            if (textNode.isTextual()) {
                return textNode.asText();
            }
        }
        JsonNode outputText = rawResponse.path("output_text");
        if (outputText.isTextual()) {
            return outputText.asText();
        }
        JsonNode content = rawResponse.path("content");
        if (content.isTextual()) {
            return content.asText();
        }
        return rawResponse.toString();
    }

    private String extractReasoningContent(JsonNode rawResponse) {
        JsonNode choicesNode = rawResponse.path("choices");
        if (choicesNode.isArray() && !choicesNode.isEmpty()) {
            JsonNode firstChoice = choicesNode.get(0);
            JsonNode messageNode = firstChoice.path("message");
            if (messageNode.isObject()) {
                JsonNode reasoningNode = messageNode.path("reasoning_content");
                if (reasoningNode.isTextual()) {
                    return reasoningNode.asText();
                }
            }
            JsonNode reasoningNode = firstChoice.path("reasoning_content");
            if (reasoningNode.isTextual()) {
                return reasoningNode.asText();
            }
        }
        JsonNode reasoningContent = rawResponse.path("reasoning_content");
        if (reasoningContent.isTextual()) {
            return reasoningContent.asText();
        }
        return null;
    }

    private Map<String, Object> extractUsage(JsonNode rawResponse) {
        JsonNode usageNode = rawResponse.path("usage");
        if (usageNode == null || usageNode.isMissingNode() || usageNode.isNull()) {
            return null;
        }
        try {
            return objectMapper.convertValue(usageNode, new TypeReference<Map<String, Object>>() {
            });
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    private String extractRemoteErrorMessage(String responseBody) {
        if (!StringUtils.hasText(responseBody)) {
            return "未知错误";
        }
        try {
            JsonNode errorNode = objectMapper.readTree(responseBody).path("error");
            if (errorNode.isObject()) {
                JsonNode messageNode = errorNode.path("message");
                if (messageNode.isTextual()) {
                    return messageNode.asText();
                }
            }
            JsonNode messageNode = objectMapper.readTree(responseBody).path("message");
            if (messageNode.isTextual()) {
                return messageNode.asText();
            }
        } catch (JsonProcessingException ignored) {
            // ignore
        }
        return responseBody;
    }
}
