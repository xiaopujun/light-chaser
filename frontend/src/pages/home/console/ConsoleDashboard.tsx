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

import './ConsoleDashboard.less';

import {DashboardOne, Data, Dropbox, NetworkDrive, System} from '@icon-park/react';
import {Card, Progress, Tag} from 'antd';
import {CountUp} from 'countup.js';
import {memo, type ReactNode, useEffect, useMemo, useRef, useState} from 'react';

import baseApi from '../../../api/BaseApi.ts';
import {globalMessage} from '../../../framework/message/GlobalMessage.tsx';
import type {IProjectInfo} from '../../../designer/DesignerType.ts';
import FetchUtil from '../../../utils/FetchUtil.ts';

type DashboardStatVariant = 'primary' | 'info' | 'success' | 'warning';

type DashboardStat = {
    key: string;
    label: string;
    value: number;
    hint: string;
    icon: ReactNode;
    variant: DashboardStatVariant;
};

type RecentProject = IProjectInfo & {
    timeText: string;
    timeStamp: number;
};

type DashboardData = {
    projectCount: number;
    dataSourceCount: number;
    imageCount: number;
    recentProjects: RecentProject[];
};

const emptyDashboard: DashboardData = {
    projectCount: 0,
    dataSourceCount: 0,
    imageCount: 0,
    recentProjects: []
};

const timeFormatter = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
});

const formatTimeText = (value?: string | null) => {
    if (!value) return '暂无时间';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '暂无时间';
    return timeFormatter.format(date);
};

