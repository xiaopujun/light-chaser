import React, {Component} from 'react';
import {Control} from "../json-schema/SchemaTypes";
import {LCGUI} from "../json-schema/LCGUI";

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
                                                type: "base-color-picker",
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
                                        type: "base-color-picker",
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
                                key: "open",
                                label: "开启",
                                type: "switch",
                                config: {
                                    value: true
                                }
                            },
                            {
                                key: "title",
                                label: "标题",
                                type: "string",
                                direction: "horizontal",
                                config: {
                                    value: "X轴标题"
                                }
                            },
                        ]
                    }
                ]
            },
            {
                key: "yAxis",
                type: "accordion",
                value: false,
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
                                config: {
                                    value: true
                                }
                            },
                            {
                                key: "title",
                                label: "标题",
                                type: "string",
                                direction: "horizontal",
                                config: {
                                    value: "X轴标题"
                                }
                            },
                        ]
                    }
                ]
            }
        ]
    }


    render() {

        return (
            <div style={{width: 400, height: 800, background: "#333333", padding: 10}}>
                <LCGUI schema={this.testSchema}/>
            </div>
        );
    }
}

export default MonacoDemo;

