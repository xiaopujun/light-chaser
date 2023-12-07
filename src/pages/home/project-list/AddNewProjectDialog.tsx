import React from 'react';
import './AddNewScreenDialog.less';
import Dialog from "../../../ui/dialog/Dialog";
import Button from "../../../ui/button/Button";
import {Grid} from "../../../ui/grid/Grid";
import Input from "../../../ui/input/Input";

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

export const AddNewProjectDialog: React.FC<AddNewScreenDialogProps> = (props) => {

    const projectInfo: INewProjectInfo = {
        name: '',
        des: '',
        width: 500,
        height: 300,
    }

    const onOk = (e: any) => {
        e.preventDefault();
        const {onOk} = props;
        onOk && onOk(projectInfo);
    }

    const onCancel = () => {
        const {onCancel} = props;
        onCancel && onCancel();
    }

    const {visible = false} = props;
    return (
        <Dialog title={'新建大屏'} visible={visible} className={'add-new-screen-dialog'} onClose={onCancel}>
            <form onSubmit={onOk}>
                <div className={'lc-add-new-screen'}>
                    <Grid gridGap={'15px'} columns={2}>
                        <Input label={'名称'} required={true} maxLength={20}
                               onChange={(name: string | number) => projectInfo.name = name as string}/>
                        <Input label={'描述'} maxLength={20}
                               onChange={(description: string | number) => projectInfo.des = description as string}/>
                        <Input label={'宽度'} type={'number'} min={300} required={true}
                               onChange={(width: string | number) => projectInfo.width = Number(width)}/>
                        <Input label={'高度'} type={'number'} min={300} required={true}
                               onChange={(height: number | string) => projectInfo.height = Number(height)}/>
                    </Grid>
                </div>
                <div className={'add-new-screen-explain'}>
                    <p>说明：</p>
                    <p>1、名称不超过20字，描述不超过60字</p>
                    <p>2、宽度必须&ge;500，高度必须&ge;300</p>
                </div>
                <div className={'add-new-screen-footer'}>
                    <Button type={"submit"}>创建</Button>
                    <Button onClick={onCancel}>取消</Button>
                </div>
            </form>
        </Dialog>
    );
}

export default AddNewProjectDialog;