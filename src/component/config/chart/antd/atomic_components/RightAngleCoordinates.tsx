import React, {Component} from 'react';
import {Switch} from "antd";
import ColorPicker from "../../../../color_picker/BaseColorPicker";
import LCNumberInput from "../../../../base/LCNumberInput";


interface RightAngleCoordinatesProp {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
    showX?: boolean;
    xLineColor?: string;
    xWidth?: number;
    xOpacity?: number;
    xTitleColor?: string;
    showY?: boolean;
    yLineColor?: string;
    yWidth?: number;
    yOpacity?: number;
    yTitleColor?: string;
}

class RightAngleCoordinates extends Component<RightAngleCoordinatesProp> {

    state: any = null;

    constructor(props: any) {
        super(props);
        const {showY = false, showX = false} = this.props;
        this.state = {showX, showY}
    }

    showXGridLine = (data: boolean) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps(data ? {
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
        this.setState({showX: data})
    }

    xGridLineColorChanged = (color: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
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
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
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
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
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
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps(data ? {
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
        this.setState({showY: data})
    }

    yGridLineColorChanged = (color: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
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
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
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
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
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
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
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
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
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
        return (
            <div className={'config-group chart-fill-color'}>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>显示x轴网格线：</label>
                    <div className={'lc-config-item-value'} style={{textAlign: 'right'}}>
                        <Switch checked={this.props?.showX} onChange={this.showXGridLine}/></div>
                </div>
                {this.state.showX ?
                    <>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>x轴网格线颜色：</label>
                            <ColorPicker name={'mainTitleColor'}
                                         color={this.props?.xLineColor}
                                         onChange={this.xGridLineColorChanged}
                                         className={'lc-config-item-value'}/>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>x轴网格线宽：</label>
                            <div className={'lc-config-item-value'}>
                                <span className={'lc-input-container'}>
                                    <LCNumberInput value={this.props?.xWidth} onChange={this.xGridLineWidthChanged}/>
                                    <label>&nbsp;px</label>
                                </span>
                            </div>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>x轴网格透明度：</label>
                            <div className={'lc-config-item-value'}>
                                <span className={'lc-input-container'}>
                                    <LCNumberInput value={this.props?.xOpacity} onChange={this.xGridLineOpacityChanged}
                                                   min={0} max={1} step={0.1}/>
                                </span>
                            </div>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>x轴标题颜色：</label>
                            <ColorPicker name={'mainTitleColor'}
                                         color={this.props?.xTitleColor}
                                         onChange={this.xTitleColorChanged}
                                         className={'lc-config-item-value'}/>
                        </div>

                    </> : <></>}

                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>显示y轴网格线：</label>
                    <div className={'lc-config-item-value'} style={{textAlign: 'right'}}>
                        <Switch checked={this.props?.showY} onChange={this.showYGridLine}/></div>
                </div>

                {this.state.showY ?
                    <>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>y轴网格线颜色：</label>
                            <ColorPicker name={'mainTitleColor'}
                                         color={this.props?.yLineColor}
                                         onChange={this.yGridLineColorChanged}
                                         className={'lc-config-item-value'}/>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>y轴网格线宽：</label>
                            <div className={'lc-config-item-value'}>
                                <span className={'lc-input-container'}>
                                    <LCNumberInput value={this.props?.yWidth} onChange={this.yGridLineWidthChanged}/>
                                    <label>&nbsp;px</label>
                                </span>
                            </div>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>y轴网格透明度：</label>
                            <div className={'lc-config-item-value'}>
                                <span className={'lc-input-container'}>
                                    <LCNumberInput value={this.props?.yOpacity}
                                                   onChange={this.yGridLineOpacityChanged}
                                                   min={0} max={1} step={0.1}/>
                                </span>
                            </div>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>y轴标题颜色：</label>
                            <ColorPicker name={'mainTitleColor'}
                                         color={this.props?.yTitleColor}
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