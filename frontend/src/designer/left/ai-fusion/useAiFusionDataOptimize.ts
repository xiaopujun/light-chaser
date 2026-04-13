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

import {useEffect, useRef, useState} from "react";
import cloneDeep from "lodash/cloneDeep";
import ObjectUtil from "../../../utils/ObjectUtil.ts";
import FetchUtil from "../../../utils/FetchUtil.ts";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import rightStore from "../../right/RightStore.ts";
import type {AiDataOptimizeTarget, AiFusionModelOption, AiFusionRunResult, AiFusionWorkflowControl} from "./AiFusionPromptBar.types.ts";
import {appendAiFusionHistoryItem, createAiFusionHistoryId} from "./AiFusionHistoryStore.ts";
import {buildDataOptimizePromptRequest, extractDataOptimizeResult, resolveSelectedDataOptimizeState} from "./AiFusionDataOptimizeUtil.ts";
import {getCurrentDataOptimizeSelectionIds} from "./AiFusionDataOptimizeUtil.ts";

export const useAiFusionDataOptimize = (
    selectedModelId: string,
    selectedModel?: AiFusionModelOption,
) => {
    const [sending, setSending] = useState(false);
    const mountedRef = useRef(true);

    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const selectedLayerIds = getCurrentDataOptimizeSelectionIds();
    const selectionState = resolveSelectedDataOptimizeState(selectedLayerIds);

    const optimizeSelectedData = async (rawGoal: string, workflowControl?: AiFusionWorkflowControl) => {
        const goal = rawGoal.trim();
        if (!goal) {
            globalMessage.messageApi?.warning("请输入想要优化的数据目标");
            return;
        }
        if (selectionState.selectedTargetCandidates.length === 0) {
            globalMessage.messageApi?.warning("请先选中一个或多个支持数据优化的组件");
            return;
        }
        if (selectionState.unsupportedTargetLabels.length > 0 || selectionState.optimizableTargets.length === 0) {
            globalMessage.messageApi?.warning(`以下组件暂不支持数据优化：${selectionState.unsupportedTargetLabels.join("、")}`);
            return;
        }
        if (!selectedModelId) {
            globalMessage.messageApi?.warning("请先选择一个可用模型");
            return;
        }
        if (sending) {
            return;
        }
        if (workflowControl?.isCancelled?.() || workflowControl?.signal?.aborted) {
            return;
        }

        const requestCount = selectionState.optimizableTargets.length;

        setSending(true);

        try {
            const historyId = createAiFusionHistoryId();
            const historyTime = Date.now();
            let resolvedProvider = selectedModel?.provider || "未知供应商";
            let resolvedModelName = selectedModel?.modelName || "未知模型";
            let resolvedBaseUrl = selectedModel?.baseUrl || "";
            const appliedItems: Array<{
                target: AiDataOptimizeTarget;
                dataPatch: Record<string, any>;
                summary?: string;
                reason?: string;
                reply: string;
                reasoningContent?: string;
                usage?: Record<string, unknown> | null;
                rawResponse: unknown;
            }> = [];
            const batchReplies: string[] = [];
            const batchReasoningContents: string[] = [];
            const batchSummaries: string[] = [];
            const batchReasons: string[] = [];
            const batchUsageItems: Array<{
                batchIndex: number;
                targetId: string;
                componentName: string;
                usage?: Record<string, unknown> | null;
            }> = [];

            for (const [index, target] of selectionState.optimizableTargets.entries()) {
                if (workflowControl?.isCancelled?.() || workflowControl?.signal?.aborted) {
                    return;
                }

                const request = buildDataOptimizePromptRequest(target, goal);
                const response = await FetchUtil.post(
                    "/api/aiModel/run",
                    {
                        modelId: selectedModelId,
                        scene: "data-optimize",
                        prompt: request.userPrompt,
                        systemPrompt: request.systemPrompt,
                    },
                    {
                        loadingText: requestCount > 1
                            ? `AI 正在运行（${index + 1}/${requestCount}），正在请求模型...`
                            : "AI 正在运行，正在请求模型...",
                        signal: workflowControl?.signal ?? undefined,
                    },
                );

                if (!response || response.code !== 200) {
                    globalMessage.messageApi?.warning(response?.msg || "模型调用失败");
                    return;
                }

                const result = response.data as AiFusionRunResult | null;
                if (result == null) {
                    return;
                }
                if (workflowControl?.isCancelled?.() || workflowControl?.signal?.aborted) {
                    return;
                }

                resolvedProvider = result.provider || resolvedProvider;
                resolvedModelName = result.modelName || resolvedModelName;
                resolvedBaseUrl = result.baseUrl || resolvedBaseUrl;

                const replyText = result.reply?.trim() || JSON.stringify(result.rawResponse, null, 2) || "模型未返回可识别的文本内容。";
                batchReplies.push(replyText);
                if (result.reasoningContent?.trim()) {
                    batchReasoningContents.push(result.reasoningContent.trim());
                }
                batchUsageItems.push({
                    batchIndex: index + 1,
                    targetId: target.id,
                    componentName: target.label,
                    usage: result.usage,
                });

                const parsed = extractDataOptimizeResult(replyText);
                if (!parsed) {
                    appendAiFusionHistoryItem({
                        id: historyId,
                        time: historyTime,
                        scene: "data-optimize",
                        provider: resolvedProvider,
                        modelName: resolvedModelName,
                        componentName: selectionState.selectedRequestLabel,
                        componentType: selectionState.selectedComponentType,
                        goal,
                        summary: "模型返回内容无法解析为数据补丁",
                        reason: "",
                        result: null,
                        success: false,
                        applied: false,
                        reply: batchReplies.join("\n\n"),
                        reasoningContent: batchReasoningContents.join("\n\n"),
                        usage: batchUsageItems.length > 0 ? {batches: batchUsageItems} : null,
                        baseUrl: resolvedBaseUrl,
                    });
                    globalMessage.messageApi?.warning(`第 ${index + 1} 个组件的模型返回内容无法解析为数据补丁`);
                    return;
                }

                if (parsed.summary?.trim()) {
                    batchSummaries.push(
                        selectionState.optimizableTargets.length > 1
                            ? `${target.label}：${parsed.summary.trim()}`
                            : parsed.summary.trim(),
                    );
                }
                if (parsed.reason?.trim()) {
                    batchReasons.push(
                        selectionState.optimizableTargets.length > 1
                            ? `[${target.label}] ${parsed.reason.trim()}`
                            : parsed.reason.trim(),
                    );
                }

                    appliedItems.push({
                        target,
                        dataPatch: cloneDeep(parsed.dataPatch ?? {}),
                        summary: parsed.summary,
                        reason: parsed.reason,
                        reply: replyText,
                        reasoningContent: result.reasoningContent?.trim() || "",
                        usage: result.usage,
                        rawResponse: result.rawResponse,
                    });
                }

            if (workflowControl?.isCancelled?.() || workflowControl?.signal?.aborted) {
                return;
            }

            const historyResult = appliedItems.length === 1
                ? {
                    dataPatch: cloneDeep(appliedItems[0].dataPatch),
                }
                : {
                    componentPatches: appliedItems.map((item) => ({
                        targetId: item.target.id,
                        componentName: item.target.label,
                        componentType: item.target.componentType,
                        sourceType: item.target.sourceType,
                        dataPatch: cloneDeep(item.dataPatch),
                        summary: item.summary,
                        reason: item.reason,
                    })),
                };

            const summary = batchSummaries.join("；") || "模型返回了空的数据补丁";
            const reason = batchReasons.join("\n\n");

            if (appliedItems.length === 0) {
                appendAiFusionHistoryItem({
                    id: historyId,
                    time: historyTime,
                    scene: "data-optimize",
                    provider: resolvedProvider,
                    modelName: resolvedModelName,
                    componentName: selectionState.selectedRequestLabel,
                    componentType: selectionState.selectedComponentType,
                    goal,
                    summary,
                    reason,
                    result: historyResult,
                    success: true,
                    applied: false,
                    reply: batchReplies.join("\n\n"),
                    reasoningContent: batchReasoningContents.join("\n\n"),
                    usage: batchUsageItems.length > 0 ? {batches: batchUsageItems} : null,
                    baseUrl: resolvedBaseUrl,
                });
                globalMessage.messageApi?.warning(selectionState.optimizableTargets.length > 1
                    ? "所有组件都已请求完成，但模型返回的数据补丁为空或未命中当前选中组件"
                    : "模型返回了空的数据补丁");
                return;
            }

            appliedItems.forEach((item) => {
                if (workflowControl?.isCancelled?.() || workflowControl?.signal?.aborted) {
                    return;
                }

                const currentDataConfig = cloneDeep(item.target.data ?? {});
                const nextData = ObjectUtil.merge(currentDataConfig, cloneDeep(item.dataPatch));
                nextData.sourceType = item.target.sourceType;
                if (item.target.sourceType === "static") {
                    if (!Object.prototype.hasOwnProperty.call(nextData, "staticData") || nextData.staticData === undefined) {
                        nextData.staticData = cloneDeep(item.target.currentData ?? {});
                    }
                } else if (!Object.prototype.hasOwnProperty.call(nextData, "staticData") || nextData.staticData === undefined) {
                    nextData.staticData = cloneDeep(item.target.currentData ?? {});
                }

                item.target.controller.update({data: cloneDeep(nextData)} as any, {reRender: true});
                if (Object.prototype.hasOwnProperty.call(nextData, "staticData") && nextData.staticData !== undefined) {
                    item.target.controller.changeData(cloneDeep(nextData.staticData));
                }
                if (rightStore.visible && rightStore.activeElem.id === item.target.id) {
                    rightStore.activeConfig(item.target.id, item.target.componentType);
                }
            });

            appendAiFusionHistoryItem({
                id: historyId,
                time: historyTime,
                scene: "data-optimize",
                provider: resolvedProvider,
                modelName: resolvedModelName,
                componentName: selectionState.selectedRequestLabel,
                componentType: selectionState.selectedComponentType,
                goal,
                summary,
                reason,
                result: historyResult,
                success: true,
                applied: true,
                reply: batchReplies.join("\n\n"),
                reasoningContent: batchReasoningContents.join("\n\n"),
                usage: batchUsageItems.length === 1 ? batchUsageItems[0].usage ?? batchUsageItems[0] : {batches: batchUsageItems},
                baseUrl: resolvedBaseUrl,
            });

            globalMessage.messageApi?.success(
                selectionState.optimizableTargets.length > 1
                    ? `已按组件逐个应用到 ${selectionState.selectedRequestLabel}，并已更新数据配置`
                    : `已应用到 ${selectionState.selectedRequestLabel}，并已更新数据配置`,
            );
        } finally {
            if (mountedRef.current) {
                setSending(false);
            }
        }
    };

    return {
        ...selectionState,
        sending,
        optimizeSelectedData,
    };
};
