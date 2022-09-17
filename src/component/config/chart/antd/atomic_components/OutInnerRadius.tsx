import React, {Component} from 'react';
import {Slider} from "antd";

interface OutInnerRadiusProps {
    updateElemChartSet?: (config: object) => void;
    items?: ['outer'?, 'inner'?]
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
        const {updateElemChartSet} = this.props;
        const {innerRadius} = this.state;
        if (radius > innerRadius) {
            updateElemChartSet && updateElemChartSet({
                radius: radius
            })
            this.setState({outRadius: radius})
        }

    }


    innerRadiusChanged = (radius: number) => {
        const {updateElemChartSet} = this.props;
        const {outRadius} = this.state;
        if (outRadius > radius) {
            updateElemChartSet && updateElemChartSet({
                innerRadius: radius
            })
            this.setState({innerRadius: radius})
        }
    }

    render() {
        const {outRadius, innerRadius} = this.state;
        const {items = ['outer', 'inner']} = this.props;
        return (
            <div className={'config-group'}>
                {items.map(((value, index) => {
                    if (value === 'outer') {
                        return (
                            <div key={index + ''} className={'lc-config-item'}>
                                <label className={'lc-config-item-label'}>外半径：</label>
                                <Slider defaultValue={0.75} value={outRadius} max={1} min={0.01} step={0.01}
                                        onChange={this.outRadiusChanged}
                                        className={'lc-config-item-value'}/>
                            </div>
                        )
                    }
                    if (value === 'inner') {
                        return (
                            <div key={index + ""} className={'lc-config-item'}>
                                <label className={'lc-config-item-label'}>内半径：</label>
                                <Slider defaultValue={0.75} value={innerRadius} max={1} min={0} step={0.01}
                                        onChange={this.innerRadiusChanged}
                                        className={'lc-config-item-value'}/>
                            </div>
                        )
                    }
                }))}
            </div>
        );
    }
}
