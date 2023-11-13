import {Component} from 'react';
import {observer} from "mobx-react";
import contextMenuStore from "./ContextMenuStore";
import './OperateMenu.less';
import {
    CopyOutlined,
    DeleteOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignTopOutlined
} from "@ant-design/icons";
import {doCopy, doDelete, doHide, doLock, doUnLock, toBottom, toTop} from "../hot-key/HotKeyImpl";

class ContextMenu extends Component {

    menuList = [
        {
            name: '锁定',
            icon: LockOutlined,
            onClick: doLock,
        },
        {
            name: '解锁',
            icon: LockOutlined,
            onClick: doUnLock,
        },
        {
            name: '隐藏',
            icon: EyeInvisibleOutlined,
            onClick: doHide,
        },
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
    ]

    render() {
        const {visible, position = [0, 0]} = contextMenuStore;
        let menuListDom = [];
        for (let i = 0; i < this.menuList.length; i++) {
            let menuItem = this.menuList[i];
            let Icon = menuItem.icon;
            menuListDom.push(
                <div key={i + ''} className={'menu-item'} onClick={menuItem.onClick}>
                    <label><Icon/></label>
                    <span>{menuItem.name}</span>
                </div>
            )
        }
        return (
            <>
                {visible &&
                <div className={'lc-right-menu'} style={{
                    position: 'fixed',
                    top: position[1],
                    left: position[0]
                }}>
                    {menuListDom}
                </div>}
            </>
        );
    }
}

export default observer(ContextMenu);