import {Component} from 'react';
import './style/AddNewScreenDialog.less';
import Dialog from "../../ui/dialog/Dialog";
import Button from "../../ui/button/Button";
import {Grid} from "../../ui/grid/Grid";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import {SaveType} from "../../designer/DesignerType";

export interface NewProjectInfoType {
    name: string;
    description?: string;
    width: number;
    height: number;
    saveType: SaveType;
}

interface AddNewScreenDialogProps {
    onOk?: (data: NewProjectInfoType) => void;
    onCancel?: () => void;
    visible?: boolean;
}

class AddNewProjectDialog extends Component<AddNewScreenDialogProps> {

    projectInfo: NewProjectInfoType = {
        name: '',
        description: '',
        width: 500,
        height: 300,
        saveType: SaveType.LOCAL
    }

    onOk = (e: any) => {
        e.preventDefault();
        const {onOk} = this.props;
        onOk && onOk(this.projectInfo);
    }

    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel();
    }

    render() {
        const {visible = false} = this.props;
        return (
            <Dialog title={'新建大屏'} visible={visible} className={'add-new-screen-dialog'} onClose={this.onCancel}>
                <form onSubmit={this.onOk}>
                    <div className={'lc-add-new-screen'}>
                        <Grid gridGap={'15px'} columns={2}>
                            <Input label={'名称'} required={true} maxLength={20}
                                   onChange={(name: string | number) => this.projectInfo.name = name as string}/>
                            <Input label={'描述'} maxLength={20}
                                   onChange={(description: string | number) => this.projectInfo.description = description as string}/>
                            <Input label={'宽度'} type={'number'} min={300} required={true}
                                   onChange={(width: string | number) => this.projectInfo.width = Number(width)}/>
                            <Input label={'高度'} type={'number'} min={300} required={true}
                                   onChange={(height: number | string) => this.projectInfo.height = Number(height)}/>
                            <Select label={'存储'} options={[
                                {value: '0', label: '本地存储'},
                                {value: '1', label: '服务器存储'}
                            ]} defaultValue={SaveType.LOCAL}
                                    onChange={(value: string) => this.projectInfo.saveType = value as SaveType}/>
                        </Grid>
                    </div>
                    <div className={'add-new-screen-explain'}>
                        <p>说明：</p>
                        <p>1、名称不超过20字，描述不超过60字</p>
                        <p>2、宽度必须&ge;500，高度必须&ge;300</p>
                    </div>
                    <div className={'add-new-screen-footer'}>
                        <Button type={"submit"}>保存</Button>
                        <Button onClick={this.onCancel}>取消</Button>
                    </div>
                </form>
            </Dialog>
        );
    }
}

export default AddNewProjectDialog;