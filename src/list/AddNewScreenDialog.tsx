import React, {Component} from 'react';
import './style/AddNewScreenDialog.less';
import Dialog from "../lib/lc-dialog/Dialog";
import ConfigItem from "../lib/config-item/ConfigItem";
import UnderLineInput from "../lib/lc-input/UnderLineInput";
import LcButton from "../lib/lc-button/LcButton";

interface AddNewScreenDialogProps {
    onOk?: () => void;
    onCancel?: () => void;
    visible?: boolean;
    onChange?: (data: { [k: string]: [v: any] }) => void;
}

class AddNewScreenDialog extends Component<AddNewScreenDialogProps> {

    onOk = (e: any) => {
        e.preventDefault();
        const {onOk} = this.props;
        onOk && onOk();
    }

    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel();
    }

    inputOnChanged = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange({[e.target.name]: e.target.value});
    }

    render() {
        const {visible = false} = this.props;
        return (
            <Dialog title={'新建大屏'} visible={visible} className={'add-new-screen-dialog'} onClose={this.onCancel}>
                <form onSubmit={this.onOk}>
                    <div className={'lc-add-new-screen'}>
                        <ConfigItem title={'名称'}>
                            <UnderLineInput required={true} maxLength={20}/>
                        </ConfigItem>
                        <ConfigItem title={'描述'}>
                            <UnderLineInput maxLength={60}/>
                        </ConfigItem>
                        <ConfigItem title={'宽度'}>
                            <UnderLineInput type={'number'} min={500} required={true}/>
                        </ConfigItem>
                        <ConfigItem title={'高度'}>
                            <UnderLineInput type={'number'} min={300} required={true}/>
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