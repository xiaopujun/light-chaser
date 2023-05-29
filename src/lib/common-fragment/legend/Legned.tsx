import React, {Component} from 'react';
import './Legend.less';
import Accordion from "../../lc-accordion/Accordion";
import BaseColorPicker from "../../lc-color-picker/BaseColorPicker";
import CfgItemBorder from "../../config-item/CfgItemBorder";
import ConfigItem from "../../config-item/ConfigItem";
import {LegendType} from "../../../framework/types/LegendType";
import {ConfigType} from "../../../framework/types/ConfigType";
import _ from "lodash";
import Select from "../../lc-select/Select";
import UnderLineInput from "../../lc-input/UnderLineInput";


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
        const {config} = this.props;
        return (
            <Accordion title={'图例'} showSwitch={true} defaultValue={config?.visible}
                       onChange={value => this.onChange('enable', value)}>
                <ConfigItem title={'位置'}>
                    <Select defaultValue={config?.position} onChange={(value => this.onChange('position', value))}
                            options={[
                                {value: 'left-top', label: '左上'},
                                {value: 'left', label: '正左'},
                                {value: 'left-bottom', label: '左下'},
                                {value: 'top-left', label: '上左'},
                                {value: 'top', label: '正上'},
                                {value: 'top-right', label: '上右'},
                                {value: 'right-top', label: '右上'},
                                {value: 'right', label: '正右'},
                                {value: 'right-bottom', label: '右下'},
                                {value: 'bottom-left', label: '下左'},
                                {value: 'bottom', label: '正下'},
                                {value: 'bottom-right', label: '下右'},
                            ]}/>
                </ConfigItem>
                <ConfigItem title={'方向'}>
                    <Select defaultValue={config?.direction} onChange={(value => this.onChange('direction', value))}
                            options={[
                                {value: 'horizontal', label: '横向'},
                                {value: 'vertical', label: '纵向'},
                            ]}/>
                </ConfigItem>
                <ConfigItem title={'字号'}>
                    <UnderLineInput type={'number'} min={12} defaultValue={config?.fontSize || 12}
                                    onChange={value => this.onChange('fontSize', value)}/>
                </ConfigItem>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder width={'100%'}>
                        <BaseColorPicker defaultValue={config?.color} onChange={value => this.onChange('color', value)}
                                         style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
            </Accordion>
        )
    }
}

export default Legend;