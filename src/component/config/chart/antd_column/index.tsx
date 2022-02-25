import React, {Component} from 'react';
import {Collapse} from "antd";
import './index.less';
import FillColor from "../../antd/atomic_components/fill_color";
import Legend from "../../antd/atomic_components/legned";
import RightAngleCoordinates from "../../antd/atomic_components/right_angle_coordinates";
import ColumnWidth from "../../antd/atomic_components/column_width";


class AntdColumnSet extends Component<any> {

    render() {
        const {updateElemChartSet} = this.props;
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor groupNumber={1} updateElemChartSet={updateElemChartSet}/>
                    {/*图例配置*/}
                    <Legend updateElemChartSet={updateElemChartSet}/>
                    {/*直角坐标系配置*/}
                    <RightAngleCoordinates updateElemChartSet={updateElemChartSet}/>
                    {/*条形图单条宽度配置*/}
                    <ColumnWidth updateElemChartSet={updateElemChartSet}/>
                </Collapse>
            </div>
        );
    }
}

export default AntdColumnSet;