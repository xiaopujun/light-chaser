import React, {Component} from 'react';
import {Collapse, Input, Slider, Switch} from "antd";
import OutRadius from "../atomic_components/out_inner_radius";
import StartEndAngle from "../atomic_components/start_end_angle";
import ColorPicker from "../../../color_picker/BaseColorPicker";

class AntdGaugeSet extends Component<any> {

    state: any = {
        rangeWidth: 1,
        stepCount: 1,
        stepWidth: 1
    }

    rangeColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            range: {
                color,
            },
        })
    }

    rangeWidthChanged = (width: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            range: {
                width: width,
            }
        })
        this.setState({
            rangeWidth: width
        })
    }

    openMete = (data: boolean) => {
        const {updateElemChartSet} = this.props;
        let flag = data ? 'meter' : '';
        updateElemChartSet({
            type: flag
        })
    }


    stepCountChange = (count: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            meter: {
                steps: count
            }
        })
        this.setState({
            stepCount: count
        })
    }
    stepWidthChange = (count: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            meter: {
                stepRatio: count
            }
        })
        this.setState({
            stepWidth: count
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
                        color: color
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

    titleXAxisOffsetChanged = (data: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            statistic: {
                title: {
                    offsetX: data
                }
            }
        })
    }

    titleYAxisOffsetChanged = (data: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            statistic: {
                title: {
                    offsetY: data
                }
            }
        })
    }

    subscriptionXAxisOffsetChanged = (data: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            statistic: {
                content: {
                    offsetX: data
                }
            }
        })
    }

    subscriptionYAxisOffsetChanged = (data: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            statistic: {
                content: {
                    offsetY: data
                }
            }
        })
    }


    render() {
        const {rangeWidth, stepCount, stepWidth} = this.state;
        const {updateElemChartSet} = this.props;
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*极坐标系相关设置*/}
                    <OutRadius updateElemChartSet={updateElemChartSet}/>
                    <StartEndAngle updateElemChartSet={updateElemChartSet}/>
                    <div className={'config-group'}>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>圆弧颜色：</label>
                            <ColorPicker name={'mainTitleColor'}
                                         onChange={this.rangeColorChanged}
                                         className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>圆弧宽度：</label>
                            <Slider defaultValue={1} value={rangeWidth} max={50} min={0.1} step={0.1}
                                    onChange={this.rangeWidthChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>开启刻度仪表盘：</label>
                            <div className={'config-item-value'} style={{textAlign: 'right'}}>
                                <Switch onChange={this.openMete}/></div>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>总刻度数：</label>
                            <Slider defaultValue={1} value={stepCount} max={100} min={1} step={1}
                                    onChange={this.stepCountChange}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>刻度宽度：</label>
                            <Slider defaultValue={0.5} value={stepWidth} max={0.99} min={0} step={0.01}
                                    onChange={this.stepWidthChange}
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
                            <label className={'config-item-label'}>中心标题x轴偏移量：</label>
                            <Slider defaultValue={12} max={100} min={-100} step={1} style={{width: '60%'}}
                                    onChange={this.titleXAxisOffsetChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>中心标题y轴偏移量：</label>
                            <Slider defaultValue={12} max={100} min={-100} step={1} style={{width: '60%'}}
                                    onChange={this.titleYAxisOffsetChanged}
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
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>描述x轴偏移量：</label>
                            <Slider defaultValue={12} max={100} min={-100} step={1} style={{width: '60%'}}
                                    onChange={this.subscriptionXAxisOffsetChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>描述y轴偏移量：</label>
                            <Slider defaultValue={12} max={100} min={-100} step={1} style={{width: '60%'}}
                                    onChange={this.subscriptionYAxisOffsetChanged}
                                    className={'config-item-value'}/>
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default AntdGaugeSet;