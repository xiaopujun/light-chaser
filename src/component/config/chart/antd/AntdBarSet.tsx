import React, {Component} from 'react';
import './style/AntdBarSet.less';
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import BarWidth from "./atomic_components/BarWidth";
import {dataSort} from "../../../../utils/SortUtil";

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

    calculateFillColor = () => {
        const {chartProps: {color}} = this.props;
        if (typeof color == 'string')
            return [color];
        else
            return color;
    }

    render() {
        const colors = this.calculateFillColor();
        const {updateChartProps, chartProps} = this.props;
        const sorts = dataSort('type', chartProps.data);
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged}
                           fillMode={colors.length > 1 ? '1' : '0'}
                           colors={colors}
                           colorCount={sorts}/>
                {/*图例配置*/}
                <Legend chartProps={chartProps} updateChartProps={updateChartProps}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates chartProps={chartProps} updateChartProps={updateChartProps}/>
                {/*条形图单条宽度配置*/}
                <BarWidth chartProps={chartProps} updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdBarSet;