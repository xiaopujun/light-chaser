import React, {Component} from 'react';
import './style/LCBaseConfig.less';
import BaseColorPicker from "../../BaseColorPicker";
import LCNumberInput from "../../LCNumberInput";
import PaddingSet from "./PaddingSet";
import Accordion from "../../Accordion";
import LcConfigItem, {CfgItemLayout} from "../../LcConfigItem";
import LcConfigBlock from "../../LcConfigBlock";
import LcSelect from "../../LCSelect";
import {Select} from "antd";
import CfgItemBorder from "../../CfgItemBorder";
import {BaseStyle} from "../../../types/DesignerType";
import ConfigCard from "../card/ConfigCard";
import ConfigItem from "../item/ConfigItem";
import NumberInput from "../../NumberInput";

const {Option} = Select;

interface LcCompBaseStyleSetProps {
    baseStyle?: BaseStyle;
    updateBaseStyle?: (data: any) => void;
}

/**
 * lc组件基础样式
 */
export default class BaseStyleSet extends Component<LcCompBaseStyleSetProps> {

    paddingChanged = (padding: string) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({padding: padding});
    }

    backgroundColorChanged = (color: string | string[]) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({backgroundColor: color});
    }

    borderStyleChanged = (style: string) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({borderStyle: style});
    }

    borderWidthChanged = (width: number) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({borderWidth: `${width}px`});
    }

    borderColorChanged = (color: any) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({borderColor: color});
    }

    borderRadiusChanged = (radius: number) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({borderRadius: `${radius}px`});
    }

    render() {
        return (
            <Accordion title="容器" showSwitch={false}>
                <ConfigCard title={'内边距'}>
                    <ConfigItem title={'上边距'}>
                        <NumberInput style={{textAlign: 'center'}} size={'small'}/>
                    </ConfigItem>
                    <ConfigItem title={'下边距'}>
                        <NumberInput style={{textAlign: 'center'}} size={'small'}/>
                    </ConfigItem>
                    <ConfigItem title={'左边距'}>
                        <NumberInput style={{textAlign: 'center'}} size={'small'}/>
                    </ConfigItem>
                    <ConfigItem title={'右边距'}>
                        <NumberInput style={{textAlign: 'center'}} size={'small'}/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'边框'}>
                    <ConfigItem title={'类型'}>
                        <LcSelect value={'无'}>
                            <Option key='none'>无</Option>
                            <Option key='point'>点</Option>
                            <Option key='v-line'>虚线</Option>
                            <Option key='solid'>实线</Option>
                        </LcSelect>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}}
                                             showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                    <ConfigItem title={'宽度'}>
                        <NumberInput size={'small'}/>
                    </ConfigItem>
                    <ConfigItem title={'圆角'}>
                        <NumberInput size={'small'}/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'背景'}>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}}
                                             showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                </ConfigCard>
            </Accordion>
        );
    }
}
