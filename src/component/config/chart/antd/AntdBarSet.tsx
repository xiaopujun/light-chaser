import React, {Component} from 'react';
import './style/AntdBarSet.less';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import BarWidth from "./atomic_components/BarWidth";
import {getAntdDataSortCount} from "../../../../utils/AntdBarUtil";


class AntdBarSet extends Component<any> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: color});
    }

    groupColorChanged = (value: any) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            color: value
        })
    }


    render() {
        const {updateElemChartSet, LCDesignerStore} = this.props;
        const {active} = LCDesignerStore;
        const {chartConfigs} = LCDesignerStore;
        let chartConfig = chartConfigs[active?.id + ''];
        let paletteCount = 1;
        switch (active?.type) {
            case 'AntdBaseBar':
            case 'AntdZoneBar':
                //单条的计算条数个数
                paletteCount = chartConfig.chartProps.data.length;
                break;
            case 'AntdGroupBar':
            case 'AntdPercentBar':
            case 'AntdStackBar':
                //分组的计算分组个数
                paletteCount = getAntdDataSortCount(chartConfig.chartProps.data, 'type');
                break;
        }
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged} paletteCount={paletteCount}/>
                {/*图例配置*/}
                <Legend chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                {/*条形图单条宽度配置*/}
                <BarWidth updateElemChartSet={updateElemChartSet}/>
            </div>
        );
    }
}

export default AntdBarSet;