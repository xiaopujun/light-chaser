import React, {Component} from 'react';
import {Button, Input, Modal, Space, Table, Tag} from "antd";
import './index.less';

class EditTable extends Component {

    state: any = {
        inputModule: {},
        data: []
    }

    nameInput = (e: any) => {
        let {inputModule} = this.state;
        inputModule = {...inputModule, ...{name: e.currentTarget.value}}
        this.setState({inputModule})
    }
    valueInput = (e: any) => {
        let {inputModule} = this.state;
        inputModule = {...inputModule, ...{value: e.currentTarget.value}}
        this.setState({inputModule})
    }
    typeInput = (e: any) => {
        let {inputModule} = this.state;
        inputModule = {...inputModule, ...{type: e.currentTarget.value}}
        this.setState({inputModule})
    }

    addData = () => {
        let {inputModule, data} = this.state;
        //校验inputModule数据
        let {name, value, type} = inputModule;
        name && value && type && data.push({...inputModule, ...{key: (data.length + 1) + ''}})
        this.setState({data: [...data]})
    }


    render() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                width: '25%'
            },
            {
                title: '数值',
                dataIndex: 'value',
                key: 'value',
                width: '25%'
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                width: '25%'
            },
            {
                title: '操作',
                key: 'operate',
                dataIndex: 'operate',
                width: '25%',
                render: (tags: any) => (
                    <>
                        <span>删除</span> &nbsp;&nbsp;
                        <span>编辑</span>
                    </>
                ),
            },
        ];

        const {data} = this.state;
        return (
            <div>
                <Modal title="数据录入" visible={true} width={800}>
                    <div className={'data-input'}>
                        <div className={'data-item'}>
                            <Input addonBefore="名称" onInput={this.nameInput}/>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className={'data-item'}>
                            <Input addonBefore="数值" onInput={this.valueInput}/>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className={'data-item'}>
                            <Input addonBefore="类型" onInput={this.typeInput}/>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className={'data-item'}>
                            <Button onClick={this.addData}>add</Button>
                            <Button>update</Button>
                        </div>
                    </div>
                    <br/>
                    <Table size="small" dataSource={data} columns={columns}/>
                </Modal>

            </div>
        );
    }
}

export default EditTable;