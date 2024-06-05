import React, {Component, useState} from 'react';
import {WritableRoseOptions} from "../types";
import {RoseOptions} from "@antv/g2plot";
import AntdCommonRoseController from "./AntdCommonRoseController";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import AntdCommonUtil from "../AntdCommonUtil";
import {AntdLegend} from "../config/legend/AntdLegend";
import {ShapeAttrs} from "@antv/g-base";
import LCGUIUtil from "../../../json-schema/LCGUIUtil";
import {ConfigType} from "../../../designer/right/ConfigContent";

export default class AntdRoseCommonStyleConfig extends Component<ConfigType> {

    roseGraphicsChange = (config: WritableRoseOptions) => {
        const controller = this.props.controller as AntdCommonRoseController;
        controller.update({style: config});
    }

    render() {
        const controller = this.props.controller as AntdCommonRoseController;
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
            data = Math.PI * (data as number) / 180;
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
                                config: {
                                    suffix: '°',
                                }
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
                                config: {
                                    suffix: '°',
                                },
                            },
                            {
                                key: 'sectorStyle',
                                children: [
                                    {
                                        key: 'stroke',
                                        type: 'color-picker',
                                        label: '描边色',
                                        value: config.sectorStyle?.stroke,
                                        config: {
                                            showText: true,
                                        }
                                    },
                                    {
                                        key: 'lineWidth',
                                        type: 'number-input',
                                        label: '描边宽',
                                        value: config.sectorStyle?.lineWidth,
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
                                config: {
                                    containerStyle: {gridColumn: '1 / 3'},
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
                                type: 'number-input',
                                label: '偏移',
                                value: _config.label?.offset || 0,
                            },
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'fontSize',
                                        type: 'number-input',
                                        label: '字号',
                                        value: (_config.label?.style as ShapeAttrs)?.fontSize || 12,
                                        config: {
                                            min: 0,
                                            max: 100,
                                        }
                                    },
                                    {
                                        key: 'fontWeight',
                                        type: 'number-input',
                                        label: '加粗',
                                        value: (_config.label?.style as ShapeAttrs)?.fontWeight || 500,
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
                                        value: (_config.label?.style as ShapeAttrs)?.fill,
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
                                value: _config.label?.autoRotate,
                            },
                            {
                                id: 'labelRotate',
                                key: 'rotate',
                                type: 'number-input',
                                label: '旋转角度',
                                rules: "{autoRotate} === 'false'",
                                value: _config.label?.rotate || 0,
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


export const AntdRoseFieldMapping: React.FC<ConfigType<AntdCommonRoseController>> = ({controller}) => {
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
