import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {Line, LineOptions} from "@antv/g2plot";
import AntdCommonLineController, {AntdLineProps} from "../../antd-common/line/AntdCommonLineController";
import {AntdCartesianCoordinateSys} from "../../antd-common/config/AntdFragment";
import AbstractController from "../../../framework/core/AbstractController";
import {WritableLineOptions} from "../../antd-common/types";
import AntdFieldMapping from "../../antd-common/config/field-mapping/AntdFieldMapping";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";

class AntdBaseLineStyleConfig extends Component<ConfigType> {

    lineCoordinateSysChange = (config: LineOptions) => {
        const controller = this.props.controller as AntdCommonLineController;
        controller.update({style: config});
    }

    lineGraphicsChange = (config: LineOptions) => {
        const controller: AbstractController<Line, AntdLineProps> = this.props.controller as AntdCommonLineController;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config: LineOptions = controller.getConfig().style;
        return (
            <>
                <AntdBaseLineGraphics onChange={this.lineGraphicsChange} config={config}/>
                <AntdCartesianCoordinateSys onChange={this.lineCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdBaseLineStyleConfig};

export interface AntdBaseLineGraphicsProps {
    config?: WritableLineOptions;

    onChange(config: WritableLineOptions): void;
}

export const AntdBaseLineGraphics: React.FC<AntdBaseLineGraphicsProps> = ({config, onChange}) => {

    // const LineColorChange = (data: ColorModeValue) => {
    //     const {mode, value} = data;
    //     switch (mode) {
    //         case 'single':
    //             onChange({lineStyle: {stroke: value as string}});
    //             break;
    //         case 'gradient':
    //             onChange({lineStyle: {stroke: `l(0) 0:${value[0]} 1:${value[1]}`}});
    //             break;
    //     }
    // }
    //
    // const buildColorModeData = (): ColorModeValue => {
    //     let mode = 'single', value: string | string[] = '#fff';
    //     if ((config?.lineStyle as ShapeAttrs)?.fill) {
    //         const fill = (config?.lineStyle as ShapeAttrs).fill as string;
    //         if (fill.startsWith('l')) {
    //             mode = 'gradient';
    //             value = [fill.split(':')[1].split(' ')[0], fill.split(':')[2].split(' ')[0]];
    //         } else {
    //             mode = 'single';
    //             value = fill;
    //         }
    //     } else if (config?.color) {
    //         mode = 'multi';
    //         value = config?.color as string[];
    //     }
    //     return {mode, value};
    // }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        type: 'accordion',
        label: '图形',
        children: [
            {
                type: 'item-panel',
                label: '线条',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                type: 'switch',
                                label: '平滑',
                                value: true,
                            },
                            {
                                type: 'input',
                                label: '宽度',
                                value: 1,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 10,
                                }
                            },
                            {
                                type: 'color-picker',
                                label: '颜色',
                                value: '#1c1c1c',
                                config: {
                                    width: '100%',
                                    radius: 3,
                                    showBorder: true,
                                    showText: true,
                                    height: 16,
                                    hideControls: true
                                }
                            }
                        ]
                    }
                ]
            },
            {
                type: 'item-panel',
                label: '数据点',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                type: 'input',
                                label: '尺寸',
                                value: 0,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 10,
                                }
                            },
                            {
                                type: 'select',
                                label: '形状',
                                value: 'circle',
                                config: {
                                    options: [
                                        {value: 'circle', label: '圈形'},
                                        {value: 'square', label: '方形'},
                                        {value: 'bowtie', label: '领结'},
                                        {value: 'diamond', label: '钻石'},
                                        {value: 'hexagon', label: '六角形'},
                                        {value: 'triangle', label: '三角形'}]
                                }
                            },
                            {
                                type: 'color-picker',
                                label: '颜色',
                                value: '#1c1c1c',
                                config: {
                                    width: '100%',
                                    radius: 3,
                                    showBorder: true,
                                    showText: true,
                                    height: 16,
                                    hideControls: true
                                }
                            },
                        ]
                    }
                ]
            },
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export const AntdBaseLineFieldMapping: React.FC<ConfigType<AntdBaseDesignerController>> = ({controller}) => {
    return <AntdFieldMapping controller={controller} fields={["xField", "yField"]}/>
}