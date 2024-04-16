import AbstractDesignerController from "../../../../framework/core/AbstractDesignerController.ts";
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI.tsx";
import {Control} from "../../../../json-schema/SchemaTypes.ts";
import {useEffect, useRef, useState} from "react";
import {DataSourceConfigType} from "../../../../pages/home/datasource/edit/EditDataSourceDialog.tsx";
import {globalMessage} from "../../../../framework/message/GlobalMessage.tsx";
import {ISelectOption} from "../../../../json-schema/ui/select/Select.tsx";
import ObjectUtil from "../../../../utils/ObjectUtil.ts";
import {IDatabase} from "../../../../designer/DesignerType.ts";

export interface DatabaseDataConfigProps {
    controller: AbstractDesignerController;
    data: IDatabase;
}

export function DatabaseDataConfig(props: DatabaseDataConfigProps) {
    const {data, controller} = props;
    const dataRef = useRef(data);
    const [dataSourceList, setDataSourceList] = useState<ISelectOption[]>([]);
    const [testRes, setTestRes] = useState<string>("");
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch(`/api/datasource/list`, {method: 'get'})
            .then(response => response.json())
            .then(res => {
                if (res.code === 200) {
                    const options = (res.data as Array<DataSourceConfigType>).map(item => {
                        return {label: item.name, value: item.id}
                    })
                    setDataSourceList(options as ISelectOption[]);
                } else
                    globalMessage.messageApi?.error(res.msg);
            })
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

    const doTest = () => {
        if (!validate())
            return;
        const {targetDb, sql, filter} = dataRef.current;
        fetch(`/api/db/executor/execute`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: targetDb, sql})
        }).then(response => response.json())
            .then(res => {
                if (res.code === 200) {
                    if (filter && filter !== '') {
                        const func = eval(`(${filter})`);
                        res.data = typeof func === 'function' ? func(res.data) : res.data;
                    }
                    setTestRes(JSON.stringify(res.data, null, 2));
                } else {
                    globalMessage.messageApi?.error(res.msg);
                }
            })
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {reRender, id, dataFragment} = fieldChangeData;
        if (id === 'doTest') {
            doTest();
        } else if (id === 'doSave') {
            if (!validate())
                return;
            controller.update({data: {database: dataRef.current}})
            const finalData = ObjectUtil.stringToJsObj(testRes)
            if (finalData)
                controller.changeData(finalData);
        } else {
            dataRef.current = ObjectUtil.merge(dataRef.current, dataFragment);
        }
        if (reRender)
            setCount(count + 1);
    }

    const schema: Control = {
        type: 'grid',
        config: {gridGap: '10px'},
        children: [
            {
                key: 'targetDb',
                label: '数据库',
                type: 'select',
                value: dataRef.current?.targetDb,
                reRender: true,
                config: {
                    options: dataSourceList
                }
            },
            {
                key: 'frequency',
                label: '刷新率',
                type: 'number-input',
                config: {
                    prefix: '每',
                    suffix: '秒',
                    min: 5
                },
                value: dataRef.current?.frequency || 5,
            },
            {
                type: 'card-panel',
                label: 'SQL',
                children: [
                    {
                        key: 'sql',
                        type: 'code-editor',
                        config: {
                            height: 160,
                            language: 'sql'
                        },
                        value: dataRef.current?.sql,
                    }
                ]
            },
            {
                type: 'card-panel',
                label: '过滤器',
                children: [
                    {
                        key: 'filter',
                        type: 'code-editor',
                        config: {
                            height: 200,
                            language: 'javascript'
                        },
                        value: dataRef.current?.filter || "function filter(data){\n\n\n\n}",
                    }
                ]
            },
            {
                id: 'databaseTestRes',
                type: 'card-panel',
                label: '响应结果',
                children: [
                    {
                        id: 'databaseTestRes',
                        type: 'code-editor',
                        config: {
                            height: 200,
                            language: 'json'
                        },
                        reRender: true,
                        value: testRes,
                    }
                ]
            },
            {
                type: 'grid',
                config: {
                    columns: 2
                },
                children: [
                    {
                        id: 'doTest',
                        type: 'button',
                        config: {
                            children: '测试SQL',
                            style: {
                                width: '100%'
                            }
                        }
                    },
                    {
                        id: 'doSave',
                        type: 'button',
                        config: {
                            children: '保存',
                            style: {
                                width: '100%'
                            }
                        }
                    },
                ]
            },
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    );
}