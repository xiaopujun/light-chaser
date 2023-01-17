import React, {Component} from 'react';
import './style/Legend.less';
import CfgGroup from "../../../base/CfgGroup";
import Accordion from "../../../../base/Accordion";
import LcRadialButton from "../../../../base/LcRadialButton";
import BaseColorPicker from "../../../../base/BaseColorPicker";


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
        const items = this.generateLegendSet();
        return (
            <Accordion title={'图例'} showSwitch={true}>
                {/*<CfgGroup items={items}/>*/}
                <div className={'lc-legend-config'}>
                    <div className={'legend-position'}>
                        <div className={'pos-row'}>
                            <LcRadialButton className={'pos-item'}>左上</LcRadialButton>
                            <LcRadialButton className={'pos-item'}>上</LcRadialButton>
                            <LcRadialButton className={'pos-item'}>右上</LcRadialButton>
                        </div>
                        <div className={'pos-row'}>
                            <LcRadialButton className={'pos-item'}>左</LcRadialButton>
                            <span className={'pos-item'}>位置</span>
                            <LcRadialButton className={'pos-item'}>右</LcRadialButton>
                        </div>
                        <div className={'pos-row'}>
                            <LcRadialButton className={'pos-item'}>左下</LcRadialButton>
                            <LcRadialButton className={'pos-item'}>下</LcRadialButton>
                            <LcRadialButton className={'pos-item'}>右下</LcRadialButton>
                        </div>
                    </div>
                    <div className={'legend-config-right'}>
                        <div className={'legend-layout'}>
                            <div className={'legend-layout-value'}>
                                <LcRadialButton>横向</LcRadialButton>
                                <LcRadialButton>纵向</LcRadialButton>
                            </div>
                            <div className={'legend-layout-title'}>布局</div>
                        </div>
                        <div className={'legend-color'}>
                            <div className={'legend-label-color'}>
                                <BaseColorPicker style={{width: 110, borderRadius: 2}} showText={true}/>
                            </div>
                            <div className={'legend-label-title'}>标签色</div>
                        </div>
                    </div>
                </div>

            </Accordion>
        )
    }
}

export default Legend;