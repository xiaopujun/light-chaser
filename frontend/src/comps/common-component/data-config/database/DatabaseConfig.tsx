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

import AbstractDesignerController from "../../../../framework/core/AbstractDesignerController.ts";
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI.tsx";
import {Control} from "../../../../json-schema/SchemaTypes.ts";
import {useEffect, useRef, useState} from "react";
import {globalMessage} from "../../../../framework/message/GlobalMessage.tsx";
import {ISelectOption} from "../../../../json-schema/ui/select/Select.tsx";
import ObjectUtil from "../../../../utils/ObjectUtil.ts";
import {IDatabase} from "../../../../designer/DesignerType.ts";
import FetchUtil from "../../../../utils/FetchUtil.ts";
import {IDataSource} from "../../../../pages/home/datasource/DataSourceStore.ts";
import Base64Util from "../../../../utils/Base64Util.ts";

export interface DatabaseDataConfigProps {
    controller: AbstractDesignerController;
    data: IDatabase;
}

export function DatabaseDataConfig(props: DatabaseDataConfigProps) {
    const {data, controller} = props;
    const dataRef = useRef(data);
    const [dataSourceList, setDataSourceList] = useState<ISelectOption[]>([]);
    const [testRes, setTestRes] = useState<string | null>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        FetchUtil.get(`/api/commonDatabase/list`).then(res => {
            if (res.code === 200) {
                const options = (res.data as Array<IDataSource>).map(item => {
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

    const testAndSave = () => {
        if (!validate())
            return;

        const {targetDb, sql, filter} = dataRef.current;
        if (!sql || sql === '')
            return;
        FetchUtil.post(`/api/db/executor/execute`, {id: targetDb, sql: Base64Util.toBase64(sql)}).then(res => {
            let {data} = res;
            const {code, msg} = res;
            if (code === 200) {
                if (filter && filter !== '') {
                    const func = eval(`(${filter})`);
                    data = typeof func === 'function' ? func(data) : data;
                }
                setTestRes(JSON.stringify(data, null, 2));

                controller.update({data: {database: dataRef.current, staticData: data}})
                controller.changeData(data);
            } else {
                setTestRes(JSON.stringify({msg}, null, 2));
                controller.update({data: {database: dataRef.current}}, {reRender: false})
                globalMessage.messageApi?.warning('配置项已保存，但数据未成功刷新 ' + msg);
            }
        })
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
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
                label: 'SQL语句',
                config: {
                    contentStyle: {padding: 0}
                },
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
                id: 'databaseTestRes',
                type: 'card-panel',
                label: '响应结果',
                config: {
                    contentStyle: {padding: 0}
                },
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
                children: [
                    {
                        id: 'testAndSave',
                        type: 'button',
                        config: {
                            children: '测试SQL并保存',
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