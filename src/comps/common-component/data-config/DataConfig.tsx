import {Component} from 'react';
import './DataConfig.less';
import {ConfigType} from "../../../designer/right/ConfigType";
import {DataConfigType} from "../../../designer/DesignerType";
import AbstractController, {OperateType} from "../../../framework/core/AbstractController";
import {message} from "antd";
import ObjectUtil from "../../../utils/ObjectUtil";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import LCGUIUtil from "../../../json-schema/LCGUIUtil";
import HttpUtil from "../../../utils/HttpUtil";

type DataTypeItem = 'static' | 'api' | 'database' | 'excel';

type DataTypes = (DataTypeItem)[];

export interface DataConfigProps<T extends AbstractController = AbstractController> extends ConfigType<T> {
    // 限制数据源类型，默认全部。（针对如进度图类型的图表，其数据只是一个简单的数字，一般不通过excel导入）
    dataTypes?: DataTypes;
    // 接口数据转换函数，默认按照json格式转换（对于有自己特殊类型的图表，可以自定义转换函数，比如仪表盘，其数据是一个数字，而不是json）
    apiDataConvert?: (data: string) => any;
}

class DataConfig extends Component<DataConfigProps> {

    schema: Control = {};

    dataConfig: DataConfigType = {};

    state = {
        renderCount: 0
    }

    constructor(props: ConfigType) {
        super(props);
        const {controller} = props;
        const data: DataConfigType = controller.getConfig().data;
        this.dataConfig = data;
        this.state = {
            renderCount: 0
        }
        this.schema = {
            type: 'grid',
            config: {
                gridGap: '10px'
            },
            children: [
                {
                    key: 'dataSource',
                    label: '数据源',
                    type: 'select',
                    reRender: true,
                    value: data?.dataSource || 'static',
                    config: {
                        options: [
                            {value: 'static', label: '静态数据',},
                            {value: 'api', label: '接口(API)',}
                        ]
                    }
                },
                {
                    key: 'staticData',
                    rules: "{dataSource} === 'static'",
                    children: [
                        {
                            key: 'data',
                            type: 'code-editor',
                            config: {
                                height: 500,
                            },
                            value: JSON.stringify(data?.staticData?.data, null, 2) || '',
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
                    rules: "{dataSource} === 'api'",
                    children: [
                        {
                            key: 'url',
                            type: 'input',
                            label: '接口地址',
                            value: data?.apiData?.url || '',
                        },
                        {
                            key: 'method',
                            label: '请求方式',
                            type: 'select',
                            value: data?.apiData?.method || 'get',
                            config: {
                                options: [
                                    {value: 'get', label: 'GET'},
                                    {value: 'post', label: 'POST'},
                                ]
                            }
                        },
                        {
                            key: 'flashFrequency',
                            label: '刷新频率',
                            type: 'input',
                            config: {
                                prefix: '每',
                                type: 'number',
                                suffix: '秒',
                                min: 5
                            },
                            value: data?.apiData?.flashFrequency || 5,
                        },
                        {

                            type: 'item-panel',
                            label: '请求头',
                            tip: '请求头信息，json格式',
                            children: [
                                {
                                    key: 'header',
                                    type: 'code-editor',
                                    config: {
                                        height: 100,
                                    },
                                    value: JSON.stringify(data?.apiData?.header, null, 2) || '',
                                }
                            ]
                        },
                        {

                            type: 'item-panel',
                            tip: '请求参数，json格式',
                            label: '请求参数',
                            children: [
                                {
                                    key: 'params',
                                    type: 'code-editor',
                                    config: {
                                        height: 100,
                                    },
                                    value: JSON.stringify(data?.apiData?.params, null, 2) || '',
                                }
                            ]
                        },
                        {
                            type: 'item-panel',
                            label: '响应结果',
                            children: [
                                {
                                    type: 'code-editor',
                                    reRender: true,
                                    config: {
                                        readonly: true,
                                        height: 160,
                                    },
                                    value: '',
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
    }

    dataSourcesChange = (value: any) => {
        const {controller} = this.props;
        controller.update({data: {dataSource: value}}, {reRender: false});
        this.setState({
            dataSource: value,
        });
    }

    validate = () => {
        if (!this.dataConfig.apiData?.url) {
            message.error('接口地址不能为空');
            return false;
        }
        if (!this.dataConfig.apiData?.method) {
            message.error('请求方式不能为空');
            return false;
        }
        if (!this.dataConfig.apiData?.header) {
            message.error('请求头不符合json格式');
            return false;
        }
        if (!this.dataConfig.apiData.params) {
            message.error('请求参数不符合json格式');
            return false;
        }
        return true;
    }

    testApi = () => {
        if (!this.validate()) return;
        let {params, header} = this.dataConfig.apiData!;
        header = header && typeof header === 'string' ? ObjectUtil.stringToJsObj(this.dataConfig.apiData?.header) : header;
        params = params && typeof params === 'string' ? ObjectUtil.stringToJsObj(this.dataConfig.apiData?.params) : params;
        const {url, method} = this.dataConfig.apiData!;
        HttpUtil.sendHttpRequest(url!, method!, header, params).then(res => {
            this.schema!.children![2].children![5].children![0].value = JSON.stringify(res, null, 2);
            this.setState({renderCount: this.state.renderCount + 1});
        }).catch(() => {
            this.schema!.children![2].children![5].children![0].value = JSON.stringify({msg: '请求错误'}, null, 2);
            console.log(this.schema)
            this.setState({renderCount: this.state.renderCount + 1});
        });
    }

    onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {schemaKeyPath, data, reRender, id, dataFragment} = fieldChangeData;
        this.dataConfig = ObjectUtil.merge(this.dataConfig, dataFragment)
        //静态数据保存
        if (id === 'doStaticSave') {
            const dataStr = (this.schema!.children![1].children![0]!.value! as string).replace(/'/g, '"').replace(/\s/g, '');
            const data = JSON.parse(dataStr);
            const {controller} = this.props;
            controller.update({data: {staticData: {data}}},
                {reRender: true, operateType: OperateType.DATA});
        }
        if (id === 'doTest') {
            this.testApi();
        }
        if (id === 'doSave') {
            if (!this.validate()) return;
            const {controller} = this.props;
            const {params, header} = this.dataConfig.apiData!;
            params && typeof params === 'string' && (this.dataConfig.apiData!.params = ObjectUtil.stringToJsObj(params));
            header && typeof header === 'string' && (this.dataConfig.apiData!.header = ObjectUtil.stringToJsObj(header));
            controller.update({data: {apiData: this.dataConfig.apiData}},
                {reRender: true, operateType: OperateType.DATA});
        }

        LCGUIUtil.updateSchema(this.schema, schemaKeyPath, data);
        if (reRender)
            this.setState({renderCount: this.state.renderCount + 1})
    }


    render() {
        return (
            <LCGUI schema={this.schema} onFieldChange={this.onFieldChange}/>
        );
    }
}

export default DataConfig;