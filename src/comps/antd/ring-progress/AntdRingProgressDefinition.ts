import React from "react";
import {
    AbstractComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import AntdRingProgressController, {AntdRingProgressProps} from "./AntdRingProgressController";
import ringProgressImg from './ring-progress.png';
import {BaseInfoType} from "../../../designer/DesignerType";
import {AntdCommonDefinition} from "../../antd-common/AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));
const AntdRingProgressStyleConfig = React.lazy(() => import("./AntdRingProgressConfig").then((module) => ({default: module.AntdRingProgressStyleConfig})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));


class AntdRingProgressDefinition extends AntdCommonDefinition<AntdRingProgressController, AntdRingProgressProps> {

    getComponent(): ClazzTemplate<AntdRingProgressController> | null {
        return AntdRingProgressController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList().filter((menuInfo) => menuInfo.key !== "mapping");
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdRingProgressStyleConfig,
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
                percent: 0.7,
                color: ["#00b5ffff", "#c5ebfbff"],
                statistic: {
                    content: {
                        style: {
                            fill: "#fff",
                            fontSize: "24px",
                            fontWeight: 400,
                        },
                        offsetY: -7,
                    },
                    title: {
                        style: {
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#fff",
                        },
                        content: "当前进度",
                        offsetY: -11,
                    },
                },
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000,
                    },
                },
                progressStyle: {},
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: 0.7,
                },
            },
        };
    }
}

export default AntdRingProgressDefinition;
