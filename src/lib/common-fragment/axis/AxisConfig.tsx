import React, {Component} from 'react';
import './AxisConfig.less';
import BaseColorPicker from "../../lc-color-picker/BaseColorPicker";
import LcSwitch from "../../lc-switch/LcSwitch";
import CfgItemBorder from "../../config-item/CfgItemBorder";
import ConfigItem from "../../config-item/ConfigItem";
import ConfigCard from "../../config-card/ConfigCard";
import UnderLineInput from "../../lc-input/UnderLineInput";
import Accordion from "../../lc-accordion/Accordion";
import _ from "lodash";
import Select from "../../lc-select/Select";
import Radio from "../../lc-radio/Radio";


interface AxisConfigProps {
    config?: any;
    onChange?: (key: string, data: any) => void;
    title?: string;
}

/**
 * 轴线配置项
 */
class AxisConfig extends Component<AxisConfigProps> {

    shouldComponentUpdate(nextProps: Readonly<AxisConfigProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        return !_.isEqual(nextProps.config, this.props.config);
    }

    onChange = (key: string, data: any) => {
        const {onChange} = this.props;
        onChange && onChange(key, data);
    }

    render() {
        const {config, title = '坐标轴'} = this.props;
        return (
            <Accordion title={title} showSwitch={true} defaultValue={config.enable || false}
                       onChange={value => this.onChange('enable', value)}>
                <ConfigItem title={'位置'} contentStyle={{width: '250px', paddingLeft: '20px'}}>
                    <Radio defaultValue={config.position || 'right'}
                           onChange={(value => this.onChange('position', value))}
                           options={[{label: '上', value: 'top'},
                               {label: '下', value: 'bottom'},
                               {label: '左', value: 'left'},
                               {label: '右', value: 'right'}]}/>
                </ConfigItem>
                <ConfigCard title={'文本'}>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker defaultValue={config.textColor || '#d5d5d5'}
                                             onChange={value => this.onChange('text-color', value)}
                                             style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                    <ConfigItem title={'角度'}>
                        <UnderLineInput value={config.textAngle || 0} step={0.1}
                                        onChange={value => this.onChange('text-angle', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'偏移量'}>
                        <UnderLineInput value={config.textOffset || 0}
                                        onChange={value => this.onChange('text-offset', value)}/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'标题'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch defaultValue={config.titleEnable || false}
                                  onChange={(value) => this.onChange('title-enable', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'位置'}>
                        <Select options={[
                            {value: 'start', label: '前'},
                            {value: 'center', label: '中'},
                            {value: 'end', label: '后'}]}
                                defaultValue={config.titlePosition} placeholder={'请选择位置'}
                                onChange={value => this.onChange('title-position', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'内容'}>
                        <UnderLineInput value={config.titleContent || ''}
                                        onChange={(e: any) => this.onChange('title-content', e.target.value)}
                                        type={'text'}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker value={config.titleColor}
                                             onChange={value => this.onChange('title-color', value)}
                                             style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                    <ConfigItem title={'偏移量'}>
                        <UnderLineInput defaultValue={config.titleOffset || 0} min={0} type={'number'}
                                        onChange={value => this.onChange('title-offset', value)}/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'轴线'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch defaultValue={config.axisLineEnable || false}
                                  onChange={value => this.onChange('axisLine-enable', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker value={config.axisLineColor}
                                             onChange={value => this.onChange('axisLine-color', value)}
                                             style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                    <ConfigItem title={'线宽'}>
                        <UnderLineInput defaultValue={config.axisLineWidth || 0} min={0} max={10}
                                        onChange={value => this.onChange('axisLine-width', value)}
                                        type={'number'}/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'网格线'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch defaultValue={config.gridLineEnable || false}
                                  onChange={value => this.onChange('gridLine-enable', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'刻度对齐'}>
                        <LcSwitch defaultValue={config.gridLineAlignTick || false}
                                  onChange={value => this.onChange('gridLine-alignTick', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'线宽'}>
                        <UnderLineInput defaultValue={config.gridLineWidth || 0}
                                        onChange={value => this.onChange('gridLine-width', value)}
                                        type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker value={config.gridLineColor}
                                             onChange={value => this.onChange('gridLine-color', value)}
                                             style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'刻度线'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch defaultValue={config.tickLineEnable || false}
                                  onChange={value => this.onChange('tickLine-enable', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'对齐'}>
                        <LcSwitch defaultValue={config.tickLineAlignTick || false}
                                  onChange={value => this.onChange('tickLine-alignTick', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'长度'}>
                        <UnderLineInput defaultValue={config.tickLineLength || 0}
                                        onChange={value => this.onChange('tickLine-length', value)}
                                        type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'宽度'}>
                        <UnderLineInput defaultValue={config.tickLineWidth || 0}
                                        onChange={value => this.onChange('tickLine-width', value)}
                                        type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker value={config.tickLineColor}
                                             onChange={value => this.onChange('tickLine-color', value)}
                                             style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                </ConfigCard>
                {config?.tickLineEnable && <ConfigCard title={'子刻度'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch defaultValue={config.subTickLineEnable || false}
                                  onChange={value => this.onChange('subTickLine-enable', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'数量'}>
                        <UnderLineInput defaultValue={config.subTickLineCount || 0}
                                        onChange={value => this.onChange('subTickLine-count', value)}
                                        type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'长度'}>
                        <UnderLineInput defaultValue={config.subTickLineLength || 0}
                                        onChange={value => this.onChange('subTickLine-length', value)}
                                        type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'宽度'}>
                        <UnderLineInput defaultValue={config.subTickLineWidth || 0}
                                        onChange={value => this.onChange('subTickLine-width', value)}
                                        type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker value={config.subTickLineColor}
                                             onChange={value => this.onChange('subTickLine-color', value)}
                                             style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                </ConfigCard>}
            </Accordion>
        );
    }
}

export default AxisConfig;