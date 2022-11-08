import React, {Component} from 'react';
import './style/index.less';
import LCNumberInput from "../../../../base/LCNumberInput";

interface BarWidthProp {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
}

/**
 * 条形图，单条宽度配置原子组件
 */
class BarWidth extends Component<BarWidthProp> {

    barWidthChanged = (width: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            maxBarWidth: width
        })
    }

    render() {
        return (
            <div className={'config-group chart-fill-color'}>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>条形宽度：</label>
                    <div className={'lc-config-item-value'}>
                        <span className={'lc-input-container'}>
                            <LCNumberInput onChange={this.barWidthChanged}/>
                            <label>&nbsp;px</label>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default BarWidth;