import React from "react";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseMenuMapping, ClazzTemplate} from "../../common-component/common-types";
import AntdLiquidController, {AntdLiquidProps} from "./AntdLiquidController";
import liquidImg from './liquid.png';
import {BaseInfoType} from "../../../designer/DesignerType";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdLiquidConfig = React.lazy(() => import("./AntdLiquidConfig").then((module) => ({default: module.AntdLiquidConfig})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


class AntdLiquidDefinition /*extends AbstractDefinition<AntdLiquid, BaseMenuMapping, AntdLiquidProps>*/ {

    getComponent(): ClazzTemplate<AntdLiquidController> | null {
        return AntdLiquidController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): BaseMenuMapping | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdLiquidConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd水波图",
            compKey: "AntdLiquid",
            type: "水波图",
            typeKey: "liquid",
            desc: "基于Antd Designer实现的水波图组件",
        };
    }

    getChartImg(): string | null {
        return liquidImg;
    }

    getInitConfig(): AntdLiquidProps {
        return {
            info: {
                id: "",
                name: 'Antd水波图',
                type: 'AntdLiquid',
                desc: '基于Antd Designer实现的水波图组件',
            },
            style: {
                percent: 0.25,
                outline: {
                    border: 4,
                },
                wave: {
                    length: 128,
                },
                statistic: {
                    content: {
                        style: {
                            fill: '#7de0ff',
                            fontSize: '16px'
                        }
                    }
                }

            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: []
                },
            },
        };
    }
}

export default AntdLiquidDefinition;
