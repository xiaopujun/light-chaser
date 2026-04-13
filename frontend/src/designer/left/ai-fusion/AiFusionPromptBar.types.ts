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

import {DataConfigType, ILayerItem} from "../../DesignerType.ts";

export type AiFusionOptimizeScene = "style-optimize" | "data-optimize";

export type AiDataOptimizeSourceType = "static" | "api" | "database";

export interface AiFusionModelOption {
    id: string;
    label: string;
    provider: string;
    modelName: string;
    baseUrl?: string;
    isDefault?: boolean;
    enabled?: boolean;
    maxTokens?: number;
    temperature?: number;
    description?: string;
}

export interface AiFusionRunResult {
    modelId: string;
    modelName: string;
    provider: string;
    baseUrl: string;
    scene: AiFusionOptimizeScene;
    prompt: string;
    reply: string;
    reasoningContent?: string | null;
    usage?: Record<string, unknown> | null;
    rawResponse: unknown;
}

export interface AiFusionWorkflowControl {
    signal?: AbortSignal | null;
    isCancelled: () => boolean;
}

export const isAiFusionWorkflowCancelled = (workflowControl?: AiFusionWorkflowControl | null): boolean => {
    return Boolean(workflowControl?.signal?.aborted || workflowControl?.isCancelled?.());
};

export interface AiFusionHistoryItem {
    id: string;
    time: number;
    scene: AiFusionOptimizeScene;
    provider: string;
    modelName: string;
    componentName: string;
    componentType: string;
    goal: string;
    summary: string;
    reason: string;
    result: unknown;
    success: boolean;
    applied?: boolean;
    reply: string;
    reasoningContent: string;
    usage: unknown;
    baseUrl: string;
}

export interface AiStyleOptimizeTargetCandidate {
    id: string;
    label: string;
    componentType: string;
    layer?: ILayerItem;
    controller?: any;
    definition?: any;
    config?: Record<string, any> | null;
    style?: Record<string, any> | null;
    canOptimize: boolean;
}

export interface AiStyleOptimizeTarget {
    id: string;
    label: string;
    componentType: string;
    layer: ILayerItem;
    controller: any;
    definition: any;
    config: Record<string, any>;
    style: Record<string, any>;
}

export interface AiStyleOptimizeSelectionState {
    selectedTargetCandidates: AiStyleOptimizeTargetCandidate[];
    optimizableTargets: AiStyleOptimizeTarget[];
    unsupportedTargetLabels: string[];
    selectedComponentLabel: string;
    selectedRequestLabel: string;
    selectedComponentType: string;
    canOptimizeSelected: boolean;
}

export interface AiStyleOptimizePromptRequest {
    target: AiStyleOptimizeTarget;
    componentName: string;
    componentType: string;
    systemPrompt: string;
    userPrompt: string;
}

export interface AiStyleOptimizeResult {
    summary?: string;
    reason?: string;
    stylePatch?: Record<string, any>;
    changedFields?: string[];
    targetId?: string;
}

export interface AiDataOptimizeTargetCandidate {
    id: string;
    label: string;
    componentType: string;
    sourceType?: AiDataOptimizeSourceType;
    sourceLabel: string;
    layer?: ILayerItem;
    controller?: any;
    definition?: any;
    config?: Record<string, any> | null;
    data?: Record<string, any> | null;
    currentData?: any;
    canOptimize: boolean;
}

export interface AiDataOptimizeTarget {
    id: string;
    label: string;
    componentType: string;
    sourceType: AiDataOptimizeSourceType;
    sourceLabel: string;
    layer: ILayerItem;
    controller: any;
    definition: any;
    config: Record<string, any>;
    data: DataConfigType;
    currentData: any;
}

export interface AiDataOptimizeSelectionState {
    selectedTargetCandidates: AiDataOptimizeTargetCandidate[];
    optimizableTargets: AiDataOptimizeTarget[];
    unsupportedTargetLabels: string[];
    selectedComponentLabel: string;
    selectedRequestLabel: string;
    selectedComponentType: string;
    canOptimizeSelected: boolean;
}

export interface AiDataOptimizePromptRequest {
    target: AiDataOptimizeTarget;
    componentName: string;
    componentType: string;
    systemPrompt: string;
    userPrompt: string;
}

export interface AiDataOptimizeResult {
    summary?: string;
    reason?: string;
    sourceType?: AiDataOptimizeSourceType;
    dataPatch?: Record<string, any>;
    changedFields?: string[];
    targetId?: string;
}
