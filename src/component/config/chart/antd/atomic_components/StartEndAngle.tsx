import React, {Component} from 'react';
import {Slider} from "antd";

/**
 * 圆形图渲染，内外半径设置
 */
export default class StartEndAngle extends Component<any> {

    state = {
        startAngle: 0,
        endAngle: 2,
    }

    startAngleChanged = (angle: number) => {
        const {updateElemChartSet} = this.props;
        const {endAngle} = this.state;
        if (angle <= endAngle - 0.1) {
            updateElemChartSet({
                startAngle: Math.PI * angle
            })
            this.setState({startAngle: angle})
        }
    }
    endAngleChanged = (angle: number) => {
        const {updateElemChartSet} = this.props;
        const {startAngle} = this.state;
        if (startAngle <= angle - 0.1) {
            updateElemChartSet({
                endAngle: Math.PI * angle
            })
            this.setState({endAngle: angle})
        }
    }

    render() {
        const {startAngle, endAngle} = this.state;
        return (
            <div className={'config-group'}>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>起始角度(单位:π)：</label>
                    <Slider defaultValue={0} value={startAngle} max={2} min={0} step={0.1} style={{width: '60%'}}
                            onChange={this.startAngleChanged}
                            className={'config-item-value'}/>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>结束角度(单位:π)：</label>
                    <Slider defaultValue={2} value={endAngle} max={2} min={0} step={0.1} style={{width: '60%'}}
                            onChange={this.endAngleChanged}
                            className={'config-item-value'}/>
                </div>
            </div>
        );
    }
}
