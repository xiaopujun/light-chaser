import AbstractDesignerController from "../../../../framework/core/AbstractDesignerController.ts";
import {APIConfig} from "../../../../designer/DesignerType.ts";
import {useRef, useState} from "react";
import ObjectUtil from "../../../../utils/ObjectUtil.ts";
import {Control} from "../../../../json-schema/SchemaTypes.ts";
import {globalMessage} from "../../../../framework/message/GlobalMessage.tsx";
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI.tsx";
import FetchUtil from "../../../../utils/FetchUtil.ts";

export interface ApiDataConfigProps {
    controller: AbstractDesignerController;
    data: APIConfig;
}

export function ApiDataConfig(props: ApiDataConfigProps) {
    const {data, controller} = props;
    const dataRef = useRef<APIConfig>(ObjectUtil.merge({
        url: '',
        method: 'get',
        header: {},
        params: {},
        autoFlush: false,
        frequency: 5,
        filter: undefined,
    }, data));
    const apiTestResRef = useRef<string>("")
    const [count, setCount] = useState(0);

    const schema: Control = {
        type: 'grid',
        config: {gridGap: '10px'},
        children: [
            {
                key: 'url',
                type: 'input',
                label: '接口地址',
                value: dataRef.current?.url || '',
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
                            height: 160,
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


    const validate = () => {
        if (!dataRef.current?.url) {
            globalMessage.messageApi?.error('接口地址不能为空');
            return false;
        }
        if (!dataRef.current?.method) {
            globalMessage.messageApi?.error('请求方式不能为空');
            return false;
        }
        if (typeof dataRef.current.header === 'string') {
            const header = ObjectUtil.stringToJsObj(dataRef.current.header)
            if (!header) {
                globalMessage.messageApi?.error('请求头不符合json格式');
                return false;
            } else
                dataRef.current.header = header;
        }
        if (typeof dataRef.current.params === 'string') {
            const param = ObjectUtil.stringToJsObj(dataRef.current.params)
            if (!param) {
                globalMessage.messageApi?.error('请求参数不符合json格式');
                return false;
            } else
                dataRef.current.params = param;
        }
        return true;
    }

    const testAndSave = () => {
        if (!validate())
            return;
        const {params, header, url, method, filter} = dataRef.current!;
        FetchUtil.doRequest(url!, method!, header, params).then(res => {
            let {data} = res;
            const {code} = res;
            if (code === 200) {
                if (filter && filter !== '') {
                    const func = eval(`(${filter})`);
                    data = typeof func === 'function' ? func(data) : data;
                }
                apiTestResRef.current = JSON.stringify(data, null, 2);
                controller.update({data: {apiData: dataRef.current, staticData: data}}, {reRender: false});
                controller.changeData(data);
            } else {
                apiTestResRef.current = JSON.stringify({msg: '请求错误'}, null, 2);
                controller.update({data: {apiData: dataRef.current}}, {reRender: false});
                globalMessage.messageApi?.warning('配置项已保存，但数据未成功刷新');
            }
        }).finally(() => {
            setCount(count + 1);
        })
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {reRender, id, dataFragment} = fieldChangeData;
        if (id === 'testAndSave')
            testAndSave();
        else if (id === 'apiTestRes')
            return
        else {
            dataRef.current = ObjectUtil.merge(dataRef.current, dataFragment)
        }
        if (reRender)
            setCount(count + 1)
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    );
}