/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {Button, Col, Drawer, Form, Input, Row, Select, Space} from "antd";
import {useEffect} from "react";
import {IDataSource} from "./DataSourceStore.ts";

const {TextArea} = Input;

export interface UserPanelProps {
    title?: string;
    width?: number;
    visible: boolean;
    onClose: () => void;
    onSubmitted: (data: IDataSource) => Promise<void>;
    data?: IDataSource;
}

export default function DataSourcePanel(props: UserPanelProps) {
    const {visible, onClose, data, onSubmitted, title, width = 700} = props;
    const [form] = Form.useForm();

    const submit = () => {
        form.validateFields().then(async (values) => {
            try {
                await onSubmitted(values);
            } catch (error) {
                console.error('提交数据源失败:', error);
            }
        }).catch((error) => {
            console.error('表单验证失败:', error);
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
        <Drawer title={title}
                className="datasource-panel"
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
                        <Form.Item name="name" label="名称"
                                   rules={[{required: true, message: '请输入数据库名称'}]}>
                            <Input placeholder="请输入数据库名称"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="type" label="类型"
                                   rules={[{required: true, message: '请选择数据类型'}]}>
                            <Select allowClear
                                    placeholder="请选择数据类型"
                                    options={[
                                        {label: 'SQLite', value: '0'},
                                        {label: 'MySQL', value: '1'},
                                        {label: 'PostgresSQL', value: '2'},
                                        {label: 'Oracle', value: '3'},
                                        {label: 'SQL Server', value: '4'},
                                    ]}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="username" label="用户名">
                            <Input placeholder="请输入用户名"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="password" label="密码">
                            <Input type={"password"} placeholder=" 请输入密码"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="url" label="链接地址">
                            <Input placeholder="请输入链接地址"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="des" label="描述信息">
                            <TextArea placeholder="请输入描述信息"/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}