const getTimeStamp = (value?: string | null) => {
    if (!value) return 0;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

function AnimatedNumber(props: { value: number; suffix?: string; duration?: number }) {
    const {value, suffix, duration = 0.9} = props;
    const elRef = useRef<HTMLSpanElement | null>(null);
    const animRef = useRef<CountUp | null>(null);

    useEffect(() => {
        if (!elRef.current) return;
        animRef.current?.reset();
        const anim = new CountUp(elRef.current, value, {
            duration,
            separator: ',',
            suffix: suffix ?? ''
        });
        animRef.current = anim;
        if (!anim.error) {
            anim.start();
        }
        return () => {
            animRef.current = null;
        };
    }, [duration, suffix, value]);

    return <span ref={elRef}/>;
}

export const ConsoleDashboard = memo(() => {
    const [dashboard, setDashboard] = useState<DashboardData>(emptyDashboard);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const loadDashboard = async () => {
            setLoading(true);
            try {
                const [projectPage, dataSourcePage, imagePage] = await Promise.all([
                    baseApi.getProjectInfoPageList({current: 1, size: 4}),
                    FetchUtil.post('/api/commonDatabase/pageList', {current: 1, size: 1}),
                    FetchUtil.post('/api/image/pageList', {current: 1, size: 1})
                ]);

                const recentProjects = await Promise.all(
                    projectPage.records.map(async (item) => {
                        if (!item.id) return null;

                        const detailResponse = await FetchUtil.get(`/api/project/getProjectInfo/${item.id}`);
                        const detail = detailResponse.code === 200 && detailResponse.data
                            ? detailResponse.data as IProjectInfo
                            : null;
                        const merged: IProjectInfo = {
                            ...item,
                            ...(detail ?? {})
                        };
                        const timeValue = merged.updateTime || merged.createTime;

                        return {
                            ...merged,
                            timeStamp: getTimeStamp(timeValue),
                            timeText: formatTimeText(timeValue)
                        } as RecentProject;
                    })
                );

                if (!mounted) return;

                setDashboard({
                    projectCount: projectPage.total ?? 0,
                    dataSourceCount: dataSourcePage.code === 200 && dataSourcePage.data
                        ? Number(dataSourcePage.data.total ?? 0)
                        : 0,
                    imageCount: imagePage.code === 200 && imagePage.data
                        ? Number(imagePage.data.total ?? 0)
                        : 0,
                    recentProjects: recentProjects
                        .filter((item): item is RecentProject => Boolean(item))
                        .sort((left, right) => right.timeStamp - left.timeStamp)
                });
            } catch (error) {
                if (!mounted) return;
                globalMessage.messageApi?.error('加载控制台数据失败');
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        void loadDashboard();
        return () => {
            mounted = false;
        };
    }, []);

    const resourceTotal = useMemo(() => {
        return dashboard.projectCount + dashboard.dataSourceCount + dashboard.imageCount;
    }, [dashboard]);

    const greeting = useMemo(() => {
        const current = new Date();
        const hour = current.getHours();
        const phase =
            hour < 6 ? '夜深了' :
                hour < 12 ? '上午好' :
                    hour < 14 ? '中午好' :
                        hour < 18 ? '下午好' : '晚上好';
        const followup =
            hour < 6 ? '先休息一下再继续' :
                hour < 9 ? '建议先看一眼整体状态' :
                    hour < 18 ? '可以从项目列表开始处理' :
                        hour < 22 ? '适合做一次收尾检查' : '早点收尾，别太晚';
        const dateText = current.toLocaleDateString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            weekday: 'short'
        });

        return {
            phase,
            followup,
            dateText
        };
    }, []);

    const heroCards = useMemo(() => ([
        {
            label: '项目总数',
            value: dashboard.projectCount,
            hint: '按创建时间倒序展示'
        },
        {
            label: '资源总量',
            value: resourceTotal,
            hint: '项目 / 数据源 / 图片'
        }
    ]), [dashboard.projectCount, resourceTotal]);

    const stats = useMemo<DashboardStat[]>(() => ([
        {
            key: 'projects',
            label: '项目',
            value: dashboard.projectCount,
            hint: '当前可管理的项目总数',
            icon: <NetworkDrive size={18}/>,
            variant: 'info'
        },
        {
            key: 'datasources',
            label: '数据源',
            value: dashboard.dataSourceCount,
            hint: '数据库连接与配置项',
            icon: <Data size={18}/>,
            variant: 'success'
        },
        {
            key: 'images',
            label: '图片',
            value: dashboard.imageCount,
            hint: '已上传并可复用的图片资源',
            icon: <Dropbox size={18}/>,
            variant: 'primary'
        },
        {
            key: 'resources',
            label: '资源总量',
            value: resourceTotal,
            hint: '项目 + 数据源 + 图片',
            icon: <System size={18}/>,
            variant: 'warning'
        }
    ]), [dashboard.dataSourceCount, dashboard.imageCount, dashboard.projectCount, resourceTotal]);

    const resourceDistribution = useMemo(() => {
        const total = resourceTotal;
        const getPercent = (value: number) => total > 0 ? Math.round((value / total) * 100) : 0;

        return [
            {key: 'projects', label: `项目 (${dashboard.projectCount})`, percent: getPercent(dashboard.projectCount), color: 'var(--lc-home-primary)'},
            {key: 'datasources', label: `数据源 (${dashboard.dataSourceCount})`, percent: getPercent(dashboard.dataSourceCount), color: 'var(--lc-home-success)'},
            {key: 'images', label: `图片 (${dashboard.imageCount})`, percent: getPercent(dashboard.imageCount), color: 'rgba(225, 78, 202, 0.92)'}
        ];
    }, [dashboard.dataSourceCount, dashboard.imageCount, dashboard.projectCount, resourceTotal]);

    const getCoverStyle = (cover?: string) => {
        if (!cover) return undefined;
        return {
            backgroundImage: `linear-gradient(180deg, rgba(18, 19, 32, 0.08), rgba(18, 19, 32, 0.32)), url(${cover})`
        };
    };

    const getProjectInitial = (name?: string) => {
        const firstChar = name?.trim().charAt(0);
        return (firstChar || 'L').toUpperCase();
    };

    return (
        <div className="console-dashboard">
            <div className="console-hero">
                <div className="console-hero-left">
                    <div className="console-hero-title">
                        <span className="console-hero-icon" aria-hidden={true}>
                            <DashboardOne size={16}/>
                        </span>
                        运行概览
                    </div>
                    <div className="console-hero-greeting">
                        <span className="console-greeting-text">
                            {greeting.phase}，今天可以先检查整体状态。
                        </span>
                        <span className="console-greeting-meta">{greeting.dateText}</span>
                    </div>
                    <div className="console-hero-subtitle">
                        统一查看项目、数据源与图片资源的最新状态和分布。
                    </div>
                    <div className="console-hero-chip-row">
                        <span className="console-hero-chip">项目 {dashboard.projectCount}</span>
                        <span className="console-hero-chip">数据源 {dashboard.dataSourceCount}</span>
                        <span className="console-hero-chip">图片 {dashboard.imageCount}</span>
                    </div>
                </div>

                <div className="console-hero-right">
                    {heroCards.map((item) => (
                        <div key={item.label} className="console-hero-metric-card">
                            <div className="metric-label">{item.label}</div>
                            <div className="metric-value">
                                <AnimatedNumber value={item.value}/>
                            </div>
                            <div className="metric-hint">{item.hint}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="console-stat-grid">
                {stats.map((item) => (
                    <Card key={item.key} className="console-stat-card" bordered={false}>
                        <div className="stat-head">
                            <div className="stat-icon" data-variant={item.variant}>
                                {item.icon}
                            </div>
                            <div className="stat-meta">
                                <div className="stat-label">{item.label}</div>
                                <div className="stat-hint">{item.hint}</div>
                            </div>
                        </div>
                        <div className="stat-value">
                            <AnimatedNumber value={item.value}/>
                        </div>
                        <div className="stat-foot">
                            <div className="pulse-line" data-variant={item.variant}/>
                            <div className="stat-foot-text">{loading ? '同步中...' : 'System Ready'}</div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="console-bottom-grid">
                <Card className="console-panel" bordered={false}>
                    <div className="panel-title-row">
                        <div className="panel-title">资源数量占比</div>
                        <div className="panel-subtitle">按项目、数据源、图片统计</div>
                    </div>
                    <div className="progress-list">
                        {resourceDistribution.map((item) => (
                            <div key={item.key} className="progress-item">
                                <div className="progress-label-row">
                                    <div className="progress-label">{item.label}</div>
                                    <div className="progress-value">{item.percent}%</div>
                                </div>
                                <Progress
                                    percent={item.percent}
                                    showInfo={false}
                                    strokeColor={item.color}
                                    trailColor="rgba(255, 255, 255, 0.08)"
                                />
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="console-panel" bordered={false}>
                    <div className="panel-title-row">
                        <div className="panel-title">最近项目</div>
                        <div className="panel-subtitle">按创建时间倒序展示</div>
                    </div>
                    <div className="recent-list">
                        {dashboard.recentProjects.length === 0 ? (
                            <div className="empty-text">
                                {loading ? '正在同步控制台数据…' : '暂无项目'}
                            </div>
                        ) : dashboard.recentProjects.map((item) => (
                            <div key={item.id} className="recent-item">
                                <div className="recent-left">
                                    <div
                                        className={`recent-cover${item.cover ? ' has-cover' : ''}`}
                                        style={getCoverStyle(item.cover)}
                                    >
                                        {!item.cover && (
                                            <span className="recent-cover-fallback">
                                                {getProjectInitial(item.name)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="recent-meta">
                                        <div className="recent-name">{item.name || '未命名项目'}</div>
                                        <div className="recent-desc">
                                            {item.des || '暂无描述，按创建时间排序展示。'}
                                        </div>
                                        <div className="recent-time">
                                            最近更新 {item.timeText}
                                        </div>
                                    </div>
                                </div>
                                <Tag bordered={false} className="recent-tag">
                                    项目
                                </Tag>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
});

export default ConsoleDashboard;
