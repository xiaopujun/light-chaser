import React, {Component} from 'react';
import {Control} from "../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../json-schema/LCGUI";
import LCGUIUtil from "../json-schema/LCGUIUtil";
import Input from "../ui/input/Input";
import {ItemPanel} from "../ui/item-panel/ItemPanel";
import Switch from "../ui/switch/Switch";
import Select from '../ui/select/Select';
import {ProjectState} from "../designer/DesignerType";
import Radio from "../ui/radio/Radio";
import {Grid} from "../ui/grid/Grid";
import Accordion from "../ui/accordion/Accordion";
import {Slider} from "../ui/slider/Slider";
import ColorPicker from "../ui/color-picker/ColorPicker";

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

    testSchema: Control = {
        key: "style",
        children: [
            {
                key: "xAxis",
                type: "accordion",
                value: false,
                reRender: true,
                config: {
                    label: "X轴",
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
                                type: "input",
                                rules: "{open} === 'true'",
                                value: "牛hi",
                            },
                        ]
                    }
                ]
            },
            {
                key: "yAxis",
                type: "accordion",
                value: false,
                rules: "{xAxis} === 'true'",
                config: {
                    label: "Y轴",
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
                                type: "input",
                                value: false,
                            },
                        ]
                    }
                ]
            }
        ]
    }

    onChange = (fieldChangeData: FieldChangeData) => {
        console.log(fieldChangeData)
        const {schemaKeyPath, data, id, reRender} = fieldChangeData;
        if (id && id === "2016") {
            this.testSchema!.children![0]!.children![0]!.children![1].value = "你牛逼了你";
        }
        LCGUIUtil.updateSchema(this.testSchema, schemaKeyPath, data)
        if (reRender)
            this.setState({count: Date.now()})
    }

    render() {
        return (
            <div style={{width: 400, height: 800, background: "#333333", padding: 10}}>
                <LCGUI schema={this.testSchema} onFieldChange={this.onChange}/>
                <div style={{display: 'grid', gridGap: 15}}>
                    <Input label={'频率'} tip={'牛逼克拉斯'} prefix={'每'} suffix={'s'}/>
                    <Input label={'速度'} tip={'牛逼克拉斯'} suffix={'m/s'}/>
                    <Input type={'number'} label={'加速度'} tip={'牛逼克拉斯'} suffix={'m/s^2'}/>
                    <Input label={'电流'} tip={'牛逼克拉斯'} suffix={'m/s^2'}/>
                    <Input label={'螺旋内圈'} tip={'牛逼克拉斯'} suffix={'次'}/>
                    <ItemPanel label={'测试控件面板'}>
                        <div style={{display: 'grid', gridGap: 15}}>
                            <Input label={'标题'} tip={'牛逼克拉斯'} suffix={'次'}/>
                            <Input label={'说明'} suffix={'次'}/>
                            <Input label={'描述'}/>
                        </div>
                    </ItemPanel>
                    <Switch defaultValue={false} tip={'帮助信息'} label={"测试标题"}/>
                    <Select options={[
                        {value: 'circle', label: '圈形'},
                        {value: 'square', label: '方形'},
                        {value: 'bowtie', label: '领结'},
                        {value: 'diamond', label: '钻石'},
                        {value: 'hexagon', label: '六角形'},
                        {value: 'triangle', label: '三角形'}]}
                            tip={'select帮助信息'} label={'下拉框'}/>
                    <Radio label={'单选框'} tip={'单选提示信息'} defaultValue={ProjectState.DRAFT} options={[
                        {label: '草稿', value: ProjectState.DRAFT},
                        {label: '发布', value: ProjectState.PUBLISH},
                        {label: '封存', value: ProjectState.SEALED}
                    ]}/>
                    <Grid tip={'网格布局'} label={'网格布局'} columns={3}>
                        <div>item1</div>
                        <div>item2</div>
                        <div>item3</div>
                        <div>item4</div>
                    </Grid>
                    <Accordion label={'手风琴'}>
                        <div>item1</div>
                    </Accordion>
                    <Slider label={'滑动条'} tip={'滑动条试实'}/>
                    <ColorPicker defaultValue={'#fff'}/>
                </div>
            </div>
        );
    }
}

export default MonacoDemo;

