import React, {Component, useRef, useState} from 'react';
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import LcButton from "../../../lib/lc-button/LcButton";
import Select from "../../../lib/lc-select/Select";
import './DataConfig.less';
import {ConfigType} from "../../../designer/right/ConfigType";
import {APIConfig, DataConfigType} from "../../../designer/DesignerType";
import AbstractComponent, {OperateType} from "../../../framework/core/AbstractComponent";
import {sendHttpRequest} from "../../../utils/HttpUtil";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import ConfigItemTB from "../../../lib/lc-config-item/ConfigItemTB";
import {message} from "antd";
import ObjectUtil from "../../../utils/ObjectUtil";
import {MonacoEditor} from "../../../lib/lc-code-editer/MonacoEditor";

type DataTypeItem = 'static' | 'api' | 'database' | 'excel';

type DataTypes = (DataTypeItem)[];

export interface DataConfigProps<T extends AbstractComponent = AbstractComponent> extends ConfigType<T> {
    // 限制数据源类型，默认全部。（针对如进度图类型的图表，其数据只是一个简单的数字，一般不通过excel导入）
    dataTypes?: DataTypes;
    // 接口数据转换函数，默认按照json格式转换（对于有自己特殊类型的图表，可以自定义转换函数，比如仪表盘，其数据是一个数字，而不是json）
    apiDataConvert?: (data: string) => any;
}

class DataConfig extends Component<DataConfigProps> {

    state = {
        dataSource: 'static',
    }

    allDataTypes = [
        {
            value: 'static',
            label: '静态数据',
        },
        {
            value: 'api',
            label: '接口(API)',
        }
    ]

    constructor(props: ConfigType) {
        super(props);
        const {instance} = props;
        const dataConfig: DataConfigType = instance.getConfig().data;
        this.state = {
            dataSource: dataConfig?.dataSource || 'static',
        }
    }

    dataSourcesChange = (value: any) => {
        const {instance} = this.props;
        instance.update({data: {dataSource: value}}, {reRender: false});
        this.setState({
            dataSource: value,
        });
    }


    render() {
        const {instance, dataTypes} = this.props;
        const {dataSource} = this.state;
        this.allDataTypes = dataTypes ? this.allDataTypes.filter(item => (dataTypes as DataTypes)?.includes(item.value as DataTypeItem)) : this.allDataTypes;
        return (
            <div className={'lc-data-config'}>
                <ConfigItem title={'数据源'} contentStyle={{width: 100}}>
                    <Select onChange={(value) => this.dataSourcesChange(value)} defaultValue={dataSource}
                            options={this.allDataTypes}/>
                </ConfigItem>
                {dataSource === 'static' &&
                <StaticDataConfig instance={instance}/>}
                {dataSource === 'api' &&
                <ApiDataConfig instance={instance}/>}
            </div>
        );
    }
}

