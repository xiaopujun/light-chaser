import {Button, Col, Drawer, Form, Input, Row, Space} from "antd";
import {IPermission} from "./PermissionManagementStore.ts";
import {useEffect, useRef} from "react";
import './PermissionPanel.less';


export interface UserPanelProps {
    width?: number;
    visible: boolean;
    onClose: () => void;
    onSubmitted: (data: IPermission) => void;
    data?: IPermission;
}

export default function PermissionPanel(props: UserPanelProps) {
    const {visible, onClose, data, onSubmitted, width = 700} = props;
    const avatarFileRef = useRef<File>();
    const [form] = Form.useForm();
    // const beforeUpload = (file: File) => {
    //     avatarFileRef.current = file;
    //     if (file.size > 1024 * 1024) {
    //         globalMessage.messageApi?.warning(`头像大小不能超过1M`);
    //         return false;
    //     }
    //     //将file转换为可直接访问的url
    //     const url = URL.createObjectURL(file);
    //     setAvatarUrl(url);
    //     //阻止默认上传
    //     return false;
    // }

    const submit = () => {
        form.validateFields().then((values) => {
            const {avatar, ...roleinfo} = values;
            let _data = {...roleinfo, avatarFile: avatarFileRef.current};
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
        <Drawer title="新建权限"
                className="role-panel"
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
                        <Form.Item name="name" label="权限名"
                                   rules={[{required: true, message: '请输入权限名'}]}>
                            <Input placeholder="请输入权限名"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="code" label="权限编码" rules={[{required: true, message: '请输入密码'}]}>
                            <Input placeholder="请输入权限编码（比如：admin、customer）"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="sourcePath"
                                   label="资源路径">
                            <Input placeholder="请输入资源路径"/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}