import React, {Component, lazy, useState} from 'react';
import {Axis} from "@antv/g2plot";
import {isEqual} from "lodash";
import {Control} from "../../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI";
import {ShapeAttrs} from "@antv/g-base";

const Accordion = lazy(() => import("../../../../json-schema/ui/accordion/Accordion"));
const Radio = lazy(() => import("../../../../json-schema/ui/radio/Radio"));


interface AxisConfigProps {
    config?: Axis;
    onChange: (data?: Axis) => void;
    title?: string;
}

/**
 * 轴线配置项
 */
class AxisConfig extends Component<AxisConfigProps> {
    defaultData: Axis = {
        label: {
            style: {
                fill: "#00FFEAFF"
            }
        },
        line: {
            style: {
                stroke: "#00dbffff",
                lineWidth: 1
            }
        },
    }
    oldData: Axis | undefined = undefined;
    emptyData: Axis = {
        grid: null,
        line: null,
        title: null,
        label: null,
        tickLine: null,
        subTickLine: null,
    }

    constructor(props: AxisConfigProps) {
        super(props);
        this.oldData = {...props?.config} || null;
    }

    render() {
        const {config, title = '坐标轴', onChange} = this.props;
        const {grid, line, label, title: _title, tickLine, subTickLine} = config || {};
        const enable = !!(grid || line || label || _title || tickLine || subTickLine);
        return (
            <Accordion label={title} defaultValue={enable}
                       onChange={value => {
                           onChange(value ?
                               (isEqual(this.oldData, this.emptyData) ?
                                   this.defaultData :
                                   this.oldData) :
                               this.emptyData)
                       }}>

                <Radio label={'位置'}
                       defaultValue={(config as any)?.position || 'right'}
                       containerStyle={{marginBottom: 10}}
                       onChange={(value => onChange({position: value as any["position"]}))}
                       options={[{label: '上', value: 'top'},
                           {label: '下', value: 'bottom'},
                           {label: '左', value: 'left'},
                           {label: '右', value: 'right'}]}/>
                <AxisText config={(config as any)?.label!} onChange={(data => onChange({label: data}))}/>
                <AxisTitle config={(config as any)?.title!} onChange={(data => onChange({title: data}))}/>
                <AxisLine config={(config as any)?.line!} onChange={(data => onChange({line: data}))}/>
                <AxisGridLine config={(config as any)?.grid!} onChange={(data => onChange({grid: data}))}/>
                <AxisTickLine config={(config as any)?.tickLine!}
                              onChange={(data => onChange({tickLine: data}))}/>
                <AxisSubTickLine config={(config as any)?.subTickLine!}
                                 onChange={(data => onChange({subTickLine: data}))}/>
            </Accordion>
        );
    }
}

export interface AxisSubTickLineProps {
    config: any;
    onChange: (data: any | null) => void;
}

