import React, {Component} from 'react';
import {observer} from "mobx-react";
import contextMenuStore from "./ContextMenuStore";
import designerStore from "../../store/DesignerStore";
import './OperateMenu.less';
import rightStore from "../../right/RightStore";
import {
    CopyOutlined,
    DeleteOutlined,
    LockOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignTopOutlined
} from "@ant-design/icons";
import eventOperateStore from "../EventOperateStore";
import {MovableItemType} from "../../../lib/lc-movable/types";

class ContextMenu extends Component {

    menuList = [
        {
            name: '锁定',
            icon: LockOutlined,
            onClick: () => {
                const {targetIds, setTargets} = eventOperateStore;
                const {updateLayout, layoutConfigs} = designerStore;
                let toBeUpdate = [];
                for (const targetId of targetIds) {
                    let item = layoutConfigs[targetId];
                    toBeUpdate.push({...item, locked: true})
                }
                updateLayout(toBeUpdate);
                //操作完毕之后，清空已被选择的元素。
                setTargets([]);
            }
        },
        {
            name: '解锁',
            icon: LockOutlined,
            onClick: () => {
                const {unLockedId} = eventOperateStore;
                const {updateLayout, layoutConfigs} = designerStore;
                let item = layoutConfigs[unLockedId];
                updateLayout([{...item, locked: false}])
            }
        },
        // {
        //     name: '隐藏',
        //     icon: EyeInvisibleOutlined,
        //     onClick: (e: any) => alert('隐藏')
        // },
        {
            name: '复制',
            icon: CopyOutlined,
            onClick: () => {
                const {targetIds, setTargetIds, setTargets} = eventOperateStore;
                const {copyItem} = designerStore;
                let newIds = copyItem(targetIds);
                let targets: any = [];
                //延迟10毫秒，等待dom元素渲染完毕后再获取。
                setTimeout(() => {
                    for (const newId of newIds) {
                        targets.push(document.getElementById(newId));
                    }
                    targets.filter((item: any) => item !== null);
                    setTargets(targets);
                    setTargetIds(newIds);
                }, 10);
            }
        },
        {
            name: '置顶',
            icon: VerticalAlignTopOutlined,
            onClick: () => {
                let {maxOrder, setMaxOrder, targetIds, setTargetIds} = eventOperateStore;
                const {updateLayout, layoutConfigs} = designerStore;
                let toBeUpdate: MovableItemType[] = [];
                targetIds.forEach((id: string) => {
                    let item = layoutConfigs[id];
                    toBeUpdate.push({...item, order: ++maxOrder});
                });
                setMaxOrder(maxOrder)
                setTargetIds([]);
                updateLayout(toBeUpdate);
            }
        },
        {
            name: '置底',
            icon: VerticalAlignBottomOutlined,
            onClick: () => {
                let {minOrder, setMinOrder, targetIds, setTargetIds} = eventOperateStore;
                const {updateLayout, layoutConfigs} = designerStore;
                let toBeUpdate: MovableItemType[] = [];
                targetIds.forEach((id: string) => {
                    let item = layoutConfigs[id];
                    toBeUpdate.push({...item, order: --minOrder});
                });
                setMinOrder(minOrder)
                setTargetIds([]);
                updateLayout(toBeUpdate);
            }
        },
        {
            name: '删除',
            icon: DeleteOutlined,
            onClick: () => {
                const {targetIds, setTargetIds} = eventOperateStore;
                const {updateActive} = designerStore;
                const {setContentVisible} = rightStore;
                setContentVisible(false);
                updateActive && updateActive({
                    id: -1,
                    type: 'LcBg'
                });
                targetIds.length > 0 && designerStore.delItem(targetIds);
                setTargetIds([]);
            }
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