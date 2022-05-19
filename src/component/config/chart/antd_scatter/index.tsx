import React, {Component} from 'react';
import {Collapse} from "antd";
import './index.less';
import FillColor from "../../antd/atomic_components/fill_color";
import RightAngleCoordinates from "../../antd/atomic_components/right_angle_coordinates";

export default class AntdScatterSet extends Component<any> {


    curveRendering = (data: boolean) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            smooth: data
        })
    }

    render() {
        const {updateElemChartSet} = this.props;
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor updateElemChartSet={updateElemChartSet} groupNumber={1}/>
                    {/*直角坐标系配置*/}
                    <RightAngleCoordinates updateElemChartSet={updateElemChartSet}/>
                </Collapse>
            </div>
        );
    }
}
