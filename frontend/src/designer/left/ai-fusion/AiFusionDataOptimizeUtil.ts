/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import cloneDeep from "lodash/cloneDeep";
import type {AiDataOptimizePromptRequest, AiDataOptimizeResult, AiDataOptimizeSelectionState, AiDataOptimizeSourceType, AiDataOptimizeTarget, AiDataOptimizeTargetCandidate} from "./AiFusionPromptBar.types.ts";
import {buildSelectionLabel, isPlainObject, parseJsonLike, resolveComponentCandidateBase, stringifyLimited, resolveCurrentSelectionIds} from "./AiFusionCommonUtil.ts";

const ALLOWED_SOURCE_TYPES: Record<AiDataOptimizeSourceType, true> = {
    static: true,
    api: true,
    database: true,
};

const SOURCE_LABEL_MAP: Record<AiDataOptimizeSourceType, string> = {
    static: "静态数据",
    api: "接口(API)",
    database: "数据库",
};

const isAllowedSourceType = (value: unknown): value is AiDataOptimizeSourceType => {
    return typeof value === "string" && Object.prototype.hasOwnProperty.call(ALLOWED_SOURCE_TYPES, value);
};

const normalizeDataPatch = (patch: unknown): Record<string, any> => {
    if (!isPlainObject(patch)) {
        return {};
    }

    const nextPatch: Record<string, any> = {};
    ["sourceType", "staticData", "apiData", "database"].forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(patch, key) && (patch as Record<string, any>)[key] !== undefined) {
            nextPatch[key] = cloneDeep((patch as Record<string, any>)[key]);
        }
    });
    return nextPatch;
};

export const sanitizeDataPatch = (patch: unknown): Record<string, any> => normalizeDataPatch(patch);

export const extractDataOptimizeResult = (value: unknown): AiDataOptimizeResult | null => {
    const parsed = parseJsonLike(value);
    if (!parsed) {
        return null;
    }

    const payload = isPlainObject(parsed.data) ? parsed.data : parsed;
    const rawDataPatch = payload.dataPatch ?? payload.data ?? payload.patch ?? payload;
    const dataPatch = sanitizeDataPatch(rawDataPatch);
    if (Object.keys(dataPatch).length === 0) {
        return null;
    }

    return {
        summary: typeof payload.summary === "string" ? payload.summary : undefined,
        reason: typeof payload.reason === "string" ? payload.reason : undefined,
        sourceType: isAllowedSourceType(payload.sourceType) ? payload.sourceType : undefined,
        dataPatch,
        changedFields: Array.isArray(payload.changedFields)
            ? payload.changedFields.filter((item): item is string => typeof item === "string")
            : undefined,
        targetId: typeof payload.targetId === "string" ? payload.targetId : undefined,
    };
};

const buildDataOptimizeSystemPrompt = () => {
    return [
        "你是一个前端组件数据优化助手。",
        "你只能优化组件已有的数据源配置，不要引入新的数据源类型。",
        "开源版只允许 static / api / database 三种 sourceType。",
        "你必须只输出严格 JSON，不要输出解释、Markdown 或代码块。",
        "返回结构如下：",
        "{",
        '  "summary": "一句话总结",',
        '  "reason": "简短说明为什么这样改",',
        '  "sourceType": "static" | "api" | "database",',
        '  "dataPatch": { ... }',
        "}",
        "如果是 api/database，请优先优化对应配置，并保持或补充 staticData 作为预览数据。",
    ].join("\n");
};

export const resolveSelectedDataOptimizeState = (selectedLayerIds: string[]): AiDataOptimizeSelectionState => {
    const selectedTargetCandidates: AiDataOptimizeTargetCandidate[] = selectedLayerIds.map((id) => {
        const candidate = resolveComponentCandidateBase(id);
        const sourceType = isPlainObject(candidate.data) ? candidate.data?.sourceType : undefined;
        const allowedSourceType = isAllowedSourceType(sourceType) ? sourceType : undefined;
        const sourceLabel = allowedSourceType ? SOURCE_LABEL_MAP[allowedSourceType] : "不支持";
        return {
            id: candidate.id,
            label: candidate.label,
            componentType: candidate.componentType,
            sourceType: allowedSourceType,
            sourceLabel,
            layer: candidate.layer,
            controller: candidate.controller,
            definition: candidate.definition,
            config: candidate.config,
            data: candidate.data,
            currentData: candidate.currentData,
            canOptimize: Boolean(candidate.layer && candidate.controller && candidate.definition && candidate.config && allowedSourceType),
        };
    });

    const optimizableTargets = selectedTargetCandidates.reduce<AiDataOptimizeTarget[]>((acc, item) => {
        if (!item.canOptimize || !item.layer || !item.controller || !item.definition || !item.config || !item.sourceType || !isPlainObject(item.data)) {
            return acc;
        }
        acc.push({
            id: item.id,
            label: item.label,
            componentType: item.componentType,
            sourceType: item.sourceType,
            sourceLabel: item.sourceLabel,
            layer: item.layer,
            controller: item.controller,
            definition: item.definition,
            config: cloneDeep(item.config),
            data: cloneDeep(item.data),
            currentData: cloneDeep(item.currentData ?? item.data.staticData ?? {}),
        });
        return acc;
    }, []);

    const unsupportedTargetLabels = selectedTargetCandidates
        .filter((item) => !item.canOptimize)
        .map((item) => item.label);

    return {
        selectedTargetCandidates,
        optimizableTargets,
        unsupportedTargetLabels,
        selectedComponentLabel: buildSelectionLabel(selectedTargetCandidates.map((item) => item.label)),
        selectedRequestLabel: buildSelectionLabel(optimizableTargets.map((item) => item.label)),
        selectedComponentType: optimizableTargets.length === 1
            ? optimizableTargets[0].componentType
            : "multiple",
        canOptimizeSelected: selectedTargetCandidates.length > 0 && unsupportedTargetLabels.length === 0,
    };
};

export const buildDataOptimizePromptRequest = (
    target: AiDataOptimizeTarget,
    goal: string,
): AiDataOptimizePromptRequest => {
    const systemPrompt = buildDataOptimizeSystemPrompt();
    const userPrompt = [
        `组件名称：${target.label}`,
        `组件类型：${target.componentType}`,
        `当前数据源类型：${target.sourceLabel}`,
        `用户需求：${goal.trim()}`,
        `当前数据配置：${stringifyLimited(target.data)}`,
        `当前数据预览：${stringifyLimited(target.currentData)}`,
        "请只返回 JSON，且只修改 dataPatch，不要改动 base/style/filter/事件/布局。",
        "如果是 api/database，请保持 sourceType 不变，并同时给出可展示的 staticData 预览。",
        "不要引入 excel 或其他不存在的数据源。",
    ].join("\n");

    return {
        target,
        componentName: target.label,
        componentType: target.componentType,
        systemPrompt,
        userPrompt,
    };
};

export const getCurrentDataOptimizeSelectionIds = () => resolveCurrentSelectionIds();
