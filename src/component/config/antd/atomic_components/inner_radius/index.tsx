import React, {Component} from 'react';
import {Slider} from "antd";

export default class InnerRadius extends Component<any> {

    innerRadiusChanged = (radius: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            innerRadius: radius
        })
    }


    render() {
        return (
            <div className={'config-group'}>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>内半径：</label>
                    <Slider defaultValue={0.75} max={1} min={0} step={0.01} style={{width: '60%'}}
                            onChange={this.innerRadiusChanged}
                            className={'config-item-value'}/>
                </div>
            </div>
        );
    }
}
