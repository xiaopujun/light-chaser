import MonacoEditor, {MonacoEditorProps} from "./MonacoEditor.tsx";
import {useRef} from "react";
import {Button, Modal} from "antd";

export interface FullEditorProps extends MonacoEditorProps {
    onClose?: () => void;
}

export default function FullEditor(props: FullEditorProps) {
    const {onClose, onChange, ...restProps} = props;
    const valueRef = useRef("");

    const _onChange = (value?: string) => {
        valueRef.current = value || "";
    }

    const _onSave = () => {
        onChange && onChange(valueRef.current);
        onClose && onClose();
    }

    return (
        <Modal title={'代码编辑'} open={true} width={1000} onCancel={onClose}
               footer={[
                   <Button style={{width: 70, height: 30}} onClick={_onSave} type="primary">保存</Button>,
                   <Button style={{width: 70, height: 30}} onClick={onClose}>取消</Button>
               ]}>
            <MonacoEditor onChange={_onChange} {...restProps} height={600}/>
        </Modal>
    )
}