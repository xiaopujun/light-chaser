import {AbstractAutoScannerCore, BaseInfoType} from "../../../framework/abstract/AbstractAutoScannerCore";
import {ElemConfig} from "../../../framework/types/DesignerType";
import {MenuInfo} from "../../../framework/types/MenuType";
import barImg from "./bar.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React, {ClassType} from "react";
import AntdBaseBarConfigStyle from "./AntdBaseBarConfigStyle";
import DataConfig from "../../../lib/common-fragment/data-config/DataConfig";
import AnimationConfig from "../../../lib/common-fragment/animation-config/AnimationConfig";
import ThemeConfig from "../../../lib/common-fragment/theme-config/ThemeConfig";
import BaseInfo from "../../../lib/common-fragment/base-info/BaseInfo";
import AntdBaseBar from "./AntdBaseBar";

class AntdBaseBarCore extends AbstractAutoScannerCore {

    getKey(): string {
        return 'AntdBaseBar';
    }

    getBaseInfo(): BaseInfoType {
        return {
            name: "基础条形图",
            key: 'AntdBaseBar',
            typeName: "条形图",
            typeKey: "bar",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return barImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdBaseBar;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '基础条形图',
                type: 'AntdBaseBar',
                des: '基于antd实现的基础条形图',
            },
            style: {
                baseStyle: {
                    padding: '10px',
                    backgroundColor: '#00000000',
                    border: '0px solid #00000000',
                    borderRadius: '0px',
                },
                chartStyle: {
                    data: [
                        {
                            name: '1951 年',
                            value: 38,
                        },
                        {
                            name: '1952 年',
                            value: 52,
                        },
                        {
                            name: '1956 年',
                            value: 61,
                        },
                    ],
                    xField: 'value',
                    yField: 'name',
                    seriesField: 'name',
                    xAxis: {
                        grid: null,
                        label: {
                            style: {
                                fill: '#00FFEAFF'
                            },
                        },
                        line: null,
                        tickLine: null,
                        subTickLine: null,
                        position: 'right',
                    },
                    yAxis: {
                        grid: null,
                        label: {
                            style: {
                                fill: '#00FFEAFF'
                            },
                        },
                        line: null,
                        tickLine: null,
                        subTickLine: null,
                        position: 'right',
                    },
                    color: '#00FFEA33',
                    legend: false,
                    maxBarWidth: 8,
                }
            },
            data: {
                sourceType: 'static',
                config: {
                    data: []
                }
            },
            animation: {},
            theme: {},
        };
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): { [key: string]: ClassType<any, any, any> } {
        return {
            'info': BaseInfo,
            'style': AntdBaseBarConfigStyle,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }
}

export default AntdBaseBarCore;