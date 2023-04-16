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

    generateBaseStyle = () => {
        const {baseStyle} = this.props;
        return [
            {
                label: '内边距',
                comp: "LcPadding",
                config: {
                    value: baseStyle?.padding,
                    onChange: this.paddingChanged,
                },
            },
            {
                label: '背景色',
                comp: "ColorPicker",
                config: {
                    value: baseStyle?.backgroundColor,
                    onChange: this.backgroundColorChanged,
                },
            },
            {
                label: '边框类型',
                comp: "LcSelect",
                config: {
                    value: baseStyle?.borderStyle,
                    onChange: this.borderStyleChanged,
                    options: [
                        {
                            content: '请选择',
                            value: 'no'
                        },
                        {
                            content: '点',
                            value: 'dotted'
                        },
                        {
                            content: '虚线',
                            value: 'dashed'
                        },
                        {
                            content: '实线',
                            value: 'solid'
                        },
                    ],
                },
            },
            {
                label: '边框颜色',
                comp: "ColorPicker",
                config: {
                    value: baseStyle?.borderColor,
                    onChange: this.borderColorChanged,
                },
            },
            {
                label: '边框宽度',
                comp: "LcNumberInput",
                config: {
                    value: baseStyle?.borderWidth?.replace('px', ''),
                    onChange: this.borderWidthChanged,
                },
            },
            {
                label: '边框圆角',
                comp: "LcNumberInput",
                config: {
                    value: baseStyle?.borderRadius?.replace('px', ''),
                    onChange: this.borderRadiusChanged,
                },
            },
        ]
    }

    render() {
        return (
            <Accordion title="容器" showSwitch={false}>
                <LcConfigItem title={'内边距'} layout={CfgItemLayout.ROW}>
                    <PaddingSet/>
                </LcConfigItem>
                <LcConfigItem title={'边框'} layout={CfgItemLayout.BLOCK}>
                    <LcConfigBlock title={'类型'}>
                        <CfgItemBorder>
                            <LcSelect value={'无'}>
                                <Option key='none'>无</Option>
                                <Option key='point'>点</Option>
                                <Option key='v-line'>虚线</Option>
                                <Option key='solid'>实线</Option>
                            </LcSelect>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker showText={true}
                                             style={{width: '100%', borderRadius: '3px', height: '24px'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'宽度'}>
                        <CfgItemBorder>
                            <LCNumberInput value={3} style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'圆角'}>
                        <CfgItemBorder>
                            <LCNumberInput value={3} style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                </LcConfigItem>
                <LcConfigItem title={'背景'}>
                    <CfgItemBorder width={'50%'}>
                        <BaseColorPicker style={{width: '100%', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </LcConfigItem>
            </Accordion>
        );
    }
}
