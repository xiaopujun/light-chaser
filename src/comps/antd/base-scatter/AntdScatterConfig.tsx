import React, {Component} from 'react';
import BaseStyleSet from "../../../lib/common-fragment/base-style/BaseStyleSet";
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys} from "../../common-fragment/AntdFragment";
import Accordion from "../../../lib/lc-accordion/Accordion";
import ConfigCard from "../../../lib/config-card/ConfigCard";
import ConfigItem from "../../../lib/config-item/ConfigItem";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import CfgItemBorder from "../../../lib/config-item/CfgItemBorder";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import Select from "../../../lib/lc-select/Select";

class AntdScatterStyleConfig extends Component<ConfigType> {

    render() {
        const {updateConfig, config} = this.props;
        return (
            <>
                <BaseStyleSet config={config.baseStyle} updateConfig={updateConfig}/>
                <AntdScatterGraphics config={config.chartStyle} updateConfig={updateConfig}/>
                {/*<AntdLegend config={config.chartStyle} updateConfig={updateConfig}/>*/}
                <AntdCartesianCoordinateSys config={config.chartStyle} updateConfig={updateConfig}/>
            </>
        );
    }
}

export {AntdScatterStyleConfig};

export const AntdScatterGraphics: React.FC<ConfigType> = ({config, updateConfig}) => {


    const fillColorChanged = (color: string) => updateConfig && updateConfig({style: {chartStyle: {color: color}}});
    const sizeChanged = (size: number) => updateConfig && updateConfig({style: {chartStyle: {size: size}}});
    const shapeChanged = (shape: string) => updateConfig && updateConfig({style: {chartStyle: {shape}}});

    return (
        <Accordion title={'图形'}>
            <ConfigCard title={'气泡'}>
                <ConfigItem title={'尺寸'}>
                    <UnderLineInput type={'number'} min={1}
                                    onChange={sizeChanged}
                                    defaultValue={config.size}/>
                </ConfigItem>
                <ConfigItem title={'图形'}>
                    <Select defaultValue={'circle'} onChange={shapeChanged} options={[
                        {label: '圈', value: 'circle'},
                        {label: '广场', value: 'square'},
                        {label: '领结', value: 'bowtie'},
                        {label: '钻石', value: 'diamond'},
                        {label: '六角形', value: 'hexagon'},
                        {label: '三角形', value: 'triangle'},
                        {label: '三角形向下', value: 'triangle-down'},
                        {label: '叉', value: 'cross'},
                        {label: '刻度', value: 'tick'},
                        {label: '加', value: 'plus'},
                        {label: '连字号', value: 'hyphen'},
                        {label: '线', value: 'line'},
                    ]}/>
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