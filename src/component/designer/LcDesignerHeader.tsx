import React, {Component} from 'react';
import './style/Head.less';
import {
    EyeOutlined,
    GithubOutlined,
    GoogleOutlined,
    PhoneOutlined,
    QuestionCircleOutlined,
    SaveOutlined,
    SettingFilled,
    SkinFilled,
    SnippetsOutlined
} from "@ant-design/icons";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {localSave, localUpdate} from "../../local/LocalStorageUtil";
import {LCDesignerProps} from "../../types/LcDesignerType";
import lcDesignerContentStore from './store/LcDesignerContentStore';

interface LcDesignerHeaderProps extends RouteComponentProps {
    LCDesignerStore: LCDesignerProps;
    updateDesignerStore?: (data: any) => void;
}

class LcDesignerHeader extends Component<LcDesignerHeaderProps | any> {

    updateRouteState = (id: number) => {
        const {location} = this.props;
        const {action} = location.state;
        let {projectConfig} = lcDesignerContentStore!;
        if (action === 'create') {
            this.props.history.replace("/designer", {
                ...location.state, ...{
                    action: 'edit',
                    id,
                    projectConfig,
                }
            });
        }
    }

    doSave = () => {
        let {id = -1, projectConfig, setId} = lcDesignerContentStore;
        const {saveType} = projectConfig;
        if (saveType === 'local') {
            if (id === -1) {
                localSave(lcDesignerContentStore).then((id: number | any) => {
                    if (id) {
                        //更新id
                        setId && setId(id);
                        //修改路由参数，新增变为更新
                        this.updateRouteState(id);
                    }
                });
            } else {
                localUpdate(lcDesignerContentStore);
            }
            alert("save success");
        }
    }

    doPreview = () => {
        const {LCDesignerStore} = this.props;
        this.props.history.push('/view', {id: LCDesignerStore.id});
    }

    questionReport = () => {
        window.open("https://gitee.com/xiaopujun/light-chaser/issues");
    }

    contactMe = () => {
        window.open("https://gitee.com/xiaopujun");
    }

    doOpenGithub = () => {
        window.open("https://github.com/xiaopujun/light-chaser");
    }

    doOpenGitee = () => {
        window.open("https://gitee.com/xiaopujun/light-chaser");
    }

    render() {
        return (
            <div className={'designer-header'}>
                <div className={'header-left'}>
                    <div className={'header-title'}>LC DESIGNER</div>
                </div>
                <div className={'header-right'}>
                    <div className={'right-item'}>
                        <span className={'item-span'}><SettingFilled/>&nbsp;系统设置</span>
                    </div>
                    <div className={'right-item'}>
                        <span className={'item-span'}><SkinFilled/>&nbsp;主题</span>
                    </div>
                    <div className={'right-item'} onClick={this.doSave}>
                        <span className={'item-span'}><SaveOutlined/>&nbsp;保存</span>
                    </div>
                    <div className={'right-item'} onClick={this.doPreview}>
                        <span className={'item-span'}><EyeOutlined/>&nbsp;预览</span>
                    </div>
                    <div className={'right-item'}>
                        <span className={'item-span'}><SnippetsOutlined/>&nbsp;文档</span>
                    </div>
                    <div className={'right-item'} onClick={this.questionReport}>
                        <span className={'item-span'}><QuestionCircleOutlined/>&nbsp;问题上报</span>
                    </div>
                    <div className={'right-item'}>
                        <span className={'item-span'}><PhoneOutlined/>&nbsp;联系我</span>
                    </div>
                    <div className={'right-item'} onClick={this.doOpenGithub}>
                        <span className={'item-span'}><GithubOutlined/>&nbsp;github</span>
                    </div>
                    <div className={'right-item'} onClick={this.doOpenGitee}>
                        <span className={'item-span'}><GoogleOutlined/>&nbsp;gitee</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(LcDesignerHeader);