import React, {Component} from 'react';
import './style/AntdColumnSet.less';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import ColumnWidth from "./atomic_components/ColumnWidth";
import {getAntdDataSortCount} from "../../../../utils/AntdBarUtil";

interface AntdColumnSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
    activated?: any;
}

class AntdColumnSet extends Component<AntdColumnSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color})
    }

    render() {
        const {updateChartProps, chartProps, activated} = this.props;
        let paletteCount = 1;
        switch (activated?.type) {
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
                <Legend updateChartProps={updateChartProps}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates updateChartProps={updateChartProps}/>
                {/*条形图单条宽度配置*/}
                <ColumnWidth updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdColumnSet;