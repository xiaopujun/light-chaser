import React from "react";

/**
 * 设计器组件分类规范定义抽象类
 */
export abstract class AbstractSortItem {
    /**
     * 获取分类定义信息
     */
    abstract getSortItemInfo(): SortItemProps;
}


export interface SortItemProps {
    icon: React.Component | React.FC | any;
    name: string;
    sort: SortEnum;
    onClick?: () => void;
}


export enum SortEnum {
    ALL,
    BAR,
}