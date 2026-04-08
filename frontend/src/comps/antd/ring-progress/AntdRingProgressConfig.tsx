/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import React, {Component, useState} from 'react';
import {WritableRoseOptions} from "../../antd-common/types";
import AntdCommonRoseController from "../../antd-common/rose/AntdCommonRoseController";
import {ColorAttr, RingProgressOptions, StatisticText} from "@antv/g2plot";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {ShapeAttrs} from "@antv/g-base";
import ObjectUtil from "../../../utils/ObjectUtil";
import {ConfigType} from "../../../designer/right/ConfigContent";

export class AntdRingProgressStyleConfig extends Component<ConfigType> {

    ringProgressGraphicsChange = (config: WritableRoseOptions) => {
        const controller = this.props.controller as AntdCommonRoseController;
        controller.update({style: config});
    }


    render() {
        const {controller} = this.props;
        const config: RingProgressOptions = controller.getConfig().style as RingProgressOptions
        return (
            <AntdRingProgressGraphicsConfig config={config}
                                            onChange={this.ringProgressGraphicsChange}/>
        );
    }
}


export interface AntdRingProgressGraphicsConfigProps {
    config: any;
    onChange: (config: any) => void;
}

export const AntdRingProgressGraphicsConfig: React.FC<AntdRingProgressGraphicsConfigProps> = ({config, onChange}) => {

    const [_config, setConfig] = useState(config);

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data, dataFragment} = fieldChangeData;
        if (id === "progressColor") {
            if (data && Array.isArray(data))
                onChange({color: data as ColorAttr, progressStyle: {fill: undefined}});
            else
                onChange({color: undefined, progressStyle: {fill: data as string}});
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
                onChange({statistic: {title: false}});
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
                onChange({statistic: {content: false}});
                setConfig({...ObjectUtil.merge(_config, {statistic: {content: false}})});
            }
        } else {
            onChange(dataFragment);
        }
    }

    const schema: Control = {
        children: [
            {
                type: 'accordion',
                label: '图形',
                children: [
                    {
                        type: 'grid',
                        children: [
                            {
                                key: 'radius',
                                type: 'number-input',
                                label: '外径',
                                value: _config?.radius || 0.8,
                                config: {
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                }
                            },
                            {
                                key: 'innerRadius',
                                type: 'number-input',
                                label: '内径',
                                value: _config?.innerRadius || 0.75,
                                config: {
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                }
                            },
                            {
                                key: 'progressStyle',
                                children: [
                                    {
                                        key: 'lineWidth',
                                        type: 'number-input',
                                        label: '描边',
                                        value: (_config.progressStyle as ShapeAttrs)?.lineWidth || 1,
                                        config: {
                                            min: 0,
                                            max: 10,
                                        }
                                    },
                                    {
                                        key: 'stroke',
                                        type: 'color-picker',
                                        label: '描边色',
                                        value: (_config.progressStyle as ShapeAttrs)?.stroke || '#555555',
                                        config: {
                                            showText: true,
                                        }
                                    },
                                ]
                            },
                            {
                                id: 'progressColor',
                                type: 'color-mode',
                                label: '颜色',
                                value: _config?.color || '#5B8FF9',
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
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    );
}
