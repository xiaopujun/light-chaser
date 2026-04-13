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

import {Brain, Close, History, Send, Square} from "@icon-park/react";
import {Button, Input, Select, Spin, Space, Tag, type InputRef} from "antd";
import {observer} from "mobx-react";
import {useEffect, useRef, useState} from "react";
import {AiFusionHistoryModal} from "./AiFusionHistoryModal.tsx";
import type {AiFusionOptimizeScene, AiFusionWorkflowControl} from "./AiFusionPromptBar.types.ts";
import DraggableProvider from "../../../framework/draggable/DraggableProvider.ts";
import {useAiFusionModelOptions} from "./useAiFusionModelOptions.ts";
import {useAiFusionStyleOptimize} from "./useAiFusionStyleOptimize.ts";
import {useAiFusionDataOptimize} from "./useAiFusionDataOptimize.ts";
import "./AiFusionPromptBar.less";

const AI_FUSION_META: Record<AiFusionOptimizeScene, {
    title: string;
    subtitle: string;
    placeholder: string;
    emptyText: string;
    unsupportedText: string;
    tip: string;
}> = {
    "style-optimize": {
        title: "AI 样式优化",
        subtitle: "只调整已选组件的视觉样式，不改变业务功能",
        placeholder: "例如：让卡片更克制，增加留白并强化选中态",
        emptyText: "请先选中组件，AI 会基于当前样式直接优化",
        unsupportedText: "当前选中组件暂不支持样式优化",
        tip: "AI 只会修改 style，不会改动数据源或布局逻辑",
    },
    "data-optimize": {
        title: "AI 数据优化",
        subtitle: "仅优化已存在的数据源：静态数据、接口数据或数据库 SQL",
        placeholder: "例如：补充示例数据，或把表格 SQL 改得更适合展示",
        emptyText: "请先选中组件，AI 会基于当前数据源直接优化",
        unsupportedText: "当前选中组件暂不支持数据优化",
        tip: "AI 只会优化已有数据源，不会新增 excel 或其他数据源",
    },
};

interface AiFusionPromptBarProps {
    open: boolean;
    onClose: () => void;
}

