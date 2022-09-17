import React, {Component} from 'react';
import {Slider} from "antd";
import './style/index.less';

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
                    <Slider defaultValue={5} max={20} min={1}
                            onChange={this.columnWidthChanged}
                            className={'lc-config-item-value'}/>
                </div>
            </div>
        );
    }
}

export default ColumnWidth;