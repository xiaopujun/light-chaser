import React, {Component} from 'react';
import Legend from "../../../config/chart/antd/atomic_components/Legned";
import RightAngleCoordinates from "../../../config/chart/antd/atomic_components/RightAngleCoordinates";
import ColorPicker from "../../../base/BaseColorPicker";
import LCNumberInput from "../../../base/LCNumberInput";
import {calculateFillColor, calculateLegendConfig} from "../../../config/chart/antd/util/AntdChartConfigUtil";
import {dataSort} from "../../../../utils/SortUtil";
import Accordion from "../../../base/Accordion";
import LcConfigItem, {CfgItemLayout} from "../../../base/LcConfigItem";
import LcSwitch from "../../../base/LcSwitch";
import LcConfigBlock from "../../../base/LcConfigBlock";
import ColorSelector from "../../../config/chart/antd/atomic_components/ColorSelector";


interface AntdRadarSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
}

export default class AntdRadarSet extends Component<AntdRadarSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color});
    }

    curveRendering = (data: boolean) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            smooth: data
        })
    }

    lineWidthChanged = (lineWidth: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            lineStyle: {
                lineWidth,
            },
        })
    }

    pointColorChanged = (color: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            point: {
                color,
            },
        })
    }

    pointSizeChanged = (size: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            point: {
                size: parseInt(size),
            },
        });
    }

    pointFillColorChanged = (color: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            point: {
                style: {
                    fill: color
                },
            },
        })
    }

    calculateRadarConfig = (cfg: any) => {
        const {radius, startAngle = 0, endAngle = 2 * Math.PI, smooth, lineStyle, point} = cfg;
        return {
            outRadius: radius,
            startAngle: startAngle,
            endAngle: endAngle,
            smooth: smooth,
            radarLineWidth: lineStyle?.lineWidth,
            radarLineColor: point?.color,
            pointFillColor: point?.style?.fill,
            pointSize: point?.size
        }
    }

    outRadiusChanged = (radius: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            radius: radius
        })

    }

    innerRadiusChanged = (radius: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            innerRadius: radius
        })
    }

    startAngleChanged = (angle: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            startAngle: Math.PI * angle
        })
    }

    endAngleChanged = (angle: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            endAngle: Math.PI * angle
        })
        this.setState({endAngle: angle})
    }

    render() {
        const config = this.calculateRadarConfig(this.props.chartProps);
        const {updateChartProps, chartProps} = this.props;
        const colors = calculateFillColor(this.props.chartProps);
        const sorts = dataSort('type', this.props.chartProps.data);
        return (
            <div className={'elem-chart-config'}>
                <Accordion title={'图形'}>
                    <LcConfigItem title={'填充色'}>
                        <ColorSelector colors={colors} max={sorts}/>
                    </LcConfigItem>
                    <LcConfigItem title={'点'} layout={CfgItemLayout.BLOCK}>
                        <LcConfigBlock title={'描边色'}>
                            <ColorPicker name={'mainTitleColor'}
                                         color={config.radarLineColor}
                                         onChange={this.pointColorChanged}
                                         className={'lc-config-item-value'}/>
                        </LcConfigBlock>
                        <LcConfigBlock title={'点填充色'}>
                            <ColorPicker name={'mainTitleColor'}
                                         color={config.pointFillColor}
                                         onChange={this.pointFillColorChanged}
                                         className={'lc-config-item-value'}/>
                        </LcConfigBlock>
                        <LcConfigBlock title={'点大小'}>
                            <LCNumberInput value={config.pointSize} onChange={this.pointSizeChanged} max={100}
                                           min={-100} step={1}/>
                        </LcConfigBlock>
                    </LcConfigItem>
                    <LcConfigItem title={'线'} layout={CfgItemLayout.BLOCK}>
                        <LcConfigBlock title={'平滑曲线'}>
                            <LcSwitch onChange={this.curveRendering}/>
                        </LcConfigBlock>
                        <LcConfigBlock title={'线宽'}>
                            <LCNumberInput value={config.radarLineWidth}
                                           max={10} min={0} step={0.1}/>
                        </LcConfigBlock>
                    </LcConfigItem>
                </Accordion>
                <Accordion title={'极坐标'}>
                    <LcConfigItem title={'弧长'}>
                        <LCNumberInput value={config?.outRadius}
                                       min={0} step={0.1}/>
                    </LcConfigItem>
                    <LcConfigItem title={'起始角(π)'}>
                        <LCNumberInput value={config?.startAngle}
                                       min={0} max={2} step={0.1}/>
                    </LcConfigItem>
                    <LcConfigItem title={'结束角(π)'}>
                        <LCNumberInput value={config?.endAngle} min={0}
                                       max={2} step={0.1}/>
                    </LcConfigItem>
                </Accordion>
                <Legend {...calculateLegendConfig(this.props.chartProps)}
                        chartProps={chartProps}
                        updateChartProps={updateChartProps}/>
                <RightAngleCoordinates chartProps={chartProps} updateChartProps={updateChartProps}/>
            </div>
        );
    }
}
