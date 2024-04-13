import {useRef, useState} from 'react';
import './DataConfig.less';
import AbstractController from "../../../framework/core/AbstractController";
import ObjectUtil from "../../../utils/ObjectUtil";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import HttpUtil from "../../../utils/HttpUtil";
import {ConfigType} from "../../../designer/right/ConfigContent";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import {DataConfigType} from "../../../designer/DesignerType.ts";
import {cloneDeep} from "lodash";

type DataTypeItem = 'static' | 'api' | 'database' | 'excel';

type DataTypes = (DataTypeItem)[];

export interface DataConfigProps<T extends AbstractController = AbstractDesignerController> extends ConfigType<T> {
    // 限制数据源类型，默认全部。（针对如进度图类型的图表，其数据只是一个简单的数字，一般不通过excel导入）
    dataTypes?: DataTypes;
    // 接口数据转换函数，默认按照json格式转换（对于有自己特殊类型的图表，可以自定义转换函数，比如仪表盘，其数据是一个数字，而不是json）
    apiDataConvert?: (data: string) => any;
}

const defaultData: DataConfigType = {
    sourceType: 'static',
    staticData: [],
    apiData: {
        url: '',
        method: 'get',
        header: {},
        params: {},
        frequency: 5
    }
}

const DataConfig = (props: DataConfigProps) => {
    const {controller} = props;
    const initData = ObjectUtil.merge(cloneDeep(defaultData), controller.getConfig()?.data);
    const dataRef = useRef<DataConfigType>(initData)
    const apiTestResRef = useRef<string>("")
    const [count, setCount] = useState(0);

    const validate = () => {
        if (!dataRef.current.apiData?.url) {
            globalMessage.messageApi?.error('接口地址不能为空');
            return false;
        }
        if (!dataRef.current.apiData?.method) {
            globalMessage.messageApi?.error('请求方式不能为空');
            return false;
        }
        if (typeof dataRef.current.apiData.header === 'string') {
            const header = ObjectUtil.stringToJsObj(dataRef.current.apiData.header)
            if (!header) {
                globalMessage.messageApi?.error('请求头不符合json格式');
                return false;
            } else
                dataRef.current.apiData.header = header;
        }
        if (typeof dataRef.current.apiData.params === 'string') {
            const param = ObjectUtil.stringToJsObj(dataRef.current.apiData.params)
            if (!param) {
                globalMessage.messageApi?.error('请求参数不符合json格式');
                return false;
            } else
                dataRef.current.apiData.params = param;
        }
        return true;
    }

    const testApi = () => {
        if (!validate())
            return;
        let {params, header, url, method} = dataRef.current.apiData!;
        HttpUtil.sendHttpRequest(url!, method!, header, params).then(res => {
            apiTestResRef.current = JSON.stringify(res, null, 2);
        }).catch(() => {
            apiTestResRef.current = JSON.stringify({msg: '请求错误'}, null, 2);
        }).finally(() => setCount(count + 1))
    }

    const saveApi = () => {
        if (!validate())
            return;
        controller.update({data: dataRef.current}, {reRender: false});
        const finalData = ObjectUtil.stringToJsObj(apiTestResRef.current)
        if (finalData)
            controller.changeData(finalData);
    }

    const flashStaticData = () => {
        if (typeof dataRef.current.staticData === 'string') {
            const finalData = ObjectUtil.stringToJsObj(dataRef.current.staticData)
            if (!finalData)
                globalMessage.messageApi?.error('格式错误，请检查');
            else {
                controller.update({data: {staticData: finalData}}, {reRender: false});
                controller.changeData(finalData)
            }
        }
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {reRender, id, dataFragment} = fieldChangeData;
        if (id === 'doTest')
            testApi();
        else if (id === 'doStaticSave')
            flashStaticData();
        else if (id === 'doSave')
            saveApi();
        else if (id === 'apiTestRes')
            return
        else {
            dataRef.current = ObjectUtil.merge(dataRef.current, dataFragment)
        }

        if (reRender)
            setCount(count + 1)
    }


    const schema: Control = {
        type: 'grid',
        config: {
            gridGap: '10px'
        },
        children: [
            {
                key: 'sourceType',
                label: '数据源',
                type: 'select',
                reRender: true,
                value: dataRef.current?.sourceType || 'static',
                config: {
                    options: [
                        {value: 'static', label: '静态数据',},
                        {value: 'api', label: '接口(API)',}
                    ]
                }
            },
            {
                rules: "{sourceType} === 'static'",
                children: [
                    {
                        id: 'staticData',
                        key: 'staticData',
                        type: 'code-editor',
                        config: {
                            height: 500,
                        },
                        value: JSON.stringify(dataRef.current?.staticData, null, 2) || '',
                    },
                    {
                        id: 'doStaticSave',
                        type: 'button',
                        config: {
                            children: '保存并刷新数据',
                            style: {
                                width: '100%'
                            }
                        }
                    }
                ]
            },
            {
                key: 'apiData',
                rules: "{sourceType} === 'api'",
                children: [
                    {
                        key: 'url',
                        type: 'input',
                        label: '接口地址',
                        value: dataRef.current?.apiData?.url || '',
                    },
                    {
                        key: 'method',
                        label: '请求方式',
                        type: 'select',
                        value: dataRef.current?.apiData?.method,
                        config: {
                            options: [
                                {value: 'get', label: 'GET'},
                                {value: 'post', label: 'POST'},
                            ]
                        }
                    },
                    {
                        key: 'frequency',
                        label: '刷新频率',
                        type: 'number-input',
                        config: {
                            prefix: '每',
                            suffix: '秒',
                            min: 5
                        },
                        value: dataRef.current?.apiData?.frequency || 5,
                    },
                    {

                        type: 'card-panel',
                        label: '请求头',
                        tip: '请求头信息，json格式',
                        children: [
                            {
                                id: 'header',
                                key: 'header',
                                type: 'code-editor',
                                config: {
                                    height: 100,
                                },
                                value: JSON.stringify(dataRef.current?.apiData?.header, null, 2) || '',
                            }
                        ]
                    },
                    {
                        type: 'card-panel',
                        tip: '请求参数，json格式',
                        label: '请求参数',
                        children: [
                            {
                                id: 'params',
                                key: 'params',
                                type: 'code-editor',
                                config: {
                                    height: 100,
                                },
                                value: JSON.stringify(dataRef.current?.apiData?.params, null, 2) || '',
                            }
                        ]
                    },
                    {
                        type: 'card-panel',
                        label: '响应结果',
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
                        config: {
                            columns: 2
                        },
                        children: [
                            {
                                id: 'doTest',
                                type: 'button',
                                config: {
                                    children: '测试接口',
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
        ]
    }
    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    );
}

export default DataConfig;