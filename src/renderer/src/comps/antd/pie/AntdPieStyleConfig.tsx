import React, {Component, useState} from 'react';
import AntdPieController from "./AntdPieController";
import {StatisticText} from "@antv/g2plot";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import AntdCommonUtil from "../../antd-common/AntdCommonUtil";
import {AntdLegend} from "../../antd-common/config/legend/AntdLegend";
import LCGUIUtil from "../../../json-schema/LCGUIUtil";
import {ShapeAttrs} from "@antv/g-base";
import {ConfigType} from "../../../designer/right/ConfigContent";

export default class AntdPieStyleConfig extends Component<ConfigType<AntdPieController>> {

    render() {
        const controller = this.props.controller as AntdPieController;
        return (
            <>
                <AntdPieGraphicsConfig controller={controller}/>
                <AntdLegend controller={controller}/>
            </>
        );
    }
}

export const AntdPieGraphicsConfig = (props: ConfigType<AntdPieController>) => {
    const {controller} = props;
    const config = controller.getConfig()!.style!;
    const [count, setCount] = useState(0);

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, dataKeyPath, dataFragment, reRender} = fieldChangeData;
        let {data} = fieldChangeData;
        if (id === 'startAngle' || id === 'endAngle') {
            data = (data as number) / 180 * Math.PI;
            controller.update(LCGUIUtil.createObjectFromArray(dataKeyPath, data));
        } else if (id === "titleSwitch") {
            if (data) {
                controller.update({
                    style: {
                        statistic: {
                            title: {
                                style: {fontSize: '12px', color: '#fff'},
                                content: '标题'
                            }
                        }
                    }
                });
            } else {
                controller.update({style: {statistic: {title: false}}});
            }
        } else if (id === "contentSwitch") {
            if (data) {
                controller.update({
                    style: {
                        statistic: {
                            content: {
                                style: {fontSize: '12px', color: '#fff'},
                                content: '内容'
                            }
                        }
                    }
                })
            } else {
                controller.update({style: {statistic: {content: false}}});
            }
        } else if (id === "labelRotate") {
            controller.update({style: {label: {rotate: (data as number) * Math.PI}}});
        } else {
            controller.update(dataFragment);
        }
        if (reRender)
            setCount(count + 1);
    }

    const schema: Control = {
        key: 'style',
        children: [
            {
                type: 'accordion',
                label: '图形',
                children: [
                    {
                        type: 'grid',
                        children: [
                            {
                                key: 'radius',
                                type: 'number-input',
                                label: '外径',
                                value: config.radius,
                                config: {
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                }
                            },
                            {
                                id: 'startAngle',
                                key: 'startAngle',
                                type: 'number-input',
                                label: '起始角',
                                value: (config.startAngle || 0) / Math.PI * 180,
                            },
                            {
                                key: 'innerRadius',
                                type: 'number-input',
                                label: '内径',
                                value: config.innerRadius,
                                config: {
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                }
                            },
                            {
                                id: 'endAngle',
                                key: 'endAngle',
                                type: 'number-input',
                                label: '结束角',
                                value: (config.endAngle || 2 * Math.PI) / Math.PI * 180,
                            },
                            {
                                key: 'pieStyle',
                                children: [
                                    {
                                        key: 'stroke',
                                        type: 'color-picker',
                                        label: '描边色',
                                        value: '#1c1c1c',
                                        config: {
                                            showText: true,
                                        }
                                    },
                                    {
                                        key: 'lineWidth',
                                        type: 'number-input',
                                        label: '描边宽',
                                        value: 0,
                                        config: {
                                            min: 0,
                                            max: 30,
                                        }
                                    },
                                ]
                            },
                            {
                                key: 'color',
                                type: 'color-mode',
                                label: '颜色',
                                value: '#1c1c1c',
                            },
                        ]
                    }
                ]
            },
            {
                key: 'statistic',
                type: 'accordion',
                label: '标题',
                children: [
                    {
                        key: 'title',
                        type: 'grid',
                        children: [
                            {
                                id: 'titleSwitch',
                                key: 'titleSwitch',
                                type: 'switch',
                                label: '开启',
                                value: !!config.statistic?.title,
                            },
                            {
                                rules: "{titleSwitch} === 'true'",
                                children: [
                                    {
                                        key: 'content',
                                        type: 'input',
                                        label: '内容',
                                        value: (config.statistic?.title as StatisticText)?.content,
                                    },
                                    {
                                        key: 'style',
                                        children: [
                                            {
                                                key: 'fontSize',
                                                type: 'number-input',
                                                label: '字号',
                                                value: parseInt(((config.statistic?.title as StatisticText)?.style as ShapeAttrs)?.fontSize + ''),
                                                config: {
                                                    min: 0,
                                                    max: 100,
                                                }
                                            },
                                            {
                                                key: 'fontWeight',
                                                type: 'number-input',
                                                label: '加粗',
                                                value: ((config.statistic?.title as StatisticText)?.style as ShapeAttrs)?.fontWeight || 500,
                                                config: {
                                                    min: 100,
                                                    max: 900,
                                                    step: 100
                                                }
                                            },
                                            {
                                                key: 'color',
                                                type: 'color-picker',
                                                label: '颜色',
                                                value: ((config.statistic?.title as StatisticText)?.style as ShapeAttrs)?.color,
                                                config: {
                                                    showText: true,
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        key: 'offsetX',
                                        type: 'number-input',
                                        label: 'x偏移',
                                        value: (config.statistic?.title as StatisticText)?.offsetX || 0,
                                    },
                                    {
                                        key: 'offsetY',
                                        type: 'number-input',
                                        label: 'y偏移',
                                        value: (config.statistic?.title as StatisticText)?.offsetY || 0,
                                    },
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                key: 'statistic',
                type: 'accordion',
                label: '内容',
                children: [
                    {
                        key: 'content',
                        type: 'grid',
                        children: [
                            {
                                id: 'contentSwitch',
                                key: 'contentSwitch',
                                type: 'switch',
                                label: '开启',
                                value: !!config.statistic?.content,
                            },
                            {
                                rules: "{contentSwitch} === 'true'",
                                children: [
                                    {
                                        key: 'content',
                                        type: 'input',
                                        label: '内容',
                                        value: (config.statistic?.content as StatisticText)?.content,
                                    },
                                    {
                                        key: 'style',
                                        children: [
                                            {
                                                key: 'fontSize',
                                                type: 'number-input',
                                                label: '字号',
                                                value: parseInt(((config.statistic?.content as StatisticText)?.style as ShapeAttrs)?.fontSize + ''),
                                                config: {
                                                    min: 0,
                                                    max: 100,
                                                }
                                            },
                                            {
                                                key: 'fontWeight',
                                                type: 'number-input',
                                                label: '加粗',
                                                value: ((config.statistic?.content as StatisticText)?.style as ShapeAttrs)?.fontWeight || 500,
                                                config: {
                                                    min: 100,
                                                    max: 900,
                                                    step: 100
                                                }
                                            },
                                            {
                                                key: 'color',
                                                type: 'color-picker',
                                                label: '颜色',
                                                value: ((config.statistic?.content as StatisticText)?.style as ShapeAttrs)?.color,
                                                config: {
                                                    showText: true,
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        key: 'offsetX',
                                        type: 'number-input',
                                        label: 'x偏移',
                                        value: (config.statistic?.content as StatisticText)?.offsetX || 0,
                                    },
                                    {
                                        key: 'offsetY',
                                        type: 'number-input',
                                        label: 'y偏移',
                                        value: (config.statistic?.content as StatisticText)?.offsetY || 0,
                                    },
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                type: 'accordion',
                label: '标签',
                children: [
                    {
                        key: 'label',
                        type: 'grid',
                        children: [
                            {
                                key: 'type',
                                type: 'select',
                                label: '位置',
                                value: (config.label as any)?.type || 'inner',
                                config: {
                                    options: [
                                        {value: 'inner', label: '内测'},
                                        {value: 'outer', label: '外侧'}]
                                }
                            },
                            {
                                key: 'offset',
                                type: 'number-input',
                                label: '偏移',
                                value: (config.label as any)?.offset || 0,
                                config: {
                                    min: 0,
                                    max: 100,
                                }
                            },
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'fontSize',
                                        type: 'number-input',
                                        label: '字号',
                                        value: parseInt(((config.label as any)?.style as ShapeAttrs)?.fontSize + ''),
                                        config: {
                                            min: 0,
                                            max: 100,
                                        }
                                    },
                                    {
                                        key: 'fontWeight',
                                        type: 'number-input',
                                        label: '加粗',
                                        value: ((config.label as any)?.style as ShapeAttrs)?.fontWeight || 500,
                                        config: {
                                            min: 100,
                                            max: 900,
                                            step: 100
                                        }
                                    },
                                    {
                                        key: 'fill',
                                        type: 'color-picker',
                                        label: '颜色',
                                        value: ((config.label as any)?.style as ShapeAttrs)?.fill,
                                        config: {
                                            showText: true,
                                        }
                                    }
                                ]
                            },
                            {
                                key: 'autoRotate',
                                type: 'switch',
                                label: '自动旋转',
                                reRender: true,
                                value: (config.label as any)?.autoRotate,
                            },
                            {
                                id: 'labelRotate',
                                key: 'rotate',
                                type: 'number-input',
                                label: '旋转角度',
                                rules: "{autoRotate} === 'false'",
                                value: (config.label as any)?.rotate || 0,
                                config: {
                                    min: 0,
                                    max: 2,
                                    step: 0.01
                                }
                            },
                        ]
                    }
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    );
}


export const AntdPieFieldMapping: React.FC<ConfigType<AntdPieController>> = ({controller}) => {
    const config = controller.config?.style;
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const schema: Control = {
        type: 'grid',
        key: 'style',
        children: [
            {
                type: 'select',
                key: 'angleField',
                label: '角度字段',
                value: config?.angleField,
                config: {
                    options,
                }
            },
            {
                type: 'select',
                key: 'colorField',
                label: '颜色字段',
                value: config?.colorField,
                config: {
                    options,
                }
            },
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        controller.update(fieldChangeData.dataFragment);
    }

    return <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
}
