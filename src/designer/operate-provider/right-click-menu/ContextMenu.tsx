import {observer} from "mobx-react";
import contextMenuStore from "./ContextMenuStore";
import './OperateMenu.less';
import {
    doCopy,
    doDelete,
    doGrouping,
    doHide,
    doLock,
    doUnGrouping,
    doUnLock,
    layerMoveDown,
    layerMoveUp,
    layerToBottom,
    layerToTop,
    removeFromGroup
} from "../hot-key/HotKeyImpl";
import eventOperateStore from "../EventOperateStore";
import layerManager from "../../manager/LayerManager.ts";
import LayerUtil from "../../left/layer-list/util/LayerUtil";
import {
    ApplicationTwo,
    CopyOne,
    DeleteOne,
    Down,
    GraphicStitchingThree,
    LinkRight,
    Lock,
    PreviewClose,
    ToBottomOne,
    ToTopOne,
    Unlock,
    Up
} from "@icon-park/react";


const menuList = [
    {
        name: '复制',
        icon: CopyOne,
        onClick: doCopy,
    },
    {
        name: '上移',
        icon: Up,
        onClick: layerMoveUp,
    },
    {
        name: '下移',
        icon: Down,
        onClick: layerMoveDown,
    },
    {
        name: '置顶',
        icon: ToTopOne,
        onClick: layerToTop,
    },
    {
        name: '置底',
        icon: ToBottomOne,
        onClick: layerToBottom,
    },
    {
        name: '删除',
        icon: DeleteOne,
        onClick: doDelete,
    },
    {
        name: '隐藏',
        icon: PreviewClose,
        onClick: doHide,
    },
];

const ContextMenu = () => {

    const calculateMenus = () => {
        const menus = [...menuList];
        const {targetIds} = eventOperateStore;
        if (targetIds.length === 0) return menus;
        const {layerConfigs} = layerManager;
        const lockState = !!layerConfigs[targetIds[0]]?.lock;
        if (lockState) {
            menus.push({
                name: '解锁',
                icon: Unlock,
                onClick: doUnLock,
            })
        } else {
            menus.push({
                name: '锁定',
                icon: Lock,
                onClick: doLock,
            })
        }
        if (targetIds.length > 1 && !LayerUtil.hasSameGroup(targetIds)) {
            menus.push({
                name: '编组',
                icon: GraphicStitchingThree,
                onClick: doGrouping,
            })
        }
        let groupIds = LayerUtil.findTopGroupLayer(targetIds, true);
        //过滤掉其中分组等于自身的图层（即非分组图层）
        groupIds = groupIds.filter((id: string) => layerConfigs[id].type === 'group');
        if (groupIds.length > 0) {
            menus.push({
                name: '解组',
                icon: ApplicationTwo,
                onClick: doUnGrouping,
            })
        }
        const noGroup = targetIds.some((id: string) => !layerConfigs[id].pid);
        if (!noGroup)
            menus.push({
                name: '移出分组',
                icon: LinkRight,
                onClick: removeFromGroup
            })
        return menus;
    }

    const buildMenuList = () => {
        const menuListDom = [];
        const menus = calculateMenus();
        for (let i = 0; i < menus.length; i++) {
            const menuItem = menus[i];
            const Icon = menuItem.icon;
            menuListDom.push(
                <div key={i + ''} className={'menu-item'} onClick={menuItem.onClick}>
                    <label><Icon/></label>
                    <span>{menuItem.name}</span>
                </div>
            )
        }
        return menuListDom;
    }

    /**
     * 计算菜单位置
     */
    const calculatePosition = (offsetW: number, offsetY: number) => {
        const [clientX, clientY] = contextMenuStore.position;
        const {innerWidth, innerHeight} = window;
        let left = clientX;
        let top = clientY;
        if (clientX + offsetW > innerWidth)
            left = innerWidth - offsetW;
        if (clientY + offsetY > innerHeight)
            top = innerHeight - offsetY;
        return [left, top];
    }

    //todo 位置计算应需寻找更加合适优雅的方式
    const calculateMenuSize = (menuCount: number) => {
        const menuHeight = 33;
        return [130, menuCount * menuHeight];
    }

    const {visible} = contextMenuStore;
    const menus = buildMenuList();
    const [offsetW, offsetH] = calculateMenuSize(menus.length);
    const position = calculatePosition(offsetW, offsetH);
    return (
        <>
            {visible &&
                <div className={'context-menu'} style={{
                    position: 'fixed',
                    top: position[1],
                    left: position[0]
                }}>
                    {buildMenuList()}
                </div>}
        </>
    );

}

export default observer(ContextMenu);