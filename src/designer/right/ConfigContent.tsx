import React, {Component, Suspense} from 'react';
import {LineOutlined} from "@ant-design/icons";
import rightStore from "./RightStore";
import designerStarter from "../DesignerStarter";
import {observer} from "mobx-react";
import './ConfigContent.less';
import Loading from "../../lib/loading/Loading";

class ConfigContent extends Component {

    buildConfigContent = () => {
        let {activeMenu, activeElem, activeElemConfig, updateConfig} = rightStore;
        let {customComponentInfoMap} = designerStarter;
        let abstractConfigObj: any = customComponentInfoMap[activeElem.type + ''];
        let menuToConfigComp = abstractConfigObj.getMenuToConfigContentMap();
        const ConfigComp = menuToConfigComp[activeMenu];
        return (
            <Suspense fallback={<Loading/>}>
                <ConfigComp config={activeElemConfig[activeMenu]} updateConfig={updateConfig}/>
            </Suspense>
        )

    }

    onClose = () => {
        const {setContentVisible} = rightStore;
        setContentVisible && setContentVisible(false);
    }

    render() {
        const {activeMenu, menus} = rightStore;
        let activeMenuName = '';
        for (let i = 0; i < menus.length; i++) {
            if (menus[i].key === activeMenu) {
                activeMenuName = menus[i].name;
                break;
            }
        }
        return (
            <div className={'lc-config-panel'}>
                <div className={'lc-panel-top'}>
                    <div className={'panel-title'}>
                        <span>{activeMenuName}</span></div>
                    <div className={'panel-operate'} onClick={this.onClose}><LineOutlined/></div>
                </div>
                <div className={'lc-panel-content'}>
                    {this.buildConfigContent()}
                </div>
            </div>
        );
    }
}

export default observer(ConfigContent);