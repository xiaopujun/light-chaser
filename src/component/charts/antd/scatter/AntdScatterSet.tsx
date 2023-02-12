import React, {Component} from 'react';
import FillColor from "../../../config/chart/antd/atomic_components/FillColor";
import RightAngleCoordinates from "../../../config/chart/antd/atomic_components/RightAngleCoordinates";
import {
    calculateFillColor,
    calculatePointSize,
    calculateRightAngleCoordinates
} from "../../../config/chart/antd/util/AntdChartConfigUtil";
import PointSet from "../../../config/chart/antd/atomic_components/PointSet";


interface AntdScatterSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
}

export default class AntdScatterSet extends Component<AntdScatterSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            pointStyle: {
                fill: color,
            },
        });
    }

    shapeChanged = (shape: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            shape: shape
        });
    }

    pointSizeChanged = (size: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({size: [1, size]})
    }

    curveRendering = (data: boolean) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            smooth: data
        })
    }

    render() {
        const {updateChartProps} = this.props;
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor {...calculateFillColor(this.props.chartProps)} onChange={this.fillColorChanged}/>
                {/*点样式设置*/}
                <PointSet updateChartProps={updateChartProps} {...calculatePointSize(this.props.chartProps)}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates {...calculateRightAngleCoordinates(this.props.chartProps)}
                                       updateChartProps={updateChartProps}/>

            </div>
        );
    }
}
