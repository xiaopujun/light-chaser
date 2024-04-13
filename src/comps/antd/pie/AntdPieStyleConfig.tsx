import React, {Component, useState} from 'react';
import AntdPieController from "./AntdPieController";
import {WritablePieOptions} from "../../antd-common/types";
import {PieOptions, StatisticText} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import AntdCommonUtil from "../../antd-common/AntdCommonUtil";
import {AntdLegend} from "../../antd-common/config/legend/AntdLegend";
import LCGUIUtil from "../../../json-schema/LCGUIUtil";
import {ShapeAttrs} from "@antv/g-base";
import ObjectUtil from "../../../utils/ObjectUtil";
import {ConfigType} from "../../../designer/right/ConfigContent";

export default class AntdPieStyleConfig extends Component<ConfigType> {

    pieGraphicsChange = (config: WritablePieOptions) => {
        const controller = this.props.controller as AntdPieController;
        controller.update({style: config});
    }

    legendChange = (legend: Legend) => {
        const controller = this.props.controller as AntdPieController;
        controller.update({style: {legend}});
    }

    render() {
        const controller = this.props.controller as AntdPieController;
        const pieConfig = controller.getConfig()!.style as PieOptions;
        return (
            <>
                <AntdLegend controller={controller}/>
                <AntdPieGraphicsConfig onChange={this.pieGraphicsChange} config={pieConfig}/>
            </>
        );
    }
}

export interface AntdPieGraphicsConfigProps {
    config: any;

    onChange(config: any): void;
}

