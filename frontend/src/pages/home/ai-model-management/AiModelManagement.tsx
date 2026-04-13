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

import "./AiModelManagement.less";

import {Brain, CopyOne, Delete, Edit, Plus} from "@icon-park/react";
import {Button, Card, Empty, Input, Pagination, Spin, Tag} from "antd";
import {observer} from "mobx-react";
import React, {memo, useEffect, useMemo, useState} from "react";

import {globalModal} from "../../../framework/message/GlobalModal.tsx";
import aiModelStore, {type IAiModel} from "./AiModelStore.ts";
import AiModelPanel from "./AiModelPanel.tsx";
import {getAiModelProviderLabel, getAiModelProviderTone, normalizeAiModelProviderId} from "./AiModelProviderRegistry.ts";

const {Search} = Input;

const formatTime = (value?: string) => {
    if (!value) {
        return "暂无时间";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatTemperature = (value?: number) => {
    if (typeof value !== "number" || Number.isNaN(value)) {
        return "0.3";
    }
    return value.toFixed(1);
};

const maskApiKey = (hasApiKey?: boolean) => {
    return hasApiKey ? "已保存••••" : "未设置";
};

const AiModelManagement = observer(() => {
    const {
        aiModelPageData,
        aiModel,
        loading,
        panelVisible,
        setPanelVisible,
        doBatchDeleteAiModel,
        doCreateOrUpdateAiModel,
        init,
        destroy,
        openAiModelEditor,
        copyAiModel,
        searchAiModels,
    } = aiModelStore;
    const {current, records, size, total} = aiModelPageData;
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    useEffect(() => {
        init();
        return () => destroy();
    }, []);

    const handleSearch = (value: string) => {
        searchAiModels(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch((event.target as HTMLInputElement).value);
        }
    };

    const handleDelete = (id: string) => {
        globalModal.modalApi?.confirm({
            title: "删除确认",
            content: "确定删除这个 AI 模型吗？删除后无法恢复，请谨慎操作。",
            okText: "删除",
            cancelText: "取消",
            onOk: () => doBatchDeleteAiModel([id]),
        });
    };

    const totalText = useMemo(() => `共 ${total} 个模型`, [total]);
    const emptyText = aiModelStore.searchValue ? "没有找到匹配的 AI 模型" : "还没有 AI 模型配置";

    const renderCard = (item: IAiModel) => {
        const id = item.id!;
        const providerId = normalizeAiModelProviderId(item.provider);
        const providerLabel = item.providerLabel || getAiModelProviderLabel(item.provider);

        return (
            <Card
                key={id}
                hoverable
                bordered={false}
                className={`ai-model-card ${hoveredCard === id ? "is-hovered" : ""}`}
                onMouseEnter={() => setHoveredCard(id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => openAiModelEditor(id)}
            >
                <div className="card-header">
                    <div className="header-main">
                        <div className="card-title-row">
                            <div className="title-block">
                                <div className="card-title" title={item.name}>
                                    {item.name || "未命名模型"}
                                </div>
                                <div className="card-subtitle" title={item.modelName}>
                                    {item.modelName || "未配置模型标识"}
                                </div>
                            </div>
                            <Brain size={18} className="card-icon" />
                        </div>
                        <div className="tag-row">
                            {item.isDefault === 1 && <Tag color="gold">默认模型</Tag>}
                            <Tag color={item.enabled !== 0 ? "processing" : "default"}>
                                {item.enabled !== 0 ? "已启用" : "已停用"}
                            </Tag>
                            <Tag className="provider-tag" data-tone={getAiModelProviderTone(providerId)}>
                                {providerLabel}
                            </Tag>
                        </div>
                    </div>
                </div>

                <div className="meta-list">
                    <div className="meta-item">
                        <span>接入地址</span>
                        <strong title={item.baseUrl || ""}>
                            {item.baseUrl || "未设置"}
                        </strong>
                    </div>
                    <div className="meta-item">
                        <span>API Key</span>
                        <strong>{maskApiKey(item.hasApiKey)}</strong>
                    </div>
                    <div className="meta-item">
                        <span>温度 / Token</span>
                        <strong>
                            {formatTemperature(item.temperature)} / {item.maxTokens ?? "默认"}
                        </strong>
                    </div>
                </div>

                <div className="description">
                    {item.description?.trim() || "暂未补充描述，建议说明适用场景或默认用途。"}
                </div>

                <div className="card-footer">
                    <span className="footer-time">
                        更新于 {formatTime(item.updateTime || item.createTime)}
                    </span>
                    <div
                        className="card-actions"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <Button
                            type="text"
                            icon={<CopyOne size={14} />}
                            onClick={() => copyAiModel(id)}
                        >
                            复制
                        </Button>
                        <Button
                            type="text"
                            icon={<Edit size={14} />}
                            onClick={() => openAiModelEditor(id)}
                        >
                            编辑
                        </Button>
                        <Button
                            type="text"
                            danger
                            icon={<Delete size={14} />}
                            onClick={() => handleDelete(id)}
                        >
                            删除
                        </Button>
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <div className="ai-model-management">
            <div className="ai-model-management-header">
                <div className="header-copy">
                    <div className="page-title">AI 模型管理</div>
                    <div className="page-subtitle">
                        配置开源版可调用的模型，供样式优化和数据优化使用。不提供通过 AI 生成组件的功能。
                    </div>
                </div>
                <div className="header-actions">
                    <Search
                        placeholder="搜索名称 / 提供商 / 模型标识"
                        size="small"
                        className="ai-model-search"
                        onKeyDown={handleKeyDown}
                        onSearch={handleSearch}
                        style={{width: "min(360px, 100%)"}}
                    />
                    <Button size="small" type="primary" onClick={() => setPanelVisible(true)}>
                        <Plus style={{position: "relative", top: 2, marginRight: 3}} />
                        新建模型
                    </Button>
                    <Tag color="processing">{totalText}</Tag>
                </div>
            </div>

            <div className="ai-model-body">
                {loading && records.length === 0 ? (
                    <div className="loading-wrap">
                        <Spin size="large" />
                    </div>
                ) : records.length === 0 ? (
                    <div className="empty-wrap">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={emptyText}
                        >
                            <Button
                                type="primary"
                                icon={<Plus size={14} />}
                                onClick={() => setPanelVisible(true)}
                            >
                                新建模型
                            </Button>
                        </Empty>
                    </div>
                ) : (
                    <div className="ai-model-grid">
                        {records.map((item) => renderCard(item))}
                    </div>
                )}
            </div>

            <Pagination
                rootClassName="ai-model-pagination"
                current={current}
                pageSize={size}
                total={total}
                showTotal={() => `共 ${total} 条`}
                onChange={(page) => aiModelStore.changeCurrentPage(page)}
            />

            <AiModelPanel
                visible={panelVisible}
                title={aiModel?.id ? "编辑AI模型" : "新建AI模型"}
                data={aiModel}
                onClose={() => setPanelVisible(false)}
                onSubmitted={doCreateOrUpdateAiModel}
            />
        </div>
    );
});

export default memo(AiModelManagement);
