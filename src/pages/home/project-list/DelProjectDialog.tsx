import {memo} from "react";
import {Modal, Button} from "antd";

interface DelDialogProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const DelProjectDialog = memo((props: DelDialogProps) => {

    const {onOk, onCancel, visible} = props;

    return (
        <Modal title={'删除确认'} open={visible} onCancel={onCancel} onOk={onOk}
               width={350}
               footer={[
                   <Button type="primary" onClick={onOk}>确认</Button>,
                   <Button onClick={onCancel}>取消</Button>
               ]}>
            <div style={{color: '#aeaeae', padding: 10}}>确定要删除该项目吗？</div>
        </Modal>
    )
})

export default DelProjectDialog