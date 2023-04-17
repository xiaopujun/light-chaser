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
