import React, {Component} from 'react';
import {Collapse, Select, Slider, Switch} from "antd";
import ColorPicker from '../../../color-picker/base';
import {update} from "lodash";
import './index.less';

const {Panel} = Collapse;
const {Option} = Select;


class AntdBarSet extends Component<any> {

    fillColorChanged = (color: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: color});
    }

    showLegend = (data: boolean) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({legend: data});
    }

    legendPositionChanged = (data: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            legend: {
                position: data
            }
        });
    }

    legendLayoutChanged = (data: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            legend: {
                layout: data
            }
        });
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

    render() {
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>填充色：</label>
                        <ColorPicker name={'mainTitleColor'}
                                     onChange={this.fillColorChanged}
                                     className={'config-item-value'}/>
                    </div>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>显示图例：</label>
                        <div><Switch className={'config-item-value'} onChange={this.showLegend}/></div>
                    </div>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>图例位置：</label>
                        <Select className={'config-item-value'} defaultValue={'left-top'}
                                onChange={this.legendPositionChanged}>
                            <Option value={"left-top"}>左上</Option>
                            <Option value={"left"}>正左</Option>
                            <Option value={"left-bottom"}>左下</Option>
                            <Option value={"top-left"}>上左</Option>
                            <Option value={"top"}>正上</Option>
                            <Option value={"top-right"}>上右</Option>
                            <Option value={"right-top"}>右上</Option>
                            <Option value={"right"}>正右</Option>
                            <Option value={"right-bottom"}>右下</Option>
                            <Option value={"bottom-left"}>下左</Option>
                            <Option value={"bottom"}>正下</Option>
                            <Option value={"bottom-right"}>下右</Option>
                        </Select>
                    </div>
                    <div className={'config-item'}>
                        <label className={'config-item-label'}>图例布局：</label>
                        <Select className={'config-item-value'} defaultValue={''} onChange={this.legendLayoutChanged}>
                            <Option value={"horizontal"}>横向布局</Option>
                            <Option value={""}>纵向布局</Option>
                        </Select>
                    </div>
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