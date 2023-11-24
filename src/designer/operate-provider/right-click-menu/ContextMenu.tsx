import {Component} from 'react';
import {observer} from "mobx-react";
import contextMenuStore from "./ContextMenuStore";
import './OperateMenu.less';
import {
    CopyOutlined,
    DeleteOutlined,
    EyeInvisibleOutlined, GroupOutlined,
    LockOutlined, UngroupOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignTopOutlined
} from "@ant-design/icons";
import {
    doCopy,
    doDelete,
    doGrouping,
    doHide,
    doLock,
    doUnGrouping,
    doUnLock,
    toBottom,
    toTop
} from "../hot-key/HotKeyImpl";
import eventOperateStore from "../EventOperateStore";
import designerStore from "../../store/DesignerStore";
import LayerUtil from "../../float-configs/layer-list/util/LayerUtil";

class ContextMenu extends Component {

    menuList = [
        {
            name: '复制',
            icon: CopyOutlined,
            onClick: doCopy,
        },
        {
            name: '置顶',
            icon: VerticalAlignTopOutlined,
            onClick: toTop,
        },
        {
            name: '置底',
            icon: VerticalAlignBottomOutlined,
            onClick: toBottom,
        },
        {
            name: '删除',
            icon: DeleteOutlined,
            onClick: doDelete,
        },
        {
            name: '隐藏',
            icon: EyeInvisibleOutlined,
            onClick: doHide,
        },
    ];

    calculateMenus = () => {
        const menus = [...this.menuList];
        const {targetIds} = eventOperateStore;
        if (targetIds.length === 0) return menus;
        const {layerConfigs} = designerStore;
        const lockState = !!layerConfigs[targetIds[0]]?.lock;
        if (lockState) {
            menus.push({
                name: '解锁',
                icon: LockOutlined,
                onClick: doUnLock,
            })
        } else {
            menus.push({
                name: '锁定',
                icon: LockOutlined,
                onClick: doLock,
            })
        }
        if (targetIds.length > 1 && !LayerUtil.hasSameGroup(targetIds)) {
            menus.push({
                name: '编组',
                icon: GroupOutlined,
                onClick: doGrouping,
            })
        }
        let groupIds = LayerUtil.findTopGroupLayer(targetIds, true);
        //过滤掉其中分组等于自身的图层（即非分组图层）
        groupIds = groupIds.filter((id: string) => layerConfigs[id].type === 'group');
        if (groupIds.length > 0) {
            menus.push({
                name: '解组',
                icon: UngroupOutlined,
                onClick: doUnGrouping,
            })
        }
        return menus;
    }

    buildMenuList = () => {
        const menuListDom = [];
        const menus = this.calculateMenus();
        for (let i = 0; i < menus.length; i++) {
            let menuItem = menus[i];
            let Icon = menuItem.icon;
            menuListDom.push(
                <div key={i + ''} className={'menu-item'} onClick={menuItem.onClick}>
                    <label><Icon/></label>
                    <span>{menuItem.name}</span>
                </div>
            )
        }
        return menuListDom;
    }

    render() {
        const {visible, position = [0, 0]} = contextMenuStore;
        return (
            <>
                {visible &&
                <div className={'context-menu'} style={{
                    position: 'fixed',
                    top: position[1],
                    left: position[0]
                }}>
                    {this.buildMenuList()}
                </div>}
            </>
        );
    }
}

export default observer(ContextMenu);