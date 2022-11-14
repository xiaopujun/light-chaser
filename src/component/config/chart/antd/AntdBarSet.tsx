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

    calculateLegendConfig = () => {
        let res = {visible: false};
        const {chartProps: {legend}} = this.props;
        if (!legend)
            return res;
        else {
            res = {
                ...res, ...{
                    visible: true,
                    position: legend?.position,
                    direction: legend?.layout,
                    textColor: legend?.itemName?.style?.fill
                }
            };
        }
        return res;
    }

    calculateRightAngleCoordinates = () => {
        let res = {showX: false, showY: false};
        const {chartProps: {xAxis, yAxis}} = this.props;
        return {
            showX: xAxis?.grid != null,
            xLineColor: xAxis?.grid?.line?.style?.stroke,
            xWidth: xAxis?.grid?.line?.style?.lineWidth,
            xOpacity: xAxis?.grid?.line?.style?.opacity,
            xTitleColor: xAxis?.label?.style?.fill,
            showY: yAxis?.grid != null,
            yLineColor: yAxis?.grid?.line?.style?.stroke,
            yWidth: yAxis?.grid?.line?.style?.lineWidth,
            yOpacity: yAxis?.grid?.line?.style?.opacity,
            yTitleColor: yAxis?.label?.style?.fill,
        };
    }

    calculateBarWidth = () => {
        const {chartProps: {maxBarWidth}} = this.props;
        return {barWidth: maxBarWidth}
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
                <Legend {...this.calculateLegendConfig()}
                        chartProps={chartProps}
                        updateChartProps={updateChartProps}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates {...this.calculateRightAngleCoordinates()}
                                       chartProps={chartProps}
                                       updateChartProps={updateChartProps}/>
                {/*条形图单条宽度配置*/}
                <BarWidth {...this.calculateBarWidth()} updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdBarSet;