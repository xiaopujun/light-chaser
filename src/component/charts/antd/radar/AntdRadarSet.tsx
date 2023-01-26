import React, {Component} from 'react';
import {Switch} from "antd";
import '../../../config/chart/antd/style/AntdRadarSet.less';
import FillColor from "../../../config/chart/antd/atomic_components/FillColor";
import Legend from "../../../config/chart/antd/atomic_components/Legned";
import RightAngleCoordinates from "../../../config/chart/antd/atomic_components/RightAngleCoordinates";
import ColorPicker from "../../../base/BaseColorPicker";
import LCNumberInput from "../../../base/LCNumberInput";
import {calculateFillColor, calculateLegendConfig} from "../../../config/chart/antd/util/AntdChartConfigUtil";
import {dataSort} from "../../../../utils/SortUtil";


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
                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged}
                           colors={colors}
                           colorCount={sorts}/>
                {/*图例*/}
                <Legend {...calculateLegendConfig(this.props.chartProps)}
                        chartProps={chartProps}
                        updateChartProps={updateChartProps}/>
                {/*极坐标系相关设置*/}
                <div className={'config-group'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>外半径：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                        <LCNumberInput value={config?.outRadius}
                                                       min={0} step={0.1}/>
                                    </span>
                        </div>
                    </div>
                </div>
                <div className={'config-group'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>起始角度(单位:π)：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                        <LCNumberInput value={config?.startAngle}
                                                       min={0} max={2} step={0.1}/>
                                    </span>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>结束角度(单位:π)：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                        <LCNumberInput value={config?.endAngle} min={0}
                                                       max={2} step={0.1}/>
                                    </span>
                        </div>
                    </div>
                </div>
                {/*是否曲线渲染*/}
                <div className={'config-group'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>曲线渲染：</label>
                        <div className={'lc-config-item-value'} style={{textAlign: 'right'}}>
                            <Switch checked={config.smooth} onChange={this.curveRendering}/></div>
                    </div>
                </div>
                {/*雷达图线宽*/}
                <div className={'config-group'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>雷达图描边线宽：</label>
                        <div className={'lc-config-item-value'}>
                                    <span className={'lc-input-container'}>
                                        <LCNumberInput value={config.radarLineWidth}
                                                       max={10} min={0} step={0.1}/>
                                    </span>
                        </div>

                    </div>
                </div>
                {/*描边虚线*/}
                <div className={'config-group'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>雷达图点描边颜色：</label>
                        <ColorPicker name={'mainTitleColor'}
                                     color={config.radarLineColor}
                                     onChange={this.pointColorChanged}
                                     className={'lc-config-item-value'}/>
                    </div>
                </div>
                <div className={'config-group'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>雷达图点填充颜色：</label>
                        <ColorPicker name={'mainTitleColor'}
                                     color={config.pointFillColor}
                                     onChange={this.pointFillColorChanged}
                                     className={'lc-config-item-value'}/>
                    </div>
                </div>
                <div className={'config-group'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>雷达图点大小：</label>
                        <div className={'lc-config-item-value'}>
                            <span className={'lc-input-container'}>
                                    <LCNumberInput value={config.pointSize} onChange={this.pointSizeChanged} max={100}
                                                   min={-100} step={1}/>
                            </span>
                        </div>
                    </div>
                </div>

                {/*直角坐标系配置*/}
                <RightAngleCoordinates chartProps={chartProps} updateChartProps={updateChartProps}/>

            </div>
        );
    }
}
