import React, {FC} from 'react';
import AbstractDesignerController from "../../../../framework/core/AbstractDesignerController.ts";
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI.tsx";
import {Control} from "../../../../json-schema/SchemaTypes.ts";
import {useEffect, useRef, useState} from "react";
import {globalMessage} from "../../../../framework/message/GlobalMessage.tsx";
import {ISelectOption} from "../../../../json-schema/ui/select/Select.tsx";
import ObjectUtil from "../../../../utils/ObjectUtil.ts";
import {IDatabase} from "../../../../designer/DesignerType.ts";


export interface DynamicDataConfigProps {
    controller: AbstractDesignerController;
    data: IDatabase;
}

function DataSetConfig(props: DynamicDataConfigProps) {
    const {data, controller} = props;
    const dataRef = useRef(data);
    const apiTestResRef = useRef<string>("");
    const [dataSourceList, setDataSourceList] = useState<ISelectOption[]>([]);
    const [testRes, setTestRes] = useState<string | null>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // FetchUtil.get(`/api/datasource/list`).then(res => {
        //     if (res.code === 200) {
        //         const options = (res.data as Array<IDataSource>).map(item => {
        //             return {label: item.name, value: item.id}
        //         })
        //         setDataSourceList(options as ISelectOption[]);
        //     } else
        //         globalMessage.messageApi?.error(res.msg);
        // })
    }, []);

    const validate = () => {
        const {targetDb, sql} = dataRef.current;
        if (!targetDb) {
            globalMessage.messageApi?.error('请选择数据库');
            return false;
        }
        if (!sql) {
            globalMessage.messageApi?.error('请输入SQL语句');
            return false;
        }
        if (!sql.trim().startsWith('select')) {
            globalMessage.messageApi?.error('SQL语句必须以select开头');
            return false;
        }
        return true;
    }

    const testAndSave = () => {
        // 这里应该去获取全局变量的数据并更新组件的数据
        // controller.update({data: {database: dataRef.current}}, {reRender: false});
        console.log("dataRef.current>>>", dataRef.current, controller);
        // controller.onGlobalDataChangeObservable.notifyObservers({...dataRef.current})
        window.onGlobalDataChangeObservable.notifyObservers(dataRef.current);
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        console.log("onFieldChange>>>", fieldChangeData);
        const {reRender, id, dataFragment} = fieldChangeData;
        if (id === 'testAndSave')
            testAndSave();
        else
            dataRef.current = ObjectUtil.merge(dataRef.current, dataFragment);
        if (reRender)
            setCount(count + 1);
    }

    const schema: Control = {
        type: 'grid',
        config: {gridGap: '10px'},
        children: [
            {
                key: 'datasetId',
                label: '数据集',
                value: dataRef.current?.datasetId,
                reRender: true,
                type: 'select',
                tip: '选择数据集',
                config: {
                    disabled: false,
                    placeholder: '请选择',
                    options: [
                        {label: '选项1', value: '1'},
                        {label: '选项2', value: '2'},
                    ]
                }
            },
            {
                key: 'method',
                label: '请求方式',
                type: 'select',
                value: dataRef.current?.method,
                config: {
                    options: [
                        {value: 'get', label: 'GET'},
                        {value: 'post', label: 'POST'},
                    ]
                }
            },
            {
                type: 'grid',
                label: '自动更新',
                config: {columns: 8},
                children: [
                    {
                        key: 'autoFlush',
                        type: 'checkbox',
                        value: !!dataRef.current?.autoFlush,
                    },
                    {
                        key: 'frequency',
                        type: 'number-input',
                        config: {
                            min: 5,
                            containerStyle: {
                                gridColumn: '2/9',
                            }
                        },
                        value: dataRef.current?.frequency || 5,
                    },
                ]
            },
            {
                type: 'card-panel',
                label: '请求头',
                tip: '请求头信息，json格式',
                config: {
                    contentStyle: {padding: 0}
                },
                children: [
                    {
                        id: 'header',
                        key: 'header',
                        type: 'code-editor',
                        config: {
                            height: 100,
                        },
                        value: JSON.stringify(dataRef.current?.header, null, 2) || '',
                    }
                ]
            },
            {
                type: 'card-panel',
                tip: '请求参数，json格式',
                label: '请求参数',
                config: {
                    contentStyle: {padding: 0}
                },
                children: [
                    {
                        id: 'params',
                        key: 'params',
                        type: 'code-editor',
                        config: {
                            height: 100,
                        },
                        value: JSON.stringify(dataRef.current?.params, null, 2) || '',
                    }
                ]
            },
            {
                type: 'card-panel',
                label: '过滤器',
                config: {
                    contentStyle: {padding: 0}
                },
                children: [
                    {
                        key: 'filter',
                        type: 'code-editor',
                        config: {
                            height: 200,
                            language: 'javascript'
                        },
                        value: dataRef.current?.filter || "function filter(data){\n\n\n\treturn data\n}",
                    }
                ]
            },
            {
                type: 'card-panel',
                label: '响应结果',
                config: {
                    contentStyle: {padding: 0}
                },
                children: [
                    {
                        id: 'apiTestRes',
                        type: 'code-editor',
                        config: {
                            readonly: true,
                            height: 60,
                        },
                        reRender: true,
                        value: apiTestResRef.current,
                    }
                ]
            },
            {
                type: 'grid',
                children: [
                    {
                        id: 'testAndSave',
                        type: 'button',
                        config: {
                            children: '测试接口并保存',
                        }
                    }
                ]
            },
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    );
}

export default DataSetConfig;
