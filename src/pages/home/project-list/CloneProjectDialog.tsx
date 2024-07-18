import React from "react";
import {Modal, Button} from "antd";

interface CloneDialogProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const CloneProjectDialog = (props: CloneDialogProps) => {

    const {onOk, onCancel, visible} = props;


    const onClick = (event: React.MouseEvent): void => {
        event.preventDefault();
        onOk();
    }

    return (
        <Modal title={'克隆项目'} open={visible} onCancel={onCancel} onOk={onClick}
               width={350}
               footer={[
                   <Button type="primary" onClick={onClick}>确认</Button>,
                <Button onClick={onCancel}>取消</Button>
               ]}>
            <div style={{color: '#a7a7a7', padding: 10}}>确认克隆项目吗？</div>
        </Modal>
    )
}

export default CloneProjectDialog;