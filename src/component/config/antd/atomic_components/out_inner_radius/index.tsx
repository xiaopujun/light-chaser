import React, {Component} from 'react';
import {Slider} from "antd";

export default class OutInnerRadius extends Component<any> {

    state: any = {
        outRadius: 1,
        innerRadius: 0
    }

    outRadiusChanged = (radius: number) => {
        const {updateElemChartSet} = this.props;
        const {innerRadius} = this.state;
        if (radius > innerRadius) {
            updateElemChartSet({
                radius: radius
            })
            this.setState({outRadius: radius})
        }

    }


    innerRadiusChanged = (radius: number) => {
        const {updateElemChartSet} = this.props;
        const {outRadius} = this.state;
        if (outRadius > radius) {
            updateElemChartSet({
                innerRadius: radius
            })
            this.setState({innerRadius: radius})
        }
    }

    render() {
        const {outRadius, innerRadius} = this.state;
        return (
            <div className={'config-group'}>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>外半径：</label>
                    <Slider defaultValue={0.75} value={outRadius} max={1} min={0.01} step={0.01} style={{width: '60%'}}
                            onChange={this.outRadiusChanged}
                            className={'config-item-value'}/>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>内半径：</label>
                    <Slider defaultValue={0.75} value={innerRadius} max={1} min={0} step={0.01} style={{width: '60%'}}
                            onChange={this.innerRadiusChanged}
                            className={'config-item-value'}/>
                </div>
            </div>
        );
    }
}
