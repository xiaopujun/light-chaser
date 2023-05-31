import React, {Component} from 'react';
import ConfigItem from "../../config-item/ConfigItem";
import CodeEditor from "../../code-editer/CodeEditor";
import UnderLineInput from "../../lc-input/UnderLineInput";
import ConfigItemTB from "../../config-item/ConfigItemTB";
import LcButton from "../../lc-button/LcButton";
import Select from "../../lc-select/Select";
import {DataConfigType} from "../../../framework/types/DesignerType";
import './DataConfig.less';

interface DataConfigProps {
    config: DataConfigType,
    onChange: Function,
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


    render() {
        const {config, onChange} = this.props;
        const {dataSource} = this.state;
        return (
            <div className={'lc-data-config'}>
                <ConfigItem title={'数据源'} contentStyle={{width: 100}}>
                    <Select onChange={(value) => {
                        this.dataSourcesChange(value);
                        onChange('dataSource', value);
                    }} defaultValue={dataSource} options={[
                        {value: 'static', label: '静态数据'},
                        {value: 'api', label: '接口(API)'},
                        {value: 'database', label: '数据库'},
                        {value: 'excel', label: 'EXCEL导入'},
                    ]}/>
                </ConfigItem>
                {dataSource === 'static' && <StaticDataConfig {...this.props}/>}
                {dataSource === 'api' && <ApiDataConfig {...this.props}/>}
            </div>
        );
    }
}

const ApiDataConfig: React.FC<DataConfigProps> = (props) => {

    const editChange = (value: any) => {
    }

    return (
        <>
            <ConfigItem title={'接口地址'} contentStyle={{width: 240}}>
                <UnderLineInput/>
            </ConfigItem>
            <ConfigItem title={'请求方式'} contentStyle={{width: 100}}>
                <Select options={[
                    {value: 'get', label: 'GET'},
                    {value: 'post', label: 'POST'},
                    {value: 'put', label: 'PUT'},
                    {value: 'delete', label: 'DELETE'},
                ]}/>
            </ConfigItem>
            <ConfigItemTB title={'请求头(JSON)'} contentStyle={{width: '95%'}}>
                <CodeEditor onChange={editChange} value={'console.log("test")'}/>
            </ConfigItemTB>
            <ConfigItemTB title={'请求参数'} contentStyle={{width: '95%'}}>
                <CodeEditor onChange={editChange} value={'console.log("test")'}/>
            </ConfigItemTB>
            <ConfigItemTB title={'响应结果'} contentStyle={{width: '95%'}}>
                <CodeEditor readonly={true} onChange={editChange} value={'测试接口的返回结果将在这里显示。'}/>
            </ConfigItemTB>
            <LcButton style={{width: 'calc(100% - 16px)', margin: '0 7px'}}>测试接口</LcButton>
        </>
    );
}

const StaticDataConfig: React.FC<DataConfigProps> = ({config, onChange}) => {

    let dataCode = JSON.stringify(config.staticData?.data);

    const flashData = () => {
        try {
            //todo 考虑下安全问题如何处理
            let tempCode = `(function(){return ${dataCode};})()`;
            onChange('static-data', eval(tempCode));
        } catch (e: any) {
            console.error('代码解析异常', e.message);
        }
    }

    return (
        <>
            <CodeEditor onChange={(value) => dataCode = value} height={'400'} value={dataCode || ''}/>
            <div className={'static-data-btn-arr'}><LcButton onClick={flashData}>刷新数据</LcButton></div>
        </>
    );
}

export default DataConfig;