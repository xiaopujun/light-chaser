import React, {Component, useRef, useState} from 'react';
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import CodeEditor from "../../../lib/lc-code-editer/CodeEditor";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import ConfigItemTB from "../../../lib/lc-config-item/ConfigItemTB";
import LcButton from "../../../lib/lc-button/LcButton";
import Select from "../../../lib/lc-select/Select";
import './DataConfig.less';
import {sendHttpRequest} from "../../../utils/HttpUtil";
import {stringToJsObj} from "../../../utils/ObjectUtil";
import {ConfigType} from "../../../designer/right/ConfigType";

class DataConfig extends Component<ConfigType> {

    state = {
        dataSource: 'static',
    }

    constructor(props: ConfigType) {
        super(props);
        const {config} = props;
        this.state = {
            dataSource: config?.dataSource || 'static',
        }
    }

    dataSourcesChange = (value: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({data: {dataSource: value}});
        this.setState({
            dataSource: value,
        });
    }

    doSave = (dataConfig: any) => {
        const {updateConfig} = this.props;
        let config: any = {data: dataConfig};
        if ('staticData' in dataConfig)
            config['style'] = {
                chartStyle: {
                    data: dataConfig.staticData.data
                }
            }
        updateConfig && updateConfig(config);
    }

    render() {
        const {config} = this.props;
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
                <StaticDataConfig config={config} updateConfig={this.doSave}/>}
                {dataSource === 'api' &&
                <ApiDataConfig config={config} updateConfig={this.doSave}/>}
            </div>
        );
    }
}

const ApiDataConfig: React.FC<ConfigType> = ({config, updateConfig}) => {
    const {apiData} = config;
    const urlRef = useRef(apiData?.url || '');
    const methodRef = useRef(apiData?.method || '');
    const headerRef = useRef(JSON.stringify(apiData?.header || {}));
    const paramsRef = useRef(JSON.stringify(apiData?.params || {}));
    const flashFrequencyRef = useRef(apiData?.flashFrequency || 5);
    const [testResult, setTestResult] = useState<any>('');

    const testApi = () => {
        if (urlRef.current === '') alert('接口地址不能为空');
        if (methodRef.current === '') alert('请求方式不能为空');
        let header = stringToJsObj(headerRef.current);
        if (!header) alert('请求头不符合json格式');
        let params = stringToJsObj(paramsRef.current);
        if (!params) alert('请求参数不符合json格式');
        sendHttpRequest(urlRef.current, methodRef.current, header, params).then(res => {
            setTestResult(JSON.stringify(res));
        }).catch(err => {
            setTestResult(JSON.stringify(err));
        });
    }

    const doSave = () => {
        if (urlRef.current === '') {
            alert('接口地址不能为空');
            return;
        }
        if (methodRef.current === '') {
            alert('请求方式不能为空');
            return;
        }
        ;
        let header = stringToJsObj(headerRef.current);
        if (!header) alert('请求头不符合json格式');
        let params = stringToJsObj(paramsRef.current);
        if (!params) alert('请求参数不符合json格式');
        updateConfig && updateConfig({
            apiData: {
                url: urlRef.current,
                method: methodRef.current,
                header: header,
                params: params,
                flashFrequency: flashFrequencyRef.current
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
                <UnderLineInput defaultValue={urlRef.current} onChange={value => urlRef.current = value}/>
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
                                onChange={value => flashFrequencyRef.current = value}/>
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

const StaticDataConfig: React.FC<ConfigType> = ({config, updateConfig}) => {

    let dataCode = JSON.stringify(config.staticData?.data);

    const flashData = () => {
        try {
            const data = dataCode.replace(/'/g, '"').replace(/\s/g, '');
            updateConfig && updateConfig({staticData: {data: JSON.parse(data)}});
        } catch (e: any) {
            console.error('代码解析异常', e, dataCode);
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