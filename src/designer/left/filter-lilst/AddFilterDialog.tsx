import {observer} from "mobx-react";
import Dialog from "../../../json-schema/ui/dialog/Dialog.tsx";
import filterManager from "../../manager/FilterManager.ts";
import {Grid} from "../../../json-schema/ui/grid/Grid.tsx";
import Input from "../../../json-schema/ui/input/Input.tsx";
import MonacoEditor from "../../../json-schema/ui/code-editor/MonacoEditor.tsx";
import Button from "../../../json-schema/ui/button/Button.tsx";
import {useRef} from "react";

const AddFilterDialog = observer(() => {

    const {setVisibility, addFilter, updateFilter} = filterManager;

    const filterRef = useRef(filterManager.editFilter);

    const doSave = () => {
        if (filterRef.current.id)
            updateFilter(filterRef.current);
        else
            addFilter(filterRef.current);
        setVisibility(false);
    }

    return <Dialog title={'新增过滤器'} visible={true} width={600}
                   className={'add-filter-dialog'}
                   onClose={() => filterManager.setVisibility(false)}>
        <Grid>
            <Input label={'名称'} defaultValue={filterRef.current.name}
                   onChange={(data) => filterRef.current.name = data}/>
            <code className={'code-start'}>
                <span style={{color: '#569cd6'}}>function</span> filter<span style={{color: '#ffd700'}}>
                (</span><span style={{color: '#8c8c8c'}}>data</span><span style={{color: '#ffd700'}}>) {'{'}</span>
            </code>
            <MonacoEditor defaultValue={filterRef.current.func}
                          language={"javascript"}
                          onChange={(data) => filterRef.current.func = data!}
                          height={400}/>
            <code style={{color: '#ffd700'}}>{'}'}</code>
        </Grid>
        <div className={'add-filter-dialog-footer'}>
            <Button onClick={doSave}>保存</Button>&nbsp;&nbsp;
            <Button onClick={() => filterManager.setVisibility(false)}>取消</Button>
        </div>
    </Dialog>
})
export default AddFilterDialog;