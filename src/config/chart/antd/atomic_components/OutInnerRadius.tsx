import React, {Component} from 'react';
import LCNumberInput from "../../../../lib/LCNumberInput";

interface OutInnerRadiusProps {
    updateChartProps?: (config: object) => void;
    items?: ['outer'?, 'inner'?];
    chartProps?: any;
}

/**
 * 圆形图，内外半径设置
 */
export default class OutInnerRadius extends Component<OutInnerRadiusProps> {

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
        const {items = ['outer', 'inner']} = this.props;
        return (
            <div className={'config-group'}>
                {items.map(((value, index) => {
                    if (value === 'outer') {
                        return (
                            <div key={index + ''} className={'lc-config-item'}>
                                <label className={'lc-config-item-label'}>外半径：</label>
                                <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                        <LCNumberInput min={0} step={0.1}/>
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
                                        <LCNumberInput min={0} step={0.1}/>
                                    </span>
                                </div>
                            </div>
                        )
                    }
                }))}
            </div>
        );
    }
}
