import React, {Component} from 'react';
import './AxisConfig.less';
import {Axis} from "@antv/g2plot";
import {Types} from "@antv/g2";
import {AxisLabelCfg, AxisLineCfg, AxisSubTickLineCfg, AxisTickLineCfg, AxisTitleCfg} from "@antv/component/esm";
import {AxisGridCfg} from "@antv/g2/esm/interface";
import {isEqual} from "lodash";
import {Control} from "../../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI";
import Accordion from "../../../../ui/accordion/Accordion";
import Radio from "../../../../ui/radio/Radio";


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
            <Accordion label={title} showSwitch={true} defaultValue={enable}
                       onChange={value => {
                           onChange(value ?
                               (isEqual(this.oldData, this.emptyData) ?
                                   this.defaultData :
                                   this.oldData) :
                               this.emptyData)
                       }}>

                <Radio padding={'7px 0 10px 0'} label={'位置'}
                       defaultValue={(config as Types.AxisCfg)?.position || 'right'}
                       onChange={(value => onChange({position: value as Types.AxisCfg["position"]}))}
                       options={[{label: '上', value: 'top'},
                           {label: '下', value: 'bottom'},
                           {label: '左', value: 'left'},
                           {label: '右', value: 'right'}]}/>
                <AxisText config={(config as Types.AxisCfg)?.label!} onChange={(data => onChange({label: data}))}/>
                <AxisTitle config={(config as Types.AxisCfg)?.title!} onChange={(data => onChange({title: data}))}/>
                <AxisLine config={(config as Types.AxisCfg)?.line!} onChange={(data => onChange({line: data}))}/>
                <AxisGridLine config={(config as Types.AxisCfg)?.grid!} onChange={(data => onChange({grid: data}))}/>
                <AxisTickLine config={(config as Types.AxisCfg)?.tickLine!}
                              onChange={(data => onChange({tickLine: data}))}/>
                <AxisSubTickLine config={(config as Types.AxisCfg)?.subTickLine!}
                                 onChange={(data => onChange({subTickLine: data}))}/>
            </Accordion>
        );
    }
}

export interface AxisSubTickLineProps {
    config: AxisSubTickLineCfg;
    onChange: (data: AxisSubTickLineCfg | null) => void;
}

export const AxisSubTickLine: React.FC<AxisSubTickLineProps> = ({config, onChange}) => {

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        type: 'item-panel',
        label: '子刻度',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        key: 'enable',
                        type: 'switch',
                        label: '开启',
                        value: true,
                    },
                    {
                        type: 'input',
                        label: '数量',
                        value: 5,
                        config: {
                            type: 'number',
                            min: 0,
                            max: 100,
                        }
                    },
                    {
                        type: 'input',
                        label: '长度',
                        value: 2,
                        config: {
                            type: 'number',
                            min: 0,
                            max: 10,
                        }
                    },
                    {
                        type: 'input',
                        label: '宽度',
                        value: 1,
                        config: {
                            type: 'number',
                            min: 0,
                            max: 10,
                        }
                    },
                    {
                        type: 'color-picker',
                        label: '颜色',
                        value: '#1c1c1c',
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
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}


export interface AxisTickLineProps {
    config: AxisTickLineCfg;
    onChange: (data: AxisTickLineCfg | null) => void;
}

export const AxisTickLine: React.FC<AxisTickLineProps> = ({config, onChange}) => {

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }
    const schema: Control = {
        type: 'item-panel',
        label: '刻度线',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        key: 'enable',
                        type: 'switch',
                        label: '开启',
                        value: true,
                    },
                    {
                        type: 'switch',
                        label: '对齐',
                        value: true,
                    },
                    {
                        type: 'input',
                        label: '长度',
                        value: 5,
                        config: {
                            type: 'number',
                            min: 0,
                            max: 10,
                        }
                    },
                    {
                        type: 'input',
                        label: '宽度',
                        value: 2,
                        config: {
                            type: 'number',
                            min: 0,
                            max: 10,
                        }
                    },
                    {
                        type: 'color-picker',
                        label: '颜色',
                        value: '#1c1c1c',
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
            }
        ]
    }
    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export interface AxisGridLineProps {
    config: AxisGridCfg;
    onChange: (data: AxisGridCfg | null) => void;
}


export const AxisGridLine: React.FC<AxisGridLineProps> = ({config, onChange}) => {

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        type: 'item-panel',
        label: '网格线',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        key: 'enable',
                        type: 'switch',
                        label: '开启',
                        value: true,
                    },
                    {
                        type: 'switch',
                        label: '对齐',
                        value: true,
                    },
                    {
                        type: 'input',
                        label: '宽度',
                        value: 2,
                        config: {
                            type: 'number',
                            min: 0,
                            max: 10,
                        }
                    },
                    {
                        type: 'color-picker',
                        label: '颜色',
                        value: '#1c1c1c',
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
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export interface AxisLIneProps {
    config: AxisLineCfg;
    onChange: (data: AxisLineCfg | null) => void;
}

export const AxisLine: React.FC<AxisLIneProps> = ({config, onChange}) => {

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        type: 'item-panel',
        label: '轴线',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        key: 'enable',
                        type: 'switch',
                        label: '开启',
                        value: true,
                    },
                    {
                        type: 'input',
                        label: '宽度',
                        value: 2,
                        config: {
                            type: 'number',
                            min: 0,
                            max: 10,
                        }
                    },
                    {
                        type: 'color-picker',
                        label: '颜色',
                        value: '#1c1c1c',
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
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export interface AxisTitleProps {
    config: AxisTitleCfg;
    onChange: (data?: AxisTitleCfg | null) => void;
}

export const AxisTitle: React.FC<AxisTitleProps> = ({config, onChange}) => {

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        type: 'item-panel',
        label: '标题',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        key: 'enable',
                        type: 'switch',
                        label: '开启',
                        value: true,
                    },
                    {
                        type: 'select',
                        label: '位置',
                        value: 'end',
                        config: {
                            options: [
                                {value: 'start', label: '前'},
                                {value: 'center', label: '中'},
                                {value: 'end', label: '后'}]
                        }
                    },
                    {
                        type: 'input',
                        label: '内容',
                        value: '',
                    },
                    {
                        type: 'input',
                        label: '字号',
                        value: 12,
                        config: {
                            type: 'number',
                            min: 1,
                            max: 50,
                        }
                    },
                    {
                        type: 'input',
                        label: '偏移',
                        value: 0,
                        config: {
                            type: 'number'
                        }
                    },
                    {
                        type: 'color-picker',
                        label: '颜色',
                        value: '#1c1c1c',
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
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export interface AxisTextProps {
    config: AxisLabelCfg;
    onChange: (data: AxisLabelCfg) => void;
}

export const AxisText: React.FC<AxisTextProps> = ({config, onChange}) => {

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        type: 'item-panel',
        label: '文本',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        type: 'input',
                        label: '字号',
                        value: 12,
                        config: {
                            type: 'number',
                            min: 1,
                            max: 50,
                        }
                    },
                    {
                        type: 'input',
                        label: '角度',
                        value: 0,
                        config: {
                            type: 'number',
                            min: 0,
                            max: 360,
                        }
                    },
                    {
                        type: 'input',
                        label: '偏移',
                        value: 0,
                        config: {
                            type: 'number'
                        }
                    },
                    {
                        type: 'color-picker',
                        label: '颜色',
                        value: '#1c1c1c',
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
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export default AxisConfig;