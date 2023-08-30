import React from "react";
import {ConfigType} from "../../../../designer/right/ConfigType";
import ConfigItem from "../../../../lib/lc-config-item/ConfigItem";
import Select from "../../../../lib/lc-select/Select";
import ConfigCard from "../../../../lib/lc-config-card/ConfigCard";
import {Options} from "@antv/g2plot";
import {Option} from "../../../../lib/lc-select/SelectType";

const FieldMapping: React.FC<ConfigType> = ({instance}) => {
    const config = instance.getConfig().style as Options;
    const {data} = config
    const options: Option[] = [];
    if (data && data.length >= 1) {
        const dataObj = data[0];
        Object.keys(dataObj).forEach(key => options.push({label: key, value: key}))
    }
    return (
        <ConfigCard title={'字段映射'}>
            <ConfigItem title={'X字段'}>
                <Select options={options}/>
            </ConfigItem>
            <ConfigItem title={'Y字段'}>
                <Select options={options}/>
            </ConfigItem>
            <ConfigItem title={'分类字段'}>
                <Select options={options}/>
            </ConfigItem>
        </ConfigCard>
    )
}

export default FieldMapping;
