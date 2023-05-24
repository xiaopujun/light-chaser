import React, {Component, ReactElement} from 'react';
import './DesignerHeader.less';
import {RouteComponentProps} from "react-router-dom";
import LCDesigner from "../index";
import headerStore from "./HeaderStore";
import CanvasHdConfigImpl from "./impl/CanvasHdConfigImpl";
import {observer} from "mobx-react";
import ProjectHdItemImpl from "./impl/ProjectHdItemImpl";
import ThemeHdItemImpl from "./impl/ThemeHdItemImpl";

interface LcDesignerHeaderProps extends RouteComponentProps {
    LCDesignerStore: LCDesigner;
    updateDesignerStore?: (data: any) => void;
}

class Header extends Component<LcDesignerHeaderProps | any> {

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
        const {canvasVisible, projectVisible, themeVisible} = headerStore;
        const items = this.buildHeaderList();
        return (
            <div className={'designer-header'}>
                <div className={'header-left'}>
                    <div className={'header-title'}>L C</div>
                </div>
                <div className={'header-right'}>
                    {items}
                </div>
                {/*todo 想办法让这两个组件不要在这里写死*/}
                {canvasVisible && <CanvasHdConfigImpl/>}
                {projectVisible && <ProjectHdItemImpl/>}
                {themeVisible && <ThemeHdItemImpl/>}
            </div>
        );
    }
}

export default observer(Header);
