import React, {Component} from 'react';
import {Slider} from "antd";
import '../index.less';

interface BarWidthProp {
    updateElemChartSet: (data: any) => void;
}

/**
 * 条形图，单条宽度配置原子组件
 */
class BarWidth extends Component<BarWidthProp> {

    barWidthChanged = (width: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            maxBarWidth: width
        })
    }

    render() {
        return (
            <div className={'config-group chart-fill-color'}>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>条形宽度：</label>
                    <Slider defaultValue={5} max={20} min={1} style={{width: '60%'}}
                            onChange={this.barWidthChanged}
                            className={'config-item-value'}/>
                </div>
            </div>
        );
    }
}

export default BarWidth;