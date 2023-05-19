import React, {Component} from 'react';
import ConfigItem from "../../config-item/ConfigItem";
import LcSelect from "../../lc-select/LCSelect";
import {Button, Select} from "antd";
import CodeEditor from "../../code-editer/CodeEditor";
import {ConfigType} from "../../../framework/types/ConfigType";
import LcUnderLineInput from "../../lc-input/LcUnderLineInput";
import ConfigCard from "../../config-card/ConfigCard";
import ConfigItemTB from "../../config-item-tb/ConfigItemTB";

const {Option} = Select;

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
                    <LcSelect onChange={this.dataSourcesChange} defaultValue={config?.sourceType}>
                        <Option value={'static'}>静态数据</Option>
                        <Option value={'api'}>接口(API)</Option>
                        <Option value={'database'}>数据库</Option>
                        <Option value={'excel'}>EXCEL导入</Option>
                    </LcSelect>
                </ConfigItem>
                {config?.sourceType === 'static' &&
                <CodeEditor onChange={this.editChange} value={'console.log("test")'}/>}
                {config?.sourceType === 'api' &&
                <>
                    <ConfigItem title={'接口地址'} contentStyle={{width: 240}}>
                        <LcUnderLineInput/>
                    </ConfigItem>
                    <ConfigItem title={'请求方式'} contentStyle={{width: 100}}>
                        <LcSelect>
                            <Option value={'get'}>GET</Option>
                            <Option value={'post'}>POST</Option>
                            <Option value={'put'}>PUT</Option>
                            <Option value={'delete'}>DELETE</Option>
                        </LcSelect>
                    </ConfigItem>
                    <ConfigItemTB title={'请求头(JSON)'} contentStyle={{width: '95%'}}>
                        <CodeEditor onChange={this.editChange} value={'console.log("test")'}/>
                    </ConfigItemTB>
                    <ConfigItemTB title={'请求参数'} contentStyle={{width: '95%'}}>
                        <CodeEditor onChange={this.editChange} value={'console.log("test")'}/>
                    </ConfigItemTB>
                    <Button type={'primary'} size={'middle'}
                            style={{width: 'calc(100% - 16px)', margin: '0 7px'}}>测试接口</Button>
                    <br/>
                    <div style={{margin: '15px 7px 0 7px'}}>
                        <CodeEditor onChange={this.editChange} value={'测试接口的返回结果将在这里显示。'}/>
                    </div>
                </>
                }

            </div>
        );
    }
}

export default DataConfig;