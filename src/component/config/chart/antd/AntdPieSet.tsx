import React, {Component} from 'react';
import './style/AntdPieSet.less';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import PolarCoordinateSystem from "./atomic_components/PolarCoordinate";
import {calculateFillColor, calculateLegendConfig} from "./util/AntdChartConfigUtil";
import {dataSort} from "../../../../utils/SortUtil";


interface AntdPieSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
    activated?: any;
}

class AntdPieSet extends Component<AntdPieSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color});
    }


    render() {
        const {updateChartProps, chartProps} = this.props;
        const colors = calculateFillColor(chartProps);
        const sorts = dataSort('type', chartProps.data);
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged}
                           fillMode={colors.length > 1 ? '1' : '0'}
                           colors={colors}
                           colorCount={sorts}/>
                {/*图例配置*/}
                <Legend {...calculateLegendConfig(this.props.chartProps)}
                        chartProps={chartProps}
                        updateChartProps={updateChartProps}/>
                {/*极坐标系*/}
                <PolarCoordinateSystem updateChartProps={updateChartProps}/>

            </div>
        );
    }
}

export default AntdPieSet;