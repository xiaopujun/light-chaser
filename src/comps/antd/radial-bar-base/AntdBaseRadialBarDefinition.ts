import React from "react";
import {BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import baseRadialBarImg from './base-radial-bar.png';
import AntdBaseRadialBarController, {AntdRadialBarProps} from "./AntdBaseRadialBarController.ts";
import {AntdCommonDefinition} from "../../antd-common/AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdRadialBarConfig = React.lazy(() => import("./AntdBaseRadialBarStyleConfig.tsx"));
const AntdRadialBarFieldMapping = React.lazy(() => import("./AntdBaseRadialBarStyleConfig.tsx").then((module) => ({default: module.AntdRadialBarFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

class AntdBaseRadialBarDefinition extends AntdCommonDefinition<AntdBaseRadialBarController, AntdRadialBarProps> {

    getController(): ClazzTemplate<AntdBaseRadialBarController> | null {
        return AntdBaseRadialBarController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdRadialBarConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdRadialBarFieldMapping
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础玉珏图",
            compKey: "AntdBaseRadialBar",
            categorize: "chart",
            subCategorize: 'radial'
        };
    }

    getChartImg(): string | null {
        return baseRadialBarImg;
    }

    getInitConfig(): AntdRadialBarProps {
        const data = [
            {name: 'X6', star: 297},
            {name: 'G', star: 506},
            {name: 'AVA', star: 805},
            {name: 'G2Plot', star: 1478},
            {name: 'L7', star: 2029},
            {name: 'G6', star: 7100},
            {name: 'F2', star: 7346},
            {name: 'G2', star: 10178},
        ];
        return {
            base: {
                id: "",
                name: 'Antd基础玉珏图',
                type: 'AntdBaseRadialBar',
            },
            style: {
                data,
                xField: 'name',
                yField: 'star',
                maxAngle: 270,
                startAngle: -Math.PI / 2,
                endAngle: Math.PI / 2 * 3,
                radius: 0.8,
                innerRadius: 0.2,
                colorField: 'star',
                type: '',
                supportCSSTransform: true,
                maxBarWidth: 20,
                barStyle: {
                    lineCap: 'round',
                },
                xAxis: {
                    label: {
                        style: {
                            fill: "#ffdede",
                            fontSize: 10,
                        },
                    },
                },
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000,
                    },
                },
                color: ["#0089FF", "#F2FF00"],
            },
            data: {
                sourceType: 'static',
                staticData: data,
            },
        };
    }
}

export default AntdBaseRadialBarDefinition;
