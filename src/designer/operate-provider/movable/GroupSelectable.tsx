import React, {Component} from 'react';
import Selecto, {OnSelectEnd} from "react-selecto";
import eventOperateStore from "../EventOperateStore";
import {observer} from "mobx-react";
import Moveable from 'react-moveable';

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

class GroupSelectable extends Component {
    selectorRef = React.createRef<Selecto>();

    componentDidMount() {
        const {setSelectorRef} = eventOperateStore;
        setSelectorRef(this.selectorRef);
    }

    onSelectEnd = (e: OnSelectEnd) => {
        let {selected} = e;
        const {movableRef, setTargets, /*setTargetIds*/} = eventOperateStore;
        if (!movableRef) return;
        const movable: Moveable = movableRef!.current!;
        //如果为拖拽，则将当前的整个dom事件传递给movable，确保选中元素后可以立马拖拽
        if (e.isDragStart) {
            e.inputEvent.preventDefault();
            setTimeout(() => {
                //使用异步操作，确保在拖拽前已经给movable传递target
                movable.dragStart(e.inputEvent);
            });
        }

        //框选多个组件时，不能同时包含锁定和非锁定的组件。
        //如果最开始选中的是锁定的组件，那么后续选中的组件只能是锁定的组件.反之亦然
        let lock = false;
        if (selected && selected.length === 1) {
            lock = selected[0].dataset.lock === 'true';
        } else if (selected && selected.length > 1) {
            //第一个选中的第一个组件是否是锁定的组件
            lock = selected[0].dataset.lock === 'true';
            if (lock) {
                //后续只能选中锁定的组件
                selected = e.selected.filter((item) => item.dataset.lock === 'true') as HTMLElement[];
            } else {
                //后续只能选中非锁定的组件
                selected = e.selected.filter((item) => item.dataset.lock !== 'true') as HTMLElement[];
            }
        }

        //更新选中的组件
        setTargets(selected as HTMLElement[]);

        //更新选中组件的边框颜色（锁定状态组件为红色，非锁定状态组件为蓝色）
        setControlPointLineColor(lock);

        //若选中多个组件，计算更新组件多选时的左上角坐标
        if (selected.length > 1) {
            let {calculateGroupCoordinate} = eventOperateStore;
            calculateGroupCoordinate(selected);
        }
    }

    onDragStart = (e: any) => {
        const {movableRef, targets} = eventOperateStore;
        const movable: Moveable = movableRef!.current!;
        const target = e.inputEvent.target;
        if ((movable.isMoveableElement(target))
            || targets.some((t: any) => t === target || t.contains(target))
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

export default observer(GroupSelectable);