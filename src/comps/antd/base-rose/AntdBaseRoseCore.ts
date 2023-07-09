import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseRoseImg from "./base-rose.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdBaseRoseStyleConfig = React.lazy(() => import("./AntdBaseRoseConfig").then(module => ({default: module.AntdBaseRoseStyleConfig})));
const AnimationConfig = React.lazy(() => import("../../../lib/common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../../lib/common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../../lib/common-fragment/base-info/BaseInfo"));
const AntdBaseRose = React.lazy(() => import("./AntdBaseRose"));
const DataConfig = React.lazy(() => import("../../../lib/common-fragment/data-config/DataConfig"));

class AntdBaseRoseCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "基础玫瑰图",
            key: 'AntdBaseRose',
            typeName: "玫瑰图",
            typeKey: "rose",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return baseRoseImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdBaseRose;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '基础玫瑰图',
                type: 'AntdBaseRose',
                des: '基于antd实现的基础玫瑰图',
            },
            style: {
                baseStyle: {
                    padding: "10px",
                    backgroundColor: "rgba(14,16,20,0.11)",
                    border: "2px solid #00deffff",
                    borderRadius: "3px"
                },
                chartStyle: {
                    data: [
                        {name: "1951 年", value: 45},
                        {name: "1952 年", value: 59},
                        {name: "1956 年", value: 75},
                        {name: "1957 年", value: 89},
                        {name: "1958 年", value: 102},
                        {name: "1959 年", value: 125},
                    ],
                    xField: "name",
                    yField: "value",
                    legend: false,
                    seriesField: 'name',
                    label: {
                        style: {
                            fill: "#d0fbff",
                        }
                    },
                },
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: [
                        {name: "1951 年", value: 45},
                        {name: "1952 年", value: 152},
                        {name: "1956 年", value: 61},
                        {name: "1957 年", value: 278},
                        {name: "1958 年", value: 100},
                        {name: "1959 年", value: 430},
                    ],
                },
            },
            animation: {},
            theme: {
                themeId: '',
            },
        };
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): { [key: string]: React.Component | React.FC | any } {
        return {
            'info': BaseInfo,
            'style': AntdBaseRoseStyleConfig,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdBaseRoseCore;