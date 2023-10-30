import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys} from "../config/AntdFragment";
import {BarOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AntdCommonBarController from "./AntdCommonBarController";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {AntdLegend} from "../config/legend/AntdLegend";
import {Option} from "../../../ui/select/SelectType";

class AntdBarCommonStyleConfig extends Component<ConfigType<AntdCommonBarController>> {

    legendChange = (legend: Legend) => {
        const controller = this.props.controller as AntdCommonBarController;
        controller.update({style: {legend}});
    }

    barGraphicsChange = (config: BarOptions) => {
        const controller = this.props.controller as AntdCommonBarController;
        controller.update({style: config});
    }

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
                controller.update({style: {color: data as any, barStyle: {fill: undefined}}});
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
                config: {columns: 2, margin: '0 0 7px 0'},
                children: [
                    {
                        key: 'maxBarWidth',
                        type: 'input',
                        label: '宽度',
                        value: config?.maxBarWidth,
                        config: {
                            width: 80,
                            type: 'number',
                            min: 1,
                            max: 100,
                        }
                    },
                ]
            },
            {
                type: 'grid',
                children: [
                    {
                        id: 'barColor',
                        type: 'color-mode',
                        label: '颜色',
                        value: '#1c1c1c',
                    }
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}


export const AntdBarFieldMapping: React.FC<ConfigType<AntdCommonBarController>> = ({controller}) => {
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
        type: 'grid',
        config: {
            columns: 2,
        },
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
        <LCGUI schema={schema} onFieldChange={fieldChange}/>
    )
}
