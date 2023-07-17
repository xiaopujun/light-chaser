import React from "react";
import ConfigCard from "../../lib/lc-config-card/ConfigCard";
import ConfigItem from "../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../lib/lc-input/UnderLineInput";
import CfgItemBorder from "../../lib/lc-config-item/CfgItemBorder";
import BaseColorPicker from "../../lib/lc-color-picker/BaseColorPicker";
import Accordion from "../../lib/lc-accordion/Accordion";
import {ConfigType} from "../../designer/right/ConfigType";
import Legend from "../common-fragment/legend/Legend";
import AxisConfig from "../common-fragment/axis/AxisConfig";

export const AntdLegend: React.FC<ConfigType> = ({config, updateConfig}) => {
    const legendChanged = (key: string, data: any) => {
        const chartStyleUpdate: any = {};
        switch (key) {
            case 'position':
                chartStyleUpdate.legend = {position: data};
                break;
            case 'direction':
                chartStyleUpdate.legend = {layout: data};
                break;
            case 'fontSize':
                chartStyleUpdate.legend = {itemName: {style: {fontSize: data}}};
                break;
            case 'color':
                chartStyleUpdate.legend = {itemName: {style: {fill: data}}};
                break;
            case 'enable':
                chartStyleUpdate.legend = data
                    ? {
                        position: 'right-top',
                        layout: 'vertical',
                        itemName: {style: {fill: '#cecece', fontSize: 12}},
                    }
                    : data;
                break;
            default:
                console.warn('未知的图例配置项');
        }
        updateConfig && updateConfig({
            style: {
                chartStyle: chartStyleUpdate,
            },
        });
    };
    const calculateLegendConfig = (chartStyle: any) => {
        const {legend} = chartStyle;
        if (!legend) return {visible: false};
        return {
            visible: true,
            position: legend?.position,
            direction: legend?.layout,
            color: legend?.itemName?.style?.fill,
            fontSize: legend?.itemName?.style?.fontSize,
        };
    };
    return (
        <Legend config={calculateLegendConfig(config)} onChange={legendChanged}/>
    );
};


export const AntdGraphics: React.FC<ConfigType> = ({config, updateConfig}) => {

    const barWidthChanged = (value: any) => {
        updateConfig && updateConfig({
            style: {
                chartStyle: {
                    maxBarWidth: value
                }
            }
        })
    }

    const fillColorChanged = (color: string) => updateConfig && updateConfig({style: {chartStyle: {color: color}}});

    return (
        <Accordion title={'图形'}>
            <ConfigCard title={'条状'}>
                <ConfigItem title={'宽度'}>
                    <UnderLineInput type={'number'} min={1} onChange={barWidthChanged}
                                    defaultValue={config.maxBarWidth}/>
                </ConfigItem>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder>
                        <BaseColorPicker onChange={fillColorChanged}
                                         defaultValue={config.color}
                                         style={{width: '100%', height: '15px', borderRadius: 2}}
                                         showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
            </ConfigCard>
        </Accordion>
    )
}

