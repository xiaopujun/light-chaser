import React, {Component} from 'react';
import Accordion from "../../../lib/lc-accordion/Accordion";
import CfgItemBorder from "../../../lib/config-item/CfgItemBorder";
import BaseStyleSet from "../../../lib/common-fragment/base-style/BaseStyleSet";
import {ConfigType} from "../../../framework/types/ConfigType";
import ConfigItem from "../../../lib/config-item/ConfigItem";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import ConfigCard from "../../../lib/config-card/ConfigCard";
import Legend from "../../../lib/common-fragment/legend/Legned";
import AxisConfig from "../../../lib/common-fragment/axis/AxisConfig";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";

class AntdBaseBarConfigStyle extends Component<ConfigType> {

    state: any = {
        colors: []
    }

    barWidthChanged = (value: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({
            style: {
                chartStyle: {
                    maxBarWidth: value
                }
            }
        })
    }

    fillColorChanged = (color: string) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({style: {chartStyle: {color: color}}});
    }

    groupColorChanged = (value: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({
            color: value
        })
    }

    legendChanged = (key: string, data: any) => {
        const {updateConfig} = this.props;
        switch (key) {
            case 'position':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            legend: {
                                position: data
                            }
                        }
                    }
                });
                break;
            case 'direction':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            legend: {
                                layout: data
                            }
                        }
                    }
                });
                break;
            case 'fontSize':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            legend: {
                                itemName: {
                                    style: {
                                        fontSize: data
                                    }
                                },
                            }
                        }
                    }
                });
                break;
            case 'color':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            legend: {
                                itemName: {
                                    style: {
                                        fill: data
                                    }
                                },
                            }
                        }
                    }
                });
                break;
            case 'enable':
                updateConfig && updateConfig(data ? {
                    style: {
                        chartStyle: {
                            legend: {
                                position: 'right-top',
                                layout: 'vertical',
                                itemName: {
                                    style: {
                                        fill: '#cecece',
                                        fontSize: 12
                                    }
                                },
                            }
                        }
                    }
                } : {
                    style: {
                        chartStyle: {
                            legend: data
                        }
                    }
                });
                break;
            default:
                console.warn('未知的图例配置项');
        }
    }

    buildAxisConfig = (styleObj: any, axis: string) => {
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

    axisChanged = (key: string, data: any, axis: string) => {
        const {updateConfig} = this.props;
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
        updateConfig(this.buildAxisConfig(styleObj, axis));
    };

    parseAxisConfig = (config: any) => {
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

    calculateLegendConfig = (chartStyle: any) => {
        let res = {visible: false};
        const {legend} = chartStyle;
        if (!legend)
            return res;
        else {
            res = {
                ...res, ...{
                    visible: true,
                    position: legend?.position,
                    direction: legend?.layout,
                    color: legend?.itemName?.style?.fill,
                    fontSize: legend?.itemName?.style?.fontSize,
                }
            };
        }
        return res;
    }

    render() {
        const {updateConfig, config} = this.props;
        const {chartStyle} = config;
        return (
            <>
                <BaseStyleSet config={config.baseStyle} updateConfig={updateConfig}/>
                <div className={'elem-chart-config'}>
                    <Accordion title={'图形'}>
                        <ConfigCard title={'条状'}>
                            <ConfigItem title={'宽度'}>
                                <UnderLineInput type={'number'} min={1} onChange={this.barWidthChanged}
                                                defaultValue={chartStyle.maxBarWidth}
                                />
                            </ConfigItem>
                            <ConfigItem title={'颜色'}>
                                <CfgItemBorder>
                                    <BaseColorPicker onChange={this.fillColorChanged}
                                                     defaultValue={chartStyle.color}
                                                     style={{width: '100%', height: '15px', borderRadius: 2}}
                                                     showText={true}/>
                                </CfgItemBorder>
                            </ConfigItem>
                        </ConfigCard>
                    </Accordion>
                    <Legend config={this.calculateLegendConfig(config.chartStyle)}
                            onChange={this.legendChanged}/>
                    <AxisConfig title={'X轴'} config={this.parseAxisConfig(config.chartStyle.xAxis)}
                                onChange={(key: string, data: any) => {
                                    this.axisChanged(key, data, 'x');
                                }}/>
                    <AxisConfig title={'Y轴'} config={this.parseAxisConfig(config.chartStyle.yAxis)}
                                onChange={(key: string, data: any) => {
                                    this.axisChanged(key, data, 'y');
                                }}/>
                </div>
            </>
        );
    }
}

export default AntdBaseBarConfigStyle;