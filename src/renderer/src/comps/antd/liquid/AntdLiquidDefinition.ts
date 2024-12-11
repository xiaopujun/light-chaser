import React from "react";
import {MenuInfo} from "../../../designer/right/MenuType";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import AntdLiquidController, {AntdLiquidProps} from "./AntdLiquidController";
import liquidImg from './liquid.png';
import {BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

const AntdLiquidConfig = React.lazy(() => import("./AntdLiquidConfig"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));
const FilterConfig = React.lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));


class AntdLiquidDefinition extends AbstractDesignerDefinition<AntdLiquidController, AntdLiquidProps> {

    getController(): ClazzTemplate<AntdLiquidController> | null {
        return AntdLiquidController;
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((item) => item.key !== 'mapping');
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdLiquidConfig,
            theme: ThemeConfig,
            filter: FilterConfig
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd水波图",
            compKey: "AntdLiquid",
            categorize: "chart",
            subCategorize: "progress",
        };
    }

    getChartImg(): string | null {
        return liquidImg;
    }

    getInitConfig(): AntdLiquidProps {
        return {
            base: {
                id: "",
                name: 'Antd水波图',
                type: 'AntdLiquid',
            },
            style: {
                shape: "circle",
                percent: 0.65,
                radius: 0.9,
                liquidStyle: {
                    fill: "#2399ffea",
                    stroke: "#1a75c8d6"
                },
                shapeStyle: {
                    fill: "#00fff716"
                },
                outline: {
                    border: 0,
                    distance: 0,
                    style: {
                        stroke: "#2B7DD35F"
                    }
                },
                wave: {
                    length: 150,
                    count: 5
                },
                statistic: {
                    content: {
                        style: {
                            fill: "#7de0ff",
                            fontSize: '20',
                            color: "#81d8ff"
                        }
                    },
                    title: {
                        content: "指标1",
                        style: {
                            fontSize: '22',
                            color: "#61a0f9c2",
                            fontWeight: 900
                        },
                        offsetY: -10
                    }
                },
                animation: {
                    appear: {
                        animation: 'wave-in',
                        duration: 3000
                    }
                }
            },
            filter: {
                enable: false,
                blur: 0,
                brightness: 1,
                contrast: 1,
                opacity: 1,
                saturate: 1,
                hueRotate: 0
            },
            data: {
                sourceType: 'static',
                staticData: 0.65
            },
        };
    }
}

export default AntdLiquidDefinition;
