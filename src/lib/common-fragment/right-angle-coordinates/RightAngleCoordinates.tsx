import React, {Component} from 'react';
import './RightAngleCoordinates.less';
import Accordion from "../../lc-accordion/Accordion";
import AxisConfig from "../axis/AxisConfig";


interface RightAngleCoordinatesProp {
    updateElemConfig?: (data: any) => void;
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
        const {updateElemConfig} = this.props;
        updateElemConfig && updateElemConfig(data ? {
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
        const {updateElemConfig} = this.props;
        updateElemConfig && updateElemConfig({
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
        const {updateElemConfig} = this.props;
        updateElemConfig && updateElemConfig({
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
        const {updateElemConfig} = this.props;
        updateElemConfig && updateElemConfig({
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
        const {updateElemConfig} = this.props;
        updateElemConfig && updateElemConfig(data ? {
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
        const {updateElemConfig} = this.props;
        updateElemConfig && updateElemConfig({
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
        const {updateElemConfig} = this.props;
        updateElemConfig && updateElemConfig({
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
        const {updateElemConfig} = this.props;
        updateElemConfig && updateElemConfig({
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
        const {updateElemConfig} = this.props;
        updateElemConfig && updateElemConfig({
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
        const {updateElemConfig} = this.props;
        updateElemConfig && updateElemConfig({
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