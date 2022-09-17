import React, {Component} from 'react';
import {Slider, Switch} from "antd";
import ColorPicker from "../../../../color_picker/BaseColorPicker";


interface RightAngleCoordinatesProp {
    updateElemChartSet: (data: any) => void;
    chartConfig?: any;
}

class RightAngleCoordinates extends Component<RightAngleCoordinatesProp> {

    state: any = null;

    constructor(props: any) {
        super(props);
        const {xGrid} = props?.chartConfig?.chartProperties?.xAxis
        const {yGrid} = props?.chartConfig?.chartProperties?.yAxis
        if (xGrid)
            this.state = {showXAxisDetail: true}
        else
            this.state = {showXAxisDetail: false}
        if (yGrid)
            this.state = {showYAxisDetail: true}
        else
            this.state = {showYAxisDetail: false}
    }

    showXGridLine = (data: boolean) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet(data ? {
            xAxis: {
                grid: {
                    line: {
                        style: {
                            stroke: 'rgba(0,255,192,0.59)',
                            lineWidth: 2,
                            lineDash: [4, 5],
                            opacity: 1,
                            cursor: 'pointer'
                        }
                    }
                },
            }
        } : {
            xAxis: {
                grid: null
            }
        });
        this.setState({showXAxisDetail: data})
    }

    xGridLineColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            xAxis: {
                grid: {
                    line: {
                        style: {
                            stroke: color,
                        }
                    }
                },
            }
        })
    }

    xGridLineWidthChanged = (width: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            xAxis: {
                grid: {
                    line: {
                        style: {
                            lineWidth: width,
                        }
                    }
                },
            }
        })
    }

    xGridLineOpacityChanged = (opacity: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            xAxis: {
                grid: {
                    line: {
                        style: {
                            opacity: opacity,
                        }
                    }
                },
            }
        })
    }

    showYGridLine = (data: boolean) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet(data ? {
            yAxis: {
                grid: {
                    line: {
                        style: {
                            stroke: 'rgba(0,255,192,0.59)',
                            lineWidth: 2,
                            lineDash: [4, 5],
                            opacity: 1,
                            cursor: 'pointer'
                        }
                    }
                },
            }
        } : {
            yAxis: {
                grid: null
            }
        });
        this.setState({showYAxisDetail: data})
    }

    yGridLineColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            yAxis: {
                grid: {
                    line: {
                        style: {
                            stroke: color,
                        }
                    }
                },
            }
        })
    }

    yGridLineWidthChanged = (width: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            yAxis: {
                grid: {
                    line: {
                        style: {
                            lineWidth: width,
                        }
                    }
                },
            }
        })
    }

    yGridLineOpacityChanged = (opacity: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            yAxis: {
                grid: {
                    line: {
                        style: {
                            opacity: opacity,
                        }
                    }
                },
            }
        })
    }

    xTitleColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            xAxis: {
                label: {
                    style: {
                        fill: color
                    },
                },
            }
        })
    }

    yTitleColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            yAxis: {
                label: {
                    style: {
                        fill: color
                    },
                },
            }
        })
    }

    render() {
        const {showXAxisDetail, showYAxisDetail} = this.state;
        return (
            <div className={'config-group chart-fill-color'}>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>显示x轴网格线：</label>
                    <div className={'lc-config-item-value'} style={{textAlign: 'right'}}><Switch
                        onChange={this.showXGridLine}/></div>
                </div>
                {showXAxisDetail ?
                    <>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>x轴网格线颜色：</label>
                            <ColorPicker name={'mainTitleColor'}
                                         onChange={this.xGridLineColorChanged}
                                         className={'lc-config-item-value'}/>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>x轴网格线宽：</label>
                            <Slider defaultValue={0} max={10} min={0}
                                    onChange={this.xGridLineWidthChanged}
                                    className={'lc-config-item-value'}/>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>x轴网格透明度：</label>
                            <Slider defaultValue={0} max={1} min={0}
                                    step={0.1}
                                    onChange={this.xGridLineOpacityChanged}
                                    className={'lc-config-item-value'}/>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>x轴标题颜色：</label>
                            <ColorPicker name={'mainTitleColor'}
                                         onChange={this.xTitleColorChanged}
                                         className={'lc-config-item-value'}/>
                        </div>

                    </> : <></>}

                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>显示y轴网格线：</label>
                    <div className={'lc-config-item-value'} style={{textAlign: 'right'}}><Switch
                        onChange={this.showYGridLine}/></div>
                </div>

                {showYAxisDetail ?
                    <>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>y轴网格线颜色：</label>
                            <ColorPicker name={'mainTitleColor'}
                                         onChange={this.yGridLineColorChanged}
                                         className={'lc-config-item-value'}/>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>y轴网格线宽：</label>
                            <Slider defaultValue={0} max={10} min={0}
                                    onChange={this.yGridLineWidthChanged}
                                    className={'lc-config-item-value'}/>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>y轴网格透明度：</label>
                            <Slider defaultValue={0} max={1} min={0} style={{width: '60%'}}
                                    step={0.1}
                                    onChange={this.yGridLineOpacityChanged}
                                    className={'lc-config-item-value'}/>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>y轴标题颜色：</label>
                            <ColorPicker name={'mainTitleColor'}
                                         onChange={this.yTitleColorChanged}
                                         className={'lc-config-item-value'}/>
                        </div>
                    </> :
                    <></>}

            </div>
        );
    }
}

export default RightAngleCoordinates;