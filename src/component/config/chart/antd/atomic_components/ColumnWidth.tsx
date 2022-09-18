import React, {Component} from 'react';
import './style/index.less';
import LCNumberInput from "../../../../base/LCNumberInput";

interface ColoumWidthProp {
    updateElemChartSet: (data: any) => void;
}

/**
 * 条形图，单条宽度配置原子组件
 */
class ColumnWidth extends Component<ColoumWidthProp> {

    columnWidthChanged = (width: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            maxColumnWidth: width
        })
    }

    render() {
        return (
            <div className={'config-group chart-fill-color'}>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>条形宽度：</label>
                    <div className={'lc-config-item-value'}>
                        <span className={'lc-input-container'}>
                            <LCNumberInput onChange={this.columnWidthChanged}/>
                            <label>&nbsp;px</label>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ColumnWidth;