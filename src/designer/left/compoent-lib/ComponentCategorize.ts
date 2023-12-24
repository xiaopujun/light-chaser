import {ICategorize} from "../../../framework/core/AbstractDefinition";
import {
    AppstoreOutlined, CodeSandboxOutlined,
    DeploymentUnitOutlined, EnvironmentOutlined,
    FontSizeOutlined,
    FormatPainterOutlined, GoldOutlined,
    PieChartOutlined, VideoCameraOutlined
} from "@ant-design/icons";

export const componentCategorize: ICategorize[] = [
    {
        key: "all",
        name: "所有",
        icon: AppstoreOutlined,
    },
    {
        key: "chart",
        name: "图表",
        icon: PieChartOutlined,
    },
    {
        key: "text",
        name: "文字",
        icon: FontSizeOutlined,
    },
    {
        key: "map",
        name: "地图",
        icon: EnvironmentOutlined,
    },
    {
        key: "ornament",
        name: "装饰",
        icon: FormatPainterOutlined,
    },
    {
        key: "model",
        name: "模型",
        icon: DeploymentUnitOutlined,
    },
    {
        key: "media",
        name: "媒体",
        icon: VideoCameraOutlined,
    },
    {
        key: "web",
        name: "web元素",
        icon: CodeSandboxOutlined,
    },
    {
        key: "other",
        name: "其他",
        icon: GoldOutlined
    }
];

export const componentSubCategorize: ICategorize[] = [
    {
        key: "all",
        name: "所有",
    },
    {
        key: "bar",
        name: "条形图",
        parentKey: "chart"
    },
    {
        key: "column",
        name: "柱状图",
        parentKey: "chart"
    },
    {
        key: "line",
        name: "折线图",
        parentKey: "chart"
    },
    {
        key: "pie",
        name: "饼图",
        parentKey: "chart"
    },
    {
        key: "scatter",
        name: "散点图",
        parentKey: "chart"
    },
    {
        key: "wordCloud",
        name: "词云图",
        parentKey: "chart"
    },
    {
        key: "area",
        name: "面积图",
        parentKey: "chart"
    },
    {
        key: "radar",
        name: "雷达图",
        parentKey: "chart"
    },
    {
        key: "funnel",
        name: "漏斗图",
        parentKey: "chart"
    },
    {
        key: "gauge",
        name: "仪表盘",
        parentKey: "chart"
    },
    {
        key: "progress",
        name: "进度条",
        parentKey: "chart"
    },
    {
        key: "rose",
        name: "玫瑰图",
        parentKey: "chart"
    },
    {
        key: "baseText",
        name: "基础文本",
        parentKey: "text"
    }
];