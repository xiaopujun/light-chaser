import React from 'react';
import {observer} from "mobx-react";
import './DemoMain.less';
import {Control} from "../json-schema/SchemaTypes";
import ControlGroup from "../ui/control-group/ControlGroup";
import {LCGUI} from "../json-schema/LCGUI";
import LCGUIUtil from "../json-schema/LCGUIUtil";


class MyComponent extends React.Component {

    render() {
        const template: Control = {
            type: 'grid',
            children: [
                {
                    type: 'input',
                    label: '名称',
                    key: 'name',
                    value: 'test',
                },
                {
                    type: 'input',
                    label: '描述',
                    key: 'desc',
                    value: '测试米哦啊书',
                }
            ]
        }


        const schema: Control = {
            children: [
                {
                    type: 'grid',
                    children: [
                        {
                            type: 'input',
                            label: '宽度',
                            key: 'width',
                            value: '56',
                        },
                        {
                            type: 'input',
                            label: '高度',
                            key: 'height',
                            value: '56',
                        },
                        {
                            type: 'slider',
                            label: '透明度',
                            key: 'opacity',
                            value: 0.5,
                        },
                        {
                            type: 'control-group',
                            key: 'columns',
                            label: '表格列设置',
                            config: {
                                template: template
                            }
                        }
                    ]
                }
            ]
        }

        const onFiledChange = (value: any) => {
            console.log(value);
        }

        // const res = LCGUIUtil.schemaStructureAssignment({
        //     width: 100,
        //     height: 300,
        //     opacity: 0.3,
        //     city: {
        //         name: '北京',
        //         code: '40001'
        //     }
        // }, {
        //     children: [
        //         {
        //             type: 'grid',
        //             children: [
        //                 {
        //                     type: 'input',
        //                     label: '宽度',
        //                     key: 'width',
        //                     value: '56',
        //                 },
        //                 {
        //                     type: 'input',
        //                     label: '高度',
        //                     key: 'height',
        //                     value: '56',
        //                 },
        //                 {
        //                     type: 'slider',
        //                     label: '透明度',
        //                     key: 'opacity',
        //                     value: 0.5,
        //                 },
        //                 {
        //                     key: 'city',
        //                     children: [
        //                         {
        //                             type: 'input',
        //                             label: '名称',
        //                             key: 'name',
        //                             value: 'xxx'
        //                         },
        //                         {
        //                             type: 'input',
        //                             label: '',
        //                             key: 'code',
        //                             value: ''
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }
        //     ]
        // })

        // console.log(LCGUIUtil.parseSchemaData({
        //     type: 'grid',
        //     key: 'columns',
        //     children: [
        //         {
        //             type: 'accordion',
        //             label: '手风琴',
        //             key: 'switch',
        //             value: true,
        //             children: [
        //                 {
        //                     type: 'input',
        //                     label: '宽度',
        //                     key: 'height',
        //                     value: '56',
        //                 },
        //             ]
        //         },
        //         {
        //             type: 'input',
        //             label: '高度',
        //             key: 'height',
        //             value: '56',
        //         },
        //         {
        //             type: 'slider',
        //             label: '透明度',
        //             key: 'opacity',
        //             value: 0.5,
        //         },
        //         {
        //             key: 'city',
        //             children: [
        //                 {
        //                     type: 'input',
        //                     label: '名称',
        //                     key: 'name',
        //                     value: 'xxx'
        //                 },
        //                 {
        //                     type: 'input',
        //                     label: '',
        //                     key: 'code',
        //                     value: '5112'
        //                 }
        //             ]
        //         }
        //     ]
        // }));
        return (
            <div style={{width: 250, background: '#1f1f1f', padding: 10}}>
                <LCGUI schema={schema} onFieldChange={onFiledChange}/>
            </div>
        )
    }

}

export default observer(MyComponent);
