import React, {Component} from 'react';
import {observer} from "mobx-react";
import contextMenuStore from "./ContextMenuStore";
import designerStore from "../../store/DesignerStore";
import './OperateMenu.less';
import rightStore from "../../right/RightStore";
import {
    CopyOutlined,
    DeleteOutlined,
    DownOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    UpOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignTopOutlined
} from "@ant-design/icons";

class ContextMenu extends Component {

    menuList = [
        {
            name: '锁定',
            icon: LockOutlined,
            onClick: (e: any) => alert('锁定')
        },
        {
            name: '解锁',
            icon: LockOutlined,
            onClick: (e: any) => alert('解锁')
        },
        {
            name: '隐藏',
            icon: EyeInvisibleOutlined,
            onClick: (e: any) => alert('隐藏')
        },
        {
            name: '复制',
            icon: CopyOutlined,
            onClick: (e: any) => alert('复制')
        },
        {
            name: '上移',
            icon: UpOutlined,
            onClick: (e: any) => alert('上移')
        },
        {
            "name": '下移',
            "icon": DownOutlined,
            "onClick": (e: any) => alert('下移')
        },
        {
            name: '置顶',
            icon: VerticalAlignTopOutlined,
            onClick: (e: any) => alert('置顶')
        },
        {
            name: '置底',
            icon: VerticalAlignBottomOutlined,
            onClick: (e: any) => alert('置底')
        },
        {
            name: '删除',
            icon: DeleteOutlined,
            onClick: (e: any) => {
                const {updateActive} = designerStore;
                const {targetId} = contextMenuStore;
                const {setContentVisible} = rightStore;
                setContentVisible(false);
                updateActive && updateActive({
                    id: -1,
                    type: 'LcBg'
                });
                targetId > -1 && designerStore.delItem(targetId)

            }
        },
    ]

    render() {
        const {visible, position = [0, 0], targetId} = contextMenuStore;
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