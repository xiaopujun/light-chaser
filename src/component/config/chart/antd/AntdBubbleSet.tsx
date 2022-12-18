import React, {Component} from 'react';
import FillColor from "./atomic_components/FillColor";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import {dataSort} from "../../../../utils/SortUtil";
import PointSet from "./atomic_components/PointSet";
import {
    calculateFillColor,
    calculateLegendConfig,
    calculatePointSize,
    calculateRightAngleCoordinates
} from "./util/AntdChartConfigUtil";
import Legend from "./atomic_components/Legned";


interface AntdBubbleSetProps {
    updateChartProps?: (data: any) => void;
    activated?: any;
    chartProps?: any;
}


class AntdBubbleSet extends Component<AntdBubbleSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color});
    }

    pointSizeChanged = (range: [number, number]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            size: range
        })
    }

    shapeChanged = (shape: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            shape: shape
        });
    }


    render() {
        const {updateChartProps, chartProps} = this.props;
        const colors = calculateFillColor(chartProps);
        let sorts = dataSort('type', chartProps.data);
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged}
                           colors={colors}
                           colorCount={sorts}/>
                <Legend updateChartProps={updateChartProps} {...calculateLegendConfig(this.props.chartProps)}/>
                {/*点样式设置*/}
                <PointSet updateChartProps={updateChartProps} {...calculatePointSize(this.props.chartProps)}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates {...calculateRightAngleCoordinates(this.props.chartProps)}
                                       updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdBubbleSet;