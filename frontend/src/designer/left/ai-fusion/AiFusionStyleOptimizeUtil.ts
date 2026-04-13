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
import type {AiStyleOptimizePromptRequest, AiStyleOptimizeResult, AiStyleOptimizeSelectionState, AiStyleOptimizeTarget, AiStyleOptimizeTargetCandidate} from "./AiFusionPromptBar.types.ts";
import {buildSelectionLabel, parseJsonLike, resolveComponentCandidateBase, stringifyLimited, isPlainObject, resolveCurrentSelectionIds} from "./AiFusionCommonUtil.ts";

const buildStyleOptimizeSystemPrompt = () => {
    return [
        "你是一个前端组件样式优化助手。",
        "你只能优化组件的 style，不要修改 data、base、filter、事件、蓝图或布局。",
        "你必须只输出严格 JSON，不要输出解释、Markdown 或代码块。",
        "返回结构如下：",
        "{",
        '  "summary": "一句话总结",',
        '  "reason": "简短说明为什么这样改",',
        '  "stylePatch": { ... }',
        "}",
        "stylePatch 应该是可直接合并到当前组件 style 的补丁对象。",
    ].join("\n");
};

const normalizeStylePatch = (patch: unknown): Record<string, any> => {
    if (!isPlainObject(patch)) {
        return {};
    }
    return cloneDeep(patch);
};

export const sanitizeStylePatch = (patch: unknown): Record<string, any> => {
    return normalizeStylePatch(patch);
};

export const extractOptimizeResult = (value: unknown): AiStyleOptimizeResult | null => {
    const parsed = parseJsonLike(value);
    if (!parsed) {
        return null;
    }

    const payload = isPlainObject(parsed.data) ? parsed.data : parsed;
    const rawStylePatch = payload.stylePatch ?? payload.style ?? payload.patch ?? payload.data ?? payload;
    const stylePatch = sanitizeStylePatch(rawStylePatch);
    if (Object.keys(stylePatch).length === 0) {
        return null;
    }

    return {
        summary: typeof payload.summary === "string" ? payload.summary : undefined,
        reason: typeof payload.reason === "string" ? payload.reason : undefined,
        stylePatch,
        changedFields: Array.isArray(payload.changedFields)
            ? payload.changedFields.filter((item): item is string => typeof item === "string")
            : undefined,
        targetId: typeof payload.targetId === "string" ? payload.targetId : undefined,
    };
};

export const resolveSelectedStyleOptimizeState = (selectedLayerIds: string[]): AiStyleOptimizeSelectionState => {
    const selectedTargetCandidates: AiStyleOptimizeTargetCandidate[] = selectedLayerIds.map((id) => {
        const candidate = resolveComponentCandidateBase(id);
        return {
            id: candidate.id,
            label: candidate.label,
            componentType: candidate.componentType,
            layer: candidate.layer,
            controller: candidate.controller,
            definition: candidate.definition,
            config: candidate.config,
            style: candidate.style,
            canOptimize: Boolean(candidate.layer && candidate.controller && candidate.definition && candidate.config),
        };
    });

    const optimizableTargets = selectedTargetCandidates.reduce<AiStyleOptimizeTarget[]>((acc, item) => {
        if (!item.canOptimize || !item.layer || !item.controller || !item.definition || !item.config) {
            return acc;
        }
        acc.push({
            id: item.id,
            label: item.label,
            componentType: item.componentType,
            layer: item.layer,
            controller: item.controller,
            definition: item.definition,
            config: cloneDeep(item.config),
            style: cloneDeep(item.style ?? {}),
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

export const buildStyleOptimizePromptRequest = (
    target: AiStyleOptimizeTarget,
    goal: string,
): AiStyleOptimizePromptRequest => {
    const systemPrompt = buildStyleOptimizeSystemPrompt();
    const userPrompt = [
        `组件名称：${target.label}`,
        `组件类型：${target.componentType}`,
        `用户需求：${goal.trim()}`,
        `当前组件配置：${stringifyLimited({
            base: target.config.base ?? null,
            style: target.style ?? {},
            data: target.config.data ?? null,
            filter: target.config.filter ?? null,
        })}`,
        "请只返回 JSON，且只修改 stylePatch，不要改动 data/base/filter/事件/布局。",
        "如果需要给出建议，请写进 reason，不要输出额外文字。",
    ].join("\n");

    return {
        target,
        componentName: target.label,
        componentType: target.componentType,
        systemPrompt,
        userPrompt,
    };
};

export const stringifyStyleOptimizeResult = (value: unknown) => stringifyLimited(value);

export const getCurrentStyleOptimizeSelectionIds = () => resolveCurrentSelectionIds();
