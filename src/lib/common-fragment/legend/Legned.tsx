import React, {Component} from 'react';
import './Legend.less';
import Accordion from "../../lc-accordion/Accordion";
import BaseColorPicker from "../../lc-color-picker/BaseColorPicker";
import LcSelect from "../../lc-select/LCSelect";
import {Select} from "antd";
import CfgItemBorder from "../../config-item-border/CfgItemBorder";
import ConfigItem from "../../config-item/ConfigItem";
import {LegendType} from "../../../framework/types/LegendType";
import {ConfigType} from "../../../framework/types/ConfigType";
import _ from "lodash";

const {Option} = Select;

interface LegendProps {
    config?: LegendType;
    onChange?: (key: string, data: any) => void;
}

/**
 * 原子图标组件-图例
 */
class Legend extends Component<LegendProps> {

    state: any = {
        visible: false
    };

    constructor(props: any) {
        super(props);
        const {config} = this.props;
        this.state = {visible: config?.visible || false};
    }

    shouldComponentUpdate(nextProps: Readonly<ConfigType>, nextState: Readonly<{}>, nextContext: any): boolean {
        return !_.isEqual(nextProps, this.props);
    }

    onChange = (key: string, data: any) => {
        const {onChange} = this.props;
        onChange && onChange(key, data);
    }

    render() {
        console.log('Legend render');
        const {config} = this.props;
        return (
            <Accordion title={'图例'} showSwitch={true} defaultValue={config?.visible}
                       onChange={value => this.onChange('enable', value)}>
                <ConfigItem title={'位置'}>
                    <LcSelect defaultValue={config?.position} onChange={(value => this.onChange('position', value))}>
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
                <ConfigItem title={'方向'}>
                    <LcSelect defaultValue={config?.direction} onChange={value => this.onChange('direction', value)}>
                        <Option value={'horizontal'}>横向</Option>
                        <Option value={'vertical'}>纵向</Option>
                    </LcSelect>
                </ConfigItem>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder width={'100%'}>
                        <BaseColorPicker value={config?.color} onChange={value => this.onChange('color', value)}
                                         style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
            </Accordion>
        )
    }
}

export default Legend;