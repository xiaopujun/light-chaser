import React, {Component, useRef, useState} from 'react';
import ConfigItem from "../../config-item/ConfigItem";
import CodeEditor from "../../lc-code-editer/CodeEditor";
import UnderLineInput from "../../lc-input/UnderLineInput";
import ConfigItemTB from "../../config-item/ConfigItemTB";
import LcButton from "../../lc-button/LcButton";
import Select from "../../lc-select/Select";
import {DataConfigType, DataConfigVerifyCallback} from "../../../designer/DesignerType";
import './DataConfig.less';
import {sendHttpRequest} from "../../../utils/HttpUtil";
import {stringToJsObj} from "../../../utils/ObjectUtil";

interface DataConfigProps {
    config: DataConfigType,
    onSave: Function,
    verifyCallback: DataConfigVerifyCallback,
}

class DataConfig extends Component<DataConfigProps> {

    state = {
        dataSource: 'static',
    }

    constructor(props: DataConfigProps) {
        super(props);
        const {config} = props;
        this.state = {
            dataSource: config?.dataSource || 'static',
        }
    }

    dataSourcesChange = (value: any) => {
        this.setState({
            dataSource: value,
        });
    }

    doSave = (dataConfig: any) => {
        const {onSave} = this.props;
        onSave && onSave({dataSource: this.state.dataSource, ...dataConfig});
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
                <StaticDataConfig config={config} onSave={this.doSave} verifyCallback={{}}/>}
                {dataSource === 'api' &&
                <ApiDataConfig config={config} onSave={this.doSave} verifyCallback={{}}/>}
            </div>
        );
    }
}

const ApiDataConfig: React.FC<DataConfigProps> = ({config, onSave}) => {
    console.log('ApiDataConfig')
    const {apiData} = config;
    const urlRef = useRef(apiData?.url || '');
    const methodRef = useRef(apiData?.method || '');
    const headerRef = useRef(apiData?.header || {});
    const paramsRef = useRef(apiData?.params || {});
    const flashFrequencyRef = useRef(apiData?.flashFrequency || 5);
    const [testResult, setTestResult] = useState<any>('');

    const testApi = () => {
        sendHttpRequest(urlRef.current, methodRef.current, headerRef.current, paramsRef.current).then(res => {
            setTestResult(JSON.stringify(res));
        }).catch(err => {
            setTestResult(JSON.stringify(err));
        });
    }

    const doSave = () => {
        onSave({
            apiData: {
                url: urlRef.current,
                method: methodRef.current,
                header: headerRef.current,
                params: paramsRef.current,
                flashFrequency: flashFrequencyRef.current
            }
        });
    }

    const headerOnChange = (value: any) => {
        headerRef.current = stringToJsObj(value);
    }

    const paramsOnChange = (value: any) => {
        paramsRef.current = stringToJsObj(value);
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
                <CodeEditor onChange={headerOnChange} defaultValue={JSON.stringify(headerRef.current)}/>
            </ConfigItemTB>
            <ConfigItemTB title={'请求参数'} contentStyle={{width: '95%'}}>
                <CodeEditor onChange={paramsOnChange} defaultValue={JSON.stringify(paramsRef.current)}/>
            </ConfigItemTB>
            <ConfigItemTB title={'响应结果'} contentStyle={{width: '95%'}}>
                <CodeEditor readonly={true} value={testResult}/>
            </ConfigItemTB>
            <LcButton style={{width: 'calc(50% - 16px)', margin: '0 7px'}} onClick={testApi}>测试接口</LcButton>
            <LcButton style={{width: 'calc(50% - 16px)', margin: '0 7px'}} onClick={doSave}>保存</LcButton>
        </>
    );
}

const StaticDataConfig: React.FC<DataConfigProps> = ({config, onSave, verifyCallback}) => {

    let dataCode = JSON.stringify(config.staticData?.data)
        .replace(/"/g, '\''); // 将双引号替换为单引号

    const flashData = () => {
        try {
            //校验数据合法性
            if (verifyCallback && verifyCallback.staticDataVerify) {
                let verifyRes = verifyCallback.staticDataVerify(dataCode);
                if (verifyRes !== true) {
                    console.error('数据校验失败', verifyRes);
                    return;
                }
            }
            //todo 考虑下安全问题如何处理
            onSave({staticData: {data: stringToJsObj(dataCode)}});
        } catch (e: any) {
            console.error('代码解析异常', e);
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