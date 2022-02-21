import React, {Component} from 'react';
import {Collapse, Select, Slider, Switch} from "antd";
import ColorPicker from '../../../color_picker/base';
import GroupColorPicker from '../../../color_picker/group';
import './index.less';
import FillColor from "../../antd/atomic_components/fill_color";
import Legend from "../../antd/atomic_components/legned";
import RightAngleCoordinates from "../../antd/atomic_components/right_angle_coordinates";
import BarWidth from "../../antd/atomic_components/bar_width";

const {Option} = Select;


class AntdBarSet extends Component<any> {

    fillColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: color});
    }

    groupColorChanged = (value: any) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            color: value
        })
    }

    generateFillColorComp = () => {
        const {dataXDesigner} = this.props;
        const {active} = dataXDesigner;
        switch (active?.subType) {
            case 'AntdBaseBar':
            case 'AntdZoneBar':
                return <ColorPicker name={'mainTitleColor'}
                                    onChange={this.fillColorChanged}
                                    className={'config-item-value'}/>;
            case 'AntdGroupBar':
            case 'AntdPercentBar':
            case 'AntdStackBar':
                const {chartConfigMap} = dataXDesigner;
                let chartConfig = chartConfigMap.get(active?.id);
                let types = new Set();
                chartConfig.chartProperties.data.map((item: any) => {
                    types.add(item?.type);
                });
                return <GroupColorPicker groupNumber={types.size} onChange={this.groupColorChanged}/>;
        }
    }

    render() {
        const {updateElemChartSet} = this.props;
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor updateElemChartSet={updateElemChartSet}/>
                    {/*图例配置*/}
                    <Legend updateElemChartSet={updateElemChartSet}/>
                    {/*直角坐标系配置*/}
                    <RightAngleCoordinates updateElemChartSet={updateElemChartSet}/>
                    {/*条形图单条宽度配置*/}
                    <BarWidth updateElemChartSet={updateElemChartSet}/>
                </Collapse>
            </div>
        );
    }
}

export default AntdBarSet;