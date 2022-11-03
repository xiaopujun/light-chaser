import React, {Component} from 'react';
import './style/AntdColumnSet.less';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import ColumnWidth from "./atomic_components/ColumnWidth";
import {getAntdDataSortCount} from "../../../../utils/AntdBarUtil";


class AntdColumnSet extends Component<any> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: color})
    }

    render() {
        const {updateElemChartSet, LCDesignerStore} = this.props;
        const {active, chartConfigs} = LCDesignerStore;
        let chartConfig = chartConfigs[active?.id + ''];
        let paletteCount = 1;
        switch (active?.type) {
            case 'AntdBaseColumn':
            case 'AntdZoneColumn':
                //单条的计算条数个数
                paletteCount = chartConfig.chartProps.data.length;
                break;
            case 'AntdGroupColumn':
            case 'AntdPercentColumn':
            case 'AntdStackColumn':
                //分组的计算分组个数
                paletteCount = getAntdDataSortCount(chartConfig.chartProps.data, 'type');
                break;
        }
        return (
            <div className={'elem-chart-config'}>

                {/*图形填充色设置*/}
                <FillColor paletteCount={paletteCount} onChange={this.fillColorChanged}/>
                {/*图例配置*/}
                <Legend chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                {/*条形图单条宽度配置*/}
                <ColumnWidth updateElemChartSet={updateElemChartSet}/>

            </div>
        );
    }
}

export default AntdColumnSet;