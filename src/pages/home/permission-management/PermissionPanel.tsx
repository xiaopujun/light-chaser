import {Button, Col, Drawer, Form, Input, Row, Space, TreeSelect} from "antd";
import permissionManagementStore, {IPermission} from "./PermissionManagementStore.ts";
import {useEffect, useRef} from "react";
import './PermissionPanel.less';

const {TextArea} = Input;


export interface UserPanelProps {
    width?: number;
    visible: boolean;
    onClose: () => void;
    permissionTreeData: any;
    onSubmitted: (data: IPermission) => void;
    data?: IPermission;
}

export default function PermissionPanel(props: UserPanelProps) {
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
        permissionManagementStore.doGetPermissionTreeData();
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
                        <Form.Item name="pid" label="上级权限(选填)">
                            <TreeSelect
                                style={{width: '100%'}}
                                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                placeholder="请选择权限"
                                treeDefaultExpandAll
                                showSearch
                                allowClear
                                treeLine={true}
                                treeData={permissionTreeData}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="name" label="权限名"
                                   rules={[{required: true, message: '请输入权限名'}]}>
                            <Input placeholder="请输入权限名"/>
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="code" label="权限编码" rules={[{required: true, message: '请输入编码'}]}>
                            <Input placeholder="请输入权限编码（比如：admin、customer）"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="resourcePath"
                                   label="资源路径">
                            <Input placeholder="请输入资源路径"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="des" label="备注">
                            <TextArea placeholder="请输入权限备注"/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}