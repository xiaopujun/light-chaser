import React from "react";

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
    ALL = 'all',
    BAR = 'bar',
}
