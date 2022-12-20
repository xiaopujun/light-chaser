import React, {Component} from 'react';
import {Switch} from "antd";
import ColorPicker from "../../../base/BaseColorPicker";
import LCTextInput from "../../../base/LCTextInput";
import LCNumberInput from "../../../base/LCNumberInput";


interface AntdGaugeSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
    items?: any;
}

class AntdGaugeSet extends Component<AntdGaugeSetProps> {

    state: any = {
        rangeWidth: 1,
        stepCount: 1,
        stepWidth: 1,
        startAngle: 0,
        endAngle: 2,
        outRadius: 1,
        innerRadius: 0,
    }

    rangeColorChanged = (color: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            range: {
                color,
            },
        })
    }

    rangeWidthChanged = (width: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            range: {
                width: width,
            }
        })
        this.setState({
            rangeWidth: width
        })
    }

    openMete = (data: boolean) => {
        const {updateChartProps} = this.props;
        let flag = data ? 'meter' : '';
        updateChartProps && updateChartProps({
            type: flag
        })
    }


    stepCountChange = (count: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            meter: {
                steps: count
            }
        })
        this.setState({
            stepCount: count
        })
    }
    stepWidthChange = (count: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            meter: {
                stepRatio: count
            }
        })
        this.setState({
            stepWidth: count
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
                        color: color
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
                        lineHeight: parseFloat(size)
                    }
                }
            }
        })
    }

    titleXAxisOffsetChanged = (data: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                title: {
                    offsetX: parseInt(data)
                }
            }
        })
    }

    titleYAxisOffsetChanged = (data: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                title: {
                    offsetY: parseInt(data)
                }
            }
        })
    }

    subscriptionXAxisOffsetChanged = (data: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                content: {
                    offsetX: parseInt(data)
                }
            }
        })
    }

    subscriptionYAxisOffsetChanged = (data: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                content: {
                    offsetY: parseInt(data)
                }
            }
        })
    }

    startAngleChanged = (angle: any) => {
        const {updateChartProps} = this.props;
        const {endAngle} = this.state;
        if (angle <= endAngle - 0.1) {
            updateChartProps && updateChartProps({
                startAngle: Math.PI * parseFloat(angle)
            })
        }
    }
    endAngleChanged = (angle: any) => {
        const {updateChartProps} = this.props;
        const {startAngle} = this.state;
        if (startAngle <= angle - 0.1) {
            updateChartProps && updateChartProps({
                endAngle: Math.PI * parseFloat(angle)
            })
        }
    }

    outRadiusChanged = (radius: any) => {
        const {updateChartProps} = this.props;
        const {innerRadius} = this.state;
        if (radius > innerRadius) {
            updateChartProps && updateChartProps({
                radius: parseFloat(radius)
            })
        }

    }

    innerRadiusChanged = (radius: any) => {
        const {updateChartProps} = this.props;
        const {outRadius} = this.state;
        if (outRadius > radius) {
            updateChartProps && updateChartProps({
                innerRadius: parseFloat(radius)
            })
        }
    }

    calculateGaugeConfig = (cfg: any) => {
        const {endAngle = 2 * Math.PI, startAngle = Math.PI, radius, statistic, innerRadius, meter, range, type} = cfg;
        return {
            outRadius: radius,
            innerRadius: innerRadius,
            startAngle: startAngle / Math.PI,
            endAngle: endAngle / Math.PI,
            rangeColor: range?.color,
            rangeWidth: range?.width,
            rangeType: type,
            stepRatio: meter?.stepRatio,
            stepCount: meter?.steps,
            title: statistic?.title?.content,
            titleOffsetX: statistic?.title?.offsetX,
            titleOffsetY: statistic?.title?.offsetY,
            titleFontSize: statistic?.title?.style?.fontSize,
            titleFontColor: statistic?.title?.style?.fill,
            descOffsetX: statistic?.content?.offsetX,
            descOffsetY: statistic?.content?.offsetY,
            descFontSize: statistic?.content?.style?.fontSize,
            descFontColor: statistic?.content?.style?.fill,
            descLineHeight: statistic?.content?.style?.lineHeight,
        }
    }

    render() {
        const config = this.calculateGaugeConfig(this.props.chartProps);
        const {items = ['outer', 'inner']} = this.props;
        return (
            <div className={'elem-chart-config'}>
                {/*极坐标系相关设置*/}
                <div className={'config-group'}>
                    {items.map(((value: string, index: number) => {
                        if (value === 'outer') {
                            return (
                                <div key={index + ''} className={'lc-config-item'}>
                                    <label className={'lc-config-item-label'}>外半径：</label>
                                    <div className={'lc-config-item-value'}>
                                        <span className={'lc-input-container'}>
                                            <LCNumberInput onChange={this.outRadiusChanged}
                                                           value={config?.outRadius}
                                                           min={0.1}
                                                           step={0.01}
                                                           max={1}/>
                                        </span>
                                    </div>
                                </div>
                            )
                        }
                        if (value === 'inner') {
                            return (
                                <div key={index + ""} className={'lc-config-item'}>
                                    <label className={'lc-config-item-label'}>内半径：</label>
                                    <div className={'lc-config-item-value'}>
                                        <span className={'lc-input-container'}>
                                            <LCNumberInput onChange={this.innerRadiusChanged}
                                                           value={config?.innerRadius}
                                                           min={0.1}
                                                           step={0.01}/>
                                        </span>
                                    </div>
                                </div>
                            )
                        }
                    }))}
                </div>
                <div className={'config-group'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>起始角度(单位:π)：</label>
                        <div className={'lc-config-item-value'}>
                            <span className={'lc-input-container'}>
                                <LCNumberInput onChange={this.startAngleChanged}
                                               value={config?.startAngle}
                                               min={0}
                                               max={2}
                                               step={0.1}/>
                            </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>结束角度(单位:π)：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                        <LCNumberInput onChange={this.endAngleChanged}
                                                       value={config?.endAngle}
                                                       min={0}
                                                       max={2}
                                                       step={0.1}/>
                                    </span>
                        </div>
                    </div>
                </div>
                <div className={'config-group'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>圆弧颜色：</label>
                        <ColorPicker name={'mainTitleColor'}
                                     onChange={this.rangeColorChanged}
                                     color={config?.rangeColor}
                                     className={'lc-config-item-value'}/>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>圆弧宽度：</label>
                        <div className={'lc-config-item-value'}>
                                       <span className={'lc-input-container'}>
                                             <LCNumberInput onChange={this.rangeWidthChanged}
                                                            value={config?.rangeWidth}
                                                            max={50} min={0.1} step={0.1}/>
                                        </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>开启刻度仪表盘：</label>
                        <div className={'lc-config-item-value'} style={{textAlign: 'right'}}>
                            <Switch checked={config?.rangeType && config?.rangeType === 'meter'}
                                    onChange={this.openMete}/></div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>总刻度数：</label>
                        <div className={'lc-config-item-value'}>
                                     <span className={'lc-input-container'}>
                                            <LCNumberInput onChange={this.stepCountChange}
                                                           value={config?.stepCount}
                                                           max={100} min={1} step={1}/>
                                        </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>刻度宽度：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                            <LCNumberInput onChange={this.stepWidthChange}
                                                           value={config?.stepRatio}
                                                           max={0.9} min={0} step={0.01}/>
                                        </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>中心标题：</label>
                        <div className={'lc-config-item-value'}>
                            <LCTextInput value={config?.title} onChange={this.titleChanged}/>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>中心标题颜色：</label>
                        <ColorPicker color={config?.titleFontColor} onChange={this.titleColorChanged}/>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>中心标题字体大小：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                            <LCNumberInput onChange={this.titleFontSizeChanged}
                                                           value={config?.titleFontSize}
                                                           max={50} min={0} step={1}/>
                                        </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>中心标题x轴偏移量：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                            <LCNumberInput onChange={this.titleXAxisOffsetChanged}
                                                           value={config?.titleOffsetX}
                                                           max={100} min={-100} step={1}/>
                                        </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>中心标题y轴偏移量：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                            <LCNumberInput onChange={this.titleYAxisOffsetChanged}
                                                           value={config?.titleOffsetY}
                                                           max={100} min={-100} step={1}/>
                                        </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>描述颜色：</label>
                        <ColorPicker color={config?.descFontColor} onChange={this.subscriptionColorChanged}/>
                    </div>

                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>描述字体大小：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                            <LCNumberInput onChange={this.subscriptionFontSizeChanged}
                                                           value={config?.descFontSize}
                                                           max={50} min={0} step={1}/>
                                        </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>描述字体行高：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                            <LCNumberInput onChange={this.subscriptionLineHeightChanged}
                                                           value={config?.descLineHeight} step={0.1}/>
                                        </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>描述x轴偏移量：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                            <LCNumberInput onChange={this.subscriptionXAxisOffsetChanged}
                                                           value={config?.descOffsetX}
                                                           max={100} min={-100} step={1}/>
                                        </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>描述y轴偏移量：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                            <LCNumberInput onChange={this.subscriptionYAxisOffsetChanged}
                                                           value={config?.descOffsetY}
                                                           max={100} min={-100} step={1}/>
                                        </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AntdGaugeSet;