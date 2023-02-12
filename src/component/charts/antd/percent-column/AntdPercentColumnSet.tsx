import React, {Component} from 'react';

import {dataSort} from "../../../../utils/SortUtil";
import FillColor from "../../../config/chart/antd/atomic_components/FillColor";
import Legend from "../../../config/chart/antd/atomic_components/Legned";
import RightAngleCoordinates from "../../../config/chart/antd/atomic_components/RightAngleCoordinates";
import ColumnWidth from "../../../config/chart/antd/atomic_components/ColumnWidth";
import {
    calculateBarWidth, calculateFillColor,
    calculateLegendConfig,
    calculateRightAngleCoordinates
} from "../../../config/chart/antd/util/AntdChartConfigUtil";

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