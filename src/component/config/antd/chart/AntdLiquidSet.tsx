import React, {Component} from 'react';
import {Collapse, Input, Select, Slider} from "antd";
import './style/AntdLiquidSet.less';
import FillColor from "../atomic_components/fill_color";
import ColorPicker from "../../../color_picker/BaseColorPicker";

const {Option} = Select;

class AntdLiquidSet extends Component<any> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            color: color
        })
    }

    outRadiusChanged = (radius: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            radius: radius
        })
    }

    outLineWidthChanged = (width: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            outline: {
                border: width
            }
        })
    }


    outLineIntervalChanged = (distance: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            outline: {
                distance: distance
            }
        })
    }

    outLineColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            outline: {
                style: {
                    stroke: color,
                }
            }
        })
    }

    numberOfWaterWavesChanged = (count: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            wave: {
                count: count
            }
        })
    }

    waveLengthChanged = (length: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            wave: {
                length: length
            }
        })
    }

    titleChanged = (e: any) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            statistic: {
                title: {
                    content: e.currentTarget.value
                }
            }
        })
    }

    titleColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
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
        updateElemChartSet({
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
        updateElemChartSet({
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
        updateElemChartSet({
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
        updateElemChartSet({
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
        updateElemChartSet({
            shape: value
        })
    }


    render() {
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor onChange={this.fillColorChanged} paletteCount={1}/>

                    <div className={'config-group chart-fill-color'}>

                        <div className={'config-item'}>
                            <label className={'config-item-label'}>图形选择：</label>
                            <Select className={'config-item-value'} defaultValue={'circle'}
                                    onChange={this.shapeChanged}>
                                <Option value={'circle'}>circle</Option>
                                <Option value={'diamond'}>diamond</Option>
                                <Option value={'triangle'}>triangle</Option>
                                <Option value={'pin'}>pin</Option>
                                <Option value={'rect'}>rect</Option>
                            </Select>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>外半径：</label>
                            <Slider defaultValue={0.75} max={1} min={0.01} step={0.01} style={{width: '60%'}}
                                    onChange={this.outRadiusChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>边框线宽度：</label>
                            <Slider defaultValue={0.75} max={20} min={0} step={0.1} style={{width: '60%'}}
                                    onChange={this.outLineWidthChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>边框线与水波间隔：</label>
                            <Slider defaultValue={0} max={10} min={0} step={0.1} style={{width: '60%'}}
                                    onChange={this.outLineIntervalChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>边框线颜色：</label>
                            <ColorPicker onChange={this.outLineColorChanged}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>水波个数：</label>
                            <Slider defaultValue={0} max={20} min={0} step={1} style={{width: '60%'}}
                                    onChange={this.numberOfWaterWavesChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>水波长度：</label>
                            <Slider defaultValue={10} max={500} min={10} step={5} style={{width: '60%'}}
                                    onChange={this.waveLengthChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>中心标题：</label>
                            <Input defaultValue={""} style={{width: '60%'}}
                                   onChange={this.titleChanged}
                                   className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>中心标题颜色：</label>
                            <ColorPicker onChange={this.titleColorChanged}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>中心标题字体大小：</label>
                            <Slider defaultValue={12} max={50} min={0} step={1} style={{width: '60%'}}
                                    onChange={this.titleFontSizeChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>描述颜色：</label>
                            <ColorPicker onChange={this.subscriptionColorChanged}/>
                        </div>

                        <div className={'config-item'}>
                            <label className={'config-item-label'}>描述字体大小：</label>
                            <Slider defaultValue={12} max={50} min={0} step={1} style={{width: '60%'}}
                                    onChange={this.subscriptionFontSizeChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>描述字体行高：</label>
                            <Slider defaultValue={12} max={50} min={5} step={0.1} style={{width: '60%'}}
                                    onChange={this.subscriptionLineHeightChanged}
                                    className={'config-item-value'}/>
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default AntdLiquidSet;