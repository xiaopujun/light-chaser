import React, {Component} from 'react';
import './Legend.less';
import Accordion from "../../lc-accordion/Accordion";
import BaseColorPicker from "../../lc-color-picker/BaseColorPicker";
import LcSelect from "../../lc-select/LCSelect";
import {Select} from "antd";
import CfgItemBorder from "../../config-item-border/CfgItemBorder";
import ConfigItem from "../../config-item/ConfigItem";

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
        return (
            <Accordion title={'图例'} showSwitch={true}>
                <ConfigItem title={'位置'}>
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
                </ConfigItem>
                <ConfigItem title={'布局'}>
                    <LcSelect>
                        <Option>横向</Option>
                        <Option>纵向</Option>
                    </LcSelect>
                </ConfigItem>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder width={'100%'}>
                        <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
            </Accordion>
        )
    }
}

export default Legend;