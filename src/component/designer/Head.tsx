import React, {Component} from 'react';
import './style/Head.less';
import {
    EyeOutlined,
    GithubOutlined,
    GoogleOutlined,
    PhoneOutlined,
    SaveOutlined,
    SettingOutlined,
    SnippetsOutlined
} from "@ant-design/icons";
import {withRouter} from "react-router-dom";
import {mapToJsonStr} from "../../utils/DateUtil";

class DesignerHeader extends Component<any> {


    save = (e: any) => {
        let localStorage = window.localStorage;
        let id = 0, lightChaser = [];
        if ('lightChaser' in localStorage) {
            let tempLC = JSON.parse(localStorage.lightChaser);
            id = tempLC.length + 1;
            lightChaser = tempLC;
        }
        const {chartConfigMap, layoutConfig, screenName, screenWidth, screenHeight} = this.props.LCDesignerStore;
        let config = {
            id,
            "chartConfigMap": mapToJsonStr(chartConfigMap),
            "layoutConfig": JSON.stringify(layoutConfig),
            screenHeight,
            screenWidth,
            screenName
        }
        lightChaser.push(config);
        localStorage.setItem("lightChaser", JSON.stringify(lightChaser));
        alert("save success")
    }

    preview = () => {
        this.props.history.push('/preview');
    }

    render() {
        return (
            <div className={'designer-header'}>
                <div className={'header-left'}>
                    <div className={'header-title'}>LIGHT CHASER 数据大屏设计器</div>
                </div>
                <div className={'header-right'}>
                    <div className={'right-item'} onClick={this.save}><SaveOutlined/>&nbsp;保存</div>
                    <div className={'right-item'} onClick={this.preview}><EyeOutlined/>&nbsp;预览</div>
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

export default withRouter(DesignerHeader);
