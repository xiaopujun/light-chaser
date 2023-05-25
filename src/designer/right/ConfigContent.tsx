import React, {Component} from 'react';
import {LineOutlined} from "@ant-design/icons";
import designerStore from "../store/DesignerStore";
import {observer} from "mobx-react";
import LCDesigner from "../index";
import rightStore from "./RightStore";
import bootCore from "../BootCore";

interface LcConfigContentProps {
    title?: string;
    icon?: any;
    visible?: boolean;
    onClose?: (visible: boolean) => void;
    activeMenu?: string;
    LCDesignerStore?: LCDesigner;
    updateActive?: (data?: any) => void;
    updateBaseStyle?: (data?: any) => void;
    updateElemConfig?: (data?: any) => void;
    updateBaseInfo?: (data?: any) => void;
    updateCanvasConfig?: (data?: any) => void;
    updateBgConfig?: (data?: any) => void;
}

class ConfigContent extends Component<LcConfigContentProps> {

    buildConfigContent = () => {
        let {activeMenu} = rightStore;
        let {scannerCore} = bootCore;
        const {activeElem, elemConfigs, updateElemConfig} = designerStore!;
        const elemConfig = elemConfigs[activeElem.id!];
        let abstractConfigObj: any = scannerCore[activeElem.type + ''];
        let menuToConfigComp = abstractConfigObj.getMenuToConfigContentMap();
        const ConfigComp = menuToConfigComp[activeMenu];
        return <ConfigComp config={elemConfig[activeMenu]} updateConfig={updateElemConfig}/>;
    }

    onClose = () => {
        const {setContentVisible} = rightStore;
        setContentVisible && setContentVisible(false);
    }

    render() {
        console.log('ConfigContent render');
        const {contentVisible, activeMenu, menus} = rightStore;
        let activeMenuName = '';
        for (let i = 0; i < menus.length; i++) {
            if (menus[i].key === activeMenu) {
                activeMenuName = menus[i].name;
                break;
            }
        }
        return (
            <>
                {contentVisible ? <div className={'lc-config-panel'}>
                    <div className={'lc-panel-top'}>
                        <div className={'panel-title'}>
                            <span>{activeMenuName}</span></div>
                        <div className={'panel-operate'} onClick={this.onClose}><LineOutlined/></div>
                    </div>
                    <div className={'lc-panel-content'}>
                        {this.buildConfigContent()}
                    </div>
                </div> : <></>}
            </>
        );
    }
}

export default observer(ConfigContent);