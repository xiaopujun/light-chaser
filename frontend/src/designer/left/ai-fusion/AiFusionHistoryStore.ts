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

import type {AiFusionHistoryItem, AiFusionOptimizeScene} from "./AiFusionPromptBar.types.ts";
import {isPlainObject} from "./AiFusionCommonUtil.ts";

export type AiFusionHistoryScene = AiFusionOptimizeScene;

const AI_FUSION_HISTORY_STORAGE_KEY = "light-chaser-ai-fusion-history";
const AI_FUSION_HISTORY_LIMIT = 50;
const AI_FUSION_HISTORY_EVENT = "ai-fusion-history-updated";

const AI_FUSION_HISTORY_SCENE_LABEL_MAP: Record<AiFusionHistoryScene, string> = {
    "style-optimize": "样式优化",
    "data-optimize": "数据优化",
};

const AI_FUSION_HISTORY_RESULT_LABEL_MAP: Record<AiFusionHistoryScene, string> = {
    "style-optimize": "样式补丁",
    "data-optimize": "数据补丁",
};

const isAiFusionHistoryScene = (value: unknown): value is AiFusionHistoryScene => {
    return typeof value === "string" && Object.prototype.hasOwnProperty.call(AI_FUSION_HISTORY_SCENE_LABEL_MAP, value);
};

const inferLegacyHistorySuccess = (value: Record<string, any>) => {
    if (typeof value.success === "boolean") {
        return value.success;
    }
    const summary = typeof value.summary === "string" ? value.summary : "";
    const reason = typeof value.reason === "string" ? value.reason : "";
    const content = `${summary}\n${reason}`;
    return !content.includes("无法解析");
};

export const createAiFusionHistoryId = () => {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const getAiFusionHistorySceneLabel = (scene: AiFusionHistoryScene) => {
    return AI_FUSION_HISTORY_SCENE_LABEL_MAP[scene] ?? scene;
};

export const getAiFusionHistoryResultLabel = (scene: AiFusionHistoryScene) => {
    return AI_FUSION_HISTORY_RESULT_LABEL_MAP[scene] ?? "结构化结果";
};

export const supportsAiFusionHistoryAppliedState = (_scene: AiFusionHistoryScene) => {
    return true;
};

export const normalizeAiFusionHistoryItem = (value: unknown): AiFusionHistoryItem | null => {
    if (!isPlainObject(value)) {
        return null;
    }

    const scene = isAiFusionHistoryScene(value.scene) ? value.scene : "style-optimize";
    const normalizedApplied = typeof value.applied === "boolean" ? value.applied : false;

    return {
        id: typeof value.id === "string" ? value.id : createAiFusionHistoryId(),
        time: typeof value.time === "number" ? value.time : Date.now(),
        scene,
        provider: typeof value.provider === "string" ? value.provider : "",
        modelName: typeof value.modelName === "string" ? value.modelName : "",
        componentName: typeof value.componentName === "string" ? value.componentName : "",
        componentType: typeof value.componentType === "string" ? value.componentType : "",
        goal: typeof value.goal === "string" ? value.goal : "",
        summary: typeof value.summary === "string" ? value.summary : "",
        reason: typeof value.reason === "string" ? value.reason : "",
        result: value.result ?? null,
        success: inferLegacyHistorySuccess(value),
        applied: normalizedApplied,
        reply: typeof value.reply === "string" ? value.reply : "",
        reasoningContent: typeof value.reasoningContent === "string" ? value.reasoningContent : "",
        usage: value.usage ?? null,
        baseUrl: typeof value.baseUrl === "string" ? value.baseUrl : "",
    };
};

export const readAiFusionHistoryItems = (): AiFusionHistoryItem[] => {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const raw = window.localStorage.getItem(AI_FUSION_HISTORY_STORAGE_KEY);
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed
            .map((item) => normalizeAiFusionHistoryItem(item))
            .filter((item): item is AiFusionHistoryItem => Boolean(item))
            .slice(0, AI_FUSION_HISTORY_LIMIT);
    } catch {
        return [];
    }
};

const saveAiFusionHistoryItems = (items: AiFusionHistoryItem[]) => {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.localStorage.setItem(
            AI_FUSION_HISTORY_STORAGE_KEY,
            JSON.stringify(items.slice(0, AI_FUSION_HISTORY_LIMIT)),
        );
    } catch {
        // ignore storage failures
    }
};

export const appendAiFusionHistoryItem = (item: AiFusionHistoryItem): AiFusionHistoryItem[] => {
    const nextItems = [item, ...readAiFusionHistoryItems()].slice(0, AI_FUSION_HISTORY_LIMIT);
    saveAiFusionHistoryItems(nextItems);
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(AI_FUSION_HISTORY_EVENT));
    }
    return nextItems;
};

export const AI_FUSION_HISTORY_UPDATED_EVENT = AI_FUSION_HISTORY_EVENT;
