import React from "react";
import {BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import pieImg from './pie.png';
import AntdPieController, {AntdPieProps} from "./AntdPieController";
import {AntdCommonDefinition} from "../../antd-common/AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdPieConfig = React.lazy(() => import("./AntdPieStyleConfig"));
const AntdPieFieldMapping = React.lazy(() => import("./AntdPieStyleConfig").then((module) => ({default: module.AntdPieFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

class AntdPieDefinition extends AntdCommonDefinition<AntdPieController, AntdPieProps> {

    getController(): ClazzTemplate<AntdPieController> | null {
        return AntdPieController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
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
            categorize: "chart",
            subCategorize: "pie",
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
            base: {
                id: "",
                name: 'Antd饼图',
                type: 'AntdPie',
            },
            style: {
                data,
                angleField: "value",
                colorField: "type",
                radius: 0.7,
                innerRadius: 0.6,
                startAngle: 0,
                endAngle: Math.PI * 2,
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
                sourceType: 'static',
                staticData: data,
            },
        };
    }
}

export default AntdPieDefinition;