export const AxisSubTickLine: React.FC<AxisSubTickLineProps> = ({config, onChange}) => {

    const [_config, setConfig] = useState<any | null>(config);

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data} = fieldChangeData;
        if (id === 'subTickLineSwitch') {
            //处理开关
            if (data) {
                const defaultConfig = {
                    count: 5,
                    length: 1,
                    style: {stroke: '#6e6e6e', lineWidth: 1} as ShapeAttrs
                };
                onChange(defaultConfig);
                setConfig(defaultConfig);
            } else {
                onChange(null);
                setConfig(null);
            }
        } else {
            onChange(fieldChangeData.dataFragment);
        }
    }

    const schema: Control = {
        type: 'card-panel',
        label: '子刻度',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        key: 'subTickLineSwitch',
                        id: 'subTickLineSwitch',
                        type: 'switch',
                        label: '开启',
                        value: !!_config,
                    },
                    {
                        rules: "{subTickLineSwitch}==='true'",
                        key: 'count',
                        type: 'number-input',
                        label: '数量',
                        value: _config?.count,
                        config: {
                            min: 0,
                            max: 100,
                        }
                    },
                    {
                        rules: "{subTickLineSwitch}==='true'",
                        key: 'length',
                        type: 'number-input',
                        label: '长度',
                        value: _config?.length,
                        config: {
                            min: 0,
                            max: 10,
                        }
                    },
                    {
                        rules: "{subTickLineSwitch}==='true'",
                        key: 'style',
                        children: [
                            {
                                key: 'lineWidth',
                                type: 'number-input',
                                label: '宽度',
                                value: (_config?.style as ShapeAttrs)?.lineWidth,
                                config: {
                                    min: 0,
                                    max: 10,
                                }
                            },
                            {
                                key: 'stroke',
                                type: 'color-picker',
                                label: '颜色',
                                value: (_config?.style as ShapeAttrs)?.stroke,
                                config: {
                                    showText: true,
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}


export interface AxisTickLineProps {
    config: any;
    onChange: (data: any | null) => void;
}

export const AxisTickLine: React.FC<AxisTickLineProps> = ({config, onChange}) => {

    const [_config, setConfig] = useState<any | null>(config);

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data} = fieldChangeData;
        if (id === 'tickLineSwitch') {
            //处理开关
            if (data) {
                const defaultConfig = {
                    alignTick: true,
                    length: 1,
                    style: {stroke: '#6e6e6e', lineWidth: 1} as ShapeAttrs
                };
                onChange(defaultConfig);
                setConfig(defaultConfig);
            } else {
                onChange(null);
                setConfig(null);
            }
        } else {
            onChange(fieldChangeData.dataFragment);
        }
    }
    const schema: Control = {
        type: 'card-panel',
        label: '刻度线',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        key: 'tickLineSwitch',
                        id: 'tickLineSwitch',
                        type: 'switch',
                        label: '开启',
                        value: !!_config,
                    },
                    {
                        key: 'alignTick',
                        rules: "{tickLineSwitch}==='true'",
                        type: 'switch',
                        label: '对齐',
                        value: (_config as any)?.alignTick,
                    },
                    {
                        key: 'length',
                        rules: "{tickLineSwitch}==='true'",
                        type: 'number-input',
                        label: '长度',
                        value: (_config as any)?.length,
                        config: {
                            min: 0,
                            max: 10,
                        }
                    },
                    {
                        key: 'style',
                        rules: "{tickLineSwitch}==='true'",
                        children: [
                            {
                                key: 'lineWidth',
                                type: 'number-input',
                                label: '宽度',
                                value: (_config?.style as ShapeAttrs)?.lineWidth,
                                config: {
                                    min: 0,
                                    max: 10,
                                }
                            },
                            {
                                key: 'stroke',
                                type: 'color-picker',
                                label: '颜色',
                                value: (_config?.style as ShapeAttrs)?.stroke,
                                config: {
                                    showText: true,
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export interface AxisGridLineProps {
    config: any;
    onChange: (data: any | null) => void;
}


export const AxisGridLine: React.FC<AxisGridLineProps> = ({config, onChange}) => {

    const [_config, setConfig] = useState<any | null>(config);

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data} = fieldChangeData;
        if (id === 'gridLineSwitch') {
            //处理开关
            if (data) {
                const defaultConfig = {
                    alignTick: true,
                    line: {style: {stroke: '#5c5c5c', lineWidth: 1} as ShapeAttrs, type: 'line'}
                }
                onChange(defaultConfig);
                setConfig(defaultConfig);
            } else {
                onChange(null);
                setConfig(null);
            }
        } else {
            onChange(fieldChangeData.dataFragment);
        }
    }

    const schema: Control = {
        type: 'card-panel',
        label: '网格线',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        key: 'gridLineSwitch',
                        id: 'gridLineSwitch',
                        type: 'switch',
                        label: '开启',
                        value: !!_config,
                    },
                    {
                        rules: "{gridLineSwitch} === 'true'",
                        key: 'alignTick',
                        type: 'switch',
                        label: '对齐',
                        value: (_config as any)?.alignTick,
                    },
                    {
                        rules: "{gridLineSwitch} === 'true'",
                        key: 'line',
                        children: [
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'lineWidth',
                                        type: 'number-input',
                                        label: '宽度',
                                        value: (_config?.line?.style as ShapeAttrs)?.lineWidth,
                                        config: {
                                            min: 0,
                                            max: 10,
                                        }
                                    },
                                    {
                                        key: 'stroke',
                                        type: 'color-picker',
                                        label: '颜色',
                                        value: (_config?.line?.style as ShapeAttrs)?.stroke,
                                        config: {
                                            showText: true,
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export interface AxisLIneProps {
    config: any;
    onChange: (data: any | null) => void;
}

export const AxisLine: React.FC<AxisLIneProps> = ({config, onChange}) => {

    const [_config, setConfig] = useState<any | null>(config);

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data} = fieldChangeData;
        if (id === 'lineSwitch') {
            //处理开关
            if (data) {
                onChange({style: {stroke: '#595959', lineWidth: 1}});
                setConfig({style: {stroke: '#595959', lineWidth: 1}});
            } else {
                onChange(null);
                setConfig(null);
            }
        } else {
            onChange(fieldChangeData.dataFragment);
        }
    }

    const schema: Control = {
        type: 'card-panel',
        label: '轴线',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        key: 'lineSwitch',
                        id: 'lineSwitch',
                        type: 'switch',
                        label: '开启',
                        value: !!_config,
                    },
                    {
                        key: 'style',
                        rules: "{lineSwitch} === 'true'",
                        children: [
                            {
                                key: 'lineWidth',
                                type: 'number-input',
                                label: '宽度',
                                value: _config?.style?.lineWidth || 1,
                                config: {
                                    min: 0,
                                    max: 10,
                                }
                            },
                            {
                                key: 'stroke',
                                type: 'color-picker',
                                label: '颜色',
                                value: _config?.style?.stroke || '#595959',
                                config: {
                                    showText: true,
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export interface AxisTitleProps {
    config: any;
    onChange: (data?: any | null) => void;
}

export const AxisTitle: React.FC<AxisTitleProps> = ({config, onChange}) => {

    const [_config, setConfig] = useState<any | null>(config);

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data} = fieldChangeData;
        if (id === 'titleSwitch') {
            //处理开关
            if (data) {
                onChange({text: '标题', offset: 0, style: {fill: '#d2d2d2', fontSize: 12}});
                setConfig({text: '标题', offset: 0, style: {fill: '#d2d2d2', fontSize: 12}});
            } else {
                onChange(null);
                setConfig(null);
            }
        } else {
            onChange(fieldChangeData.dataFragment);
        }
    }

    const schema: Control = {
        type: 'card-panel',
        label: '标题',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        key: 'titleSwitch',
                        id: 'titleSwitch',
                        type: 'switch',
                        label: '开启',
                        reRender: true,
                        value: !!_config,
                    },
                    {
                        rules: "{titleSwitch} === 'true'",
                        children: [
                            {
                                key: 'position',
                                type: 'select',
                                label: '位置',
                                value: _config?.position || 'center',
                                config: {
                                    options: [
                                        {value: 'start', label: '前'},
                                        {value: 'center', label: '中'},
                                        {value: 'end', label: '后'}]
                                }
                            },
                            {
                                key: 'text',
                                type: 'input',
                                label: '内容',
                                value: _config?.text || '标题',
                            },
                            {
                                key: 'offset',
                                type: 'number-input',
                                label: '偏移',
                                value: _config?.offset || 0,
                            },
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'fontSize',
                                        type: 'number-input',
                                        label: '字号',
                                        value: 12,
                                        config: {
                                            min: 1,
                                            max: 50,
                                        }
                                    },
                                    {
                                        key: 'fill',
                                        type: 'color-picker',
                                        label: '颜色',
                                        value: '#1c1c1c',
                                        config: {
                                            showText: true,
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export interface AxisTextProps {
    config: any;
    onChange: (data: any) => void;
}

export const AxisText: React.FC<AxisTextProps> = ({config, onChange}) => {

    const {offset, style, rotate} = config || {};

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        onChange(fieldChangeData.dataFragment);
    }

    const schema: Control = {
        type: 'card-panel',
        label: '文本',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        key: 'rotate',
                        type: 'number-input',
                        label: '角度',
                        value: rotate || 0,
                        config: {
                            min: 0,
                            step: 0.1,
                            max: 360,
                        }
                    },
                    {
                        key: 'offset',
                        type: 'number-input',
                        label: '偏移',
                        value: offset || 0,
                    },
                    {
                        key: 'style',
                        children: [
                            {
                                key: 'fontSize',
                                type: 'number-input',
                                label: '字号',
                                value: (style as ShapeAttrs)?.fontSize || 12,
                                config: {
                                    min: 1,
                                    max: 50,
                                }
                            },
                            {
                                key: 'fill',
                                type: 'color-picker',
                                label: '颜色',
                                value: (style as ShapeAttrs)?.fill || '#1c1c1c',
                                config: {
                                    showText: true,
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export default AxisConfig;