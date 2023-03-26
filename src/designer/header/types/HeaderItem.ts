import React from "react";

/**
 * 设计器头部item props
 */
export interface HeaderItemProps {
    icon: React.Component | React.FC | any;
    title: string
    onClick?: () => void;
}

/**
 * 设计器头部规范接口，实现了该接口，代表你实现的是一个头部item。可以被自动扫描器扫描并加载到头部item列表中
 */
export abstract class HeaderItem {
    /**
     * 获取头部item定义信息
     */
    abstract getHeaderItem(): HeaderItemProps;
}