import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseMenuMapping, ClazzTemplate} from "../../common-component/common-types";
import pieImg from './pie.png';
import {BaseInfoType} from "../../../designer/DesignerType";
import AntdPie, {AntdPieProps} from "./AntdPie";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdPieConfig = React.lazy(() => import("./AntdPieConfig").then((module) => ({default: module.AntdPieConfig})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

class AntdPieDefinition extends AbstractCustomComponentDefinition<AntdPie, BaseMenuMapping, AntdPieProps> {

    getComponent(): ClazzTemplate<AntdPie> | null {
        return AntdPie;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): BaseMenuMapping | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdPieConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
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
            {type: '分类一', value: 27},
            {type: '分类二', value: 25},
            {type: '分类三', value: 18},
            {type: '分类四', value: 15},
            {type: '分类五', value: 10},
            {type: '其他', value: 5},
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
                angleField: 'value',
                colorField: 'type',
                radius: 1,
                innerRadius: 0.6,
                label: {
                    type: 'inner',
                    offset: '-50%',
                    content: '{value}',
                    style: {
                        textAlign: 'center',
                        fontSize: 14,
                    },
                },
                interactions: [{type: 'element-selected'}, {type: 'element-active'}],
                statistic: {
                    title: false,
                    content: {
                        style: {
                            whiteSpace: 'pre-wrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '14px',
                            color: '#fff'
                        },
                        content: 'AntV\nG2Plot',
                    },
                },
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

export default AntdPieDefinition;
