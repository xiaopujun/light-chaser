import React, {ReactElement, ReactNode} from 'react';
import './DesignerHeader.less';
import {observer} from "mobx-react";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {doSave, exportProject, importProject} from "../operate-provider/hot-key/HotKeyImpl";
import canvasHdStore from "./items/canvas/CanvasManager.ts";
import projectHdStore from "./items/project/ProjectManager.ts";
import themeHdStore from "./items/theme/ThemeManager.ts";
import bluePrintHdStore from "./items/blue-print/BluePrintHdStore.ts";
import CanvasHdConfigImpl from "./items/canvas/CanvasHdConfigImpl.tsx";
import ProjectHdItemImpl from "./items/project/ProjectHdItemImpl.tsx";
import ThemeHdItemImpl from "./items/theme/ThemeHdItemImpl.tsx";
import BluePrintHdImpl from "./items/blue-print/BluePrintHdImpl.tsx";
import {AfferentFour, ConnectionPointTwo, EfferentFour, Eyes, HardDiskOne, PageTemplate, Theme} from "@icon-park/react";
import URLUtil from "../../utils/URLUtil.ts";
import {DesignerMode} from "../DesignerType.ts";
import logo from "../../images/logo.png";


export interface IHeaderItem {
    icon: ReactNode;
    name: string;
    key: string;
    onClick?: () => void;
}

const centerItems: Array<IHeaderItem> = [
    {
        icon: <ConnectionPointTwo theme="filled" style={{marginTop: 2}} strokeWidth={4} strokeLinecap="square"/>,
        name: '蓝图',
        key: 'blue-print',
        onClick: () => {
            //打开蓝图前清空画布中已经选中的组件,避免删除蓝图节点时，误删画布中的组件
            const {setTargetIds} = eventOperateStore;
            setTargetIds([]);
            bluePrintHdStore.setBluePrintVisible(true);
        }
    },
    {
        icon: <PageTemplate theme="filled" style={{marginTop: 2}} strokeWidth={3} strokeLinecap="square"/>,
        name: '画布',
        key: 'canvas',
        onClick: () => canvasHdStore.setCanvasVisible(true)
    },
    {
        icon: <Theme theme="filled" style={{marginTop: 2}} strokeWidth={4} strokeLinecap="square"/>,
        name: '主题',
        key: 'theme',
        onClick: () => themeHdStore.setThemeVisible(true)
    }
];

const leftItems: Array<IHeaderItem> = [
    {
        icon: <AfferentFour theme="filled" style={{marginTop: 2}} strokeLinecap="square"/>,
        name: '导入',
        key: 'import',
        onClick: () => importProject()
    },
    {
        icon: <EfferentFour theme="filled" style={{marginTop: 2}} strokeLinecap="square"/>,
        name: '导出',
        key: 'export',
        onClick: () => exportProject()
    },
    {
        icon: <HardDiskOne theme="filled" style={{marginTop: 2}} strokeLinecap="square"/>,
        name: '保存',
        key: 'save',
        onClick: () => doSave()
    },
    {
        icon: <Eyes theme="outline" style={{marginTop: 2}} strokeWidth={4} strokeLinecap="square"/>,
        name: '预览',
        key: 'preview',
        onClick: () => {
            const {saveType, id} = URLUtil.parseUrlParams();
            window.open(`/view?id=${id}&saveType=${saveType}&mode=${DesignerMode.VIEW}`, '_blank');
        }
    }
];


const Header: React.FC = observer(() => {

        const buildHeaderItemUI = (items: Array<IHeaderItem>): Array<ReactElement> => {
            const headerItems: Array<ReactElement> = [];
            for (let i = 0; i < items.length; i++) {
                const {icon: Icon, name, key, onClick} = items[i];
                headerItems.push(
                    <div key={key} className={'header-item'} onClick={onClick}>
                        {Icon}
                        <span className={'item-span'}>{name}</span>
                    </div>
                );
            }
            return headerItems;
        }

        return (
            <>
                <div className={'designer-header'}>
                    <div className={'header-left'}>
                        <div className={'header-title'}><img style={{width: '60%'}} src={logo} alt={'logo'}/></div>
                    </div>
                    <div className={'header-center'}>
                        {buildHeaderItemUI(centerItems)}
                    </div>
                    <div className={'header-right'}>
                        {buildHeaderItemUI(leftItems)}
                    </div>
                    {canvasHdStore.canvasVisible && <CanvasHdConfigImpl/>}
                    {projectHdStore.projectVisible && <ProjectHdItemImpl/>}
                    {themeHdStore.themeVisible && <ThemeHdItemImpl/>}
                    {bluePrintHdStore.bluePrintVisible && <BluePrintHdImpl/>}
                </div>
            </>
        );
    }
);

export default Header;
