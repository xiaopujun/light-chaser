import React, {Component} from 'react';
import OutInnerRadius from "./OutInnerRadius";
import StartEndAngle from "./StartEndAngle";
import LCNumberInput from "../../../../base/LCNumberInput";

interface PolarCoordinateSystemProps {
    updateChartProps?: (data: any) => void;
    items?: any;
}

/**
 * 直角坐标系
 */
export default class PolarCoordinateSystem extends Component<PolarCoordinateSystemProps> {

    state: any = {
        outRadius: 1,
        innerRadius: 0
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


    render() {
        const {updateChartProps} = this.props;
        const {items = ['outer', 'inner']} = this.props;
        return (
            <>
                <OutInnerRadius updateChartProps={updateChartProps}/>
                <div className={'config-group'}>
                    {items.map(((value: string, index: number) => {
                        if (value === 'outer') {
                            return (
                                <div key={index + ''} className={'lc-config-item'}>
                                    <label className={'lc-config-item-label'}>外半径：</label>
                                    <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                        <LCNumberInput onChange={this.outRadiusChanged} min={0} step={0.1}/>
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
                                        <LCNumberInput onChange={this.innerRadiusChanged} min={0} step={0.1}/>
                                    </span>
                                    </div>
                                </div>
                            )
                        }
                    }))}
                </div>
                <StartEndAngle updateChartProps={updateChartProps}/>
            </>
        );
    }
}
