import {Button, Col, Drawer, Form, Input, Row, Space, TreeSelect} from "antd";
import {IRole} from "./RoleManagementStore.ts";
import {useEffect, useRef} from "react";
import './RolePanel.less';

const {TextArea} = Input;
const {SHOW_ALL} = TreeSelect;

export interface UserPanelProps {
    width?: number;
    visible: boolean;
    onClose: () => void;
    permissionTreeData: any;
    onSubmitted: (data: IRole) => void;
    data?: IRole;
}

export default function RolePanel(props: UserPanelProps) {
    const {visible, onClose, data, onSubmitted, permissionTreeData, width = 700} = props;
    const avatarFileRef = useRef<File>();
    const [form] = Form.useForm();

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
        <Drawer title="新建角色"
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
                        <Form.Item name="name" label="角色名"
                                   rules={[{required: true, message: '请输入角色名'}]}>
                            <Input placeholder="请输入角色名（用于登录）"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="code" label="角色编码" rules={[{required: true, message: '请输入密码'}]}>
                            <Input placeholder="请输入角色编码（比如：admin、customer）"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="des"
                                   label="描述">
                            <TextArea placeholder="请输入描述"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="permissionIds"
                                   label="权限控制">
                            <TreeSelect
                                style={{width: '100%'}}
                                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                placeholder="请选择权限"
                                treeDefaultExpandAll
                                treeCheckable={true}
                                showCheckedStrategy={SHOW_ALL}
                                treeLine={true}
                                treeData={permissionTreeData}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}