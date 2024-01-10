import React, {ComponentType, ReactElement, Suspense} from 'react';
import './DesignerHeader.less';
import headerStore from "./HeaderStore";
import {observer} from "mobx-react";
import {BluePrintHdImpl} from "./items/blue-print/BluePrintHdImpl";
import Loading from "../../ui/loading/Loading";
import {AlertOutlined, CompressOutlined, EyeOutlined, PartitionOutlined, SaveOutlined} from "@ant-design/icons";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {doSave} from "../operate-provider/hot-key/HotKeyImpl";
import URLUtil from "../../utils/URLUtil";
import {DesignerMode} from "../DesignerType";

const ProjectHdItemImpl = React.lazy(() => import('./items/project/ProjectHdItemImpl'));
const CanvasHdConfigImpl = React.lazy(() => import('./items/canvas/CanvasHdConfigImpl'));
const ThemeHdItemImpl = React.lazy(() => import('./items/theme/ThemeHdItemImpl'));

export interface IHeaderItem {
    icon: ComponentType;
    name: string;
    key: string;
    onClick?: () => void;
}

const centerItems: Array<IHeaderItem> = [
    {
        icon: PartitionOutlined,
        name: '蓝图',
        key: 'blue-print',
        onClick: () => {
            //打开蓝图前清空画布中已经选中的组件,避免删除蓝图节点时，误删画布中的组件
            const {setBluePrintVisible} = headerStore;
            const {setTargetIds} = eventOperateStore;
            setTargetIds([]);
            setBluePrintVisible(true);
        }
    },
    {
        icon: CompressOutlined,
        name: '画布',
        key: 'canvas',
        onClick: () => {
            const {setCanvasVisible} = headerStore;
            setCanvasVisible(true);
        }
    },
    {
        icon: AlertOutlined,
        name: '主题',
        key: 'theme',
        onClick: () => {
            const {setThemeVisible} = headerStore;
            setThemeVisible(true);
        }
    }
];

const leftItems: Array<IHeaderItem> = [
    {
        icon: SaveOutlined,
        name: '保存',
        key: 'save',
        onClick: () => doSave()
    },
    {
        icon: EyeOutlined,
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
            let headerItems: Array<ReactElement> = [];
            for (let i = 0; i < items.length; i++) {
                const {icon: Icon, name, key, onClick} = items[i];
                headerItems.push(
                    <div key={key} className={'header-item'} onClick={onClick}>
                        <Icon/>
                        <span className={'item-span'}>{name}</span>
                    </div>
                );
            }
            return headerItems;
        }

        const {canvasVisible, projectVisible, themeVisible, bluePrintVisible} = headerStore;
        return (
            <>
                <div className={'designer-header'}>
                    <div className={'header-left'}>
                        <div className={'header-title'}>LIGHT CHASER</div>
                    </div>
                    <div className={'header-center'}>
                        {buildHeaderItemUI(centerItems)}
                    </div>
                    <div className={'header-right'}>
                        {buildHeaderItemUI(leftItems)}
                    </div>
                    {canvasVisible && <Suspense fallback={<Loading/>}><CanvasHdConfigImpl/></Suspense>}
                    {projectVisible && <Suspense fallback={<Loading/>}><ProjectHdItemImpl/></Suspense>}
                    {themeVisible && <Suspense fallback={<Loading/>}><ThemeHdItemImpl/></Suspense>}
                    {bluePrintVisible && <Suspense fallback={<Loading/>}><BluePrintHdImpl/></Suspense>}
                </div>
            </>
        );
    }
);

export default Header;
