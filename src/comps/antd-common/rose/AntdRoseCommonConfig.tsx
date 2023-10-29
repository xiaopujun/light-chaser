import React, {Component, useState} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {WritableRoseOptions} from "../types";
import {RoseOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AntdCommonRose from "./AntdCommonRose";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import AntdCommonUtil from "../AntdCommonUtil";
import {AntdLegend} from "../config/legend/AntdLegend";
import {ShapeAttrs} from "@antv/g-base";
import LCGUIUtil from "../../../json-schema/LCGUIUtil";

export default class AntdRoseCommonStyleConfig extends Component<ConfigType> {

    roseGraphicsChange = (config: WritableRoseOptions) => {
        const controller = this.props.controller as AntdCommonRose;
        controller.update({style: config});
    }

    legendChange = (legend: Legend) => {
        const controller = this.props.controller as AntdCommonRose;
        controller.update({style: {legend}});
    }

    render() {
        const controller = this.props.controller as AntdCommonRose;
        const roseConfig = controller.getConfig()!.style as RoseOptions;
        return (
            <>
                <AntdLegend controller={controller}/>
                <AntdRoseGraphicsConfig onChange={this.roseGraphicsChange} config={roseConfig}/>
            </>
        );
    }
}

export interface AntdRoseGraphicsConfigProps {
    config: any;
    onChange: (config: any) => void;
}

export const AntdRoseGraphicsConfig: React.FC<AntdRoseGraphicsConfigProps> = ({config, onChange}) => {

    const [_config, setConfig] = useState(config);

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        let {id, data, dataKeyPath, dataFragment, reRender} = fieldChangeData;
        if (id === 'startAngle' || id === 'endAngle') {
            data = Math.PI * (data as number);
            onChange && onChange(LCGUIUtil.createObjectFromArray(dataKeyPath, data));
        } else if (id === "labelRotate") {
            onChange({label: {rotate: (data as number) * Math.PI}});
        } else {
            onChange && onChange(dataFragment);
        }
        if (reRender)
            setConfig({..._config, ...dataFragment});
    }

    const schema: Control = {
        children: [
            {
                type: 'accordion',
                label: '图形',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'radius',
                                type: 'input',
                                label: '外径',
                                value: config.radius,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                }
                            },
                            {
                                id: 'startAngle',
                                key: 'startAngle',
                                type: 'input',
                                label: '起始角',
                                value: (config.startAngle || 0) / Math.PI,
                                config: {
                                    suffix: 'Π',
                                    type: 'number',
                                    min: 0,
                                    max: 2,
                                    step: 0.01
                                }
                            },
                            {
                                key: 'innerRadius',
                                type: 'input',
                                label: '内径',
                                value: config.innerRadius,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                }
                            },
                            {
                                id: 'endAngle',
                                key: 'endAngle',
                                type: 'input',
                                label: '结束角',
                                value: (config.endAngle || 2 * Math.PI) / Math.PI,
                                config: {
                                    suffix: 'Π',
                                    type: 'number',
                                    min: 0,
                                    max: 2,
                                    step: 0.01
                                }
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
                                            width: '100%',
                                            radius: 3,
                                            showBorder: true,
                                            showText: true,
                                            height: 16,
                                            hideControls: true
                                        }
                                    },
                                    {
                                        key: 'lineWidth',
                                        type: 'input',
                                        label: '描边宽',
                                        value: 0,
                                        config: {
                                            type: 'number',
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
                                config: {
                                    gridColumn: '1 / 3',
                                }
                            },
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
                        config: {columns: 2},
                        children: [
                            {
                                key: 'offset',
                                type: 'input',
                                label: '偏移',
                                value: _config.label?.offset || 0,
                                config: {
                                    type: 'number',
                                }
                            },
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'fontSize',
                                        type: 'input',
                                        label: '字号',
                                        value: (_config.label?.style as ShapeAttrs)?.fontSize || 12,
                                        config: {
                                            type: 'number',
                                            min: 0,
                                            max: 100,
                                        }
                                    },
                                    {
                                        key: 'fontWeight',
                                        type: 'input',
                                        label: '加粗',
                                        value: (_config.label?.style as ShapeAttrs)?.fontWeight || 500,
                                        config: {
                                            type: 'number',
                                            min: 100,
                                            max: 900,
                                            step: 100
                                        }
                                    },
                                    {
                                        key: 'fill',
                                        type: 'color-picker',
                                        label: '颜色',
                                        value: (_config.label?.style as ShapeAttrs)?.fill,
                                        config: {
                                            width: '100%',
                                            radius: 3,
                                            showBorder: true,
                                            showText: true,
                                            height: 16,
                                            hideControls: true
                                        }
                                    }
                                ]
                            },
                            {
                                key: 'autoRotate',
                                type: 'switch',
                                label: '自动旋转',
                                reRender: true,
                                value: _config.label?.autoRotate,
                            },
                            {
                                id: 'labelRotate',
                                key: 'rotate',
                                type: 'input',
                                label: '旋转角度',
                                rules: "{autoRotate} === 'false'",
                                value: _config.label?.rotate || 0,
                                config: {
                                    type: 'number',
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


export const AntdRoseFieldMapping: React.FC<ConfigType<AntdCommonRose>> = ({controller}) => {
    const config = controller.getConfig()?.style;
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const schema: Control = {
        type: 'grid',
        config: {columns: 2},
        children: [
            {
                key: 'xField',
                type: 'select',
                label: 'X字段',
                value: config?.xField,
                config: {options}
            },
            {
                key: 'yField',
                type: 'select',
                label: 'Y字段',
                value: config?.yField,
                config: {options}
            },
            {
                key: 'seriesField',
                type: 'select',
                label: '分组字段',
                value: config?.seriesField,
                config: {options}
            }
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        controller.update(fieldChangeData.dataFragment);
    }

    return <LCGUI schema={schema} onFieldChange={onFieldChange}/>
}
