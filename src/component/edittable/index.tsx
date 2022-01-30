import React, {Component} from 'react';
import {Button, Input, Modal, Table} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import './index.less';

const {confirm} = Modal;

class EditTable extends Component<any> {

    state: any = {
        inputModule: {},
        data: [],
        activeId: -1,
        visible: false
    }

    /**
     * @description 构造器，将本组件绑定到父组件
     * @param props
     */
    constructor(props: any) {
        super(props);
        const {setContent} = this.props;
        setContent && setContent(this);
    }

    visibleChanged = () => {
        const {visible} = this.state;
        this.setState({visible: !visible})
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
        if (name && value && type) {
            data.push({...inputModule, ...{key: (data.length + 1) + ''}})
            //添加数据并清空输入状态
            this.setState({data: [...data], inputModule: {}})
        } else {
            Modal.error({
                title: "提示信息",
                content: `${name ? "" : "名称 "}${value ? "" : "数值 "}${type ? "" : '类型'}不能为空`,
            });
        }
    }

    deleteData = (index: any) => {
        return () => {
            confirm({
                title: '确认删除吗',
                icon: <ExclamationCircleOutlined/>,
                okText: 'yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => {
                    let {data} = this.state;
                    data.splice(index, 1);
                    this.setState({data: [...data]});
                },
            });
        }
    }

    editData = (data: any, index: number) => {
        return () => {
            this.setState({inputModule: data, activeId: index});
        }
    }

    updateData = () => {
        let {inputModule, data, activeId} = this.state;
        //校验inputModule数据
        let {name, value, type} = inputModule;
        if (name && value && type) {
            data[activeId] = inputModule;
            //添加数据并清空输入状态
            this.setState({data: [...data], inputModule: {}})
        } else {
            Modal.error({
                title: "提示信息",
                content: `${name ? "" : "名称 "}${value ? "" : "数值 "}${type ? "" : '类型'}不能为空`,
            });
        }
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
                render: (text: any, record: any, index: any) => (
                    <>
                        <b onClick={this.deleteData(index)}><DeleteOutlined
                            style={{color: '#f15252'}}/></b> &nbsp;&nbsp;
                        <b onClick={this.editData(record, index)}><EditOutlined
                            style={{color: 'rgba(102,199,46,0.96)'}}/></b>
                    </>
                ),
            },
        ];
        const {data, inputModule, visible} = this.state;
        const {name, value, type} = inputModule;
        return (
            <div>
                <Modal title="数据录入" visible={visible} width={800} footer={<Button>刷新数据</Button>} maskClosable={true}
                       onCancel={this.visibleChanged}>
                    <div className={'data-input'}>
                        <div className={'data-item'}>
                            <Input addonBefore="名称" value={name || ""} onInput={this.nameInput}/>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className={'data-item'}>
                            <Input addonBefore="数值" value={value || ""} onInput={this.valueInput}/>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className={'data-item'}>
                            <Input addonBefore="类型" value={type || ""} onInput={this.typeInput}/>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className={'data-item'}>
                            <Button onClick={this.addData}>add</Button>
                            <Button onClick={this.updateData}>update</Button>
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
