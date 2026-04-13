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

import {Button, Modal, Tag} from "antd";
import {useEffect, useState} from "react";
import {
    AI_FUSION_HISTORY_UPDATED_EVENT,
    getAiFusionHistoryResultLabel,
    getAiFusionHistorySceneLabel,
    readAiFusionHistoryItems,
    supportsAiFusionHistoryAppliedState,
} from "./AiFusionHistoryStore.ts";
import type {AiFusionHistoryItem} from "./AiFusionPromptBar.types.ts";
import {stringifyLimited} from "./AiFusionCommonUtil.ts";
import "./AiFusionHistoryModal.less";

const formatHistoryTime = (timestamp: number) => {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
        return "";
    }
    return date.toLocaleString("zh-CN", {
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};

interface AiFusionHistoryModalProps {
    open: boolean;
    onClose: () => void;
}

export const AiFusionHistoryModal = (props: AiFusionHistoryModalProps) => {
    const {open, onClose} = props;
    const [historyItems, setHistoryItems] = useState<AiFusionHistoryItem[]>([]);

    useEffect(() => {
        if (open) {
            setHistoryItems(readAiFusionHistoryItems());
        }
    }, [open]);

    useEffect(() => {
        if (!open || typeof window === "undefined") {
            return;
        }

        const handleHistoryUpdate = () => {
            setHistoryItems(readAiFusionHistoryItems());
        };

        window.addEventListener(AI_FUSION_HISTORY_UPDATED_EVENT, handleHistoryUpdate);
        return () => {
            window.removeEventListener(AI_FUSION_HISTORY_UPDATED_EVENT, handleHistoryUpdate);
        };
    }, [open]);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={`AI 历史记录 (${historyItems.length})`}
            width={980}
            centered
            destroyOnClose
            zIndex={1501}
            className="ai-fusion-history-modal"
            footer={[
                <Button key="close" onClick={onClose}>关闭</Button>,
            ]}
        >
            {historyItems.length > 0 ? (
                <div className="ai-fusion-history-list">
                    {historyItems.map((item) => {
                        const sceneLabel = getAiFusionHistorySceneLabel(item.scene);
                        const subtitleParts = [
                            formatHistoryTime(item.time),
                            sceneLabel,
                            item.componentType,
                        ].filter(Boolean);
                        const detailText = [item.summary, item.reason].filter(Boolean).join("\n\n");

                        return (
                            <section key={item.id} className="ai-fusion-history-item">
                                <div className="ai-fusion-history-item-head">
                                    <div className="ai-fusion-history-item-title-group">
                                        <div className="ai-fusion-history-item-title">
                                            {item.componentName || sceneLabel}
                                        </div>
                                        <div className="ai-fusion-history-item-subtitle">
                                            {subtitleParts.join(" · ")}
                                        </div>
                                    </div>
                                    <div className="ai-fusion-history-item-tags">
                                        <Tag color="geekblue">{sceneLabel}</Tag>
                                        <Tag color="blue">{item.provider || "未知供应商"}</Tag>
                                        <Tag color="processing">{item.modelName || "未知模型"}</Tag>
                                        <Tag color={item.success ? "success" : "error"}>
                                            {item.success ? "成功" : "失败"}
                                        </Tag>
                                        {supportsAiFusionHistoryAppliedState(item.scene) ? (
                                            <Tag color={item.applied ? "success" : "default"}>
                                                {item.applied ? "已应用" : "未应用"}
                                            </Tag>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="ai-fusion-history-item-block">
                                    <div className="ai-fusion-history-item-label">需求目标</div>
                                    <pre className="ai-fusion-history-item-text">{item.goal}</pre>
                                </div>

                                {detailText ? (
                                    <div className="ai-fusion-history-item-block">
                                        <div className="ai-fusion-history-item-label">执行说明</div>
                                        <pre className="ai-fusion-history-item-text">{detailText}</pre>
                                    </div>
                                ) : null}

                                {item.result != null ? (
                                    <div className="ai-fusion-history-item-block">
                                        <div className="ai-fusion-history-item-label">{getAiFusionHistoryResultLabel(item.scene)}</div>
                                        <pre className="ai-fusion-history-item-text">{stringifyLimited(item.result, 6000)}</pre>
                                    </div>
                                ) : null}

                                {item.reasoningContent ? (
                                    <div className="ai-fusion-history-item-block">
                                        <div className="ai-fusion-history-item-label">思考过程</div>
                                        <pre className="ai-fusion-history-item-text">{item.reasoningContent}</pre>
                                    </div>
                                ) : null}

                                <div className="ai-fusion-history-item-block">
                                    <div className="ai-fusion-history-item-label">回复内容</div>
                                    <pre className="ai-fusion-history-item-text">{item.reply || "模型未返回可识别的文本内容。"}</pre>
                                </div>

                                {item.usage ? (
                                    <div className="ai-fusion-history-item-block">
                                        <div className="ai-fusion-history-item-label">Token 使用情况</div>
                                        <pre className="ai-fusion-history-item-text">{stringifyLimited(item.usage, 3000)}</pre>
                                    </div>
                                ) : null}
                            </section>
                        );
                    })}
                </div>
            ) : (
                <div className="ai-fusion-history-empty">
                    暂无 AI 历史记录
                </div>
            )}
        </Modal>
    );
};

export default AiFusionHistoryModal;
