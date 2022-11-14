import React, {Component} from 'react';
import {Select, Switch} from "antd";
import './style/index.less';
import ColorPicker from "../../../../color_picker/BaseColorPicker";

const {Option} = Select;

interface LegendProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
    /**
     * 是否可见
     */
    visible?: boolean;
    /**
     * 图例位置
     */
    position?: string;
    /**
     * 图例方向
     */
    direction?: string;
    /**
     * 文本颜色
     */
    textColor?: string;
}

/**
 * 原子图标组件-图例
 */
class Legend extends Component<LegendProps> {

    state: any = null;

    constructor(props: any) {
        super(props);
        const {visible = false} = this.props;
        this.state = {visible}
    }


    showLegend = (data: boolean) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({legend: data});
        this.setState({
            visible: data
        })
    }

    legendPositionChanged = (data: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            legend: {
                position: data
            }
        });
    }

    legendLayoutChanged = (data: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            legend: {
                layout: data
            }
        });
    }

    legendTextColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            legend: {
                itemName: {
                    style: {
                        fill: color
                    }
                },
            }
        });
    }

    render() {
        const {visible, position, direction, textColor} = this.props;
        return (
            <div className={'config-group chart-fill-color'}>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>显示图例：</label>
                    <div className={'lc-config-item-value'} style={{textAlign: 'right'}}>
                        <Switch checked={visible} onChange={this.showLegend}/></div>
                </div>
                {this.state.visible ?
                    <>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>图例位置：</label>
                            <Select className={'lc-config-item-value lc-select'}
                                    value={position}
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
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>图例布局：</label>
                            <Select className={'lc-config-item-value lc-select'}
                                    value={direction}
                                    onChange={this.legendLayoutChanged}>
                                <Option value={"horizontal"}>横向布局</Option>
                                <Option value={""}>纵向布局</Option>
                            </Select>
                        </div>
                        <div className={'lc-config-item'}>
                            <label className={'lc-config-item-label'}>文本颜色：</label>
                            <ColorPicker color={textColor} onChange={this.legendTextColorChanged}/>
                        </div>
                    </> : <></>}
            </div>
        );
    }
}

export default Legend;