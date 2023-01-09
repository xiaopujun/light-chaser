import React, {Component} from 'react';
import LCTextInput from "../../base/LCTextInput";
import './LcEmBaseInfo.less';

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
        const {baseInfo = {}} = this.props;
        const {id = -1, name = '', desc = '', type = ''} = baseInfo;
        return (
            <div className={'lc-base-info'}>
                <div className={'lc-cfg-item'}>
                    <div className={'item-name'}>ID号</div>
                    <div className={'item-value'}>{id}</div>
                </div>
                <div className={'lc-cfg-item'}>
                    <div className={'item-name'}>名称</div>
                    <div className={'item-value'}>
                        <LCTextInput width={'100%'} value={name} onChange={this.changeName}/>
                    </div>
                </div>
                <div className={'lc-cfg-item'}>
                    <div className={'item-name'}>描述</div>
                    <div className={'item-value'}>
                        <LCTextInput width={'100%'} value={desc} onChange={this.changeDesc}/>
                    </div>
                </div>
                <div className={'lc-cfg-item'}>
                    <div className={'item-name'}>类型</div>
                    <div className={'item-value'}>{type}</div>
                </div>
            </div>
        )
    }
}

export default LcEmBaseInfo;