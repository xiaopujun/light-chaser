import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import {AntdBaseMenuMapping} from "../../antd-common/types";
import AntdRingProgress, {AntdRingProgressProps} from "./AntdRingProgress";
import ringProgressImg from './ring-progress.png';
import {BaseInfoType} from "../../../designer/DesignerType";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdRingProgressConfig = React.lazy(() => import("./AntdRingProgressConfig").then((module) => ({default: module.AntdRingProgressConfig})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


class AntdRingProgressDefinition extends AbstractCustomComponentDefinition<AntdRingProgress, AntdBaseMenuMapping, AntdRingProgressProps> {

    getComponent(): ClazzTemplate<AntdRingProgress> | null {
        return AntdRingProgress;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): AntdBaseMenuMapping | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdRingProgressConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd迷你环图",
            compKey: "AntdRingProgress",
            type: "进度图",
            typeKey: "progress",
            desc: "基于Antd Designer实现的迷你环图组件",
        };
    }

    getChartImg(): string | null {
        return ringProgressImg;
    }

    getInitConfig(): AntdRingProgressProps {
        return {
            info: {
                id: "",
                name: 'Antd迷你环图',
                type: 'AntdRingProgress',
                desc: '基于Antd Designer实现的迷你环图组件',
            },
            style: {
                autoFit: true,
                percent: 0.7,
                color: ['#008591', '#E8EDF3'],
                statistic: {
                    content: {
                        style: {
                            fill: '#fff',
                        }
                    }
                },
                animation: {
                    appear: {
                        animation: 'wave-in',
                        duration: 3000,
                    },
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

export default AntdRingProgressDefinition;
