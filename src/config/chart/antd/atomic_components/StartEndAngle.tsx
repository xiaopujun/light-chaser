import React, {Component} from 'react';
import LCNumberInput from "../../../../lib/LCNumberInput";


interface StartEndAngleProps {
    chartProps?: any;
    updateChartProps?: (data: any) => void;
}


/**
 * 圆形图渲染，内外半径设置
 */
export default class StartEndAngle extends Component<StartEndAngleProps> {

    state = {
        startAngle: 0,
        endAngle: 2,
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
        return (
            <div className={'config-group'}>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>起始角度(单位:π)：</label>
                    <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                        <LCNumberInput min={0} max={2} step={0.1}/>
                                    </span>
                    </div>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>结束角度(单位:π)：</label>
                    <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                        <LCNumberInput min={0} max={2} step={0.1}/>
                                    </span>
                    </div>
                </div>
            </div>
        );
    }
}
