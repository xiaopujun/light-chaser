import React, {Component} from 'react';
import './LCBaseConfig.less';
import BaseColorPicker from "../../lc-color-picker/BaseColorPicker";
import Accordion from "../../lc-accordion/Accordion";
import CfgItemBorder from "../../config-item/CfgItemBorder";
import ConfigCard from "../../config-card/ConfigCard";
import ConfigItem from "../../config-item/ConfigItem";
import {ConfigType} from "../../../framework/types/ConfigType";
import {generateBorder, generatePaddingValue, parseBorder, parsePadding} from "../../../utils/CssStyleUtil";
import {parseInt} from "lodash";
import Select from "../../lc-select/Select";
import UnderLineInput from "../../lc-input/UnderLineInput";


/**
 * lc组件基础样式
 */
class BaseStyleSet extends Component<ConfigType> {

    /**
     * 由于边框和内边距。 是多个配置项组合成一个最终的CSS样式，因此。 需要一个变量来保存旧的值。
     */
    oldBorder: string = '0px solid #000000ff';
    oldPadding: string = '10px';

    state: any = {
        borderDisable: false
    }

    constructor(props: ConfigType) {
        super(props);
        this.oldBorder = props.config.border || '0px solid #000000ff';
        this.oldPadding = props.config.padding || '10px';
        if (this.oldPadding.indexOf('none') !== -1)
            this.state = {borderDisable: true};
    }

    paddingChanged = (pos: string, padding: number) => {
        const {updateConfig} = this.props;
        let value = generatePaddingValue(pos, padding, this.oldPadding);
        this.oldPadding = value;
        updateConfig && updateConfig({style: {baseStyle: {padding: value}}});
    }

    backgroundColorChanged = (color: string | string[]) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({style: {baseStyle: {backgroundColor: color}}});
    }

    borderChanged = (key: string, value: string) => {
        const {updateConfig} = this.props;
        const border = generateBorder(key, value, this.oldBorder || '0px solid #000000ff');
        this.oldBorder = border;
        updateConfig && updateConfig({style: {baseStyle: {border}}});
        if (key === 'type' && value === 'none')
            this.setState({borderDisable: true});
    }

    borderRadiusChanged = (radius: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({style: {baseStyle: {borderRadius: `${radius}px`}}})
    }

    render() {
        const {config: {padding, border, borderRadius, backgroundColor}} = this.props;
        const {borderDisable} = this.state;
        const paddingValue = parsePadding(padding);
        const borderValue = parseBorder(border);
        return (
            <Accordion title="容器" showSwitch={false}>
                <ConfigCard title={'内边距'}>
                    <ConfigItem title={'上边距'}>
                        <UnderLineInput type={'number'}
                                        defaultValue={paddingValue.paddingTop}
                                        onChange={(value: any) => this.paddingChanged('top', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'下边距'}>
                        <UnderLineInput type={'number'}
                                        defaultValue={paddingValue.paddingBottom}
                                        onChange={(value: any) => this.paddingChanged('bottom', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'左边距'}>
                        <UnderLineInput type={'number'}
                                        defaultValue={paddingValue.paddingLeft}
                                        onChange={(value: any) => this.paddingChanged('left', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'右边距'}>
                        <UnderLineInput type={'number'}
                                        defaultValue={paddingValue.paddingRight}
                                        onChange={(value: any) => this.paddingChanged('right', value)}/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'边框'}>
                    <ConfigItem title={'类型'}>
                        <Select defaultValue={borderValue.type}
                                onChange={(value) => this.borderChanged('type', value)}
                                options={[
                                    {value: 'none', label: '无'},
                                    {value: 'dotted', label: '点'},
                                    {value: 'dashed', label: '虚线'},
                                    {value: 'solid', label: '实线'},
                                    {value: 'double', label: '双实线'},
                                    {value: 'groove', label: '凹槽'},
                                    {value: 'ridge', label: '垄状'},
                                    {value: 'inset', label: '内凹'},
                                    {value: 'outset', label: '外凸'},
                                ]}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker onChange={(value) => this.borderChanged('color', value)}
                                             disabled={borderDisable}
                                             defaultValue={borderValue.color}
                                             style={{width: '100%', height: '15px', borderRadius: 2}}
                                             showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                    <ConfigItem title={'宽度'}>
                        <UnderLineInput type={'number'} defaultValue={borderValue.width}
                                        disabled={borderDisable}
                                        onChange={(value: any) => this.borderChanged('width', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'圆角'}>
                        <UnderLineInput type={'number'} disabled={borderDisable} onChange={this.borderRadiusChanged}
                                        defaultValue={parseInt(borderRadius)}/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'背景'}>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker defaultValue={backgroundColor}
                                             onChange={this.backgroundColorChanged}
                                             style={{width: '100%', height: '15px', borderRadius: 2}}
                                             showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                </ConfigCard>
            </Accordion>
        );
    }
}

export default BaseStyleSet;