export const ApiDataConfig: React.FC<DataConfigProps> = ({instance, apiDataConvert}) => {
    const config: DataConfigType = instance.getConfig().data;
    const {apiData} = config;
    const urlRef = useRef(apiData?.url || '');
    const methodRef = useRef(apiData?.method || '');
    const headerRef = useRef(JSON.stringify(apiData?.header || {}));
    const paramsRef = useRef(JSON.stringify(apiData?.params || {}));
    const flashFrequencyRef = useRef(apiData?.flashFrequency || 5);
    const [testResult, setTestResult] = useState<any>(null);

    let paramObj: Record<string, any> | null = null;
    let headerObj: Record<string, any> | null = null;

    const validate = () => {
        if (urlRef.current === '') {
            message.error('接口地址不能为空');
            return false;
        }
        if (methodRef.current === '') {
            message.error('请求方式不能为空');
            return false;
        }
        headerObj = ObjectUtil.stringToJsObj(headerRef.current);
        if (!headerObj) {
            message.error('请求头不符合json格式');
            return false;
        }
        paramObj = ObjectUtil.stringToJsObj(paramsRef.current);
        if (!paramObj) {
            message.error('请求参数不符合json格式');
            return false;
        }
        return true;
    }

    const testApi = () => {
        if (!validate()) return;
        sendHttpRequest(urlRef.current, methodRef.current, headerObj, paramObj).then(res => {
            if (apiDataConvert && typeof apiDataConvert === 'function')
                setTestResult(apiDataConvert(res));
            else
                setTestResult(JSON.stringify(res));
        }).catch(() => {
            setTestResult('请求失败');
        });
    }

    const doSave = () => {
        if (!validate()) return;
        const config: DataConfigType = {
            apiData: {
                url: urlRef.current,
                method: methodRef.current as APIConfig['method'],
                header: headerObj,
                params: paramObj,
                flashFrequency: flashFrequencyRef.current
            }
        };
        if (testResult) {
            config.staticData = {
                data: apiDataConvert ? apiDataConvert(testResult) : JSON.parse(testResult),
            };
        }
        instance.update({data: config}, {reRender: true, operateType: OperateType.DATA});
    }

    const headerOnChange = (value: string) => {
        headerRef.current = value;
    }

    const paramsOnChange = (value: string) => {
        paramsRef.current = value;
    }

    return (
        <>
            <ConfigItem title={'接口地址'} contentStyle={{width: 240}}>
                <UnderLineInput defaultValue={urlRef.current} onChange={e => urlRef.current = e.target.value}/>
            </ConfigItem>
            <ConfigItem title={'请求方式'} contentStyle={{width: 100}}>
                <Select options={[
                    {value: 'get', label: 'GET'},
                    {value: 'post', label: 'POST'},
                    {value: 'put', label: 'PUT'},
                    {value: 'delete', label: 'DELETE'},
                ]} defaultValue={methodRef.current} onChange={value => methodRef.current = value}/>
            </ConfigItem>
            <ConfigItem title={'刷新频率'} contentStyle={{
                color: '#c6c9cd',
                display: 'flex',
                width: 40,
                alignItems: 'center'
            }}>
                <UnderLineInput type={'number'} defaultValue={flashFrequencyRef.current}
                                onChange={e => flashFrequencyRef.current = parseInt(e.target.value)}/>
                <div>秒</div>
            </ConfigItem>
            <ConfigItemTB title={'请求头(JSON)'} contentStyle={{width: '95%'}}>
                <MonacoEditor height={100} onChange={value => headerOnChange(value!)} value={headerRef.current}/>
            </ConfigItemTB>
            <ConfigItemTB title={'请求参数(JSON)'} contentStyle={{width: '95%'}}>
                <MonacoEditor height={100} onChange={value => paramsOnChange(value!)} value={paramsRef.current}/>
            </ConfigItemTB>
            <ConfigItemTB title={'响应结果'} contentStyle={{width: '95%'}}>
                <MonacoEditor height={200} value={testResult}/>
            </ConfigItemTB>
            <LcButton style={{width: 'calc(50% - 16px)', margin: '0 7px'}} onClick={testApi}>测试接口</LcButton>
            <LcButton style={{width: 'calc(50% - 16px)', margin: '0 7px'}} onClick={doSave}>保存</LcButton>
        </>
    );
}

export const StaticDataConfig: React.FC<ConfigType> = ({instance}) => {

    const config: DataConfigType = instance.getConfig().data;
    let dataCode = JSON.stringify(config.staticData?.data);

    const flashData = () => {
        try {
            const dataStr = dataCode.replace(/'/g, '"').replace(/\s/g, '');
            const data = JSON.parse(dataStr);
            instance.update({data: {staticData: {data}}},
                {reRender: true, operateType: OperateType.DATA});
        } catch (e: any) {
            message.error('数据格式错误');
        }
    }

    return (
        <>
            <MonacoEditor height={400} onChange={(value) => dataCode = value!} value={dataCode}/>
            <div className={'static-data-btn-arr'}><LcButton onClick={flashData}>保存并刷新数据</LcButton></div>
        </>
    );
}

export default DataConfig;