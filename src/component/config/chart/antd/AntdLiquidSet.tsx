import React, {Component} from 'react';
import {Select} from "antd";
import './style/AntdLiquidSet.less';
import FillColor from "./atomic_components/FillColor";
import ColorPicker from "../../../color_picker/BaseColorPicker";
import LCNumberInput from "../../../base/LCNumberInput";
import LCTextInput from "../../../base/LCTextInput";

const {Option} = Select;


interface AntdLiquidSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
}


class AntdLiquidSet extends Component<AntdLiquidSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            color: color
        })
    }

    outRadiusChanged = (radius: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            radius: radius
        })
    }

    outLineWidthChanged = (width: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            outline: {
                border: parseFloat(width)
            }
        })
    }

    outLineColorChanged = (color: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            outline: {
                style: {
                    stroke: color,
                }
            }
        })
    }

    numberOfWaterWavesChanged = (count: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            wave: {
                count: count
            }
        })
    }

    waveLengthChanged = (length: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            wave: {
                length: length
            }
        })
    }

    titleChanged = (data: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                title: {
                    content: data
                }
            }
        })
    }

    titleColorChanged = (color: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                title: {
                    style: {
                        fill: color,
                        size: 23
                    }
                }
            }
        })
    }


    subscriptionColorChanged = (color: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                content: {
                    style: {
                        fill: color
                    }
                }
            }
        })
    }


    titleFontSizeChanged = (size: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                title: {
                    style: {
                        fontSize: parseInt(size)
                    }
                }
            }
        })
    }


    subscriptionFontSizeChanged = (size: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                content: {
                    style: {
                        fontSize: parseInt(size)
                    }
                }
            }
        })
    }

    subscriptionLineHeightChanged = (size: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                content: {
                    style: {
                        lineHeight: parseInt(size)
                    }
                }
            }
        })
    }

    shapeChanged = (value: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            shape: value
        })
    }

    calculateLiquidConfig = (cfg: any) => {
        const {outline, shape, radius, wave, statistic} = this.props.chartProps;
        return {
            shape: shape,
            outRadius: radius,
            outlineWidth: outline?.border,
            outlineColor: outline?.style?.stroke,
            waterNum: wave?.count,
            waterLength: wave?.length,
            title: statistic?.title?.content,
            titleColor: statistic?.title?.style?.fill,
            titleFontSize: statistic?.title?.style?.fontSize,
            desColor: statistic?.content?.style?.fill,
            desFontSize: statistic?.content?.style?.fontSize,
            desLineHeight: statistic?.content?.style?.lineHeight,
        }
    }


    render() {
        const config = this.calculateLiquidConfig(this.props.chartProps);
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged}/>
                <div className={'config-group chart-fill-color'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>图形选择：</label>
                        <Select className={'lc-config-item-value lc-select'} value={config.shape}
                                onChange={this.shapeChanged}>
                            <Option value={'circle'}>circle</Option>
                            <Option value={'diamond'}>diamond</Option>
                            <Option value={'triangle'}>triangle</Option>
                            <Option value={'pin'}>pin</Option>
                            <Option value={'rect'}>rect</Option>
                        </Select>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>外半径：</label>
                        <div className={'lc-config-item-value'}>
                                <span className={'lc-input-container'}>
                                    <LCNumberInput value={parseFloat(config.outRadius)}
                                                   onChange={this.outRadiusChanged}
                                                   max={1}
                                                   step={0.01} min={0.1}/>
                                    <label>&nbsp;px</label>
                                </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>边框线宽度：</label>
                        <div className={'lc-config-item-value'}>
                                <span className={'lc-input-container'}>
                                    <LCNumberInput value={config.outlineWidth}
                                                   onChange={this.outLineWidthChanged}
                                                   max={20} step={0.1} min={0}/>
                                    <label>&nbsp;px</label>
                                </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>边框线颜色：</label>
                        <ColorPicker color={config.outlineColor} onChange={this.outLineColorChanged}/>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>水波个数：</label>
                        <div className={'lc-config-item-value'}>
                                <span className={'lc-input-container'}>
                                    <LCNumberInput value={config.waterNum} onChange={this.numberOfWaterWavesChanged}
                                                   max={20} min={0} step={1}/>
                                    <label>&nbsp;px</label>
                                </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>水波长度：</label>
                        <div className={'lc-config-item-value'}>
                            <span className={'lc-input-container'}>
                                <LCNumberInput value={config.waterLength} onChange={this.waveLengthChanged} max={500}
                                               min={10} step={5}/>
                                <label>&nbsp;px</label>
                            </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>中心标题：</label>
                        <div className={'lc-config-item-value'}>
                            <LCTextInput value={config.title} onChange={this.titleChanged}/>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>中心标题颜色：</label>
                        <ColorPicker color={config.titleColor} onChange={this.titleColorChanged}/>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>中心标题字体大小：</label>
                        <div className={'lc-config-item-value'}>
                            <span className={'lc-input-container'}>
                                <LCNumberInput value={config.titleFontSize}
                                               onChange={this.titleFontSizeChanged}
                                               max={50} min={0} step={1}/>
                                <label>&nbsp;px</label>
                            </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>描述颜色：</label>
                        <ColorPicker color={config.desColor} onChange={this.subscriptionColorChanged}/>
                    </div>

                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>描述字体大小：</label>
                        <div className={'lc-config-item-value'}>
                            <span className={'lc-input-container'}>
                                <LCNumberInput value={config.desFontSize} onChange={this.subscriptionFontSizeChanged}
                                               max={50} min={0} step={1}/>
                                <label>&nbsp;px</label>
                            </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>描述字体行高：</label>
                        <div className={'lc-config-item-value'}>
                            <span className={'lc-input-container'}>
                                <LCNumberInput value={config.desLineHeight}
                                               onChange={this.subscriptionLineHeightChanged} max={50} min={0} step={1}/>
                                <label>&nbsp;px</label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AntdLiquidSet;