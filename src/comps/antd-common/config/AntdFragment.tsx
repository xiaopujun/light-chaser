import React from "react";
import AxisConfig from "./axis/AxisConfig";
import {Legend} from "@antv/g2plot/lib/types/legend";
import {Axis} from "@antv/g2plot";
import {WritableOptions} from "../types";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";

export interface AntdLegendProps {
    config?: Legend;

    onChange(config: Legend): void;
}

export const AntdLegend = (props: AntdLegendProps) => {

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        type: 'accordion',
        label: '图例',
        config: {showSwitch: true},
        value: true,
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        type: 'select',
                        label: '位置',
                        value: 'left-top',
                        config: {
                            options: [
                                {value: 'left-top', label: '左上'},
                                {value: 'left', label: '正左'},
                                {value: 'left-bottom', label: '左下'},
                                {value: 'top-left', label: '上左'},
                                {value: 'top', label: '正上'},
                                {value: 'top-right', label: '上右'},
                                {value: 'right-top', label: '右上'},
                                {value: 'right', label: '正右'},
                                {value: 'right-bottom', label: '右下'},
                                {value: 'bottom-left', label: '下左'},
                                {value: 'bottom', label: '正下'},
                                {value: 'bottom-right', label: '下右'},
                            ]
                        }
                    },
                    {
                        type: 'select',
                        label: '方向',
                        value: 'horizontal',
                        config: {
                            options: [
                                {value: 'horizontal', label: '水平'},
                                {value: 'vertical', label: '垂直'},
                            ]
                        }
                    },
                    {
                        type: 'input',
                        label: '字号',
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
    );
};


export interface AntdCartesianCoordinateSysProps {
    config?: WritableOptions;

    onChange(config?: WritableOptions): void;
}

export const AntdCartesianCoordinateSys: React.FC<AntdCartesianCoordinateSysProps> = ({config, onChange}) => {

    const xAxisChange = (data?: Axis) => {
        onChange({xAxis: data});
    }
    const yAxisChange = (data?: Axis) => {
        onChange({yAxis: data});
    }

    return (
        <>
            <AxisConfig title={'X轴'} config={config?.xAxis}
                        onChange={xAxisChange}/>
            <AxisConfig title={'Y轴'} config={config?.yAxis}
                        onChange={yAxisChange}/>
        </>
    )
}