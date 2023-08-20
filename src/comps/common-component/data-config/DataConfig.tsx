import React, {Component, useRef, useState} from 'react';
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import CodeEditor from "../../../lib/lc-code-editer/CodeEditor";
import LcButton from "../../../lib/lc-button/LcButton";
import Select from "../../../lib/lc-select/Select";
import './DataConfig.less';
import {ConfigType} from "../../../designer/right/ConfigType";
import {DataConfigType} from "../../../designer/DesignerType";
import {OperateType} from "../../../framework/core/AbstractComponent";
import {stringToJsObj} from "../../../utils/ObjectUtil";
import {sendHttpRequest} from "../../../utils/HttpUtil";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import ConfigItemTB from "../../../lib/lc-config-item/ConfigItemTB";
import {message} from "antd";

class DataConfig extends Component<ConfigType> {

    state = {
        dataSource: 'static',
    }

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
        const {instance} = this.props;
        const {dataSource} = this.state;
        return (
            <div className={'lc-data-config'}>
                <ConfigItem title={'数据源'} contentStyle={{width: 100}}>
                    <Select onChange={(value) => this.dataSourcesChange(value)} defaultValue={dataSource} options={[
                        {value: 'static', label: '静态数据'},
                        {value: 'api', label: '接口(API)'},
                        // {value: 'database', label: '数据库'},
                        // {value: 'excel', label: 'EXCEL导入'},
                    ]}/>
                </ConfigItem>
                {dataSource === 'static' &&
                <StaticDataConfig instance={instance}/>}
                {dataSource === 'api' &&
                <ApiDataConfig instance={instance}/>}
            </div>
        );
    }
}

export const ApiDataConfig: React.FC<ConfigType> = ({instance}) => {
    const config: DataConfigType = instance.getConfig().data;
    const {apiData} = config;
    const urlRef = useRef(apiData?.url || '');
    const methodRef = useRef(apiData?.method || '');
    const headerRef = useRef(JSON.stringify(apiData?.header || {}));
    const paramsRef = useRef(JSON.stringify(apiData?.params || {}));
    const flashFrequencyRef = useRef(apiData?.flashFrequency || 5);
    const [testResult, setTestResult] = useState<any>('');

    const testApi = () => {
        if (urlRef.current === '') {
            message.error('接口地址不能为空');
            return;
        }
        if (methodRef.current === '') {
            message.error('请求方式不能为空');
            return;
        }
        let header = stringToJsObj(headerRef.current);
        if (!header) {
            message.error('请求头不符合json格式');
            return;
        }
        let params = stringToJsObj(paramsRef.current);
        if (!params) {
            message.error('请求参数不符合json格式');
            return;
        }
        sendHttpRequest(urlRef.current, methodRef.current, header, params).then(res => {
            setTestResult(JSON.stringify(res));
        }).catch(err => {
            setTestResult(JSON.stringify(err));
        });
    }

    const doSave = () => {
        if (urlRef.current === '') {
            message.warning('接口地址不能为空');
            return;
        }
        if (methodRef.current === '') {
            message.warning('请求方式不能为空');
            return;
        }

        let header = stringToJsObj(headerRef.current);
        if (!header) message.error('请求头不符合json格式');
        let params = stringToJsObj(paramsRef.current);
        if (!params) message.error('请求参数不符合json格式');
        instance.update({
            data: {
                apiData: {
                    url: urlRef.current,
                    method: methodRef.current,
                    header: header,
                    params: params,
                    flashFrequency: flashFrequencyRef.current
                }
            }
        });
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
                <CodeEditor onChange={headerOnChange} defaultValue={headerRef.current}/>
            </ConfigItemTB>
            <ConfigItemTB title={'请求参数(JSON)'} contentStyle={{width: '95%'}}>
                <CodeEditor onChange={paramsOnChange} defaultValue={paramsRef.current}/>
            </ConfigItemTB>
            <ConfigItemTB title={'响应结果'} contentStyle={{width: '95%'}}>
                <CodeEditor readonly={true} value={testResult}/>
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
            instance.update({data: {staticData: {data}}, style: {data}},
                {reRender: true, operateType: OperateType.DATA});
        } catch (e: any) {
            message.error('数据格式错误');
        }
    }

    return (
        <>
            <CodeEditor onChange={(value) => dataCode = value} height={'400'} defaultValue={dataCode || ''}/>
            <div className={'static-data-btn-arr'}><LcButton onClick={flashData}>保存并刷新数据</LcButton></div>
        </>
    );
}

export default DataConfig;