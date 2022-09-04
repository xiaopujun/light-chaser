import React, {Component} from 'react';
import {Button, Input, Modal, Table} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import './index.less';

const {confirm} = Modal;

interface EditTableProps {
    mode: number; //显示模式
    setContent?: (obj: any) => void;  //将子组件绑定到父组件
    updateElemChartSet?: (data: any) => void;
}

class EditTable extends Component<EditTableProps> {

    state: any = {
        inputModule: {},
        data: [],
        activeId: -1,
        visible: false,
        mode: 1,   // 展示模式 0：单值模式  1：分组模式  2：区间模式
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
    endValueInput = (e: any) => {
        let {inputModule} = this.state;
        inputModule = {...inputModule, ...{endValue: e.currentTarget.value}}
        this.setState({inputModule})
    }
    startValueInput = (e: any) => {
        let {inputModule} = this.state;
        inputModule = {...inputModule, ...{startValue: e.currentTarget.value}}
        this.setState({inputModule})
    }


    addData = () => {
        let {inputModule, data} = this.state;
        const {mode} = this.props;
        //校验inputModule数据
        let {name, value, type, endValue, startValue} = inputModule;
        switch (mode) {
            case 0:
                if (name && value) {
                    data.push({...inputModule, ...{key: (data.length + 1) + ''}})
                    //添加数据并清空输入状态
                    this.setState({data: [...data], inputModule: {}})
                } else {
                    Modal.error({
                        title: "提示信息",
                        content: `${name ? "" : "名称 "}${value ? "" : "数值 "}不能为空`,
                    });
                }
                break;
            case 1:
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
                break;
            case 2:
                if (name && startValue && endValue) {
                    data.push({
                        ...inputModule, ...{
                            key: (data.length + 1) + '',
                            intervalValue: [parseInt(startValue), parseInt(endValue)],
                            value: `${startValue}-${endValue}`,
                        }
                    })
                    this.setState({data: [...data], inputModule: {}})
                } else {
                    Modal.error({
                        title: "提示信息",
                        content: `${name ? "" : "名称 "}${startValue ? "" : "起始值 "}${endValue ? "" : "结束值 "}不能为空`,
                    });
                }
                break;
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
        const {mode} = this.props;
        //校验inputModule数据
        let {name, value, type, startValue, endValue} = inputModule;
        switch (mode) {
            case 0:
                if (name && value) {
                    data[activeId] = inputModule;
                    //添加数据并清空输入状态
                    this.setState({data: [...data], inputModule: {}})
                } else {
                    Modal.error({
                        title: "提示信息",
                        content: `${name ? "" : "名称 "}${value ? "" : "数值 "}不能为空`,
                    });
                }
                break;
            case 1:
                if (name && value && type) {
                    inputModule = {...inputModule, ...{}}
                    data[activeId] = inputModule;
                    //添加数据并清空输入状态
                    this.setState({data: [...data], inputModule: {}})
                } else {
                    Modal.error({
                        title: "提示信息",
                        content: `${name ? "" : "名称 "}${value ? "" : "数值 "}${type ? "" : '类型'}不能为空`,
                    });
                }
                break;
            case 2:
                if (name && startValue && endValue) {
                    inputModule['startValue'] = startValue;
                    inputModule['endValue'] = endValue;
                    inputModule['intervalValue'] = [parseInt(startValue), parseInt(endValue)];
                    inputModule['value'] = `${startValue}-${endValue}`;
                    data[activeId] = inputModule;
                    //添加数据并清空输入状态
                    this.setState({data: [...data], inputModule: {}})
                } else {
                    Modal.error({
                        title: "提示信息",
                        content: `${name ? "" : "名称 "}${value ? "" : "起始值 "}${endValue ? "" : "结束值 "}不能为空`,
                    });
                }
                break;

        }
    }

    flashData = () => {
        let {data} = this.state;
        let {mode} = this.props;
        const {updateElemChartSet} = this.props;
        data && data.map((item: any) => {
            //去除公共属性
            delete item.key;
            //根据展示模式处理对象属性
            switch (mode) {
                case 0:
                case 1:
                    item.value = parseFloat(item.value);
                    break;
                case 2:
                    delete item?.startValue;
                    delete item?.endValue;
                    item.value = item.intervalValue;
                    delete item?.intervalValue;
                    break;
            }
        })
        updateElemChartSet && updateElemChartSet({data: data});
        this.setState({visible: false, data: []})
    }

    generateEditTableByMode = () => {
        const {mode} = this.props;
        const {inputModule} = this.state;
        const {value, startValue, type, endValue} = inputModule;
        switch (mode) {
            case 0:
                return (
                    <>
                        <div className={'data-item'}>
                            <Input addonBefore="数值" onInput={this.valueInput}/>
                        </div>
                    </>);
            case 1:
                return (
                    <>
                        <div className={'data-item'}>
                            <Input addonBefore="数值" value={value || ""} onInput={this.valueInput}/>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className={'data-item'}>
                            <Input addonBefore="类型" value={type || ""} onInput={this.typeInput}/>
                        </div>
                    </>
                );
            case 2:
                return (<>
                    <div className={'data-item'}>
                        <Input addonBefore="数值" value={startValue || ""} onInput={this.startValueInput}/>
                    </div>
                    <div className={'data-item interval-input'} style={{width: '20%'}}>
                        <span>-</span>
                        <Input value={endValue || ""} onInput={this.endValueInput}/>
                    </div>
                </>);
        }
    }

    render() {
        let columns = [
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
        const {mode} = this.props;
        const {data, inputModule, visible, activeId} = this.state;
        let {name} = inputModule;

        //处理展示模式
        if (mode === 0 || mode === 2) {
            columns.splice(2, 1);
        }

        return (
            <div>
                <Modal title="数据录入" visible={visible} width={800}
                       footer={<Button onClick={this.flashData}>刷新数据</Button>} maskClosable={true}
                       onCancel={this.visibleChanged}>
                    <div className={'data-input'}>
                        <div className={'data-item'}>
                            <Input addonBefore="名称" value={name || ""} onInput={this.nameInput}/>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        {this.generateEditTableByMode()}
                        &nbsp;&nbsp;&nbsp;
                        <div className={'data-item'}>
                            <Button onClick={this.addData}>add</Button>
                            <Button disabled={activeId === -1} onClick={this.updateData}>update</Button>
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
