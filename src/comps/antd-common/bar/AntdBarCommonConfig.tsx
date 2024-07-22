import React, {Component} from 'react';
import {AntdCartesianCoordinateSys} from "../config/AntdFragment";
import {BarOptions, ColorAttr} from "@antv/g2plot";
import AntdCommonBarController from "./AntdCommonBarController";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {AntdLegend} from "../config/legend/AntdLegend";
import {ConfigType} from "../../../designer/right/ConfigContent";
import {ISelectOption} from "../../../json-schema/ui/select/Select";

class AntdBarCommonStyleConfig extends Component<ConfigType<AntdCommonBarController>> {

    barCoordinateSysChange = (config: BarOptions) => {
        const controller = this.props.controller as AntdCommonBarController;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config = controller.getConfig()!.style!;
        return (
            <>
                <AntdBarGraphics controller={controller}/>
                <AntdLegend controller={controller}/>
                <AntdCartesianCoordinateSys onChange={this.barCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdBarCommonStyleConfig};


export const AntdBarGraphics: React.FC<ConfigType<AntdCommonBarController>> = ({controller}) => {

    const config = controller.getConfig()!.style!;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data, dataFragment} = fieldChangeData;
        if (id === 'barColor') {
            if (data && Array.isArray(data)) {
                controller.update({style: {color: data as ColorAttr, barStyle: {fill: undefined}}});
            } else if (data && typeof data === 'string' && data.indexOf('gradient') !== -1) {
                //渐变
            } else {
                controller.update({style: {barStyle: {fill: data as string}}});
            }
        } else {
            controller.update(dataFragment);
        }
    }

    const schema: Control = {
        key: 'style',
        type: 'accordion',
        label: '图形',
        children: [
            {
                type: 'grid',
                children: [
                    {
                        key: 'maxBarWidth',
                        type: 'number-input',
                        label: '宽度',
                        value: config?.maxBarWidth,
                        config: {
                            min: 1,
                            max: 100,
                        }
                    },
                    {
                        key: 'barStyle',
                        children: [
                            {
                                key: 'radius',
                                type: 'number-input',
                                label: '圆角',
                                value: (config?.barStyle as any)?.radius,
                                config: {
                                    min: 1,
                                    max: 100,
                                }
                            }
                        ]

                    },
                    {
                        id: 'barColor',
                        type: 'color-mode',
                        label: '颜色',
                        value: config?.color,
                    }
                ]
            },
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}


export const AntdBarFieldMapping: React.FC<ConfigType<AntdCommonBarController>> = ({controller}) => {
    const config = controller.getConfig()!.style;
    const {data, xField, yField, seriesField} = config!;
    const options: ISelectOption[] = [];
    if (data && data.length >= 1) {
        const dataObj = data[0];
        Object.keys(dataObj).forEach(key => options.push({label: key, value: key}))
    }

    const fieldChange = (fieldChangeData: FieldChangeData) => {
        controller.update(fieldChangeData.dataFragment);
    }

    const schema: Control = {
        key: 'style',
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
                label: '分组字段',
                value: seriesField,
                config: {
                    options,
                }
            }
        ]
    }

    return (
        <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={fieldChange}/></div>
    )
}
