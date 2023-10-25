import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {Area, AreaOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractController from "../../../framework/core/AbstractController";
import AntdCommonAreaController, {AntdAreaProps} from "./AntdCommonAreaController";
import {WritableAreaOptions, WritableBarOptions} from "../types";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import ConfigCard from "../../../lib/lc-config-card/ConfigCard";
import Select from "../../../lib/lc-select/Select";
import {Option} from "../../../lib/lc-select/SelectType";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";

class AntdAreaCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const controller: AbstractController<Area, AntdAreaProps> = this.props.controller;
        controller.update({style: {legend}});
    }

    areaCoordinateSysChange = (config: AreaOptions) => {
        const controller: AbstractController<Area, AntdAreaProps> = this.props.controller;
        controller.update({style: config});
    }

    areaGraphicsChange = (config: AreaOptions) => {
        const controller: AbstractController<Area, AntdAreaProps> = this.props.controller;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config: AreaOptions = controller.getConfig().style;
        return (
            <>
                <AntdCommonAreaGraphics config={config} onChange={this.areaGraphicsChange}/>
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
                <AntdCartesianCoordinateSys onChange={this.areaCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdAreaCommonStyleConfig};


export interface AntdCommonAreaGraphicsProps {
    config?: WritableAreaOptions;

    onChange(config: WritableAreaOptions): void;
}

export const AntdCommonAreaGraphics: React.FC<AntdCommonAreaGraphicsProps> = ({config, onChange}) => {

    // const areaColorChange = (data: ColorModeValue) => {
    //     const {mode, value, angle = 0} = data;
    //     switch (mode) {
    //         case 'single':
    //             onChange({areaStyle: {fill: value as string}});
    //             break;
    //         case 'multi':
    //             onChange({color: value as string[], areaStyle: {fill: undefined}});
    //             break;
    //         case 'gradient':
    //             onChange({areaStyle: {fill: `l(${angle}) 0:${value[0]} 1:${value[1]}`}});
    //             break;
    //     }
    // }
    //
    // const buildColorModeData = (): ColorModeValue => {
    //     let mode, value: string | string[], angle = 0;
    //     if ((config?.areaStyle as ShapeAttrs)?.fill) {
    //         const fill = (config?.areaStyle as ShapeAttrs).fill as string;
    //         if (fill.startsWith('l')) {
    //             mode = 'gradient';
    //             value = [fill.split(':')[1].split(' ')[0], fill.split(':')[2].split(' ')[0]];
    //             angle = parseInt(fill.split('(')[1].split(')')[0]);
    //         } else {
    //             mode = 'single';
    //             value = fill;
    //         }
    //     } else {
    //         mode = 'multi';
    //         value = config?.color as string[] || ['#fff'];
    //     }
    //     return {mode, value, angle};
    // }

    const _onChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        key: 'style',
        type: 'accordion',
        label: '图形',


    }

    return (
        <LCGUI schema={schema} onFieldChange={_onChange}/>
        // <Accordion title={'图形'}>
        //     <ConfigCard title={'数据点'}>
        //         <ConfigItem title={'尺寸'}>
        //             <UnderLineInput defaultValue={(config?.point as MappingOptions)?.size as number || 0}
        //                             type={'number'} min={0}
        //                             onChange={(event) =>
        //                                 onChange({point: {size: parseInt(event.target.value)}})}/>
        //         </ConfigItem>
        //         <ConfigItem title={'颜色'}>
        //             <CfgItemBorder width={'100%'}>
        //                 <BaseColorPicker
        //                     defaultValue={(config?.point?.style as ShapeStyle)?.fill || '#fff'}
        //                     onChange={(value) => onChange({point: {style: {fill: value}}})}
        //                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
        //             </CfgItemBorder>
        //         </ConfigItem>
        //         <ConfigItem title={'形状'}>
        //             <Select options={[
        //                 {value: 'circle', label: '圈形'},
        //                 {value: 'square', label: '方形'},
        //                 {value: 'bowtie', label: '领结'},
        //                 {value: 'diamond', label: '钻石'},
        //                 {value: 'hexagon', label: '六角形'},
        //                 {value: 'triangle', label: '三角形'}]}
        //                     defaultValue={config?.point?.shape as string || 'circle'}
        //                     onChange={(value) => onChange({point: {shape: value}})}/>
        //         </ConfigItem>
        //     </ConfigCard>
        //     <ConfigCard title={'数据线'}>
        //         <ConfigItem title={'平滑'}>
        //             <LcSwitch defaultValue={config?.smooth}
        //                       onChange={(value) => onChange({smooth: value})}/>
        //         </ConfigItem>
        //         <ConfigItem title={'线宽'}>
        //             <UnderLineInput defaultValue={(config?.line?.style as ShapeStyle)?.lineWidth as number || 1}
        //                             type={'number'} min={0}
        //                             onChange={(event) =>
        //                                 onChange({line: {style: {lineWidth: parseInt(event.target.value)}}})}/>
        //         </ConfigItem>
        //     </ConfigCard>
        //     <ConfigCard title={'数据面'} bodyStyle={{width: '100%'}} cardStyle={{width: '100%'}}>
        //         <ConfigItem title={'颜色'} itemStyle={{width: '100%'}} contentStyle={{width: 'calc(100% - 38px)'}}>
        //             <ColorMode onChange={areaColorChange} data={buildColorModeData()}
        //                        exclude={[ColorModeType.RADIAL_GRADIENT]}/>
        //         </ConfigItem>
        //     </ConfigCard>
        // </Accordion>
    )
}


export const AntdAreaFieldMapping: React.FC<ConfigType<AntdCommonAreaController>> = ({controller}) => {
    const config = controller.getConfig()!.style;
    const {data, xField, yField, seriesField} = config!;
    const options: Option[] = [];
    if (data && data.length >= 1) {
        const dataObj = data[0];
        Object.keys(dataObj).forEach(key => options.push({label: key, value: key}))
    }

    const fieldChange = (config: WritableBarOptions) => {
        controller.update({style: config});
    }

    return (
        <ConfigCard title={'字段映射'}>
            <ConfigItem title={'X字段'}>
                <Select options={options} defaultValue={xField} onChange={(value => fieldChange({xField: value}))}/>
            </ConfigItem>
            <ConfigItem title={'Y字段'}>
                <Select options={options} defaultValue={yField} onChange={(value => fieldChange({yField: value}))}/>
            </ConfigItem>
            <ConfigItem title={'分类字段'}>
                <Select options={options} defaultValue={seriesField}
                        onChange={(value => fieldChange({seriesField: value}))}/>
            </ConfigItem>
        </ConfigCard>
    )
}
