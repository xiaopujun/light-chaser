import React, {Component, ReactElement} from 'react';
import '../style/Head.less';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {createProject, updateProject} from "../../local/LocalStorageUtil";
import lcDesignerContentStore from '../store/DesignerStore';
import LCDesigner from "../index";
import headerStore from "./HeaderStore";

interface LcDesignerHeaderProps extends RouteComponentProps {
    LCDesignerStore: LCDesigner;
    updateDesignerStore?: (data: any) => void;
}

class Header extends Component<LcDesignerHeaderProps | any> {

    updateRouteState = (id: number) => {
        const {location} = this.props;
        const {action} = location.state;
        if (action === 'create') {
            this.props.history.replace("/designer", {
                ...location.state, ...{
                    action: 'edit',
                    id,
                }
            });
        }
    }

    doSave = () => {
        let {id = -1, projectConfig: {saveType}, setId} = lcDesignerContentStore;
        if (saveType === 'local') {
            if (id === -1) {
                createProject(lcDesignerContentStore).then((id: number | any) => {
                    if (id > -1) {
                        //更新id
                        setId && setId(id);
                        //修改路由参数，新增变为更新
                        this.updateRouteState(id);
                        alert("create success");
                    }
                });
            } else {
                updateProject(lcDesignerContentStore).then(() => {
                    alert("update success");
                });
            }
        }
    }

    doPreview = () => {
        const {LCDesignerStore} = this.props;
        this.props.history.push('/view', {id: LCDesignerStore.id});
    }

    buildHeaderList = (): Array<ReactElement> => {
        const {headerInfoArr} = headerStore;
        let items: Array<ReactElement> = [];
        for (let i = 0; i < headerInfoArr.length; i++) {
            const {icon: Icon, name, onClick} = headerInfoArr[i];
            items.push(
                <div key={i + ''} className={'right-item'} onClick={onClick}>
                    <span className={'item-span'}><Icon/>&nbsp;{name}</span>
                </div>
            );
        }
        return items;
    }


    render() {
        const items = this.buildHeaderList();
        return (
            <div className={'designer-header'}>
                <div className={'header-left'}>
                    <div className={'header-title'}>LC DESIGNER</div>
                </div>
                <div className={'header-right'}>
                    {items}
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
