import React, {Component} from 'react';
import BaseColorPicker from "../../../../base/BaseColorPicker";
import './style/RightAngleCoordinates.less';
import {Switch} from "antd";
import LCNumberInput from "../../../../base/LCNumberInput";
import Accordion from "../../../../base/Accordion";


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

    generateRightAngleCoordinatesSet = () => {
        const {showX, showY} = this.state;
        return [
            {
                label: '显示x轴网格线',
                comp: "Switch",
                config: {
                    checked: this.props?.showX,
                    onChange: this.showXGridLine,
                },
            },
            {
                label: 'x轴网格线颜色',
                comp: "ColorPicker",
                visible: showX,
                config: {
                    value: this.props?.xLineColor,
                    onChange: this.xGridLineColorChanged,
                },
            },
            {
                label: 'x轴网格线宽',
                comp: "LcNumberInput",
                visible: showX,
                config: {
                    value: this.props?.xWidth,
                    onChange: this.xGridLineWidthChanged,
                },
            },
            {
                label: 'x轴网格透明度',
                comp: "LcNumberInput",
                visible: showX,
                config: {
                    value: this.props?.xOpacity,
                    onChange: this.xGridLineOpacityChanged,
                    min: 0,
                    max: 1,
                    step: 0.1
                },
            },
            {
                label: 'x轴标题颜色',
                comp: "ColorPicker",
                visible: showX,
                config: {
                    value: this.props?.xTitleColor,
                    onChange: this.xTitleColorChanged,
                },
            },
            {
                label: '显示y轴网格线',
                comp: "Switch",
                config: {
                    checked: this.props?.showY,
                    onChange: this.showYGridLine,
                },
            },
            {
                label: 'y轴网格线颜色',
                comp: "ColorPicker",
                visible: showY,
                config: {
                    value: this.props?.yLineColor,
                    onChange: this.yGridLineColorChanged,
                },
            },
            {
                label: 'y轴网格线宽',
                comp: "LcNumberInput",
                visible: showY,
                config: {
                    value: this.props?.yWidth,
                    onChange: this.yGridLineWidthChanged,
                },
            },
            {
                label: 'y轴网格透明度',
                comp: "LcNumberInput",
                visible: showY,
                config: {
                    value: this.props?.yOpacity,
                    onChange: this.yGridLineOpacityChanged,
                },
            },
            {
                label: 'y轴标题颜色',
                comp: "ColorPicker",
                visible: showY,
                config: {
                    value: this.props?.yTitleColor,
                    onChange: this.yTitleColorChanged,
                },
            },
        ]
    }

    render() {
        return (
            <>
                <Accordion title={'X轴'} showSwitch={true}>
                    <div className={'lc-coordinate-plane'}>
                        <div className={'lc-cfg-item'}>
                            <div className={'item-name'}>X轴</div>
                            <div className={'item-value'}>
                                <div className={'lc-axis-switch'}>
                                    <Switch/>
                                </div>
                                <div className={'lc-axis-items'}>
                                    <div className={'lc-axis-item'}>
                                        <div className={'lc-axis-line-color-value'}><BaseColorPicker/></div>
                                        <div className={'lc-axis-line-color-title'}>轴线颜色</div>
                                    </div>
                                    <div className={'lc-axis-item'}>
                                        <div className={'lc-axis-line-width-value'}><LCNumberInput value={4}/></div>
                                        <div className={'lc-axis-line-width-title'}>轴线宽</div>
                                    </div>
                                    <div className={'lc-axis-item'}>
                                        <div className={'lc-axis-line-opacity-value'}><LCNumberInput value={0.5}/></div>
                                        <div className={'lc-axis-line-opacity-title'}>透明度</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Accordion>
                <Accordion title={'Y轴'} showSwitch={true}>
                    <div className={'lc-coordinate-plane'}>
                        <div className={'lc-cfg-item'}>
                            <div className={'item-name'}>Y轴</div>
                            <div className={'item-value'}>
                                <div className={'lc-axis-switch'}>
                                    <Switch/>
                                </div>
                                <div className={'lc-axis-items'}>
                                    <div className={'lc-axis-item'}>
                                        <div className={'lc-axis-line-color-value'}><BaseColorPicker/></div>
                                        <div className={'lc-axis-line-color-title'}>轴线颜色</div>
                                    </div>
                                    <div className={'lc-axis-item'}>
                                        <div className={'lc-axis-line-width-value'}><LCNumberInput value={4}/></div>
                                        <div className={'lc-axis-line-width-title'}>轴线宽</div>
                                    </div>
                                    <div className={'lc-axis-item'}>
                                        <div className={'lc-axis-line-opacity-value'}><LCNumberInput value={0.5}/></div>
                                        <div className={'lc-axis-line-opacity-title'}>透明度</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Accordion>
            </>
        );
    }
}

export default RightAngleCoordinates;