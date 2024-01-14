import React, {Component} from 'react';
import Selecto, {OnDragStart, OnSelectEnd} from "react-selecto";
import eventOperateStore from "../EventOperateStore";
import {observer} from "mobx-react";
import Moveable from 'react-moveable';
import designerStore from "../../store/DesignerStore";
import LayerUtil from "../../left/layer-list/util/LayerUtil";
import layerListStore from "../../left/layer-list/LayerListStore";
import designerLeftStore from "../../left/DesignerLeftStore";

/**
 * 设置控制点和边框的颜色
 * @param lock 是否锁定
 */
export function setControlPointLineColor(lock: boolean) {
    const {targetIds} = eventOperateStore;
    //没有选中组件的情况下不会显示边框。
    if (targetIds.length === 0) return;
    const pointLineDom = document.querySelectorAll(".moveable-control,.moveable-line");
    if (!pointLineDom) return;
    if (lock) {
        pointLineDom.forEach((child: Element) => {
            (child as HTMLDivElement).style.backgroundColor = '#ff4b29';
        })
    } else {
        pointLineDom.forEach((child: Element) => {
            (child as HTMLDivElement).style.backgroundColor = '#00bbffff';
        })
    }
}

export interface DesignerSelectableProps {
    children?: React.ReactNode;
}

class DesignerSelectable extends Component<DesignerSelectableProps> {
    selectorRef = React.createRef<Selecto>();

    componentDidMount() {
        const {setSelectorRef} = eventOperateStore;
        setSelectorRef(this.selectorRef.current!);
    }

    onSelectEnd = (e: OnSelectEnd) => {
        let {selected} = e;
        const {movableRef, setTargetIds} = eventOperateStore;
        if (!movableRef) return;
        const movable: Moveable = movableRef!;
        //如果为拖拽，则将当前的整个dom事件传递给movable，确保选中元素后可以立马拖拽
        if (e.isDragStart) {
            e.inputEvent.preventDefault();
            const selectTimer = setTimeout(() => {
                //使用异步操作，确保在拖拽前已经给movable传递target
                movable.dragStart(e.inputEvent);
                clearTimeout(selectTimer);
            });
        }

        const {layerConfigs} = designerStore;
        let layerIds = selected.map((item) => item.id);
        let lockState = !!layerConfigs[layerIds[0]]?.lock;
        if (layerIds.length === 1) {
            /**
             * 点选
             * 普通图层--不管是否锁定，都可以选中
             * 分组图层--选中这个分组下的所有未锁定、未隐藏的组件
             *
             * 按住shift键点选时，仅选中当前图层，不做分组场景下的计算
             */
            if (!e.inputEvent.shiftKey) {
                const pid = layerConfigs[layerIds[0]].pid;
                if (pid)
                    layerIds = LayerUtil.findAllChildLayerBySubId(layerIds);
            }
        } else if (layerIds.length > 1) {
            /**
             * 框选
             * 框选多个组件时，不能同时包含锁定和非锁定的组件。在同时包含锁定和未锁定状态下的组件时，只选中未锁定状态的组件。
             * 对于框选组件中存在分组的。 要选中分组内的所有相同锁定状态的组件。
             */
            let allChildLayerId = LayerUtil.findAllChildLayerBySubId(layerIds, true);
            //检测是否同时包含锁定和非锁定的组件
            for (let i = 0; i < allChildLayerId.length; i++) {
                const layer = layerConfigs[allChildLayerId[i]];
                if (layer.lock !== lockState && layer.type !== 'group') {
                    //只选中未锁定的组件
                    lockState = false;
                    break;
                }
            }
            layerIds = allChildLayerId.filter((id) => layerConfigs[id].lock === lockState);
        }

        //更新选中的组件id
        setTargetIds(layerIds);
        //更新图层列表状态
        const {layerInstances} = layerListStore;
        const {menu} = designerLeftStore;
        if (menu === 'layer-list') {
            layerIds.forEach((id) => {
                (layerInstances[id] as Component)?.setState({selected: true});
            });
        }

        //更新选中组件的边框颜色（锁定状态组件为红色，非锁定状态组件为蓝色）
        setControlPointLineColor(lockState);
    }

    onDragStart = (e: OnDragStart) => {
        const {movableRef, targets} = eventOperateStore;
        const movable: Moveable = movableRef!;
        const target = e.inputEvent.target;
        if ((movable.isMoveableElement(target))
            || targets.some((t: HTMLElement) => t === target || t.contains(target))
        ) {
            e.stop();
        }
    }

    render() {
        return (
            <>
                {this.props.children}
                <Selecto ref={this.selectorRef}
                         dragContainer={".lc-event-container"}
                         selectableTargets={[".lc-comp-item"]}
                         hitRate={0}
                         selectByClick={true}
                         selectFromInside={false}
                         toggleContinueSelect={["ctrl"]}
                         ratio={0}
                         onDragStart={this.onDragStart}
                         onSelectEnd={this.onSelectEnd}
                />
            </>
        );
    }
}

export default observer(DesignerSelectable);