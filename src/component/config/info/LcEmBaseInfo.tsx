import React, {Component} from 'react';
import CfgGroup from "../base/CfgGroup";

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

    generateConfigData = () => {
        const {baseInfo: {id, name = '', desc = '', type}} = this.props;
        return [
            {
                label: 'ID号',
                comp: "",
                config: {value: id},
            },
            {
                label: '名称',
                comp: "LcTextInput",
                config: {
                    value: name,
                    onChange: this.changeName
                },
            },
            {
                label: '描述',
                comp: "LcTextInput",
                config: {
                    value: desc,
                    onChange: this.changeDesc
                },
            },
            {
                label: '类型',
                comp: "LcTextInput",
                config: {value: type},
            },
        ]
    }

    render() {
        const configData = this.generateConfigData();
        return <CfgGroup items={configData}/>
    }
}

export default LcEmBaseInfo;