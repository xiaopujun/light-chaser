import React, {Component} from 'react';
import {Slider} from "antd";

export default class OutRadius extends Component<any> {

    outRadiusChanged = (radius: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            radius: radius
        })
    }

    render() {
        return (
            <div className={'config-group'}>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>外半径：</label>
                    <Slider defaultValue={0.75} max={1} min={0.01} step={0.01} style={{width: '60%'}}
                            onChange={this.outRadiusChanged}
                            className={'config-item-value'}/>
                </div>
            </div>
        );
    }
}
