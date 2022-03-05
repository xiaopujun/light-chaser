import React, {Component} from 'react';
import {Slider} from "antd";

export default class StartEndAngle extends Component<any> {

    startAngleChanged = (angle: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            startAngle: Math.PI * angle
        })
    }
    endAngleChanged = (angle: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            endAngle: Math.PI * angle
        })
    }

    render() {
        return (
            <div className={'config-group'}>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>起始角度：</label>
                    <Slider defaultValue={0} max={2} min={0} step={0.1} style={{width: '60%'}}
                            onChange={this.startAngleChanged}
                            className={'config-item-value'}/>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>结束角度：</label>
                    <Slider defaultValue={0} max={2} min={0} step={0.1} style={{width: '60%'}}
                            onChange={this.endAngleChanged}
                            className={'config-item-value'}/>
                </div>
            </div>
        );
    }
}
