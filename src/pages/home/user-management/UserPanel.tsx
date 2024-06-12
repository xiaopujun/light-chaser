import {Button, Col, Drawer, Form, Input, Select, Row, Space} from "antd";
import {IUser, Option} from "./UserManagementStore.ts";
import {useEffect, useRef} from "react";
import './UserPanel.less';


export interface UserPanelProps {
    width?: number;
    visible: boolean;
    onClose: () => void;
    onSubmitted: (data: IUser) => void;
    roleOptions: Option[];
    data?: IUser;
}

export default function UserPanel(props: UserPanelProps) {
    const {visible, onClose, data, onSubmitted, roleOptions, width = 700} = props;
    const avatarFileRef = useRef<File>();
    const [form] = Form.useForm();

    const submit = () => {
        form.validateFields().then((values) => {
            const {avatar, ...userinfo} = values;
            let _data;
            if (data?.avatar && !avatarFileRef.current) {
                _data = {...userinfo};
            } else {
                _data = {...userinfo, avatarFile: avatarFileRef.current};
            }
            onSubmitted(_data);
        }).catch((error) => {
            console.error(error);
        })
    }

    const _onClose = () => {
        form.resetFields();
        onClose();
    }

    useEffect(() => {
        if (visible) {
            form.setFieldsValue(data);
        }
    }, [visible]);

    return (
        <Drawer title="新建用户"
                className="user-panel"
                placement="right"
                closable={true}
                width={width}
                onClose={_onClose}
                open={visible}
                getContainer={false}
                extra={
                    <Space>
                        <Button onClick={_onClose}>取消</Button>
                        <Button type="primary" onClick={submit}>提交</Button>
                    </Space>
                }>
            <Form layout="vertical" requiredMark={true} form={form}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item hidden={true} name="id">
                            <Input/>
                        </Form.Item>
                        <Form.Item name="username" label="用户名"
                                   rules={[{required: true, message: '请输入用户名'}]}>
                            <Input placeholder="请输入用户名（用于登录）"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="name"
                                   label="姓名"
                                   rules={[{required: true, message: '请输入姓名（用于显示）'}]}>
                            <Input placeholder="请输入姓名"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="password" label="密码" rules={[{required: true, message: '请输入密码'}]}>
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
                        <Form.Item name="roleIds" label="角色">
                            <Select mode="multiple"
                                    allowClear
                                    placeholder="请选择角色"
                                    options={roleOptions}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}