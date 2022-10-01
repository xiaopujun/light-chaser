import React, {Component} from 'react';
import './index.less';
import {
    EyeOutlined,
    GithubOutlined,
    GoogleOutlined,
    PhoneOutlined, SaveOutlined,
    SettingOutlined,
    SnippetsOutlined
} from "@ant-design/icons";

export default class DesignerHeader extends Component<any> {
    save = (e: any) => {
        const {chartConfigMap, layoutConfig} = this.props.LCDesignerStore;
        window.localStorage.setItem("chartConfigMap", JSON.stringify(chartConfigMap));
        window.localStorage.setItem("layoutConfig", JSON.stringify(layoutConfig));
        alert("save success")
    }

    render() {
        return (
            <div className={'designer-header'}>
                <div className={'header-left'}>
                    <div className={'header-title'}>LIGHT CHASER 数据大屏设计器</div>
                </div>
                <div className={'header-right'}>
                    <div className={'right-item'} onClick={this.save}><SaveOutlined/>&nbsp;保存</div>
                    <div className={'right-item'}><EyeOutlined/>&nbsp;预览</div>
                    <div className={'right-item'}><SnippetsOutlined/>&nbsp;文档</div>
                    <div className={'right-item'}><SettingOutlined/>&nbsp;全局设置</div>
                    <div className={'right-item'}><PhoneOutlined/>&nbsp;联系我</div>
                    <div className={'right-item'}><GithubOutlined/>&nbsp;github</div>
                    <div className={'right-item'}><GoogleOutlined/>&nbsp;gitee</div>
                </div>
            </div>
        );
    }
}