const AiFusionPromptBar = observer((props: AiFusionPromptBarProps) => {
    const {open, onClose} = props;
    const [mounted, setMounted] = useState(open);
    const [visible, setVisible] = useState(open);
    const [content, setContent] = useState("");
    const [historyVisible, setHistoryVisible] = useState(false);
    const [workflowStatus, setWorkflowStatus] = useState<"idle" | "running" | "stopping">("idle");
    const [mode, setMode] = useState<AiFusionOptimizeScene>("style-optimize");
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const draggableProviderRef = useRef<DraggableProvider | null>(null);
    const workflowAbortControllerRef = useRef<AbortController | null>(null);
    const workflowCancelledRef = useRef(false);
    const closeTimerRef = useRef<number | null>(null);
    const enterFrameRef = useRef<number | null>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const workflowControl: AiFusionWorkflowControl = {
        get signal() {
            return workflowAbortControllerRef.current?.signal ?? null;
        },
        isCancelled: () => workflowCancelledRef.current || workflowAbortControllerRef.current?.signal?.aborted === true,
    };

    const beginWorkflow = () => {
        workflowCancelledRef.current = false;
        workflowAbortControllerRef.current?.abort();
        workflowAbortControllerRef.current = new AbortController();
        setWorkflowStatus("running");
    };

    const terminateWorkflow = () => {
        if (workflowStatus !== "running") {
            return;
        }
        workflowCancelledRef.current = true;
        workflowAbortControllerRef.current?.abort();
        setWorkflowStatus("stopping");
    };

    const {
        modelOptions,
        selectedModelId,
        setSelectedModelId,
        modelsLoading,
        selectedModel,
    } = useAiFusionModelOptions(open);
    const styleOptimize = useAiFusionStyleOptimize(selectedModelId, selectedModel);
    const dataOptimize = useAiFusionDataOptimize(selectedModelId, selectedModel);
    const currentOptimize = mode === "style-optimize" ? styleOptimize : dataOptimize;
    const currentMeta = AI_FUSION_META[mode];
    const currentCount = currentOptimize.selectedTargetCandidates.length;
    const selectedContextTag = currentCount > 0
        ? (currentOptimize.canOptimizeSelected
            ? (currentCount > 1 ? `已选 ${currentCount} 个组件` : "当前选中")
            : currentOptimize.unsupportedTargetLabels.length > 0
                ? currentOptimize.unsupportedTargetLabels.join("、")
                : currentMeta.unsupportedText)
        : null;
    const selectedContextSummary = currentCount > 0
        ? (currentOptimize.canOptimizeSelected
            ? currentOptimize.selectedRequestLabel
            : currentOptimize.unsupportedTargetLabels.length > 0
                ? `以下组件暂不支持${mode === "style-optimize" ? "样式" : "数据"}优化：${currentOptimize.unsupportedTargetLabels.join("、")}`
                : currentMeta.unsupportedText)
        : currentMeta.emptyText;
    const selectedSourceLabel = mode === "data-optimize"
        ? dataOptimize.selectedTargetCandidates[0]?.sourceLabel
        : "";
    const isWorkflowActive = workflowStatus !== "idle";
    const isWorkflowStopping = workflowStatus === "stopping";
    const isOptimizing = styleOptimize.sending || dataOptimize.sending;
    const isWorkflowBusy = isOptimizing || isWorkflowStopping;
    const workflowBannerText = isWorkflowStopping
        ? "AI 正在终止当前任务..."
        : currentOptimize.optimizableTargets.length > 1
            ? `AI 正在运行，正在逐个处理 ${currentOptimize.optimizableTargets.length} 个组件...`
            : "AI 正在运行，请稍候...";
    const runButtonLabel = isWorkflowActive ? (isWorkflowStopping ? "终止中" : "终止") : "执行";
    const runButtonIcon = isWorkflowActive
        ? <Square size={14} strokeWidth={3}/>
        : <Send theme="outline" size={14} fill="currentColor"/>;
    const runButtonClassName = `ai-fusion-send-button ${isWorkflowActive ? "is-running" : "is-idle"} ${isWorkflowStopping ? "is-stopping" : ""}`;
    const runButtonDisabled = isWorkflowStopping
        || (!isWorkflowActive && (modelsLoading || modelOptions.length === 0 || isOptimizing || !content.trim() || !selectedModelId));
    const inputPlaceholder = currentMeta.placeholder;

    useEffect(() => {
        let active = true;

        if (closeTimerRef.current !== null) {
            window.clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        if (enterFrameRef.current !== null) {
            cancelAnimationFrame(enterFrameRef.current);
            enterFrameRef.current = null;
        }

        if (open) {
            setMounted(true);
            enterFrameRef.current = requestAnimationFrame(() => {
                enterFrameRef.current = requestAnimationFrame(() => {
                    if (!active) {
                        return;
                    }
                    setVisible(true);
                    inputRef.current?.focus();
                });
            });
        } else if (mounted) {
            setVisible(false);
            setHistoryVisible(false);
            closeTimerRef.current = window.setTimeout(() => {
                setMounted(false);
            }, 320);
        }

        return () => {
            active = false;
            if (closeTimerRef.current !== null) {
                window.clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
            }
            if (enterFrameRef.current !== null) {
                cancelAnimationFrame(enterFrameRef.current);
                enterFrameRef.current = null;
            }
        };
    }, [mounted]);

    useEffect(() => {
        if (!mounted || typeof window === "undefined") {
            return;
        }

        const panelElement = panelRef.current;
        const headerElement = headerRef.current;
        if (!panelElement || !headerElement) {
            return;
        }

        const draggableProvider = new DraggableProvider({
            enabled: open,
            edgeGap: 12,
            ignoreSelector: "button, input, textarea, select, option, a, [role='button'], .ant-btn, .ant-select, .ant-input",
            defaultPosition: (target) => ({
                x: Math.max(12, (window.innerWidth - (target.offsetWidth || target.getBoundingClientRect().width)) / 2),
                y: Math.max(12, window.innerHeight - (target.offsetHeight || target.getBoundingClientRect().height) - 50),
            }),
            onDragStart: () => setIsDragging(true),
            onDragEnd: () => setIsDragging(false),
        });

        draggableProvider.attach({
            target: panelElement,
            handle: headerElement,
        });
        draggableProviderRef.current = draggableProvider;

        return () => {
            draggableProvider.destroy();
            if (draggableProviderRef.current === draggableProvider) {
                draggableProviderRef.current = null;
            }
        };
    }, [mounted, open]);

    useEffect(() => {
        draggableProviderRef.current?.setEnabled(open);
        if (!open) {
            setIsDragging(false);
        }
    }, [open]);

    if (!mounted) {
        return null;
    }

    const handleSubmit = async () => {
        if (isWorkflowActive) {
            terminateWorkflow();
            return;
        }
        const goal = content.trim();
        if (!goal) {
            return;
        }
        if (!selectedModelId) {
            return;
        }

        beginWorkflow();
        try {
            if (mode === "style-optimize") {
                await styleOptimize.optimizeSelectedStyle(goal, workflowControl);
            } else {
                await dataOptimize.optimizeSelectedData(goal, workflowControl);
            }
        } finally {
            if (mountedRef.current) {
                setWorkflowStatus("idle");
                workflowCancelledRef.current = false;
                workflowAbortControllerRef.current = null;
            }
        }
    };

    return (
        <>
            <div className={`ai-fusion-stage ${visible ? "is-open" : "is-closing"}`}>
                <div
                    ref={panelRef}
                    className="ai-fusion-input-layer"
                >
                    <div className={`ai-fusion-card-frame ${visible ? "is-open" : "is-closing"}`}>
                        <div className="ai-fusion-card">
                            <div
                                ref={headerRef}
                                className={`ai-fusion-card-header ${isDragging ? "is-dragging" : ""}`}
                            >
                                <div className="ai-fusion-card-title-group">
                                    <div className="ai-fusion-card-icon">
                                        <Brain theme="filled" size={16} strokeWidth={2} strokeLinecap="square"/>
                                    </div>
                                    <div className="ai-fusion-card-copy">
                                        <div className="ai-fusion-card-title">{currentMeta.title}</div>
                                        <div className="ai-fusion-card-subtitle">{currentMeta.subtitle}</div>
                                    </div>
                                </div>
                                <div className="ai-fusion-card-actions">
                                    <Button
                                        className="ai-fusion-card-action ai-fusion-card-history"
                                        type="text"
                                        size="small"
                                        icon={<History size={14} strokeWidth={3}/>}
                                        aria-label="AI 历史记录"
                                        title="AI 历史记录"
                                        onClick={() => setHistoryVisible(true)}
                                    />
                                    <Button
                                        className="ai-fusion-card-action ai-fusion-card-close"
                                        type="text"
                                        size="small"
                                        icon={<Close size={14} strokeWidth={3}/>}
                                        aria-label="关闭"
                                        title="关闭"
                                        onClick={onClose}
                                    />
                                </div>
                            </div>

                            <div className="ai-fusion-card-context">
                                {currentCount > 0 ? (
                                    <>
                                        <Tag color={currentOptimize.canOptimizeSelected ? "blue" : "warning"}>
                                            {selectedContextTag}
                                        </Tag>
                                        <span className="ai-fusion-card-context-name">
                                            {currentOptimize.selectedComponentLabel}
                                        </span>
                                        {selectedSourceLabel ? (
                                            <Tag color="cyan">{selectedSourceLabel}</Tag>
                                        ) : null}
                                        <span className="ai-fusion-card-context-summary">
                                            {selectedContextSummary}
                                        </span>
                                    </>
                                ) : (
                                    <span className="ai-fusion-card-context-empty">
                                        {currentMeta.emptyText}
                                    </span>
                                )}
                            </div>

                            <div className="ai-fusion-mode-switch">
                                <Button
                                    className={`ai-fusion-mode-button ${mode === "style-optimize" ? "is-active" : ""}`}
                                    type="text"
                                    onClick={() => setMode("style-optimize")}
                                >
                                    样式优化
                                </Button>
                                <Button
                                    className={`ai-fusion-mode-button ${mode === "data-optimize" ? "is-active" : ""}`}
                                    type="text"
                                    onClick={() => setMode("data-optimize")}
                                >
                                    数据优化
                                </Button>
                            </div>

                            {isWorkflowBusy ? (
                                <div
                                    className={`ai-fusion-running-banner ${isWorkflowStopping ? "is-stopping" : ""}`}
                                    role="status"
                                    aria-live="polite"
                                >
                                    <Spin
                                        size="small"
                                        style={{color: isWorkflowStopping ? "#FF8DA0" : "#7EBBFF"}}
                                    />
                                    <span>{workflowBannerText}</span>
                                </div>
                            ) : null}

                            <Space.Compact className="ai-fusion-input-shell" block>
                                <Select
                                    className="ai-fusion-input-model"
                                    size="large"
                                    value={selectedModelId || undefined}
                                    options={modelOptions.map((item) => ({
                                        label: item.label,
                                        value: item.id,
                                    }))}
                                    popupClassName="ai-fusion-model-popup"
                                    loading={modelsLoading}
                                    notFoundContent={modelsLoading ? <Spin size="small"/> : "暂无可用模型"}
                                    placeholder="请选择模型"
                                    onChange={setSelectedModelId}
                                    disabled={modelsLoading || modelOptions.length === 0 || isWorkflowBusy}
                                />
                                <Input
                                    ref={inputRef}
                                    className="ai-fusion-input-content"
                                    size="large"
                                    value={content}
                                    placeholder={inputPlaceholder}
                                    onChange={(event) => setContent(event.target.value)}
                                    onPressEnter={handleSubmit}
                                    onKeyDown={(event) => {
                                        if (event.key === "Escape") {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            onClose();
                                        }
                                    }}
                                    disabled={isWorkflowBusy}
                                />
                                <Button
                                    className={runButtonClassName}
                                    size="large"
                                    type="primary"
                                    danger={isWorkflowActive}
                                    loading={isWorkflowStopping}
                                    disabled={runButtonDisabled}
                                    icon={runButtonIcon}
                                    onClick={handleSubmit}
                                >
                                    {runButtonLabel}
                                </Button>
                            </Space.Compact>

                            <div className="ai-fusion-card-tip">
                                {currentMeta.tip}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AiFusionHistoryModal open={historyVisible} onClose={() => setHistoryVisible(false)}/>
        </>
    );
});

export default AiFusionPromptBar;
