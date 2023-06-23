import React from "react";
import ConfigCard from "../../lib/config-card/ConfigCard";
import ConfigItem from "../../lib/config-item/ConfigItem";
import UnderLineInput from "../../lib/lc-input/UnderLineInput";
import CfgItemBorder from "../../lib/config-item/CfgItemBorder";
import BaseColorPicker from "../../lib/lc-color-picker/BaseColorPicker";
import Accordion from "../../lib/lc-accordion/Accordion";
import {ConfigType} from "../../designer/right/ConfigType";

export const AntdLegend: React.FC<ConfigType> = ({config, updateConfig}) => {

    const barWidthChanged = (value: any) => {
        updateConfig && updateConfig({
            style: {
                chartStyle: {
                    maxBarWidth: value
                }
            }
        })
    }

    const fillColorChanged = (color: string) => updateConfig && updateConfig({style: {chartStyle: {color: color}}});

    const {chartStyle} = config;

    return (
        <Accordion title={'图形'}>
            <ConfigCard title={'条状'}>
                <ConfigItem title={'宽度'}>
                    <UnderLineInput type={'number'} min={1} onChange={barWidthChanged}
                                    defaultValue={chartStyle.maxBarWidth}/>
                </ConfigItem>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder>
                        <BaseColorPicker onChange={fillColorChanged}
                                         defaultValue={chartStyle.color}
                                         style={{width: '100%', height: '15px', borderRadius: 2}}
                                         showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
            </ConfigCard>
        </Accordion>
    )
}


export const AntdGraphics: React.FC<ConfigType> = ({config, updateConfig}) => {

    const barWidthChanged = (value: any) => {
        updateConfig && updateConfig({
            style: {
                chartStyle: {
                    maxBarWidth: value
                }
            }
        })
    }

    const fillColorChanged = (color: string) => updateConfig && updateConfig({style: {chartStyle: {color: color}}});

    return (
        <Accordion title={'图形'}>
            <ConfigCard title={'条状'}>
                <ConfigItem title={'宽度'}>
                    <UnderLineInput type={'number'} min={1} onChange={barWidthChanged}
                                    defaultValue={config.maxBarWidth}/>
                </ConfigItem>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder>
                        <BaseColorPicker onChange={fillColorChanged}
                                         defaultValue={config.color}
                                         style={{width: '100%', height: '15px', borderRadius: 2}}
                                         showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
            </ConfigCard>
        </Accordion>
    )
}