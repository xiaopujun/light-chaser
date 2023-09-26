import React, {Component} from 'react';
import {Control} from "../json-schema/SchemaTypes";
import {SchemaCore} from "../json-schema/SchemaCore";

class MonacoDemo extends Component {

    monacoContainer: any = null;
    schema: Control = {
        key: "xAxis",
        label: "X轴",
        type: "accordion",
        children: [
            {
                key: "grid",
                label: "网格线",
                type: "grid",
                children: [
                    {
                        label: "开启",
                        type: "switch",
                        config: {
                            value: true,
                            onChange: () => {

                            }
                        }
                    },
                    {
                        key: "alignTick",
                        label: "对齐刻度",
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
                                        type: "color",
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
                label: "标签",
                type: "grid",
                children: [
                    {
                        key: "style",
                        label: "",
                        children: [
                            {
                                key: "fill",
                                label: "颜色",
                                type: "color",
                                config: {
                                    value: "#878787ff"
                                }
                            },
                            {
                                key: "fontSize",
                                label: "字体大小",
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

    testSchema: Control = {
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
                        type: 'grid',
                        config: {
                            columns: 1
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

    ref: any = null;


    render() {
        let schemaCore = new SchemaCore();

        return (
            <div style={{width: 400, height: 800, background: "#333333"}} ref={ref => this.ref = ref}>
                {schemaCore.buildConfigUI(this.testSchema)}
            </div>
        );
    }
}

export default MonacoDemo;

