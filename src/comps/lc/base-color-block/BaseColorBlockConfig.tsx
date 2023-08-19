import React from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import Accordion from "../../../lib/lc-accordion/Accordion";
import {BaseColorBlockComponentStyle} from "./BaseColorBlockComponent";
import {BaseColorBlock} from "./BaseColorBlock";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";

export const BaseColorBlockConfig: React.FC<ConfigType> = ({instance}) => {

    const updateStyle = (config: BaseColorBlockComponentStyle) => {
        instance.update({style: config});
    }

    const blockStyle = (instance as BaseColorBlock).getConfig()?.style;
    return (
        <>
            <Accordion title={'色块'}>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder width={'100%'}>
                        <BaseColorPicker
                            defaultValue={blockStyle?.backgroundColor || '#009DFF33'}
                            onChange={(value) => updateStyle({backgroundColor: value})}
                            style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
            </Accordion>
        </>
    )
}

