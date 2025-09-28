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
import React, {MouseEvent} from 'react';
import './NewProjectDialog.less';
import {Button, Col, Divider, Form, Input, InputNumber, Modal, Row} from "antd";

export interface INewProjectInfo {
    name: string;
    des?: string;
    width: number;
    height: number;
}

interface AddNewScreenDialogProps {
    onOk?: (data: INewProjectInfo) => void;
    onCancel?: () => void;
    visible?: boolean;
}

export const NewProjectDialog: React.FC<AddNewScreenDialogProps> = (props) => {

    const [form] = Form.useForm();
    const projectInfo: INewProjectInfo = {
        name: '未命名项目',
        des: '',
        width: 1920,
        height: 1080,
    }

    const onOk = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const {onOk} = props;
        const values = form.getFieldsValue();
        onOk && onOk({...projectInfo, ...values});
    }

    const onCancel = () => {
        const {onCancel} = props;
        form.resetFields();
        onCancel && onCancel();
    }

    const {visible = false} = props;
    return (
        <Modal title={<span className="dialog-title">新建大屏</span>}
               open={visible}
               className={'new-project-dialog'}
               onCancel={onCancel}
               footer={
                   <div className="dialog-footer">
                       <Button key={'cancel'} className="cancel-btn" onClick={onCancel}>取消</Button>
                       <Button key={'ok'} type={"primary"} className="create-btn" onClick={onOk}>创建项目</Button>
                   </div>
               }>
            <div className="dialog-content">
                <Form form={form} initialValues={projectInfo} layout="vertical">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label={<span className="form-label">名称</span>} name="name">
                                <Input placeholder="请输入项目名称" maxLength={20} className="project-input"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<span className="form-label">描述</span>} name="des">
                                <Input placeholder="请输入项目描述" maxLength={60} className="project-input"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<span className="form-label">宽度</span>} name="width" rules={[{required: true, message: '宽度必须≥500'}]}>
                                <InputNumber min={500} style={{width: '100%'}} className="project-input"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<span className="form-label">高度</span>} name="height" rules={[{required: true, message: '高度必须≥300'}]}>
                                <InputNumber min={300} style={{width: '100%'}} className="project-input"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Divider className="divider"/>
                <div className="dialog-tips">
                    <span className="tip-icon">i</span>
                    <span className="tip-text">名称不超过20字，描述不超过60字。宽度必须≥500，高度必须≥300</span>
                </div>
            </div>
        </Modal>
    );
}

export default NewProjectDialog;