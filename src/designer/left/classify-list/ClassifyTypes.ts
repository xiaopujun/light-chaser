import React from "react";

/**
 * 设计器组件分类规范定义抽象类
 */
export abstract class AbstractClassifyItem {
    /**
     * 获取分类定义信息
     */
    abstract getClassifyItemInfo(): ClassifyItemProps;
}


export interface ClassifyItemProps {
    //图标
    icon: React.Component | React.FC | any;
    //名称
    name: string;
    //分类
    classify: ClassifyEnum;
    //点击事件
    onClick?: (classifyKey?: ClassifyEnum) => void;
}

export enum ClassifyEnum {
    ALL,
    BAR,
}
