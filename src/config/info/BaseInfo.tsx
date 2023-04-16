import React, {Component} from 'react';
import LCTextInput from "../../lib/LCTextInput";
import LcConfigItem from "../../lib/LcConfigItem";
import CfgItemBorder from "../../lib/CfgItemBorder";
import './BaseInfo.less';

interface LcEmBaseInfoProps {
    baseInfo?: any;
    updateBaseInfo?: (data?: any) => void;
}

/**
 * lc组件基础信息
 */
class BaseInfo extends Component<LcEmBaseInfoProps> {

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
                <LcConfigItem title={'ID号'}>
                    <div className={'item-value'}>{id}</div>
                </LcConfigItem>
                <LcConfigItem title={'名称'}>
                    <CfgItemBorder width={'50%'}>
                        <LCTextInput style={{width: '100%', textAlign: 'right'}} defaultValue={name}/>
                    </CfgItemBorder>
                </LcConfigItem>
                <LcConfigItem title={'描述'}>
                    <CfgItemBorder width={'50%'}>
                        <LCTextInput style={{width: '100%', textAlign: 'right'}} defaultValue={desc}/>
                    </CfgItemBorder>
                </LcConfigItem>
                <LcConfigItem title={'类型'}>
                    <div className={'item-value'}>{type}</div>
                </LcConfigItem>
            </div>
        )
    }
}

export default BaseInfo;