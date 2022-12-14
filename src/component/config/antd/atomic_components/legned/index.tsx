import React, {Component} from 'react';
import {Select, Switch} from "antd";
import '../index.less';

const {Option} = Select;

/**
 * 原子图标组件-图例
 */
class Legend extends Component<any> {

    state: any = null;

    constructor(props: any) {
        super(props);
        console.log(this.props)
        const {legend} = this.props?.chartConfig?.chartProperties;
        if (legend)
            this.state = {showLegendDetail: true}
        else
            this.state = {showLegendDetail: false}

    }


    showLegend = (data: boolean) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({legend: data});
        this.setState({
            showLegendDetail: data
        })
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


    render() {
        const {showLegendDetail} = this.state;
        return (
            <div className={'config-group chart-fill-color'}>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>显示图例：</label>
                    <div className={'config-item-value'} style={{textAlign: 'right'}}>
                        <Switch onChange={this.showLegend}/></div>
                </div>
                {showLegendDetail ?
                    <>
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
                            <Select className={'config-item-value'} defaultValue={''}
                                    onChange={this.legendLayoutChanged}>
                                <Option value={"horizontal"}>横向布局</Option>
                                <Option value={""}>纵向布局</Option>
                            </Select>
                        </div>
                    </> : <></>}

            </div>
        );
    }
}

export default Legend;