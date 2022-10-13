import React, {Component} from 'react';
import {Input, Modal} from "antd";
import './style/AddNewScreenDialog.less';

interface AddNewScreenDialogProps {
    onOk?: () => void;
    onCancel?: () => void;
    visible?: boolean;
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


    render() {
        const {visible} = this.props;
        return (
            <Modal title="新建大屏" visible={visible} onOk={this.onOk}
                   onCancel={this.onCancel} className={'lc-new-screen-dialog'}>
                <div>
                    <div className={'lc-new-screen-item'}>
                        <div>名称</div>
                        <Input placeholder={'请输出大屏名称'}/>
                    </div>
                    <div className={'lc-new-screen-item'}>
                        <div>宽度</div>
                        <Input/>
                    </div>
                    <div className={'lc-new-screen-item'}>
                        <div>高度</div>
                        <Input/>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default AddNewScreenDialog;