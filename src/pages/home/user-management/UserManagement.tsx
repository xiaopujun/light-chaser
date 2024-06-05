import {ColumnsType} from "antd/es/table";
import {DataSourceConfigType} from "../datasource/edit/EditDataSourceDialog.tsx";
import dataSourceStore from "../datasource/DataSourceStore.ts";
import {Button, Col, Drawer, Form, Input, Row, Select, Space, Table, Upload} from "antd";
import './UserManagement.less';
import {Add, Delete, UploadOne, Warehousing} from "@icon-park/react";
import {observer} from "mobx-react";
import userManagementStore, {IUser} from "./UserManagementStore.ts";
import {useEffect, useState} from "react";

const {Search} = Input;
const {Option} = Select;

const columns: ColumnsType<object> = [
    {
        title: '序号',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: '账户',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '操作',
        key: 'operation',
        render: (record: DataSourceConfigType) => {
            const {id} = record;
            return <div>
                <a onClick={() => dataSourceStore.openDataSourceEditor(id!)}>编辑</a>&nbsp;&nbsp;
                <a onClick={() => dataSourceStore.deleteDataSource(id!)}>删除</a>&nbsp;&nbsp;
            </div>
        },
    }
];

const UserManagement = () => {
    const {userPageData} = userManagementStore;
    const {current, records, size, total} = userPageData;
    const [addVisible, setAddVisible] = useState(false);

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IUser[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: IUser) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    useEffect(() => {
        userManagementStore.getUserList();
    }, []);

    return (
        <div className="user-management">
            <div className="user-management-header">
                <Search placeholder="请输入用户名" size={"middle"} style={{width: 350}}/>
                <Button size={'middle'} type={"primary"} onClick={() => setAddVisible(true)}><Add/>新增</Button>
                <Button size={'middle'} type={"primary"}><Warehousing/>导入</Button>
                <Button size={'middle'} danger={true} type={"primary"}><Delete/>删除</Button>
            </div>
            <div className="user-management-body">
                <Table dataSource={records} columns={columns}
                       rowSelection={{
                           type: 'checkbox',
                           ...rowSelection,
                       }}
                       onChange={(pagination) => dataSourceStore.changeCurrentPage(pagination.current!)}
                       pagination={{
                           showTotal: () => `共${total}条`,
                           pageSize: size,
                           current: current,
                           total: total,
                       }}/>

            </div>
            <Drawer title="新建用户"
                    placement="right"
                    closable={true}
                    width={700}
                    onClose={() => setAddVisible(false)}
                    open={addVisible}
                    getContainer={false}
                    extra={
                        <Space>
                            <Button onClick={() => setAddVisible(false)}>取消</Button>
                            <Button type="primary">提交</Button>
                        </Space>
                    }>
                <Form layout="vertical" requiredMark={false}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="username" label="用户名"
                                       rules={[{required: true, message: '请输入用户名'}]}>
                                <Input placeholder="请输入用户名（用于登录）"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="url"
                                       label="姓名"
                                       rules={[{required: true, message: '请输入姓名（用于显示）'}]}>
                                <Input placeholder="请输入姓名"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="password" label="密码">
                                <Input type="password" placeholder="请输入密码"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="phone" label="电话">
                                <Input placeholder="请输入电话"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="email" label="邮箱">
                                <Input placeholder="请输入邮箱"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="sex" label="性别">
                                <Select placeholder="请选择性别">
                                    <Option value="man">男</Option>
                                    <Option value="woman">女</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="avatar" label="头像">
                                <Upload action="/upload.do" listType="picture-card" showUploadList={false}>
                                    <UploadOne size={20}/>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    );
}

export default observer(UserManagement);