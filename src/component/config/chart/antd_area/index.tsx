import React, {Component} from 'react';
import {Collapse} from "antd";
import './index.less';
import FillColor from "../../antd/atomic_components/fill_color";
import Legend from "../../antd/atomic_components/legned";
import RightAngleCoordinates from "../../antd/atomic_components/right_angle_coordinates";

class AntdAreaSet extends Component<any> {

    render() {
        const {updateElemChartSet} = this.props;
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor onChange={updateElemChartSet} paletteCount={1}/>
                    {/*图例配置*/}
                    <Legend updateElemChartSet={updateElemChartSet}/>
                    {/*直角坐标系配置*/}
                    <RightAngleCoordinates updateElemChartSet={updateElemChartSet}/>
                </Collapse>
            </div>
        );
    }
}

export default AntdAreaSet;