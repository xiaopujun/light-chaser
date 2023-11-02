import React from "react";
import {
    AbstractComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import pieImg from './pie.png';
import {BaseInfoType} from "../../../designer/DesignerType";
import AntdPieController, {AntdPieProps} from "./AntdPieController";
import {AntdCommonDefinition} from "../../antd-common/AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdPieConfig = React.lazy(() => import("./AntdPieStyleConfig"));
const AntdPieFieldMapping = React.lazy(() => import("./AntdPieStyleConfig").then((module) => ({default: module.AntdPieFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

class AntdPieDefinition extends AntdCommonDefinition<AntdPieController, AntdPieProps> {

    getComponent(): ClazzTemplate<AntdPieController> | null {
        return AntdPieController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdPieConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdPieFieldMapping
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd饼图",
            compKey: "AntdPie",
            type: "饼图",
            typeKey: "pie",
            desc: "基于Antd Designer实现的饼图组件",
        };
    }

    getChartImg(): string | null {
        return pieImg;
    }

    getInitConfig(): AntdPieProps {
        const data = [
            {type: 'sort1', value: 30},
            {type: 'sort2', value: 25},
            {type: 'sort3', value: 20},
            {type: 'sort4', value: 25}
        ];
        return {
            info: {
                id: "",
                name: 'Antd饼图',
                type: 'AntdPie',
                desc: '基于Antd Designer实现的饼图组件',
            },
            style: {
                data,
                angleField: "value",
                colorField: "type",
                radius: 0.7,
                innerRadius: 0.6,
                pieStyle: {
                    stroke: "#fff",
                    lineWidth: 0,
                },
                label: {
                    type: "outer",
                    offset: 27,
                    content: "{name} {percentage}",
                    autoRotate: true,
                    rotate: 0,
                    style: {
                        textAlign: "center",
                        fontSize: 10,
                        fontWeight: 400,
                        fill: "#cececeff",
                    },
                },
                legend: {
                    position: "right",
                    layout: "vertical",
                    itemName: {
                        style: {
                            fill: "#adadadff",
                            fontSize: 12,
                        },
                    },
                },
                interactions: [
                    {type: "element-selected",},
                    {type: "element-active",},
                ],
                statistic: {
                    title: {
                        style: {
                            fontSize: "10px",
                            color: "#b9b9b9ff",
                            fontWeight: 300,
                        },
                        content: "总计",
                        offsetY: -6,
                    },
                    content: {
                        style: {
                            fontSize: "16px",
                            color: "#c5c5c5ff",
                        },
                        content: "100",
                        offsetY: 2,
                        offsetX: -2,
                    },
                },
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000,
                    },
                },
                color: ["#0087ffff", "#339effff", "#87c5ffff", "#4687c3ff"],
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data
                },
            },
        };
    }
}

export default AntdPieDefinition;
