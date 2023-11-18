import {Component} from 'react';
import {Control} from "../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../json-schema/LCGUI";
import './DemoMain.less'
import {ImageUpload} from "../ui/imag-upload/ImageUpload";
import ColorMode from "../ui/color-mode/ColorMode";
import {CheckBox} from "../ui/checkbox/CheckBox";


class JsonSchemaDemo extends Component {

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
                                                type: "input",
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
                                        type: "input",
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

    onChange = (fieldChangeData: FieldChangeData) => {

    }

    render() {
        return (
            <div style={{width: 400, height: 800, background: "#333333", padding: 10}}>
                <LCGUI schema={this.schema} onFieldChange={this.onChange}/>
                <ImageUpload label={'上传'} tip={'测试上传'}/>
                <ColorMode label={'演示模式'} tip={'嘿嘿'} defaultValue={['#fff']}
                           onChange={(value => console.log('颜色模式', value))}/>
                <CheckBox label={'测试checkbox'} defaultValue={true}/>
            </div>
        );
    }
}

export default JsonSchemaDemo;