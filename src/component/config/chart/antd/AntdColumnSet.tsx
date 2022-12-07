import React, {Component} from 'react';
import './style/AntdColumnSet.less';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import ColumnWidth from "./atomic_components/ColumnWidth";
import {getAntdDataSortCount} from "../../../../utils/AntdBarUtil";
import {
    calculateBarWidth,
    calculateFillColor,
    calculateLegendConfig,
    calculateRightAngleCoordinates
} from "./util/AntdChartConfigUtil";
import {dataSort} from "../../../../utils/SortUtil";

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
        const colors = calculateFillColor(this.props.chartProps);
        const {updateChartProps, chartProps} = this.props;
        const sorts = dataSort('type', chartProps.data);
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor colors={colors}
                           colorCount={sorts}
                           onChange={this.fillColorChanged}/>
                {/*图例配置*/}
                <Legend {...calculateLegendConfig(this.props.chartProps)}
                        chartProps={chartProps}
                        updateChartProps={updateChartProps}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates {...calculateRightAngleCoordinates(this.props.chartProps)}
                                       chartProps={chartProps}
                                       updateChartProps={updateChartProps}/>
                {/*条形图单条宽度配置*/}
                <ColumnWidth {...calculateBarWidth(this.props.chartProps)} updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdColumnSet;