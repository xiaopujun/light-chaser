import React, {Component} from 'react';
import ColorPicker from "../../../../color_picker/BaseColorPicker";
import CfgGroup from "../../../base/CfgGroup";


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
        return <CfgGroup items={this.generateRightAngleCoordinatesSet()}/>;
    }
}

export default RightAngleCoordinates;