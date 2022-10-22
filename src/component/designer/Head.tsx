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
        const {LCDesignerStore, updateLCDesignerStore, location} = this.props;
        let {id = -1, globalSet} = LCDesignerStore;
        let {elemCount} = globalSet;
        let lightChaser = window.localStorage.lightChaser;
        let config = {
            id,
            globalSet,
            "chartConfigMap": mapToJsonStr(this.props.LCDesignerStore.chartConfigMap),
            "layoutConfig": JSON.stringify(this.props.LCDesignerStore.layoutConfig),
            screenHeight: this.props.LCDesignerStore.screenHeight,
            screenWidth: this.props.LCDesignerStore.screenWidth,
            screenName: this.props.LCDesignerStore.screenName
        }
        if (id == -1) {
            //新增
            id++;
            config = {...config, ...{id}};
            if (lightChaser == undefined) {
                //无数据，需要初始化
                lightChaser = new Array(config);
            } else {
                //已有数据
                let oldLightChaser = JSON.parse(lightChaser);
                oldLightChaser.push(config);
            }
            //保存到本地存储
            localStorage.setItem("lightChaser", JSON.stringify(lightChaser));
            //更新id
            updateLCDesignerStore({id});
            //修改路由参数，新增变为更新
            const {action} = location.state;
            if (action == 'add') {
                this.props.history.replace("/designer", {
                    ...location.state, ...{
                        action: 'update',
                        id,
                        globalSet,
                    }
                });
            }
        } else {
            //更新
            let oldLightChaser = JSON.parse(lightChaser);
            for (let i = 0; i < oldLightChaser.length; i++) {
                if (oldLightChaser[i].id == id) {
                    oldLightChaser[i] = config;
                    break;
                }
            }
            localStorage.setItem("lightChaser", JSON.stringify(oldLightChaser));
        }
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
