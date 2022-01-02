import React, {Component} from 'react';
import {Select, Switch} from 'antd';
import ColorPicker from "../../../color-picker/base";
import {getBarDataGroup} from "../../../../utils/AntdBarUtil";
import GroupColorPicker from "../../../color-picker/group";

const {Option} = Select;

/**
 * antd条形图配置
 */
class AntdBarConfig extends Component {

    // updateActiveConfig = (data) => {
    //     const {updateActiveConfig} = this.props;
    //     updateActiveConfig({activeSubType: data})
    // }

    updateChartConfig = (data) => {
        const {updateChartConfig} = this.props;
    }

    updateChartColor = (name, data) => {
        const {updateChartConfig} = this.props;
        updateChartConfig({[name]: data})
    }

    showxAxis = (data) => {
        const {updateChartConfig} = this.props;
        updateChartConfig({
            xAxis: {
                label: data ? {
                    style: {
                        fill: 'rgb(0,255,234)'
                    },
                } : null
            },
        })
    }

    updateXColor = (name, data) => {
        const {updateChartConfig} = this.props;
        updateChartConfig({
            xAxis: {
                label: {
                    style: {
                        fill: data
                    },
                }
            },
        })
    }

    showyAxis = (data) => {
        const {updateChartConfig} = this.props;
        updateChartConfig({
            yAxis: {
                label: data ? {
                    style: {
                        fill: 'rgb(0,255,234)'
                    },
                } : null
            },
        })
    }

    updateyColor = (name, data) => {
        const {updateChartConfig} = this.props;
        updateChartConfig({
            yAxis: {
                label: {
                    style: {
                        fill: data
                    },
                }
            },
        })
    }

    showGrid = (data) => {
        const {updateChartConfig} = this.props;
        updateChartConfig({
            xAxis: {
                grid: {
                    line: data ? {
                        style: {
                            stroke: 'rgba(0,255,192,0.59)',
                            lineWidth: 2,
                            lineDash: [4, 5],
                            strokeOpacity: 0.7,
                            shadowColor: 'rgba(19,128,147,0.77)',
                            shadowBlur: 10,
                            shadowOffsetX: 5,
                            shadowOffsetY: 5,
                            cursor: 'pointer'
                        }
                    } : null
                },
            },
        })
    }

    updateGridColor = (name, data) => {
        const {updateChartConfig} = this.props;
        updateChartConfig({
            xAxis: {
                grid: {
                    line: {
                        style: {
                            stroke: data
                        }
                    }
                }
            }
        })
    }

    updateLegendVisible = (visible) => {
        const {updateChartConfig} = this.props;
        updateChartConfig({
            legend: {visible}
        })
    }

    updateLegendPosition = (position) => {
        const {updateChartConfig} = this.props;
        updateChartConfig({
            legend: {position}
        })
    }

    /**
     * @description 根据图表下的小类型生成对应的配置
     * @param subType 图表子类型
     */
    handingDiffConfig = (params) => {
        const {subType, groups} = params
        switch (subType) {
            case 'AntdBaseBar':
                return (
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>填充色：</label>
                        <ColorPicker name={'color'} onChange={this.updateChartColor}
                                     className={'config-item-value'}/>
                    </div>
                )
            case 'AntdGroupBar':
                return (
                    <>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>填充色：</label>
                            <GroupColorPicker number={groups} onChange={this.updateChartColor}
                                              className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>显示图例：</label>
                            <div>
                                <Switch className={'config-item-value'} onChange={this.updateLegendVisible}/>
                            </div>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>图例位置：</label>
                            <Select defaultValue="left" style={{width: 120}} onChange={this.updateLegendPosition}>
                                <Option value="top">正上</Option>
                                <Option value="top-left">上左</Option>
                                <Option value="top-right">上右</Option>
                                <Option value="bottom-left">下左</Option>
                                <Option value="bottom">下</Option>
                                <Option value="bottom-right">下右</Option>
                                <Option value="left-top">左上</Option>
                                <Option value="left">左</Option>
                                <Option value="left-bottom">左下</Option>
                                <Option value="right-top">右上</Option>
                                <Option value="right">右</Option>
                                <Option value="right-bottom">右下</Option>
                            </Select>
                        </div>
                    </>
                )
            case 'AntdPercentBar':
                return (<div className={'config-item'}>
                    <label className={'config-item-label'}>填充色：</label>
                    <GroupColorPicker number={groups} onChange={this.updateChartColor}
                                      className={'config-item-value'}/>
                </div>)
            case 'AntdZoneBar':
                return (<div className={'config-item'}>
                    <label className={'config-item-label'}>填充色：</label>
                    <ColorPicker name={'color'} onChange={this.updateChartColor}
                                 className={'config-item-value'}/>
                </div>)
            case 'AntdStackBar':
                return (<div className={'config-item'}>
                    <label className={'config-item-label'}>填充色：</label>
                    <GroupColorPicker number={groups} onChange={this.updateChartColor}
                                      className={'config-item-value'}/>
                </div>)
            default:
                return (<></>);
        }
    }

    render() {
        const {currentActive, chartConfig} = this.props?.layoutDesigner;
        const {activeSubType, activeId} = currentActive;
        let data = chartConfig.get(activeId).antdBarConfig.data;
        let groups = getBarDataGroup(data);
        return (
            <>
                {/*差异性配置解析渲染*/}
                {this.handingDiffConfig({subType: activeSubType, groups})}
                {/*公共性配置，统一渲染*/}
                <div className={'config-item'}>
                    <label className={'config-item-label'}>显示x轴：</label>
                    <div>
                        <Switch className={'config-item-value'} onChange={this.showxAxis}/>
                    </div>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>x轴颜色：</label>
                    <ColorPicker name={'xColor'} onChange={this.updateXColor} className={'config-item-value'}/>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>显示y轴：</label>
                    <div>
                        <Switch className={'config-item-value'} onChange={this.showyAxis}/>
                    </div>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>y轴颜色：</label>
                    <ColorPicker name={'yColor'} onChange={this.updateyColor} className={'config-item-value'}/>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>显示网格线：</label>
                    <div>
                        <Switch className={'config-item-value'} onChange={this.showGrid}/>
                    </div>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>网格线颜色：</label>
                    <ColorPicker name={'gridColor'} onChange={this.updateGridColor} className={'config-item-value'}/>
                </div>
            </>
        );
    }
}

export default AntdBarConfig;