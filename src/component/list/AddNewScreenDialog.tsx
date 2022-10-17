import React, {Component} from 'react';
import {Input, Modal} from "antd";
import './style/AddNewScreenDialog.less';

interface AddNewScreenDialogProps {
    onOk?: () => void;
    onCancel?: () => void;
    visible?: boolean;
    onChange?: (data: { [k: string]: [v: any] }) => void;
}

class AddNewScreenDialog extends Component<AddNewScreenDialogProps> {

    onOk = () => {
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
        const {visible} = this.props;
        return (
            <Modal title="新建大屏" visible={visible} onOk={this.onOk} destroyOnClose={true}
                   onCancel={this.onCancel} className={'lc-new-screen-dialog'}>
                <div>
                    <div className={'lc-new-screen-item'}>
                        <div>名称</div>
                        <Input required={true} name={'screenName'} onChange={this.inputOnChanged}/>
                    </div>
                    <div className={'lc-new-screen-item'}>
                        <div>宽度</div>
                        <Input required={true} type={"number"} name={'screenWidth'} onChange={this.inputOnChanged}/>
                    </div>
                    <div className={'lc-new-screen-item'}>
                        <div>高度</div>
                        <Input type={'number'} name={'screenHeight'} onChange={this.inputOnChanged}/>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default AddNewScreenDialog;