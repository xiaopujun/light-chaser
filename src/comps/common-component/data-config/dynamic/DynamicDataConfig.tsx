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

export interface DynamicDataConfigProps {
    controller: AbstractDesignerController;
    data: IDatabase;
}

export function DynamicDataConfig(props: DynamicDataConfigProps) {
    const {data, controller} = props;
    const dataRef = useRef(data);
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
                key: 'subject',
                label: '全局变量',
                type: 'input',
                value: dataRef.current?.subject,
                reRender: true,
            },
            {
                key: 'mockData',
                label: 'Mock数据',
                type: 'input',
                value: dataRef.current?.mockData,
                reRender: true,
            },
            {
                type: 'grid',
                children: [
                    {
                        id: 'testAndSave',
                        type: 'button',
                        config: {
                            children: '发送事件',
                            style: {
                                width: '100%'
                            }
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
