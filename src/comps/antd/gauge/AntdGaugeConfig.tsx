import {ConfigType} from "../../../designer/right/ConfigContent";
import {Control} from "../../../json-schema/SchemaTypes.ts";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI.tsx";
import AntdGaugeController from "./AntdGaugeController.ts";
import LCGUIUtil from "../../../json-schema/LCGUIUtil.ts";
import {Indicator} from "@antv/g2plot/lib/plots/gauge/types";
import {CSSProperties} from "react";
import {StatisticText} from "@antv/g2plot";

export default function AntdGaugeConfig(props: ConfigType<AntdGaugeController>) {
    const {controller} = props;
    const config = controller.getConfig()?.style;

    const schema: Control = {
        key: 'style',
        children: [
            {
                type: 'card-panel',
                label: '基础样式',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'radius',
                                type: 'number-input',
                                label: '外半径',
                                value: config?.radius,
                                config: {
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                },
                            },
                            {
                                id: 'startAngle',
                                key: 'startAngle',
                                type: 'number-input',
                                label: '起始角度',
                                value: config!.startAngle! / Math.PI * 180,
                            },
                            {
                                key: 'innerRadius',
                                type: 'number-input',
                                label: '内半径',
                                value: config?.innerRadius,
                                config: {
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                },
                            },

                            {
                                id: 'endAngle',
                                key: 'endAngle',
                                type: 'number-input',
                                label: '结束角度',
                                value: config!.endAngle! / Math.PI * 180,
                            }
                        ]
                    }
                ]
            },
            {
                type: 'card-panel',
                label: '图形样式',
                key: 'range',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'color',
                                type: 'color-mode',
                                label: '颜色',
                                value: config?.range?.color,
                                config: {
                                    containerStyle: {
                                        gridColumn: '1/3',
                                    }
                                }
                            },
                        ]
                    }
                ]
            },
            {
                type: 'card-panel',
                label: '指针样式',
                key: 'indicator',
                children: [
                    {
                        key: 'pointer',
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'stroke',
                                        type: 'color-picker',
                                        label: '颜色',
                                        value: (config?.indicator as Indicator)?.pointer!.style?.stroke,
                                        config: {
                                            showText: true,
                                        }
                                    },
                                    {
                                        key: 'lineWidth',
                                        type: 'number-input',
                                        label: '线宽',
                                        value: (config?.indicator as Indicator)?.pointer!.style?.lineWidth,
                                        config: {
                                            min: 0,
                                            max: 10,
                                            step: 1
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                type: 'card-panel',
                label: '指针原点',
                key: 'indicator',
                children: [
                    {
                        key: 'pin',
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'stroke',
                                        type: 'color-picker',
                                        label: '描边',
                                        value: (config?.indicator as Indicator)?.pin!.style?.stroke,
                                        config: {
                                            showText: true,
                                        }
                                    },
                                    {
                                        key: 'fill',
                                        type: 'color-picker',
                                        label: '填充',
                                        value: (config?.indicator as Indicator)?.pin!.style?.fill,
                                        config: {
                                            showText: true,
                                        }
                                    },
                                    {
                                        key: 'r',
                                        type: 'number-input',
                                        label: '半径',
                                        value: (config?.indicator as Indicator)?.pin!.style?.r,
                                        config: {
                                            min: 0,
                                        }
                                    },
                                    {
                                        key: 'lineWidth',
                                        type: 'number-input',
                                        label: '描边宽',
                                        value: (config?.indicator as Indicator)?.pin!.style?.lineWidth,
                                        config: {
                                            min: 0,
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                type: 'card-panel',
                label: '主刻度',
                key: 'axis',
                children: [
                    {
                        key: 'tickLine',
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'stroke',
                                        type: 'color-picker',
                                        label: '颜色',
                                        value: (config?.axis as any)?.tickLine?.style?.stroke,
                                        config: {
                                            showText: true,
                                        }
                                    },
                                    {
                                        key: 'lineWidth',
                                        type: 'number-input',
                                        label: '宽度',
                                        value: (config?.axis as any)?.tickLine?.style?.lineWidth,
                                        config: {
                                            min: 0,
                                        }
                                    }
                                ]
                            },
                            {
                                key: 'length',
                                type: 'number-input',
                                label: '长度',
                                value: (config?.axis as any)?.tickLine?.length,
                            }
                        ]
                    }
                ]
            },
            {
                type: 'card-panel',
                label: '子刻度',
                key: 'axis',
                children: [
                    {
                        key: 'subTickLine',
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'stroke',
                                        type: 'color-picker',
                                        label: '颜色',
                                        value: (config?.axis as any)?.subTickLine?.style?.stroke,
                                        config: {
                                            showText: true,
                                        }
                                    },
                                    {
                                        key: 'lineWidth',
                                        type: 'number-input',
                                        label: '宽度',
                                        value: (config?.axis as any)?.subTickLine?.style?.lineWidth,
                                        config: {
                                            min: 0,
                                        }
                                    }
                                ]
                            },
                            {
                                key: 'length',
                                type: 'number-input',
                                label: '长度',
                                value: (config?.axis as any)?.subTickLine?.length,
                            },
                            {
                                key: 'count',
                                type: 'number-input',
                                label: '数量',
                                value: (config?.axis as any)?.subTickLine?.count,
                                config: {
                                    min: 0,
                                }
                            }
                        ]
                    }
                ]
            },
            {
                type: 'card-panel',
                label: '文本',
                key: 'statistic',
                children: [
                    {
                        key: 'content',
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'color',
                                        type: 'color-picker',
                                        label: '颜色',
                                        value: ((config?.statistic?.content as StatisticText)?.style as CSSProperties)?.color,
                                        config: {
                                            showText: true,
                                        }
                                    },
                                    {
                                        key: 'fontSize',
                                        type: 'number-input',
                                        label: '字号',
                                        value: parseInt(((config?.statistic?.content as StatisticText)?.style as CSSProperties)?.fontSize as string),
                                        config: {
                                            min: 0,
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },

        ]
    };

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        let {dataFragment, id, data, dataKeyPath} = fieldChangeData;
        if (id === 'startAngle' || id === 'endAngle')
            dataFragment = LCGUIUtil.createObjectFromArray(dataKeyPath, Number(data!) / 180 * Math.PI);
        controller.update(dataFragment);
    }

    return <LCGUI schema={schema} onFieldChange={onFieldChange}/>;
}