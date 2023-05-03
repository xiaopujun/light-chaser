import React, {Component} from 'react';
import './BaseInfo.less';
import ConfigCard from "../../config-card/ConfigCard";
import ConfigItem from "../../config-item/ConfigItem";
import LcUnderLineInput from "../../lc-input/LcUnderLineInput";

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
                <ConfigCard title={'基础信息'}>
                    <ConfigItem title={'ID号'}>{id}</ConfigItem>
                    <ConfigItem title={'名称'}>
                        <LcUnderLineInput type={'text'}/>
                    </ConfigItem>
                    <ConfigItem title={'类型'}>
                        <div className={'item-value'}>{type}</div>
                    </ConfigItem>
                    <ConfigItem title={'描述'}>
                        <LcUnderLineInput type={'text'}/>
                    </ConfigItem>
                </ConfigCard>
            </div>
        )
    }
}

export default BaseInfo;