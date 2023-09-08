import React from "react";
import {ConfigType} from "../../../../designer/right/ConfigType";
import ConfigItem from "../../../../lib/lc-config-item/ConfigItem";
import Select from "../../../../lib/lc-select/Select";
import ConfigCard from "../../../../lib/lc-config-card/ConfigCard";
import {Option} from "../../../../lib/lc-select/SelectType";
import {AntdBaseDesignerComponent} from "../../AntdBaseDesignerComponent";
import AbstractComponent from "../../../../framework/core/AbstractComponent";

type AntdChartField =
    'xField'
    | 'yField'
    | 'seriesField'
    | 'angleField'
    | 'colorField'
    | 'sizeField';

type AntdChartFields = (AntdChartField)[];

const fieldNameMapping = {
    xField: 'X字段',
    yField: 'Y字段',
    seriesField: '分类字段',
    angleField: '角度字段',
    colorField: '颜色字段',
    sizeField: '尺寸字段',
}

export interface AntdFieldMappingProps extends ConfigType {
    fields?: AntdChartFields;
}

const AntdFieldMapping: React.FC<AntdFieldMappingProps> = (props) => {
    const {instance, fields = ['xField', 'yField', 'seriesField']} = props;
    const data = instance.getConfig()?.data?.staticData?.data;
    const options: Option[] = [];
    if (data && data.length >= 1) {
        const dataObj = data[0];
        Object.keys(dataObj).forEach(key => options.push({label: key, value: key}))
    }
    return (
        <ConfigCard title={'字段映射'}>
            {fields.map(field => {
                return (
                    <ConfigItem title={fieldNameMapping[field]}>
                        <Select options={options}/>
                    </ConfigItem>
                )
            })}
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

export default AntdFieldMapping;
