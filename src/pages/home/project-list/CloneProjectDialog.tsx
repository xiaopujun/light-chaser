import React from "react";
import Dialog from "../../../json-schema/ui/dialog/Dialog.tsx";
import Button from "../../../json-schema/ui/button/Button.tsx";

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
        <Dialog title={'克隆项目'} visible={visible} onClose={onCancel}>
            <div style={{color: '#a7a7a7', padding: 10}}>确认复制吗？</div>
            <div className={'del-pro-confirm'} style={{
                display: 'flex',
                justifyContent: 'flex-end',
                borderTop: '2px solid #272b34',
                paddingTop: 10
            }}>
                <Button onClick={onClick}>确认</Button> &nbsp;&nbsp;
                <Button onClick={onCancel}>取消</Button>
            </div>
        </Dialog>
    )
}

export default CloneProjectDialog;