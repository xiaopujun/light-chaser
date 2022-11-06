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
import {RouteComponentProps, RouteProps, RouterProps, withRouter} from "react-router-dom";
import {localSave, localUpdate} from "../../local/LocalStorageUtil";
import {LCDesignerProps} from "../../global/types";

interface DesignerHeaderProps extends RouteComponentProps {
    LCDesignerStore: LCDesignerProps;
    updateLCDesignerStore?: (data: any) => void;
}

class DesignerHeader extends Component<DesignerHeaderProps | any> {

    updateRouteState = (id: number) => {
        const {location, LCDesignerStore} = this.props;
        const {action} = location.state;
        let {globalSet} = LCDesignerStore!;
        if (action === 'add') {
            this.props.history.replace("/designer", {
                ...location.state, ...{
                    action: 'update',
                    id,
                    globalSet,
                }
            });
        }
    }

    save = (e: any) => {
        const {LCDesignerStore, updateLCDesignerStore} = this.props;
        let {id = -1, globalSet} = LCDesignerStore;
        const {saveType} = globalSet;
        if (saveType === 'local') {
            if (id === -1) {
                id = localSave(LCDesignerStore);
                //更新id
                updateLCDesignerStore && updateLCDesignerStore({id});
                //修改路由参数，新增变为更新
                this.updateRouteState(id);
            } else {
                localUpdate(LCDesignerStore);
            }
            alert("save success");
        }
    }

    preview = () => {
        const {LCDesignerStore} = this.props;
        this.props.history.push('/view', {id: LCDesignerStore.id});
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