export const AntdPieGraphicsConfig: React.FC<AntdPieGraphicsConfigProps> = ({config, onChange}) => {

    const [_config, setConfig] = useState(config);

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        let {id, data, dataKeyPath, dataFragment, reRender} = fieldChangeData;
        if (id === 'startAngle' || id === 'endAngle') {
            data = Math.PI * (data as number);
            onChange && onChange(LCGUIUtil.createObjectFromArray(dataKeyPath, data));
        } else if (id === "titleSwitch") {
            if (data) {
                const defaultTitleConfig = {
                    statistic: {
                        title: {
                            style: {fontSize: 12, color: '#fff'},
                            content: 'text'
                        }
                    }
                };
                onChange(defaultTitleConfig);
                setConfig({...ObjectUtil.merge(_config, defaultTitleConfig)});
            } else {
                onChange({statistic: {content: false}});
                setConfig({...ObjectUtil.merge(_config, {statistic: {title: false}})});
            }
        } else if (id === "contentSwitch") {
            if (data) {
                const defaultContentConfig = {
                    statistic: {
                        content: {
                            style: {fontSize: 12, color: '#fff'},
                            content: 'content'
                        }
                    }
                };
                onChange(defaultContentConfig);
                setConfig({...ObjectUtil.merge(_config, defaultContentConfig)});
            } else {
                onChange({statistic: {title: false}});
                setConfig({...ObjectUtil.merge(_config, {statistic: {content: false}})});
            }
        } else if (id === "labelRotate") {
            onChange({label: {rotate: (data as number) * Math.PI}});
        } else {
            onChange && onChange(dataFragment);
        }
        if (reRender)
            setConfig({..._config, ...dataFragment});
    }

    const schema: Control = {
        children: [
            {
                type: 'accordion',
                label: '图形',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'radius',
                                type: 'number-input',
                                label: '外径',
                                value: config.radius,
                                config: {
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                }
                            },
                            {
                                id: 'startAngle',
                                key: 'startAngle',
                                type: 'number-input',
                                label: '起始角',
                                value: (config.startAngle || 0) / Math.PI,
                                config: {
                                    suffix: 'Π',
                                    min: 0,
                                    max: 2,
                                    step: 0.01
                                }
                            },
                            {
                                key: 'innerRadius',
                                type: 'number-input',
                                label: '内径',
                                value: config.innerRadius,
                                config: {
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                }
                            },
                            {
                                id: 'endAngle',
                                key: 'endAngle',
                                type: 'number-input',
                                label: '结束角',
                                value: (config.endAngle || 2 * Math.PI) / Math.PI,
                                config: {
                                    suffix: 'Π',
                                    min: 0,
                                    max: 2,
                                    step: 0.01
                                }
                            },
                            {
                                key: 'pieStyle',
                                children: [
                                    {
                                        key: 'stroke',
                                        type: 'color-picker',
                                        label: '描边色',
                                        value: '#1c1c1c',
                                        config: {
                                            showText: true,
                                        }
                                    },
                                    {
                                        key: 'lineWidth',
                                        type: 'number-input',
                                        label: '描边宽',
                                        value: 0,
                                        config: {
                                            min: 0,
                                            max: 30,
                                        }
                                    },
                                ]
                            },
                            {
                                key: 'color',
                                type: 'color-mode',
                                label: '颜色',
                                value: '#1c1c1c',
                                config: {
                                    containerStyle: {gridColumn: '1 / 3',},
                                }
                            },
                        ]
                    }
                ]
            },
            {
                key: 'statistic',
                type: 'accordion',
                label: '标题',
                children: [
                    {
                        key: 'title',
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                id: 'titleSwitch',
                                key: 'titleSwitch',
                                type: 'switch',
                                label: '开启',
                                value: !!_config.statistic?.title,
                            },
                            {
                                rules: "{titleSwitch} === 'true'",
                                children: [
                                    {
                                        key: 'content',
                                        type: 'input',
                                        label: '内容',
                                        value: (_config.statistic?.title as StatisticText)?.content,
                                    },
                                    {
                                        key: 'style',
                                        children: [
                                            {
                                                key: 'fontSize',
                                                type: 'number-input',
                                                label: '字号',
                                                value: ((_config.statistic?.title as StatisticText)?.style as ShapeAttrs)?.fontSize || 12,
                                                config: {
                                                    min: 0,
                                                    max: 100,
                                                }
                                            },
                                            {
                                                key: 'fontWeight',
                                                type: 'number-input',
                                                label: '加粗',
                                                value: ((_config.statistic?.title as StatisticText)?.style as ShapeAttrs)?.fontWeight || 500,
                                                config: {
                                                    min: 100,
                                                    max: 900,
                                                    step: 100
                                                }
                                            },
                                            {
                                                key: 'color',
                                                type: 'color-picker',
                                                label: '颜色',
                                                value: ((_config.statistic?.title as StatisticText)?.style as ShapeAttrs)?.color,
                                                config: {
                                                    showText: true,
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        key: 'offsetX',
                                        type: 'number-input',
                                        label: 'x偏移',
                                        value: (_config.statistic?.title as StatisticText)?.offsetX || 0,
                                    },
                                    {
                                        key: 'offsetY',
                                        type: 'number-input',
                                        label: 'y偏移',
                                        value: (_config.statistic?.title as StatisticText)?.offsetY || 0,
                                    },
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                key: 'statistic',
                type: 'accordion',
                label: '内容',
                children: [
                    {
                        key: 'content',
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                id: 'contentSwitch',
                                key: 'contentSwitch',
                                type: 'switch',
                                label: '开启',
                                value: !!_config.statistic?.content,
                            },
                            {
                                rules: "{contentSwitch} === 'true'",
                                children: [
                                    {
                                        key: 'content',
                                        type: 'input',
                                        label: '内容',
                                        value: (_config.statistic?.content as StatisticText)?.content,
                                    },
                                    {
                                        key: 'style',
                                        children: [
                                            {
                                                key: 'fontSize',
                                                type: 'number-input',
                                                label: '字号',
                                                value: ((_config.statistic?.content as StatisticText)?.style as ShapeAttrs)?.fontSize || 12,
                                                config: {
                                                    min: 0,
                                                    max: 100,
                                                }
                                            },
                                            {
                                                key: 'fontWeight',
                                                type: 'number-input',
                                                label: '加粗',
                                                value: ((_config.statistic?.content as StatisticText)?.style as ShapeAttrs)?.fontWeight || 500,
                                                config: {
                                                    min: 100,
                                                    max: 900,
                                                    step: 100
                                                }
                                            },
                                            {
                                                key: 'color',
                                                type: 'color-picker',
                                                label: '颜色',
                                                value: ((_config.statistic?.content as StatisticText)?.style as ShapeAttrs)?.color,
                                                config: {
                                                    showText: true,
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        key: 'offsetX',
                                        type: 'number-input',
                                        label: 'x偏移',
                                        value: (_config.statistic?.content as StatisticText)?.offsetX || 0,
                                    },
                                    {
                                        key: 'offsetY',
                                        type: 'number-input',
                                        label: 'y偏移',
                                        value: (_config.statistic?.content as StatisticText)?.offsetY || 0,
                                    },
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                type: 'accordion',
                label: '标签',
                children: [
                    {
                        key: 'label',
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'type',
                                type: 'select',
                                label: '位置',
                                value: _config.label?.type || 'inner',
                                config: {
                                    options: [
                                        {value: 'inner', label: '内测'},
                                        {value: 'outer', label: '外侧'}]
                                }
                            },
                            {
                                key: 'offset',
                                type: 'number-input',
                                label: '偏移',
                                value: _config.label?.offset || 0,
                                config: {
                                    min: 0,
                                    max: 100,
                                }
                            },
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'fontSize',
                                        type: 'number-input',
                                        label: '字号',
                                        value: (_config.label?.style as ShapeAttrs)?.fontSize || 12,
                                        config: {
                                            min: 0,
                                            max: 100,
                                        }
                                    },
                                    {
                                        key: 'fontWeight',
                                        type: 'number-input',
                                        label: '加粗',
                                        value: (_config.label?.style as ShapeAttrs)?.fontWeight || 500,
                                        config: {
                                            min: 100,
                                            max: 900,
                                            step: 100
                                        }
                                    },
                                    {
                                        key: 'fill',
                                        type: 'color-picker',
                                        label: '颜色',
                                        value: (_config.label?.style as ShapeAttrs)?.fill,
                                        config: {
                                            showText: true,
                                        }
                                    }
                                ]
                            },
                            {
                                key: 'autoRotate',
                                type: 'switch',
                                label: '自动旋转',
                                reRender: true,
                                value: _config.label?.autoRotate,
                            },
                            {
                                id: 'labelRotate',
                                key: 'rotate',
                                type: 'number-input',
                                label: '旋转角度',
                                rules: "{autoRotate} === 'false'",
                                value: _config.label?.rotate || 0,
                                config: {
                                    min: 0,
                                    max: 2,
                                    step: 0.01
                                }
                            },
                        ]
                    }
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    );
}


export const AntdPieFieldMapping: React.FC<ConfigType<AntdBaseDesignerController>> = ({controller}) => {
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const schema: Control = {
        type: 'grid',
        config: {
            columns: 2,
        },
        children: [
            {
                type: 'select',
                label: '角度字段',
                config: {
                    options,
                }
            },
            {
                type: 'select',
                label: '颜色字段',
                config: {
                    options,
                }
            },
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    return <LCGUI schema={schema} onFieldChange={onFieldChange}/>
}
