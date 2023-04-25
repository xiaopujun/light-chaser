import React, {Component} from 'react';
import {
    DatabaseFilled,
    HighlightFilled,
    InfoCircleFilled,
    LineOutlined,
    SkinFilled,
    VideoCameraFilled
} from "@ant-design/icons";
import lcConfigContentStore from "../store/LcDesignerContentStore";
import {observer} from "mobx-react";
import LCDesigner from "../index";
import rightStore from "./RightStore";
import {toJS} from "mobx";

interface LcConfigContentProps {
    title?: string;
    icon?: any;
    visible?: boolean;
    onClose?: (visible: boolean) => void;
    activeMenu?: string;
    LCDesignerStore?: LCDesigner;
    updateActive?: (data?: any) => void;
    updateBaseStyle?: (data?: any) => void;
    updateChartProps?: (data?: any) => void;
    updateBaseInfo?: (data?: any) => void;
    updateCanvasConfig?: (data?: any) => void;
    updateBgConfig?: (data?: any) => void;
}

class ConfigContent extends Component<LcConfigContentProps> {

    titleInfo: any = {
        'info': {
            name: '信息',
            icon: InfoCircleFilled
        },
        'style': {
            name: '样式',
            icon: HighlightFilled
        },
        'data': {
            name: '数据',
            icon: DatabaseFilled
        },
        'animation': {
            name: '动画',
            icon: VideoCameraFilled
        },
        'theme': {
            name: '主题',
            icon: SkinFilled
        },
    }

    doRenderConfig = () => {
        let {activeMenu, configObjs} = toJS(rightStore);
        const {activeElem} = toJS(lcConfigContentStore)!;
        let abstractConfigObj: any = configObjs[activeElem.type + 'Config'];
        let menuToConfigComp = abstractConfigObj.getMenuToConfigContentMap()!;
        const ConfigComp = menuToConfigComp[activeMenu];
        return <ConfigComp/>;
    }

    onClose = () => {
        const {onClose} = this.props;
        onClose && onClose(false);
    }

    render() {
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
                        {this.doRenderConfig()}
                    </div>
                </div> : <></>}
            </>
        );
    }
}

export default observer(ConfigContent);