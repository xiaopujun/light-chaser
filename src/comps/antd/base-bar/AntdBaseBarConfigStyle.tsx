import React, {Component} from 'react';
import Accordion from "../../../lib/lc-accordion/Accordion";
import CfgItemBorder from "../../../lib/config-item-border/CfgItemBorder";
import BaseStyleSet from "../../../lib/common-fragment/base-style/BaseStyleSet";
import {ConfigType} from "../../../framework/types/ConfigType";
import ConfigItem from "../../../lib/config-item/ConfigItem";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import ConfigCard from "../../../lib/config-card/ConfigCard";
import NumberInput from "../../../lib/lc-input/NumberInput";
import {calculateLegendConfig} from "../../../utils/AntdChartConfigUtil";
import Legend from "../../../lib/common-fragment/legend/Legned";
import AxisConfig from "../../../lib/common-fragment/axis/AxisConfig";
import {toJS} from "mobx";

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
                                        fill: '#cecece'
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

    buildAxisConfig = (styleObj: any) => {
        return {
            style: {
                chartStyle: {
                    xAxis: styleObj,
                },
            },
        };
    }

    axisChanged = (key: string, data: any) => {
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
                                fill: 'rgb(0,255,234)',
                            },
                        },
                    }
                    : {
                        grid: null,
                        label: null,
                        line: null,
                        tickLine: null,
                        title: null,
                    };
                break;
            case 'position':
                styleObj = {position: data};
                break;
            case 'title-enable':
                styleObj = data ? {title: {text: 'x轴'}} : {title: null};
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
                styleObj = data ? {line: {style: {stroke: '#fff'}}} : {line: null};
                break;
            case 'axisLine-color':
                styleObj = {line: {style: {stroke: data}}};
                break;
            case 'axisLine-width':
                styleObj = {line: {style: {lineWidth: data}}};
                break;
            case 'gridLine-enable':
                styleObj = data ? {grid: {line: {style: {stroke: '#fff'}}}} : {grid: null};
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
                styleObj = data ? {tickLine: {style: {stroke: '#fff'}}} : {tickLine: null};
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
                    subTickLine: {style: {stroke: '#fff'}}
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
        updateConfig(this.buildAxisConfig(styleObj));
    };

    parseAxisConfig = (config: any) => {
        const result: any = {};
        if (config.label)
            result.enable = true;
        else
            result.enable = false;
        result.position = config.position;
        if (config.title) {
            result['titleEnable'] = true;
            result['titleContent'] = config.title.text;
            result['titlePosition'] = config.title.position;
            result['titleColor'] = config.title.style.fill;
            result['titleOffset'] = config.title.offset;
        } else {
            result['titleEnable'] = false;
        }
        if (config.line) {
            result['axisLineEnable'] = true;
            result['axisLineColor'] = config.line.style.stroke;
            result['axisLineWidth'] = config.line.style.lineWidth;
        } else {
            result['axisLineEnable'] = false;
        }
        if (config.grid) {
            result['gridLineEnable'] = true;
            result['gridLineAlignTick'] = config.grid.alignTick;
            result['gridLineWidth'] = config.grid.line.style.lineWidth;
            result['gridLineColor'] = config.grid.line.style.stroke;
        } else {
            result['gridLineEnable'] = false;
        }
        if (config.tickLine) {
            result['tickLineEnable'] = true;
            result['tickLineAlignTick'] = config.tickLine.alignTick;
            result['tickLineLength'] = config.tickLine.length;
            result['tickLineWidth'] = config.tickLine.style.lineWidth;
            result['tickLineColor'] = config.tickLine.style.stroke;
        } else {
            result['tickLineEnable'] = false;
        }
        if (config.subTickLine) {
            result['subTickLineEnable'] = true;
            result['subTickLineCount'] = config.subTickLine.count;
            result['subTickLineLength'] = config.subTickLine.length;
            result['subTickLineWidth'] = config.subTickLine.style.lineWidth;
            result['subTickLineColor'] = config.subTickLine.style.stroke;
        } else {
            result['subTickLineEnable'] = false;
        }
        return result;
    }

    render() {
        // const colors = calculateFillColor(this.props.config);
        // const sorts = dataSort('type', this.props.config.data);
        const {updateConfig, config} = this.props;
        const {chartStyle} = config;
        return (
            <>
                <BaseStyleSet config={config} updateConfig={updateConfig}/>
                <div className={'elem-chart-config'}>
                    <Accordion title={'图形'}>
                        <ConfigCard title={'x轴'}>
                            <ConfigItem title={'宽度'}>
                                <NumberInput min={1} onChange={this.barWidthChanged}
                                             defaultValue={chartStyle.maxBarWidth}
                                             size={'small'}/>
                            </ConfigItem>
                            <ConfigItem title={'颜色'}>
                                <CfgItemBorder>
                                    <BaseColorPicker onChange={this.fillColorChanged}
                                                     value={chartStyle.color}
                                                     style={{width: '100%', height: '15px', borderRadius: 2}}
                                                     showText={true}/>
                                </CfgItemBorder>
                            </ConfigItem>
                        </ConfigCard>
                    </Accordion>
                    <Legend config={calculateLegendConfig(config.chartStyle)}
                            onChange={this.legendChanged}/>
                    <AxisConfig config={this.parseAxisConfig(config.chartStyle.xAxis)} onChange={this.axisChanged}/>
                    {/*<RightAngleCoordinates {...calculateRightAngleCoordinates(chartStyle)}*/}
                    {/*                       chartProps={chartStyle}*/}
                    {/*                       updateElemConfig={updateConfig}/>*/}
                </div>
            </>
        );
    }
}

export default AntdBaseBarConfigStyle;