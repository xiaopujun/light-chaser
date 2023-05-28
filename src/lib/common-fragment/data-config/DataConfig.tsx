import React, {Component} from 'react';
import ConfigItem from "../../config-item/ConfigItem";
import CodeEditor from "../../code-editer/CodeEditor";
import {ConfigType} from "../../../framework/types/ConfigType";
import UnderLineInput from "../../lc-input/UnderLineInput";
import ConfigItemTB from "../../config-item-tb/ConfigItemTB";
import LcButton from "../../lc-button/LcButton";
import Select from "../../lc-select/Select";


class DataConfig extends Component<ConfigType> {

    dataSourcesChange = (value: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({
            data: {
                sourceType: value,
            },
        });
    }

    editChange = (value: any) => {
        console.log(value);
    }

    render() {
        const {config} = this.props;
        return (
            <div className={'lc-data-config'}>
                <ConfigItem title={'数据源'} contentStyle={{width: 100}}>

                    <Select onChange={this.dataSourcesChange} defaultValue={config?.sourceType} options={[
                        {value: 'static', label: '静态数据'},
                        {value: 'api', label: '接口(API)'},
                        {value: 'database', label: '数据库'},
                        {value: 'excel', label: 'EXCEL导入'},
                    ]}/>
                </ConfigItem>
                {config?.sourceType === 'static' &&
                <CodeEditor onChange={this.editChange} value={'console.log("test")'}/>}
                {config?.sourceType === 'api' &&
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
                        <CodeEditor onChange={this.editChange} value={'console.log("test")'}/>
                    </ConfigItemTB>
                    <ConfigItemTB title={'请求参数'} contentStyle={{width: '95%'}}>
                        <CodeEditor onChange={this.editChange} value={'console.log("test")'}/>
                    </ConfigItemTB>
                    <ConfigItemTB title={'响应结果'} contentStyle={{width: '95%'}}>
                        <CodeEditor readonly={true} onChange={this.editChange} value={'测试接口的返回结果将在这里显示。'}/>
                    </ConfigItemTB>
                    <LcButton style={{width: 'calc(100% - 16px)', margin: '0 7px'}}>测试接口</LcButton>
                </>
                }

            </div>
        );
    }
}

export default DataConfig;