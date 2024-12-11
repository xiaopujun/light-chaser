import {Axis} from "@antv/g2plot";
import {cloneDeep, isEqual} from "lodash";
import {Control} from "../../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI";
import {ShapeAttrs} from "@antv/g-base";
import {useRef, useState} from "react";


interface AxisConfigProps {
    config?: Axis;
    onChange: (data?: Axis) => void;
    title?: string;
}


export const AxisConfig = (props: AxisConfigProps) => {
    const {config, onChange, title} = props;
    const {grid, line, label, title: _title, tickLine, subTickLine} = config || {};
    const enableRef = useRef<boolean>(!!(grid || line || label || _title || tickLine || subTickLine));
    const defaultData: Axis = {
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
    const oldData: Axis = cloneDeep(config!);
    const emptyData: Axis = {
        grid: null,
        line: null,
        title: null,
        label: null,
        tickLine: null,
        subTickLine: null,
    }
    const [count, setCount] = useState(0);

    const labelData = (config as any).label;
    const titleData = (config as any).title;
    const lineData = (config as any).line;
    const gridLineData = (config as any).grid;
    const tickLineData = (config as any).tickLine;
    const subTickLineData = (config as any).subTickLine;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data, dataFragment, reRender} = fieldChangeData;
        switch (id) {
            case 'showAxis':
                onChange(data ? (isEqual(oldData, emptyData) ? defaultData : oldData) : emptyData);
                enableRef.current = !!data;
                break;
            case 'titleSwitch':
                if (data) onChange({title: {text: '标题', offset: 0, style: {fill: '#d2d2d2', fontSize: 12}}});
                else onChange({title: null});
                break;
            case 'lineSwitch':
                if (data) onChange({line: {style: {stroke: '#595959', lineWidth: 1}}});
                else onChange({line: null});
                break;
            case 'gridLineSwitch':
                if (data) {
                    const defaultConfig = {
                        alignTick: true,
                        line: {style: {stroke: '#5c5c5c', lineWidth: 1} as ShapeAttrs, type: 'line'}
                    }
                    onChange({grid: defaultConfig});
                } else {
                    onChange({grid: null});
                }
                break;
            case 'subTickLineSwitch':
                if (data) {
                    const defaultConfig = {
                        count: 5,
                        length: 1,
                        style: {stroke: '#6e6e6e', lineWidth: 1} as ShapeAttrs
                    };
                    onChange({subTickLine: defaultConfig});
                } else {
                    onChange({subTickLine: null});
                }
                break;
            case 'tickLineSwitch':
                if (data) {
                    const defaultConfig = {
                        alignTick: true,
                        length: 1,
                        style: {stroke: '#6e6e6e', lineWidth: 1} as ShapeAttrs
                    };
                    onChange({tickLine: defaultConfig});
                } else {
                    onChange({tickLine: null});
                }
                break;
            default:
                onChange(dataFragment);
        }
        if (reRender)
            setCount(count + 1);
    }


    const schema: Control[] = [
        {
            type: 'accordion',
            label: title,
            children: [
                {
                    type: 'sub-accordion',
                    label: '基础',
                    children: [
                        {
                            type: 'grid',
                            children: [
                                {
                                    id: 'showAxis',
                                    key: 'showAxis',
                                    type: 'switch',
                                    label: '显示',
                                    reRender:true,
                                    value: enableRef.current,
                                },
                                {
                                    rules:  "{showAxis} === 'true'",
                                    key: 'position',
                                    type: 'radio',
                                    label: '位置',
                                    value: (config as any).position,
                                    config: {
                                        options: [
                                            {label: '左', value: 'left'},
                                            {label: '右', value: 'right'},
                                            {label: '上', value: 'top'},
                                            {label: '下', value: 'bottom'},
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    rules:`${enableRef.current}`,
                    children:[
                        {
                            key: 'label',
                            type: 'sub-accordion',
                            label: '文本',
                            children: [
                                {
                                    type: 'grid',
                                    children: [
                                        {
                                            key: 'rotate',
                                            type: 'number-input',
                                            label: '角度',
                                            value: labelData?.rotate || 0,
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
                                            value: labelData?.offset || 0,
                                        },
                                        {
                                            key: 'style',
                                            children: [
                                                {
                                                    key: 'fontSize',
                                                    type: 'number-input',
                                                    label: '字号',
                                                    value: (labelData?.style as ShapeAttrs)?.fontSize || 12,
                                                    config: {
                                                        min: 1,
                                                        max: 50,
                                                    }
                                                },
                                                {
                                                    key: 'fill',
                                                    type: 'color-picker',
                                                    label: '颜色',
                                                    value: (labelData?.style as ShapeAttrs)?.fill || '#1c1c1c',
                                                    config: {
                                                        showText: true,
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            key: 'title',
                            type: 'sub-accordion',
                            label: '标题',
                            children: [
                                {
                                    type: 'grid',
                                    children: [
                                        {
                                            key: 'titleSwitch',
                                            id: 'titleSwitch',
                                            type: 'switch',
                                            label: '开启',
                                            reRender: true,
                                            value: !!titleData,
                                        },
                                        {
                                            rules: "{titleSwitch} === 'true'",
                                            children: [
                                                {
                                                    key: 'position',
                                                    type: 'select',
                                                    label: '位置',
                                                    value: titleData?.position || 'center',
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
                                                    value: titleData?.text || '标题',
                                                },
                                                {
                                                    key: 'offset',
                                                    type: 'number-input',
                                                    label: '偏移',
                                                    value: titleData?.offset || 0,
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
                        },
                        {
                            key: 'line',
                            type: 'sub-accordion',
                            label: '轴线',
                            children: [
                                {
                                    type: 'grid',
                                    children: [
                                        {
                                            key: 'lineSwitch',
                                            id: 'lineSwitch',
                                            type: 'switch',
                                            label: '开启',
                                            reRender: true,
                                            value: !!lineData,
                                        },
                                        {
                                            key: 'style',
                                            rules: "{lineSwitch} === 'true'",
                                            children: [
                                                {
                                                    key: 'lineWidth',
                                                    type: 'number-input',
                                                    label: '宽度',
                                                    value: lineData?.style?.lineWidth || 1,
                                                    config: {
                                                        min: 0,
                                                        max: 10,
                                                    }
                                                },
                                                {
                                                    key: 'stroke',
                                                    type: 'color-picker',
                                                    label: '颜色',
                                                    value: lineData?.style?.stroke || '#595959',
                                                    config: {
                                                        showText: true,
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            key: 'grid',
                            type: 'sub-accordion',
                            label: '网格线',
                            children: [
                                {
                                    type: 'grid',
                                    children: [
                                        {
                                            key: 'gridLineSwitch',
                                            id: 'gridLineSwitch',
                                            type: 'switch',
                                            label: '开启',
                                            reRender: true,
                                            value: !!gridLineData,
                                        },
                                        {
                                            rules: "{gridLineSwitch} === 'true'",
                                            key: 'alignTick',
                                            type: 'switch',
                                            label: '对齐',
                                            value: (gridLineData as any)?.alignTick,
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
                                                            value: (gridLineData?.line?.style as ShapeAttrs)?.lineWidth,
                                                            config: {
                                                                min: 0,
                                                                max: 10,
                                                            }
                                                        },
                                                        {
                                                            key: 'stroke',
                                                            type: 'color-picker',
                                                            label: '颜色',
                                                            value: (gridLineData?.line?.style as ShapeAttrs)?.stroke,
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
                        },
                        {
                            key: 'tickLine',
                            type: 'sub-accordion',
                            label: '刻度线',
                            children: [
                                {
                                    type: 'grid',
                                    children: [
                                        {
                                            key: 'tickLineSwitch',
                                            id: 'tickLineSwitch',
                                            type: 'switch',
                                            label: '开启',
                                            reRender: true,
                                            value: !!tickLineData,
                                        },
                                        {
                                            key: 'alignTick',
                                            rules: "{tickLineSwitch}==='true'",
                                            type: 'switch',
                                            label: '对齐',
                                            value: (tickLineData as any)?.alignTick,
                                        },
                                        {
                                            key: 'length',
                                            rules: "{tickLineSwitch}==='true'",
                                            type: 'number-input',
                                            label: '长度',
                                            value: (tickLineData as any)?.length,
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
                                                    value: (tickLineData?.style as ShapeAttrs)?.lineWidth,
                                                    config: {
                                                        min: 0,
                                                        max: 10,
                                                    }
                                                },
                                                {
                                                    key: 'stroke',
                                                    type: 'color-picker',
                                                    label: '颜色',
                                                    value: (tickLineData?.style as ShapeAttrs)?.stroke,
                                                    config: {
                                                        showText: true,
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            key: 'subTickLine',
                            type: 'sub-accordion',
                            label: '子刻度',
                            children: [
                                {
                                    type: 'grid',
                                    children: [
                                        {
                                            key: 'subTickLineSwitch',
                                            id: 'subTickLineSwitch',
                                            type: 'switch',
                                            reRender: true,
                                            label: '开启',
                                            value: !!subTickLineData,
                                        },
                                        {
                                            rules: "{subTickLineSwitch}==='true'",
                                            key: 'count',
                                            type: 'number-input',
                                            label: '数量',
                                            value: subTickLineData?.count,
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
                                            value: subTickLineData?.length,
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
                                                    value: (subTickLineData?.style as ShapeAttrs)?.lineWidth,
                                                    config: {
                                                        min: 0,
                                                        max: 10,
                                                    }
                                                },
                                                {
                                                    key: 'stroke',
                                                    type: 'color-picker',
                                                    label: '颜色',
                                                    value: (subTickLineData?.style as ShapeAttrs)?.stroke,
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
            ]
        }
    ]

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export default AxisConfig;