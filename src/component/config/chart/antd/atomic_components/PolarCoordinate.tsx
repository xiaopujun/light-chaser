import React, {Component} from 'react';
import LCNumberInput from "../../../../base/LCNumberInput";

interface PolarCoordinateSystemProps {
    updateChartProps?: (data: any) => void;
    outRadius?: number;
    innerRadius?: number;
    startAngle?: number;
    endAngle?: number;
    items?: any;
}

/**
 * 极坐标系
 */
export default class PolarCoordinateSystem extends Component<PolarCoordinateSystemProps> {

    state: any = {
        outRadius: 1,
        innerRadius: 0,
        startAngle: 0,
        endAngle: 2,
    }

    constructor(props: PolarCoordinateSystemProps) {
        super(props);
        const {outRadius, innerRadius, startAngle = 0, endAngle = 2} = this.props;
        this.state = {
            outRadius: outRadius,
            innerRadius: innerRadius,
            startAngle: startAngle / Math.PI,
            endAngle: endAngle / Math.PI,
        }
    }

    outRadiusChanged = (radius: number) => {
        const {updateChartProps} = this.props;
        const {innerRadius} = this.state;
        if (radius > innerRadius) {
            updateChartProps && updateChartProps({
                radius: radius
            })
            this.setState({outRadius: radius})
        }

    }


    innerRadiusChanged = (radius: number) => {
        const {updateChartProps} = this.props;
        const {outRadius} = this.state;
        if (outRadius > radius) {
            updateChartProps && updateChartProps({
                innerRadius: radius
            })
            this.setState({innerRadius: radius})
        }
    }
    startAngleChanged = (angle: number) => {
        const {updateChartProps} = this.props;
        const {endAngle} = this.state;
        if (angle <= endAngle - 0.1) {
            updateChartProps && updateChartProps({
                startAngle: Math.PI * angle
            })
            this.setState({startAngle: angle})
        }
    }

    endAngleChanged = (angle: number) => {
        const {updateChartProps} = this.props;
        const {startAngle} = this.state;
        if (startAngle <= angle - 0.1) {
            updateChartProps && updateChartProps({
                endAngle: Math.PI * angle
            })
            this.setState({endAngle: angle})
        }
    }


    render() {
        const {outRadius, innerRadius, startAngle, endAngle} = this.state;
        const {items = ['outer', 'inner']} = this.props;
        return (
            <>
                <div className={'config-group'}>
                    {items.map(((value: string, index: number) => {
                        if (value === 'outer') {
                            return (
                                <div key={index + ''} className={'lc-config-item'}>
                                    <label className={'lc-config-item-label'}>外半径：</label>
                                    <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                        <LCNumberInput value={outRadius} onChange={this.outRadiusChanged} max={1}
                                                       min={0} step={0.01}/>
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
                                        <LCNumberInput value={innerRadius} onChange={this.innerRadiusChanged} min={0}
                                                       max={1} step={0.01}/>
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
                                        <LCNumberInput value={startAngle} onChange={this.startAngleChanged} min={0}
                                                       max={2} step={0.1}/>
                                    </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>结束角度(单位:π)：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                        <LCNumberInput value={endAngle} onChange={this.endAngleChanged} min={0} max={2}
                                                       step={0.1}/>
                                    </span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
