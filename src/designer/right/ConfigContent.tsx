import React, {Component, Suspense} from 'react';
import {LineOutlined} from "@ant-design/icons";
import rightStore from "./RightStore";
import designerStarter from "../DesignerStarter";
import {observer} from "mobx-react";
import './ConfigContent.less';
import Loading from "../../lib/loading/Loading";
import designerStore from "../store/DesignerStore";
import {AbstractCustomComponentDefinition} from "../../framework/core/AbstractCustomComponentDefinition";
import {ConfigType} from "./ConfigType";

class ConfigContent extends Component {

    buildConfigContent = () => {
        const {compInstances} = designerStore;
        let {activeMenu, activeElem} = rightStore;
        let {customComponentInfoMap} = designerStarter;
        let abstractConfigObj: AbstractCustomComponentDefinition = customComponentInfoMap[activeElem.type + '']
        let configMapping = abstractConfigObj.getMenuToConfigContentMap();
        const ConfigComp: React.ComponentType<ConfigType> = configMapping![activeMenu];
        const instance = compInstances[activeElem.id + ''];
        return (
            <Suspense fallback={<Loading/>}>
                <ConfigComp instance={instance}/>
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