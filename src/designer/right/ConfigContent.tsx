import React, {Component} from 'react';
import {
    DatabaseFilled, HighlightFilled, InfoCircleFilled, LineOutlined, SkinFilled, VideoCameraFilled
} from "@ant-design/icons";
import BaseInfo from "../../lib/config/info/BaseInfo";
import BaseStyleSet from "../../lib/config/base/BaseStyleSet";
import getChartsConfig from "../../lib/config/chart/ComponentSetInit";
import LcBgConfig from "../../comps/lc/background/LcBgConfigContent";
import lcConfigContentStore from "../store/LcDesignerContentStore";
import {observer} from "mobx-react";
import LCDesigner from "../index";

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
        let {activeMenu} = this.props;
        const {activated, elemConfigs} = lcConfigContentStore!;
        const {id: activeId = -1, type: activeType = ''} = activated!;
        if (activated && activated.id === -1)
            activeMenu = '';
        switch (activeMenu) {
            case 'info':
                return <BaseInfo updateBaseInfo={this.props.updateBaseInfo}
                                 baseInfo={elemConfigs && elemConfigs[activeId]?.baseInfo}/>
            case 'style':
                let ChartsConfig: any = getChartsConfig(activeType);
                return <>
                    <BaseStyleSet updateBaseStyle={this.props.updateBaseStyle}
                                  baseStyle={elemConfigs && elemConfigs[activeId]?.baseStyle}/>
                    <ChartsConfig updateChartProps={this.props.updateChartProps}
                                  chartProps={elemConfigs && elemConfigs[activeId]?.chartConfig}/></>
            case 'data':
                return <div>开发中...</div>
            case 'animation':
                return <div>开发中...</div>
            case 'theme':
                return <div>开发中...</div>
            default:
                return <LcBgConfig/>;
        }
    }

    onClose = () => {
        const {onClose} = this.props;
        onClose && onClose(false);
    }

    render() {
        const {visible, activeMenu = 'style'} = this.props;
        const MenuIcon = this.titleInfo[activeMenu].icon;
        return (
            <>
                {visible ? <div className={'lc-config-panel'}>
                    <div className={'lc-panel-top'}>
                        <div className={'panel-title'}><MenuIcon/>&nbsp;
                            <span>{this.titleInfo[activeMenu].name}</span></div>
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