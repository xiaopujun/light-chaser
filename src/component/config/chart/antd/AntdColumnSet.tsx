import React, {Component} from 'react';
import './style/AntdColumnSet.less';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import ColumnWidth from "./atomic_components/ColumnWidth";
import {getAntdDataSortCount} from "../../../../utils/AntdBarUtil";

interface AntdColumnSetProps {
    updateElemChartSet?: (data: any) => void;
    chartProps?: any;
    active?: any;
}

class AntdColumnSet extends Component<AntdColumnSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({color: color})
    }

    render() {
        const {updateElemChartSet, chartProps, active} = this.props;
        let paletteCount = 1;
        switch (active?.type) {
            case 'AntdBaseColumn':
            case 'AntdZoneColumn':
                //单条的计算条数个数
                paletteCount = chartProps.data.length;
                break;
            case 'AntdGroupColumn':
            case 'AntdPercentColumn':
            case 'AntdStackColumn':
                //分组的计算分组个数
                paletteCount = getAntdDataSortCount(chartProps.data, 'type');
                break;
        }
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor paletteCount={paletteCount} onChange={this.fillColorChanged}/>
                {/*图例配置*/}
                <Legend updateElemChartSet={updateElemChartSet}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates updateElemChartSet={updateElemChartSet}/>
                {/*条形图单条宽度配置*/}
                <ColumnWidth updateElemChartSet={updateElemChartSet}/>
            </div>
        );
    }
}

export default AntdColumnSet;