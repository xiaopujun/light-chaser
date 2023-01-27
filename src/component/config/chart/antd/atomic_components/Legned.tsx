import React, {Component} from 'react';
import './style/Legend.less';
import Accordion from "../../../../base/Accordion";
import BaseColorPicker from "../../../../base/BaseColorPicker";
import LcConfigItem from "../../../../base/LcConfigItem";
import LcSelect from "../../../../base/LCSelect";
import {Select} from "antd";
import CfgItemBorder from "../../../../base/CfgItemBorder";

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

    generateLegendSet = () => {
        const {visible, position, direction, textColor} = this.props;
        return [
            {
                label: '图例位置',
                comp: "LcSelect",
                visible: visible,
                config: {
                    value: position,
                    onChange: this.legendPositionChanged,
                    options: [
                        {
                            content: '左上',
                            value: 'left-top'
                        },
                        {
                            content: '正左',
                            value: '"left"'
                        },
                        {
                            content: '左下',
                            value: 'left-bottom'
                        },
                        {
                            content: '上左',
                            value: 'top-left'
                        },
                        {
                            content: '正上',
                            value: '"top"'
                        },
                        {
                            content: '上右',
                            value: 'top-right'
                        },
                        {
                            content: '右上',
                            value: 'right-top'
                        },
                        {
                            content: '正右',
                            value: '"right"'
                        },
                        {
                            content: '右下',
                            value: 'right-bottom'
                        },
                        {
                            content: '下左',
                            value: 'bottom-left'
                        },
                        {
                            content: '正下',
                            value: '"bottom"'
                        },
                        {
                            content: '下右',
                            value: 'bottom-right'
                        },
                    ]
                },
            },
            {
                label: '图例布局',
                comp: "LcSelect",
                visible: visible,
                config: {
                    value: direction,
                    onChange: this.legendLayoutChanged,
                    options: [
                        {
                            content: '横向布局',
                            value: 'horizontal'
                        },
                        {
                            content: '纵向布局',
                            value: '""'
                        },
                    ]
                },
            },
            {
                label: '图例文本颜色',
                comp: "ColorPicker",
                visible: visible,
                config: {
                    value: textColor,
                    onChange: this.legendTextColorChanged,
                },
            },
        ]
    }

    render() {
        return (
            <Accordion title={'图例'} showSwitch={true}>
                <LcConfigItem title={'位置'}>
                    <CfgItemBorder width={'50%'}>
                        <LcSelect onChange={this.legendPositionChanged}>
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
                        </LcSelect>
                    </CfgItemBorder>
                </LcConfigItem>
                <LcConfigItem title={'布局'}>
                    <CfgItemBorder width={'50%'}>
                        <LcSelect>
                            <Option>横向</Option>
                            <Option>纵向</Option>
                        </LcSelect>
                    </CfgItemBorder>
                </LcConfigItem>
                <LcConfigItem title={'颜色'}>
                    <CfgItemBorder width={'50%'}>
                        <BaseColorPicker style={{width: '100%', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </LcConfigItem>
            </Accordion>
        )
    }
}

export default Legend;