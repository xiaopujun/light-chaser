import React, {Component} from 'react';
import LCTextInput from "../../base/LCTextInput";

interface LcEmBaseInfoProps {
    baseInfo?: any;
    updateBaseInfo?: (data?: any) => void;
}

/**
 * lc组件基础信息
 */
class LcEmBaseInfo extends Component<LcEmBaseInfoProps> {

    changeName = (name: string) => {
        const {updateBaseInfo} = this.props;
        updateBaseInfo && updateBaseInfo({name})
    }

    changeDesc = (desc: string) => {
        const {updateBaseInfo} = this.props;
        updateBaseInfo && updateBaseInfo({desc})
    }

    render() {
        const {baseInfo: {id, name = '', desc = '', type}} = this.props;
        return (
            <div className={'lc-base-info'}>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>ID号：</label>
                    <label>{id}</label>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>名称：</label>
                    <LCTextInput onChange={this.changeName} value={name}/>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>描述：</label>
                    <LCTextInput onChange={this.changeDesc} value={desc}/>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>类型：</label>
                    <label>{type}</label>
                </div>
            </div>
        );
    }
}

export default LcEmBaseInfo;