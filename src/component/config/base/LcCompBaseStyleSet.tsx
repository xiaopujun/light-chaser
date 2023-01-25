import React, {Component} from 'react';
import './style/LCBaseConfig.less';
import {BaseStyle} from "../../../types/LcDesignerType";
import BaseColorPicker from "../../base/BaseColorPicker";
import LCNumberInput from "../../base/LCNumberInput";
import PaddingSet from "./PaddingSet";
import Accordion from "../../base/Accordion";
import LcConfigItem, {CfgItemLayout} from "../../base/LcConfigItem";
import LcConfigBlock from "../../base/LcConfigBlock";
import LcSelect from "../../base/LCSelect";
import {Select} from "antd";

const {Option} = Select;

interface LcCompBaseStyleSetProps {
    baseStyle?: BaseStyle;
    updateBaseStyle?: (data: any) => void;
}

/**
 * lc组件基础样式
 */
export default class LcCompBaseStyleSet extends Component<LcCompBaseStyleSetProps> {

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
                <LcConfigItem title={'背景'}>
                    <BaseColorPicker style={{width: 80, borderRadius: 2}} showText={true}/>
                </LcConfigItem>
                <LcConfigItem title={'边框'} layout={CfgItemLayout.BLOCK}>
                    <LcConfigBlock title={'类型'}>
                        <Select defaultValue={'无'}>
                            <Option>无</Option>
                            <Option>点</Option>
                            <Option>虚线</Option>
                            <Option>实线</Option>
                        </Select>
                    </LcConfigBlock>
                    <LcConfigBlock title={'颜色'}>
                        <BaseColorPicker/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'宽度'}>
                        <LCNumberInput value={3} width={40}/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'圆角'}>
                        <LCNumberInput value={3} width={40}/>
                    </LcConfigBlock>
                </LcConfigItem>
            </Accordion>
        );
    }
}
