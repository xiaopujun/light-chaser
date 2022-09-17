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
                <div className={'config-item'}>
                    <label className={'config-item-label'}>条形宽度：</label>
                    <Slider defaultValue={5} max={20} min={1} style={{width: '60%'}}
                            onChange={this.columnWidthChanged}
                            className={'config-item-value'}/>
                </div>
            </div>
        );
    }
}

export default ColumnWidth;