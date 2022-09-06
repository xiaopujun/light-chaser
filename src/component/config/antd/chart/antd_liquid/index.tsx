import React, {Component} from 'react';
import {Collapse, Slider} from "antd";
import './index.less';
import FillColor from "../../atomic_components/fill_color";

class AntdLiquidSet extends Component<any> {

    outRadiusChanged = (radius: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            radius: radius
        })
    }
    innerRadiusChanged = (radius: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            innerRadius: radius
        })
    }
    startAngleChanged = (angle: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            startAngle: Math.PI * angle
        })
    }
    endAngleChanged = (angle: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            endAngle: Math.PI * angle
        })
    }

    render() {
        const {updateElemChartSet} = this.props;
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor onChange={updateElemChartSet} paletteCount={1}/>

                    <div className={'config-group chart-fill-color'}>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>外半径：</label>
                            <Slider defaultValue={0.75} max={1} min={0.01} step={0.01} style={{width: '60%'}}
                                    onChange={this.outRadiusChanged}
                                    className={'config-item-value'}/>
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default AntdLiquidSet;