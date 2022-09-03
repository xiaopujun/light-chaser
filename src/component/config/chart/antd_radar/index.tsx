import React, {Component} from 'react';
import {Collapse, Switch} from "antd";
import './index.less';
import FillColor from "../../antd/atomic_components/fill_color";
import Legend from "../../antd/atomic_components/legned";
import OutRadius from "../../antd/atomic_components/out_radius";
import StartEndAngle from "../../antd/atomic_components/start_end_angle";

export default class AntdRadarSet extends Component<any> {


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
                    <FillColor onChange={updateElemChartSet} paletteCount={1}/>
                    {/*图例*/}
                    <Legend updateElemChartSet={updateElemChartSet}/>
                    {/*极坐标系相关设置*/}
                    <OutRadius updateElemChartSet={updateElemChartSet}/>
                    <StartEndAngle updateElemChartSet={updateElemChartSet}/>

                    <div className={'config-group'}>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>曲线渲染：</label>
                            <div className={'config-item-value'} style={{textAlign: 'right'}}><Switch
                                onChange={this.curveRendering}/></div>
                        </div>
                    </div>

                </Collapse>
            </div>
        );
    }
}
