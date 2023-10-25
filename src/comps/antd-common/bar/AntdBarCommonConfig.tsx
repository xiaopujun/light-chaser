import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {BarOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AntdCommonBar from "./AntdCommonBar";
import {WritableBarOptions} from "../types";
import {Option} from "../../../lib/lc-select/SelectType";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";

class AntdBarCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const controller = this.props.controller as AntdCommonBar;
        controller.update({style: {legend}});
    }

    barGraphicsChange = (config: BarOptions) => {
        const controller = this.props.controller as AntdCommonBar;
        controller.update({style: config});
    }

    barCoordinateSysChange = (config: BarOptions) => {
        const controller = this.props.controller as AntdCommonBar;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config: BarOptions = controller.getConfig().style;
        return (
            <>
                <AntdBarGraphics onChange={this.barGraphicsChange} config={config}/>
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
                <AntdCartesianCoordinateSys onChange={this.barCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdBarCommonStyleConfig};


export interface AntdBarGraphicsProps {
    config?: WritableBarOptions;

    onChange(config: WritableBarOptions): void;
}

export const AntdBarGraphics: React.FC<AntdBarGraphicsProps> = ({config, onChange}) => {

    // const barColorChange = (data: ColorModeValue) => {
    //     const {mode, value} = data;
    //     switch (mode) {
    //         case 'single':
    //             onChange({barStyle: {fill: value as string}});
    //             break;
    //         case 'multi':
    //             onChange({color: value, barStyle: {fill: undefined}});
    //             break;
    //         case 'gradient':
    //             onChange({barStyle: {fill: `l(0) 0:${value[0]} 1:${value[1]}`}});
    //             break;
    //     }
    // }
    //
    // const buildColorModeData = (): ColorModeValue => {
    //     let mode = 'single', value: string | string[] = '#fff';
    //     if ((config?.barStyle as ShapeAttrs)?.fill) {
    //         const fill = (config?.barStyle as ShapeAttrs).fill as string;
    //         if (fill.startsWith('l')) {
    //             mode = 'gradient';
    //             value = [fill.split(':')[1].split(' ')[0], fill.split(':')[2].split(' ')[0]];
    //         } else {
    //             mode = 'single';
    //             value = fill;
    //         }
    //     } else if (config?.color) {
    //         mode = 'multi';
    //         value = config?.color as string[];
    //     }
    //     return {mode, value};
    // }


    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        type: 'accordion',
        label: '图形',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        type: 'input',
                        label: '宽度',
                        value: 12,
                        config: {
                            type: 'number',
                            min: 0,
                            max: 100,
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


export const AntdBarFieldMapping: React.FC<ConfigType<AntdCommonBar>> = ({controller}) => {
    const config = controller.getConfig()!.style;
    const {data, xField, yField, seriesField} = config!;
    const options: Option[] = [];
    if (data && data.length >= 1) {
        const dataObj = data[0];
        Object.keys(dataObj).forEach(key => options.push({label: key, value: key}))
    }

    const fieldChange = (fieldChangeData: FieldChangeData) => {
        controller.update(fieldChangeData.dataFragment);
    }

    const schema: Control = {
        key: 'style',
        type: 'item-panel',
        label: '字段映射',
        config: {
            labelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
            }
        },
        children: [
            {
                type: 'grid',
                children: [
                    {
                        key: 'xField',
                        type: 'select',
                        label: 'X字段',
                        value: xField,
                        config: {
                            options,
                        }
                    },
                    {
                        key: 'yField',
                        type: 'select',
                        label: 'Y字段',
                        value: yField,
                        config: {
                            options,
                        }
                    },
                    {
                        key: 'seriesField',
                        type: 'select',
                        label: '分类字段',
                        value: seriesField,
                        config: {
                            options,
                        }
                    }
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={fieldChange}/>
    )
}
