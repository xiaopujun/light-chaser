import React, {Component} from 'react';
import './style/index.less';
import LCNumberInput from "../../../../LCNumberInput";

interface ColumnWidthProp {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
}

/**
 * 条形图，单条宽度配置原子组件
 */
class ColumnWidth extends Component<ColumnWidthProp> {

    columnWidthChanged = (width: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
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
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                            <label>&nbsp;px</label>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ColumnWidth;