export const AntdCartesianCoordinateSys: React.FC<ConfigType> = ({config, updateConfig}) => {


    const axisChanged = (key: string, data: any, axis: string) => {
        if (!updateConfig) return;
        let styleObj;
        switch (key) {
            case 'enable':
                styleObj = data
                    ? {
                        grid: null,
                        label: {
                            style: {
                                fill: '#d5d5d5',
                            },
                        },
                    }
                    : {
                        grid: null,
                        label: null,
                        line: null,
                        tickLine: null,
                        subTickLine: null,
                        title: null,
                    };
                break;
            case 'position':
                styleObj = {position: data};
                break;
            case 'text-color':
                styleObj = {label: {style: {fill: data}}};
                break;
            case 'text-angle':
                styleObj = {label: {rotate: data}};
                break;
            case 'text-offset':
                styleObj = {label: {offset: data}};
                break;
            case 'title-enable':
                styleObj = data ? {title: {text: '标题', style: {fill: '#d5d5d5'}}} : {title: null};
                break;
            case 'title-position':
                styleObj = {title: {position: data}};
                break;
            case 'title-content':
                styleObj = {title: {text: data}};
                break;
            case 'title-color':
                styleObj = {title: {style: {fill: data}}};
                break;
            case 'title-offset':
                styleObj = {title: {offset: data}};
                break;
            case 'axisLine-enable':
                styleObj = data ? {line: {style: {stroke: '#d5d5d5', lineWidth: 2}}} : {line: null};
                break;
            case 'axisLine-color':
                styleObj = {line: {style: {stroke: data}}};
                break;
            case 'axisLine-width':
                styleObj = {line: {style: {lineWidth: data}}};
                break;
            case 'gridLine-enable':
                styleObj = data ? {
                    grid: {
                        line: {style: {stroke: '#d5d5d5', lineWidth: 2}},
                        alignTick: true
                    }
                } : {grid: null};
                break;
            case 'gridLine-alignTick':
                styleObj = {grid: {alignTick: data}};
                break;
            case 'gridLine-width':
                styleObj = {grid: {line: {style: {lineWidth: data}}}};
                break;
            case 'gridLine-color':
                styleObj = {grid: {line: {style: {stroke: data}}}};
                break;
            case 'tickLine-enable':
                styleObj = data ? {
                    tickLine: {style: {stroke: '#d5d5d5', lineWidth: 2}, alignTick: true, length: 3},
                } : {tickLine: null};
                break;
            case 'tickLine-alignTick':
                styleObj = {tickLine: {alignTick: data}};
                break;
            case 'tickLine-length':
                styleObj = {tickLine: {length: data}};
                break;
            case 'tickLine-width':
                styleObj = {tickLine: {style: {lineWidth: data}}};
                break;
            case 'tickLine-color':
                styleObj = {tickLine: {style: {stroke: data}}};
                break;
            case 'subTickLine-enable':
                styleObj = data ? {
                    subTickLine: {style: {stroke: '#d5d5d5', lineWidth: 3}, count: 5, length: 2}
                } : {subTickLine: null};
                break;
            case 'subTickLine-count':
                styleObj = {subTickLine: {count: data}};
                break;
            case 'subTickLine-length':
                styleObj = {subTickLine: {length: data}};
                break;
            case 'subTickLine-width':
                styleObj = {subTickLine: {style: {lineWidth: data}}};
                break;
            case 'subTickLine-color':
                styleObj = {subTickLine: {style: {stroke: data}}};
                break;
            default:
                console.warn('未知的坐标轴配置项');
                return;
        }
        updateConfig(buildAxisConfig(styleObj, axis));
    };

    const buildAxisConfig = (styleObj: any, axis: string) => {
        let axisObj;
        if (axis === 'x')
            axisObj = {xAxis: styleObj,};
        else if (axis === 'y')
            axisObj = {yAxis: styleObj,};
        return {
            style: {
                chartStyle: axisObj
            },
        };
    }

    const parseAxisConfig = (config: any) => {
        const result: any = {};
        result.enable = !!config.label;
        result.position = config.position;
        if (config.label) {
            result['textColor'] = config.label?.style?.fill;
            result['textAngle'] = config.label?.rotate;
            result['textOffset'] = config.label?.offset;
        } else {
            result['textColor'] = '#d7d7d7ff';
        }
        if (config.title) {
            result['titleEnable'] = true;
            result['titleContent'] = config.title?.text;
            result['titlePosition'] = config.title?.position;
            result['titleColor'] = config.title?.style?.fill;
            result['titleOffset'] = config.title?.offset;
        } else {
            result['titleEnable'] = false;
        }
        if (config.line) {
            result['axisLineEnable'] = true;
            result['axisLineColor'] = config.line?.style?.stroke;
            result['axisLineWidth'] = config.line?.style?.lineWidth;
        } else {
            result['axisLineEnable'] = false;
        }
        if (config.grid) {
            result['gridLineEnable'] = true;
            result['gridLineAlignTick'] = config.grid?.alignTick;
            result['gridLineWidth'] = config.grid?.line?.style?.lineWidth;
            result['gridLineColor'] = config.grid?.line?.style?.stroke;
        } else {
            result['gridLineEnable'] = false;
        }
        if (config.tickLine) {
            result['tickLineEnable'] = true;
            result['tickLineAlignTick'] = config.tickLine?.alignTick;
            result['tickLineLength'] = config.tickLine?.length;
            result['tickLineWidth'] = config.tickLine?.style?.lineWidth;
            result['tickLineColor'] = config.tickLine?.style?.stroke;
        } else {
            result['tickLineEnable'] = false;
        }
        if (config.subTickLine) {
            result['subTickLineEnable'] = true;
            result['subTickLineCount'] = config.subTickLine?.count;
            result['subTickLineLength'] = config.subTickLine?.length;
            result['subTickLineWidth'] = config.subTickLine?.style?.lineWidth;
            result['subTickLineColor'] = config.subTickLine?.style?.stroke;
        } else {
            result['subTickLineEnable'] = false;
        }
        return result;
    }

    return (
        <>
            <AxisConfig title={'X轴'} config={parseAxisConfig(config.xAxis)}
                        onChange={(key: string, data: any) => {
                            axisChanged(key, data, 'x');
                        }}/>
            <AxisConfig title={'Y轴'} config={parseAxisConfig(config.yAxis)}
                        onChange={(key: string, data: any) => {
                            axisChanged(key, data, 'y');
                        }}/>
        </>
    )
}