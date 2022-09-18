import React, {Component} from 'react';
import './style/index.less';
import LCNumberInput from "../../../../base/LCNumberInput";

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