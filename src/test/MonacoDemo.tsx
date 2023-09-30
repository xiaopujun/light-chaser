import React, {Component} from 'react';
import {Control, ControlValueType} from "../json-schema/SchemaTypes";
import {LCGUI, SchemaPathNode} from "../json-schema/LCGUI";
import LCGUIUtil from "../json-schema/LCGUIUtil";
import StringInput from "../ui/string-input/StringInput";

class MonacoDemo extends Component {

    monacoContainer: any = null;
    schema: Control = {
        key: "style",
        children: [
            {
                key: "xAxis",
                type: "accordion",
                config: {
                    title: "X轴"
                },
                children: [
                    {
                        key: "grid",
                        label: "网格线",
                        type: "grid",
                        config: {
                            columns: 4
                        },
                        children: [
                            {
                                label: "开启",
                                type: "switch",
                                config: {
                                    value: true,
                                }
                            },
                            {
                                key: "alignTick",
                                label: "对齐",
                                type: "switch",
                                config: {
                                    value: true
                                }
                            },
                            {
                                key: "line",
                                children: [
                                    {
                                        key: "style",
                                        children: [
                                            {
                                                key: "lineWidth",
                                                label: "线宽",
                                                type: "number",
                                                config: {
                                                    value: 1
                                                }
                                            },
                                            {
                                                key: "stroke",
                                                label: "颜色",
                                                type: "color-picker",
                                                config: {
                                                    value: "#878787ff",
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: "label",
                        // label: "标签",
                        type: "grid",
                        config: {
                            columns: 4
                        },
                        children: [
                            {
                                key: "style",
                                children: [
                                    {
                                        key: "fill",
                                        label: "颜色",
                                        type: "color-picker",
                                        config: {
                                            value: "#878787ff"
                                        }
                                    },
                                    {
                                        key: "fontSize",
                                        label: "字号",
                                        type: "number",
                                        config: {
                                            value: 10
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
            }
        ]
    }

    testSchema: Control = {
        key: "style",
        children: [
            {
                key: "xAxis",
                type: "accordion",
                value: false,
                config: {
                    title: "X轴",
                    showSwitch: true,
                },
                children: [
                    {
                        type: 'grid',
                        config: {
                            columns: 4
                        },
                        children: [
                            {
                                id: "2016",
                                key: "open",
                                label: "开启",
                                type: "switch",
                                value: false,
                            },
                            {
                                key: "title",
                                label: "标题",
                                type: "string",
                                rules: '{open} === true',
                                direction: "horizontal",
                                value: false,
                            },
                        ]
                    }
                ]
            },
            {
                key: "yAxis",
                type: "accordion",
                value: false,
                rules: '{xAxis} === true',
                config: {
                    title: "Y轴",
                    showSwitch: true,
                },
                children: [
                    {
                        type: 'grid',
                        config: {
                            columns: 4
                        },
                        children: [
                            {
                                key: "open",
                                label: "开启",
                                type: "switch",
                                value: false,
                            },
                            {
                                key: "title",
                                label: "标题",
                                type: "string",
                                direction: "horizontal",
                                value: false,
                            },
                        ]
                    }
                ]
            }
        ]
    }

    onChange = (data: ControlValueType, schemaKeyPath: SchemaPathNode[], dataFragments: object, id?: string) => {
        if (id && id === "2016") {
            this.testSchema!.children![0]!.children![0]!.children![1].value = "你牛逼了你";
        }
        LCGUIUtil.updateSchema(this.testSchema, schemaKeyPath, data)
        this.setState({count: Date.now()})
    }

    render() {
        return (
            <div style={{width: 400, height: 800, background: "#333333", padding: 10}}>
                <LCGUI schema={this.testSchema} onFieldChange={this.onChange}/>
                <StringInput/>
            </div>
        );
    }
}

export default MonacoDemo;

