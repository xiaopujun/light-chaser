import React, {Component} from 'react';
import {Select} from "antd";
import './style/AntdLiquidSet.less';
import FillColor from "./atomic_components/FillColor";
import ColorPicker from "../../../color_picker/BaseColorPicker";
import LCNumberInput from "../../../base/LCNumberInput";
import LCTextInput from "../../../base/LCTextInput";

const {Option} = Select;


interface AntdLiquidSetProps {
    updateElemChartSet?: (data: any) => void;
    chartProps?: any;
    active?: any;
}


class AntdLiquidSet extends Component<AntdLiquidSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            color: color
        })
    }

    outRadiusChanged = (radius: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            radius: radius
        })
    }

    outLineWidthChanged = (width: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            outline: {
                border: width
            }
        })
    }


    outLineIntervalChanged = (distance: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            outline: {
                distance: distance
            }
        })
    }

    outLineColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            outline: {
                style: {
                    stroke: color,
                }
            }
        })
    }

    numberOfWaterWavesChanged = (count: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            wave: {
                count: count
            }
        })
    }

    waveLengthChanged = (length: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            wave: {
                length: length
            }
        })
    }

    titleChanged = (data: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            statistic: {
                title: {
                    content: data
                }
            }
        })
    }

    titleColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
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
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            statistic: {
                content: {
                    style: {
                        fill: color
                    }
                }
            }
        })
    }


    titleFontSizeChanged = (size: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            statistic: {
                title: {
                    style: {
                        fontSize: size + 'px'
                    }
                }
            }
        })
    }


    subscriptionFontSizeChanged = (size: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            statistic: {
                content: {
                    style: {
                        fontSize: size + 'px'
                    }
                }
            }
        })
    }

    subscriptionLineHeightChanged = (size: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            statistic: {
                content: {
                    style: {
                        lineHeight: size + 'px'
                    }
                }
            }
        })
    }

    shapeChanged = (value: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            shape: value
        })
    }


    render() {
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged} paletteCount={1}/>
                <div className={'config-group chart-fill-color'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>图形选择：</label>
                        <Select className={'lc-config-item-value lc-select'} defaultValue={'circle'}
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
                                    <LCNumberInput onChange={this.outRadiusChanged} max={1} step={0.01} min={0.01}/>
                                    <label>&nbsp;px</label>
                                </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>边框线宽度：</label>
                        <div className={'lc-config-item-value'}>
                                <span className={'lc-input-container'}>
                                    <LCNumberInput onChange={this.outLineWidthChanged} max={20} step={0.1} min={0}/>
                                    <label>&nbsp;px</label>
                                </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>边框线与水波间隔：</label>
                        <div className={'lc-config-item-value'}>
                                <span className={'lc-input-container'}>
                                    <LCNumberInput onChange={this.outLineIntervalChanged} max={10} min={0} step={0.1}/>
                                    <label>&nbsp;px</label>
                                </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>边框线颜色：</label>
                        <ColorPicker onChange={this.outLineColorChanged}/>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>水波个数：</label>
                        <div className={'lc-config-item-value'}>
                                <span className={'lc-input-container'}>
                                    <LCNumberInput onChange={this.numberOfWaterWavesChanged} max={20} min={0} step={1}/>
                                    <label>&nbsp;px</label>
                                </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>水波长度：</label>
                        <div className={'lc-config-item-value'}>
                            <span className={'lc-input-container'}>
                                <LCNumberInput onChange={this.waveLengthChanged} max={500} min={10} step={5}/>
                                <label>&nbsp;px</label>
                            </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>中心标题：</label>
                        <div className={'lc-config-item-value'}>
                            <LCTextInput onChange={this.titleChanged}/>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>中心标题颜色：</label>
                        <ColorPicker onChange={this.titleColorChanged}/>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>中心标题字体大小：</label>
                        <div className={'lc-config-item-value'}>
                            <span className={'lc-input-container'}>
                                <LCNumberInput onChange={this.titleFontSizeChanged} max={50} min={0} step={1}/>
                                <label>&nbsp;px</label>
                            </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>描述颜色：</label>
                        <ColorPicker onChange={this.subscriptionColorChanged}/>
                    </div>

                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>描述字体大小：</label>
                        <div className={'lc-config-item-value'}>
                            <span className={'lc-input-container'}>
                                <LCNumberInput onChange={this.subscriptionFontSizeChanged} max={50} min={0} step={1}/>
                                <label>&nbsp;px</label>
                            </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>描述字体行高：</label>
                        <div className={'lc-config-item-value'}>
                            <span className={'lc-input-container'}>
                                <LCNumberInput onChange={this.subscriptionLineHeightChanged} max={50} min={0} step={1}/>
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