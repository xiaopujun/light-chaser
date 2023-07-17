import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import basePieImg from "./base-pie.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdBasePieConfig = React.lazy(() => import("./AntdBasePieConfig").then(module => ({default: module.AntdBasePieConfig})));
const AnimationConfig = React.lazy(() => import("../../common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-fragment/base-info/BaseInfo"));
const AntdBasePie = React.lazy(() => import("./AntdBasePie"));
const DataConfig = React.lazy(() => import("../../common-fragment/data-config/DataConfig"));

class AntdBasePieCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "饼图",
            key: 'AntdPie',
            typeName: "饼图",
            typeKey: "pie",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return basePieImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdBasePie;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '饼图',
                type: 'AntdPie',
                des: '基于antd实现的饼图',
            },
            style: {
                baseStyle: {
                    padding: "10px",
                    backgroundColor: "rgba(14,16,20,0.11)",
                    border: "2px solid #00deffff",
                    borderRadius: "3px"
                },
                chartStyle: {
                    appendPadding: 10,
                    data: [
                        {
                            name: "1951 年",
                            value: 48
                        },
                        {
                            name: "1952 年",
                            value: 52
                        },
                        {
                            name: "1956 年",
                            value: 22
                        }
                    ],
                    angleField: 'value',
                    colorField: 'name',
                    radius: 0.9,
                    legend: {
                        position: "right-top",
                        layout: "vertical",
                        itemName: {
                            style: {
                                fill: "#00f0ffff",
                                fontSize: 12
                            }
                        }
                    },
                    label: {
                        type: 'inner',
                        offset: '-30%',
                        content: ({percent}: any) => `${(percent * 100).toFixed(0)}%`,
                        style: {
                            fontSize: 14,
                            textAlign: 'center',
                        },
                    },
                    interactions: [
                        {
                            type: 'element-active',
                        },
                    ],
                },
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: 0.25,
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
            'style': AntdBasePieConfig,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdBasePieCore;