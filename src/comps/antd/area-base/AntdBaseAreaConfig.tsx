import React, {Component} from 'react';
import {AreaOptions, ShapeStyle} from "@antv/g2plot";
import AntdCommonAreaController from "../../antd-common/area/AntdCommonAreaController";
import {AntdCartesianCoordinateSys} from "../../antd-common/config/AntdFragment";
import {MappingOptions} from "@antv/g2plot/lib/adaptor/geometries/base";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import LCGUIUtil from "../../../json-schema/LCGUIUtil";
import AntdCommonUtil from "../../antd-common/AntdCommonUtil";
import ColorUtil from "../../../utils/ColorUtil";
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
        let {id, data, dataKeyPath} = fieldChangeData;

        if (id === 'areaColor') {
            //解析渐变色
            if (typeof data === 'string' && data.indexOf('linear-gradient') !== -1) {
                //线性渐变
                const gradientColor = ColorUtil.parseGradient(data.toLowerCase());
                const colorStr = gradientColor?.colors?.map(item => `${item.pos}:${item.color}`).join(' ');
                data = `l(${gradientColor.angle}) ${colorStr}`;
                controller.update(LCGUIUtil.createObjectFromArray(dataKeyPath, data));
            } else if (typeof data === 'string' && data.indexOf('radial-gradient')! === -1) {
                //径向渐变
                console.log('暂不径向渐变')
            } else {
                controller.update({areaStyle: data});
            }
        } else {
            controller.update(fieldChangeData.dataFragment);
        }
    }

    const schema: Control = {
        key: 'style',
        type: 'accordion',
        label: '图形',
        children: [
            {
                type: 'grid',
                config: {
                    margin: '0 0 15px 0',
                },
                children: [
                    {
                        label: '基准填充',
                        type: 'switch',
                        key: 'startOnZero',
                        value: !!config?.startOnZero,
                        config: {
                            margin: '0 0 10px 0',
                            containerStyle: {
                                marginBottom: 10
                            }
                        }
                    },
                ]
            },
            {
                label: '数据点',
                type: 'item-panel',
                children: [
                    {
                        type: 'grid',
                        config: {
                            columns: 2,
                        },
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
                                                key: 'fill',
                                                type: 'color-picker',
                                                label: '颜色',
                                                value: (config?.point?.style as ShapeStyle)?.fill || '#fff',
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
                type: 'item-panel',
                children: [
                    {
                        type: 'grid',
                        config: {
                            gridGap: '15px',
                            columns: 2,
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
                                children: [{
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
                                            width: '100%',
                                            radius: 3,
                                            showBorder: true,
                                            showText: true,
                                            height: 16,
                                            hideControls: true
                                        }
                                    }]
                            }
                        ]
                    }
                ]
            },
            {
                label: '数据面',
                type: 'item-panel',
                children: [
                    {
                        key: 'areaStyle',
                        children: [
                            {
                                type: 'grid',
                                config: {
                                    columns: 2,
                                },
                                children: [{
                                    id: 'areaColor',
                                    key: 'fill',
                                    type: 'color-picker',
                                    label: '颜色',
                                    value: (config?.point?.style as ShapeStyle)?.fill || '#fff',
                                    config: {
                                        width: '100%',
                                        radius: 3,
                                        showBorder: true,
                                        showText: true,
                                        height: 16
                                    }
                                }]
                            }
                        ]
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
        config: {columns: 2},
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

    return <LCGUI schema={schema} onFieldChange={onFieldChange}/>
}