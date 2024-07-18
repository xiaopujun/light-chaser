import Dialog from "../dialog/Dialog.tsx";
import MonacoEditor, {MonacoEditorProps} from "./MonacoEditor.tsx";
import Button from "../button/Button.tsx";
import {useRef} from "react";

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
        <Dialog title={'代码编辑'} visible={true} width={800} height={600} onClose={onClose}
                className={'full-editor-dialog'}>
            <MonacoEditor onChange={_onChange} {...restProps} height={'92%'}/>
            <div className={'full-editor-footer'}>
                <Button onClick={_onSave}>保存</Button>
                <Button onClick={onClose}>取消</Button>
            </div>
        </Dialog>
    )
}