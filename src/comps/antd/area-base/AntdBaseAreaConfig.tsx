import React, {Component} from 'react';
import {AreaOptions, ShapeStyle} from "@antv/g2plot";
import AntdCommonAreaController from "../../antd-common/area/AntdCommonAreaController";
import {AntdCartesianCoordinateSys} from "../../antd-common/config/AntdFragment";
import {MappingOptions} from "@antv/g2plot/lib/adaptor/geometries/base";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import AntdCommonUtil from "../../antd-common/AntdCommonUtil";
import {ConfigType} from "../../../designer/right/ConfigContent";

class AntdBaseAreaStyleConfig extends Component<ConfigType> {

    AreaCoordinateSysChange = (config: AreaOptions) => {
        const controller = this.props.controller as AntdCommonAreaController;
        controller.update({style: config});
    }

    baseAreaGraphicsChange = (config: AreaOptions) => {
        const controller = this.props.controller as AntdCommonAreaController;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config: AreaOptions = controller.getConfig().style;
        return (
            <>
                <AntdBaseAreaGraphics controller={controller}/>
                <AntdCartesianCoordinateSys onChange={this.AreaCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdBaseAreaStyleConfig};

export const AntdBaseAreaGraphics: React.FC<ConfigType> = ({controller}) => {

    const config: AreaOptions = controller.getConfig().style;

    const _onChange = (fieldChangeData: FieldChangeData) => {
        controller.update(fieldChangeData.dataFragment);
    }

    const schema: Control = {
        key: 'style',
        type: 'accordion',
        label: '图形',
        children: [
            {
                type: 'sub-accordion',
                label: '基础',
                children: [
                    {
                        label: '基准填充',
                        type: 'switch',
                        key: 'startOnZero',
                        value: !!config?.startOnZero,
                    },
                ]
            },
            {
                label: '数据点',
                type: 'sub-accordion',
                children: [
                    {
                        type: 'grid',
                        children: [
                            {
                                key: 'point',
                                children: [
                                    {
                                        label: '尺寸',
                                        type: 'number-input',
                                        key: 'size',
                                        value: (config?.point as MappingOptions)?.size as number || 0,
                                        config: {
                                            min: 0,
                                            max: 10,
                                        }
                                    },
                                    {
                                        key: 'style',
                                        children: [
                                            {
                                                key: 'lineWidth',
                                                type: 'number-input',
                                                label: '描边宽',
                                                value: (config?.point?.style as ShapeStyle)?.lineWidth,
                                                config: {
                                                    min: 0
                                                }
                                            },
                                            {
                                                key: 'fill',
                                                type: 'color-picker',
                                                label: '颜色',
                                                value: (config?.point?.style as ShapeStyle)?.fill,
                                                config: {
                                                    showText: true,
                                                }
                                            },
                                            {
                                                key: 'stroke',
                                                type: 'color-picker',
                                                label: '描边色',
                                                value: (config?.point?.style as ShapeStyle)?.stroke,
                                                config: {
                                                    showText: true,
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        key: 'shape',
                                        type: 'select',
                                        label: '形状',
                                        value: (config?.point as MappingOptions)?.shape as string || 'circle',
                                        config: {
                                            options: [
                                                {value: 'circle', label: '圈形'},
                                                {value: 'square', label: '方形'},
                                                {value: 'bowtie', label: '领结'},
                                                {value: 'diamond', label: '钻石'},
                                                {value: 'hexagon', label: '六角形'},
                                                {value: 'triangle', label: '三角形'}]
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
            },
            {
                label: '数据线',
                type: 'sub-accordion',
                children: [
                    {
                        type: 'grid',
                        config: {
                            gridGap: '15px'
                        },
                        children: [
                            {
                                label: '平滑',
                                type: 'switch',
                                key: 'smooth',
                                value: !!config?.smooth,
                            },
                            {
                                key: 'line',
                                children: [
                                    {
                                        key: 'size',
                                        type: 'number-input',
                                        label: '宽度',
                                        value: config?.line?.size as number || 0,
                                        config: {
                                            min: 0,
                                            max: 10,
                                        }
                                    },
                                    {
                                        key: 'color',
                                        type: 'color-picker',
                                        label: '颜色',
                                        value: config?.line?.color as string || '#fff',
                                        config: {
                                            showText: true,
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: '数据面',
                type: 'sub-accordion',
                key: 'areaStyle',
                children: [
                    {
                        type: 'grid',
                        children: [{
                            key: 'fill',
                            type: 'color-picker',
                            label: '颜色',
                            value: (config?.areaStyle as ShapeStyle)?.fill || '#fff',
                            config: {
                                showText: true,
                            }
                        }]
                    }
                ]
            }
        ],
    }

    return (
        <LCGUI schema={schema} onFieldChange={_onChange}/>
    )
}

export const AntdBaseAreaFieldMapping: React.FC<ConfigType<AntdBaseDesignerController>> = (props) => {
    const {controller} = props;
    const config = controller?.config?.style;
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const schema: Control = {
        key: 'style',
        type: 'grid',
        children: [
            {
                key: 'xField',
                type: 'select',
                label: 'X字段',
                value: config?.xField,
                config: {
                    options,
                }
            },
            {
                key: 'yField',
                type: 'select',
                label: 'Y字段',
                value: config?.yField,
                config: {
                    options,
                }
            }
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        controller.update(fieldChangeData.dataFragment);
    }

    return <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
}