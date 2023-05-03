import React, {Component} from 'react';
import './RightAngleCoordinates.less';
import Accordion from "../../lc-accordion/Accordion";
import AxisConfig from "../axis/AxisConfig";


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
            <>
                <Accordion title={'X轴'} showSwitch={true}>
                    <AxisConfig/>
                </Accordion>
                <Accordion title={'Y轴'} showSwitch={true}>
                    <AxisConfig/>
                </Accordion>
            </>
        );
    }
}

export default RightAngleCoordinates;