import React, {Component} from 'react';
import LCTextInput from "../../base/LCTextInput";

interface LcEmBaseInfoProps {
    id?: number | string;
    name?: string;
    desc?: string;
    type?: string;
}


/**
 * lc组件基础信息
 */
class LcEmBaseInfo extends Component<LcEmBaseInfoProps> {
    render() {
        const {id, name, desc, type} = this.props;
        return (
            <div className={'lc-base-info'}>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>ID号：</label>
                    <label>{id}</label>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>名称：</label>
                    <LCTextInput defaultValue={name}/>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>描述：</label>
                    <LCTextInput defaultValue={desc}/>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>类型：</label>
                    <LCTextInput defaultValue={type}/>
                </div>
            </div>
        );
    }
}

export default LcEmBaseInfo;