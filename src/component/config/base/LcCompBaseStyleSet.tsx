import React, {Component} from 'react';
import './style/LCBaseConfig.less';
import {BaseStyle} from "../../../types/LcDesignerType";
import CfgGroup from "./CfgGroup";

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
                labelName: '内边距',
                compName: "LcPadding",
                config: {
                    data: baseStyle?.padding,
                    onChange: this.paddingChanged,
                },
            },
            {
                labelName: '背景色',
                compName: "ColorPicker",
                config: {
                    color: baseStyle?.backgroundColor,
                    onChange: this.backgroundColorChanged,
                },
            },
            {
                labelName: '边框类型',
                compName: "LcSelect",
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
                labelName: '边框颜色',
                compName: "ColorPicker",
                config: {
                    color: baseStyle?.borderColor,
                    onChange: this.borderColorChanged,
                },
            },
            {
                labelName: '边框宽度',
                compName: "LcNumberInput",
                config: {
                    value: baseStyle?.borderWidth?.replace('px', ''),
                    onChange: this.borderWidthChanged,
                },
            },
            {
                labelName: '边框圆角',
                compName: "LcNumberInput",
                config: {
                    value: baseStyle?.borderRadius?.replace('px', ''),
                    onChange: this.borderRadiusChanged,
                },
            },
        ]
    }

    render() {
        return <CfgGroup items={this.generateBaseStyle()}/>;
    }
}
