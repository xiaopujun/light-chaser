import React, {Component} from 'react';
import FillColor from "./atomic_components/FillColor";
import {calculateFillColor} from "./util/AntdChartConfigUtil";
import {dataSort} from "../../../../utils/SortUtil";

interface AntdWordCloudSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
    activated?: any;
}

class AntdWordCloudSet extends Component<AntdWordCloudSetProps> {
    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            color: color,
            autoFit: true,
        });
    }

    shapeChanged = (shape: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            shape: shape
        });
    }

    pointSizeChanged = (range: [number, number]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            size: range
        })
    }

    curveRendering = (data: boolean) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            smooth: data
        })
    }

    render() {
        const colors = calculateFillColor(this.props.chartProps);
        let sorts = dataSort('type', this.props.chartProps.data);
        return (
            <div className={'elem-chart-config'}>

                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged}
                           fillMode={colors.length > 1 ? '1' : '0'}
                           colors={colors}
                           colorCount={sorts}/>

            </div>
        );
    }
}

export default AntdWordCloudSet;