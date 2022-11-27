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
                labelName: 'ID号',
                compName: "",
                config: {value: id},
            },
            {
                labelName: '名称',
                compName: "LcTextInput",
                config: {
                    value: name,
                    onChange: this.changeName
                },
            },
            {
                labelName: '描述',
                compName: "LcTextInput",
                config: {
                    value: desc,
                    onChange: this.changeDesc
                },
            },
            {
                labelName: '类型',
                compName: "LcTextInput",
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