import React, {Component} from 'react';
import './style/AddNewScreenDialog.less';
import Dialog from "../lib/lc-dialog/Dialog";
import ConfigItem from "../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../lib/lc-input/UnderLineInput";
import LcButton from "../lib/lc-button/LcButton";
import Select from "../lib/lc-select/Select";

export interface NewProjectInfoType {
    name: string;
    description?: string;
    width: number;
    height: number;
}

interface AddNewScreenDialogProps {
    onOk?: (data: NewProjectInfoType) => void;
    onCancel?: () => void;
    visible?: boolean;
}

class AddNewScreenDialog extends Component<AddNewScreenDialogProps> {

    projectInfo: NewProjectInfoType = {
        name: '',
        description: '',
        width: 500,
        height: 300
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
                        <ConfigItem title={'名称'}>
                            <UnderLineInput required={true} maxLength={20}
                                            onChange={(name: string) => this.projectInfo.name = name}/>
                        </ConfigItem>
                        <ConfigItem title={'描述'}>
                            <UnderLineInput maxLength={60}
                                            onChange={(description: string) => this.projectInfo.description = description}/>
                        </ConfigItem>
                        <ConfigItem title={'宽度'}>
                            <UnderLineInput type={'number'} min={500} required={true}
                                            onChange={(width: number) => this.projectInfo.width = width}/>
                        </ConfigItem>
                        <ConfigItem title={'高度'}>
                            <UnderLineInput type={'number'} min={300} required={true}
                                            onChange={(height: number) => this.projectInfo.height = height}/>
                        </ConfigItem>
                        <ConfigItem title={'存储'}>
                            <Select defaultValue={'1'} options={[{value: '1', label: '本地存储'}]}/>
                        </ConfigItem>
                    </div>
                    <div className={'add-new-screen-explain'}>
                        <p>说明：</p>
                        <p>1、名称不超过20字，描述不超过60字</p>
                        <p>2、宽度必须&ge;500，高度必须&ge;300</p>
                    </div>
                    <div className={'add-new-screen-footer'}>
                        <LcButton type={"submit"}>保存</LcButton>
                        <LcButton onClick={this.onCancel}>取消</LcButton>
                    </div>
                </form>
            </Dialog>
        );
    }
}

export default AddNewScreenDialog;