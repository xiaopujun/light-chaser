import React, {Component} from 'react';
import {Collapse, Select, Slider, Switch} from "antd";
import ColorPicker from '../../../color-picker/base';
import GroupColorPicker from '../../../color-picker/group';
import './index.less';
import FillColor from "../../antd/atomic_components/fill_color";

const {Option} = Select;


class AntdBarSet extends Component<any> {

    fillColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: color});
    }







    showXGridLine = (data: boolean) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet(data ? {
            xAxis: {
                grid: {
                    line: {
                        style: {
                            stroke: 'rgba(0,255,192,0.59)',
                            lineWidth: 2,
                            lineDash: [4, 5],
                            strokeOpacity: 0.7,
                            cursor: 'pointer'
                        }
                    }
                },
            }
        } : {
            xAxis: {
                grid: null
            }
        });
    }

    xGridLineColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            xAxis: {
                grid: {
                    line: {
                        style: {
                            stroke: color,
                        }
                    }
                },
            }
        })
    }

    xGridLineWidthChanged = (width: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            xAxis: {
                grid: {
                    line: {
                        style: {
                            lineWidth: width,
                        }
                    }
                },
            }
        })
    }

    xGridLineOpacityChanged = (opacity: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            xAxis: {
                grid: {
                    line: {
                        style: {
                            opacity: opacity,
                        }
                    }
                },
            }
        })
    }

    showYGridLine = (data: boolean) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet(data ? {
            yAxis: {
                grid: {
                    line: {
                        style: {
                            stroke: 'rgba(0,255,192,0.59)',
                            lineWidth: 2,
                            lineDash: [4, 5],
                            strokeOpacity: 0.7,
                            cursor: 'pointer'
                        }
                    }
                },
            }
        } : {
            yAxis: {
                grid: null
            }
        });
    }
    yGridLineColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            yAxis: {
                grid: {
                    line: {
                        style: {
                            stroke: color,
                        }
                    }
                },
            }
        })
    }
    yGridLineWidthChanged = (width: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            yAxis: {
                grid: {
                    line: {
                        style: {
                            lineWidth: width,
                        }
                    }
                },
            }
        })
    }
    yGridLineOpacityChanged = (opacity: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            xAxis: {
                grid: {
                    line: {
                        style: {
                            opacity: opacity,
                        }
                    }
                },
            }
        })
    }

    xTitleColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            xAxis: {
                label: {
                    style: {
                        fill: color
                    },
                },
            }
        })
    }
    yTitleColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            yAxis: {
                label: {
                    style: {
                        fill: color
                    },
                },
            }
        })
    }

    barWidthChanged = (width: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            maxBarWidth: width
        })
    }

    groupColorChanged = (value: any) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            color: value
        })
    }

    generateFillColorComp = () => {
        const {dataXDesigner} = this.props;
        const {active} = dataXDesigner;
        switch (active?.subType) {
            case 'AntdBaseBar':
            case 'AntdZoneBar':
                return <ColorPicker name={'mainTitleColor'}
                                    onChange={this.fillColorChanged}
                                    className={'config-item-value'}/>;
            case 'AntdGroupBar':
            case 'AntdPercentBar':
            case 'AntdStackBar':
                const {chartConfigMap} = dataXDesigner;
                let chartConfig = chartConfigMap.get(active?.id);
                let types = new Set();
                chartConfig.chartProperties.data.map((item: any) => {
                    types.add(item?.type);
                });
                return <GroupColorPicker groupNumber={types.size} onChange={this.groupColorChanged}/>;
        }
    }

    render() {
        const {updateElemChartSet} = this.props;
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor updateElemChartSet={updateElemChartSet}/>


                    <div className={'config-item'}>
                        <label className={'config-item-label'}>显示x轴网格线：</label>
                        <div><Switch className={'config-item-value'} onChange={this.showXGridLine}/></div>
                    </div>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>x轴网格线颜色：</label>
                        <ColorPicker name={'mainTitleColor'}
                                     onChange={this.xGridLineColorChanged}
                                     className={'config-item-value'}/>
                    </div>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>x轴网格线宽：</label>
                        <Slider defaultValue={0} max={10} min={0} style={{width: '60%'}}
                                onChange={this.xGridLineWidthChanged}
                                className={'config-item-value'}/>
                    </div>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>x轴网格都明度：</label>
                        <Slider defaultValue={0} max={1} min={0} style={{width: '60%'}}
                                step={0.1}
                                onChange={this.xGridLineOpacityChanged}
                                className={'config-item-value'}/>
                    </div>

                    <div className={'config-item'}>
                        <label className={'config-item-label'}>显示y轴网格线：</label>
                        <div><Switch className={'config-item-value'} onChange={this.showYGridLine}/></div>
                    </div>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>y轴网格线颜色：</label>
                        <ColorPicker name={'mainTitleColor'}
                                     onChange={this.yGridLineColorChanged}
                                     className={'config-item-value'}/>
                    </div>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>y轴网格线宽：</label>
                        <Slider defaultValue={0} max={10} min={0} style={{width: '60%'}}
                                onChange={this.yGridLineWidthChanged}
                                className={'config-item-value'}/>
                    </div>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>y轴网格都明度：</label>
                        <Slider defaultValue={0} max={1} min={0} style={{width: '60%'}}
                                step={0.1}
                                onChange={this.yGridLineOpacityChanged}
                                className={'config-item-value'}/>
                    </div>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>x轴标题颜色：</label>
                        <ColorPicker name={'mainTitleColor'}
                                     onChange={this.xTitleColorChanged}
                                     className={'config-item-value'}/>
                    </div>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>y轴标题颜色：</label>
                        <ColorPicker name={'mainTitleColor'}
                                     onChange={this.yTitleColorChanged}
                                     className={'config-item-value'}/>
                    </div>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>条形宽度：</label>
                        <Slider defaultValue={5} max={20} min={1} style={{width: '60%'}}
                                onChange={this.barWidthChanged}
                                className={'config-item-value'}/>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default AntdBarSet;