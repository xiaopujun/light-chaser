import React, {Component} from 'react';
import './style/AntdBarSet.less';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import BarWidth from "./atomic_components/BarWidth";
import {dataSort} from "../../../../utils/SortUtil";
import {
    calculateBarWidth,
    calculateFillColor,
    calculateLegendConfig,
    calculateRightAngleCoordinates
} from "./util/AntdChartConfigUtil";

interface AntdBarSetProps {
    updateChartProps?: (data: any) => void;
    activated?: any;
    chartProps?: any;
}

class AntdBarSet extends Component<AntdBarSetProps> {

    state: any = {
        colors: []
    }

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color});
    }

    groupColorChanged = (value: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            color: value
        })
    }


    render() {
        const colors = calculateFillColor(this.props.chartProps);
        const sorts = dataSort('type', this.props.chartProps.data);
        const {updateChartProps, chartProps} = this.props;
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged}
                           colors={colors}
                           colorCount={sorts}/>
                {/*图例配置*/}
                <Legend {...calculateLegendConfig(this.props.chartProps)}
                        chartProps={chartProps}
                        updateChartProps={updateChartProps}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates {...calculateRightAngleCoordinates(this.props.chartProps)}
                                       chartProps={chartProps}
                                       updateChartProps={updateChartProps}/>
                {/*条形图单条宽度配置*/}
                <BarWidth {...calculateBarWidth(this.props.chartProps)} updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdBarSet;