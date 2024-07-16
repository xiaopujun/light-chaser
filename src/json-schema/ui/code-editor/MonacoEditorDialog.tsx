import {observer} from "mobx-react";
import Dialog from "../dialog/Dialog.tsx";
import {Grid} from "../grid/Grid.tsx";
import MonacoEditor from "./MonacoEditor.tsx";
import Button from "../button/Button.tsx";
import {useRef} from "react";
import monacoEditorDialogManager from "./MonacoEditorDialogManager.ts";

const MonacoEditorDialog = observer(() => {

    const { handleClose, setVisibility} = monacoEditorDialogManager;

    const propsRef = useRef(monacoEditorDialogManager.props);

    const onClose = () => {
        handleClose();
        setVisibility(false);
    }

    const onChange = (data:string | undefined) => {
        propsRef.current.value = data;
        propsRef.current.onChange && propsRef.current.onChange(data);
    }

    return <Dialog title={'代码编辑'} visible={true} width={800}
                   className={'add-filter-dialog'}
                   onClose={onClose}>
        <Grid>
            <MonacoEditor defaultValue={propsRef.current.defaultValue}
                          value={propsRef.current.value}
                          language={propsRef.current.language}
                          showExtend={propsRef.current.showExtend}
                          onChange={onChange}
                          height={600}/>
        </Grid>
        <div className={'add-filter-dialog-footer'}>
            <Button onClick={onClose}>关闭</Button>
        </div>
    </Dialog>
})
export default MonacoEditorDialog;