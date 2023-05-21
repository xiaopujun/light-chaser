import React, {Component} from 'react';
import './LCBaseConfig.less';
import BaseColorPicker from "../../lc-color-picker/BaseColorPicker";
import Accordion from "../../lc-accordion/Accordion";
import LcSelect from "../../lc-select/LCSelect";
import {Select} from "antd";
import CfgItemBorder from "../../config-item-border/CfgItemBorder";
import ConfigCard from "../../config-card/ConfigCard";
import ConfigItem from "../../config-item/ConfigItem";
import NumberInput from "../../lc-input/NumberInput";
import {ConfigType} from "../../../framework/types/ConfigType";
import {generateBorder, generatePaddingValue, parseBorder, parsePadding} from "../../../utils/CssStyleUtil";

const {Option} = Select;

/**
 * lc组件基础样式
 */
export default class BaseStyleSet extends Component<ConfigType> {

    paddingChanged = (pos: string, padding: number) => {
        const {updateConfig, config} = this.props;
        let value = generatePaddingValue(pos, padding, config.baseStyle.padding);
        console.log(value)
        updateConfig && updateConfig({style: {baseStyle: {padding: value}}});
    }

    backgroundColorChanged = (color: string | string[]) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({backgroundColor: color});
    }

    borderChanged = (key: string, value: string) => {
        const {updateConfig, config} = this.props;
        const border = generateBorder(key, value, config.baseStyle.border || '0px solid #000');
        updateConfig && updateConfig({style: {baseStyle: {border}}});
    }

    borderStyleChanged = (style: string) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({borderStyle: style});
    }

    borderWidthChanged = (width: number) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({borderWidth: `${width}px`});
    }

    borderColorChanged = (color: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({borderColor: color});
    }

    borderRadiusChanged = (radius: number) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({borderRadius: `${radius}px`});
    }

    render() {
        const {config: {baseStyle: {padding, border}}} = this.props;
        const paddingValue = parsePadding(padding);
        const borderValue = parseBorder(border);
        return (
            <Accordion title="容器" showSwitch={false}>
                <ConfigCard title={'内边距'}>
                    <ConfigItem title={'上边距'}>
                        <NumberInput style={{textAlign: 'center'}}
                                     defaultValue={paddingValue.paddingTop}
                                     size={'small'}
                                     onChange={(value: any) => this.paddingChanged('top', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'下边距'}>
                        <NumberInput style={{textAlign: 'center'}} size={'small'}
                                     defaultValue={paddingValue.paddingBottom}
                                     onChange={(value: any) => this.paddingChanged('bottom', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'左边距'}>
                        <NumberInput style={{textAlign: 'center'}} size={'small'}
                                     defaultValue={paddingValue.paddingLeft}
                                     onChange={(value: any) => this.paddingChanged('left', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'右边距'}>
                        <NumberInput style={{textAlign: 'center'}} size={'small'}
                                     defaultValue={paddingValue.paddingRight}
                                     onChange={(value: any) => this.paddingChanged('right', value)}/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'边框'}>
                    <ConfigItem title={'类型'}>
                        <LcSelect value={borderValue.type}
                                  onChange={(value) => this.borderChanged('type', value)}>
                            <Option key='none'>无</Option>
                            <Option key='dotted'>点</Option>
                            <Option key='dashed'>虚线</Option>
                            <Option key='solid'>实线</Option>
                            <Option key='double'>双实线</Option>
                            <Option key='groove'>凹槽</Option>
                            <Option key='ridge'>垄状</Option>
                            <Option key='inset'>内凹</Option>
                            <Option key='outset'>外凸</Option>
                        </LcSelect>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker onChange={(value) => this.borderChanged('color', value)}
                                             value={borderValue.color}
                                             style={{width: '100%', height: '15px', borderRadius: 2}}
                                             showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                    <ConfigItem title={'宽度'}>
                        <NumberInput defaultValue={borderValue.width}
                                     onChange={(value: any) => this.borderChanged('width', value)} size={'small'}/>
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
