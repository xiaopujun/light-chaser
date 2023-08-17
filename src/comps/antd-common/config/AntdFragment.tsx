import React from "react";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import Accordion from "../../../lib/lc-accordion/Accordion";
import AxisConfig from "./axis/AxisConfig";
import Select from "../../../lib/lc-select/Select";
import {Legend} from "@antv/g2plot/lib/types/legend";

import {ShapeAttrs} from "@antv/g-base";
import {Types} from "@antv/g2";
import {Axis} from "@antv/g2plot";
import {WritableOptions} from "../types";

export interface AntdLegendProps {
    config?: Legend;

    onChange(config: Legend): void;
}

export const AntdLegend = (props: AntdLegendProps) => {
    const {onChange, config} = props;
    return (
        <Accordion title={'图例'} showSwitch={true} defaultValue={!!config}
                   onChange={value => onChange(value && config!)}>
            <ConfigItem title={'位置'}>
                <Select defaultValue={(config as Types.LegendCfg)?.position}
                        onChange={(value => onChange({position: value as Types.LegendCfg['position']}))}
                        options={[
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
                        ]}/>
            </ConfigItem>
            <ConfigItem title={'方向'}>
                <Select defaultValue={(config as Types.LegendCfg)?.layout}
                        onChange={(value => onChange({layout: value as Types.LegendCfg['layout']}))}
                        options={[
                            {value: 'horizontal', label: '水平'},
                            {value: 'vertical', label: '垂直'},
                        ]}/>
            </ConfigItem>
            <ConfigItem title={'字号'}>
                <UnderLineInput type={'number'} min={12}
                                defaultValue={((config as Types.LegendCfg)?.itemName?.style as ShapeAttrs)?.fontSize || 12}
                                onChange={e => onChange({itemName: {style: {fontSize: parseInt(e.target.value)}}})}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder width={'100%'}>
                    <BaseColorPicker
                        defaultValue={((config as Types.LegendCfg)?.itemName?.style as ShapeAttrs)?.fill || '#fff'}
                        onChange={value => onChange({itemName: {style: {fill: value}}})}
                        style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
        </Accordion>
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