import React, {Component} from 'react';
import Selecto, {OnSelectEnd} from "react-selecto";
import eventOperateStore from "../../designer/operate-provider/EventOperateStore";
import {observer} from "mobx-react";
import Moveable from 'react-moveable';
import footerStore from "../../designer/footer/FooterStore";
import designerStore from "../../designer/store/DesignerStore";

/**
 * 设置控制点和边框的颜色
 * @param locked 是否锁定
 */
export function setControlPointLineColor(locked: boolean) {
    const pointLineDom = document.querySelectorAll(".moveable-control,.moveable-line");
    if (!pointLineDom) return;
    if (locked) {
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
        const {movableRef, setTargets, setTargetIds} = eventOperateStore;
        console.log("onSelectEnd isDragStart", e.isDragStart);
        if (!movableRef) return;
        const movable: Moveable = movableRef!.current!;
        //这段代码干啥的？
        if (e.isDragStart) {
            e.inputEvent.preventDefault();
            setTimeout(() => {
                movable.dragStart(e.inputEvent);
            });
        }

        //框选多个组件时，不能同时包含锁定和非锁定的组件。
        //如果最开始选中的是锁定的组件，那么后续选中的组件只能是锁定的组件.反之亦然
        let locked = false;
        if (selected && selected.length === 1) {
            locked = selected[0].dataset.locked === 'true';
        } else if (selected && selected.length > 1) {
            //第一个选中的第一个组件是否是锁定的组件
            locked = selected[0].dataset.locked === 'true';
            if (locked) {
                //后续只能选中锁定的组件
                selected = e.selected.filter((item) => item.dataset.locked === 'true') as HTMLElement[];
            } else {
                //后续只能选中非锁定的组件
                selected = e.selected.filter((item) => item.dataset.locked !== 'true') as HTMLElement[];
            }
        }

        //图层若处于显示状态，则同步勾选图层列表中的元素
        if (e.inputEvent.target.className.indexOf('menu-item') === -1) {
            let targetIds: string[] = [];
            selected.forEach((item: any) => targetIds.push(item.id));
            setTargetIds(targetIds);
        }

        //更新选中的组件
        setTargets(selected);

        //更新选中组件的边框颜色（锁定状态组件为红色，非锁定状态组件为蓝色）
        setControlPointLineColor(locked);

        //若选中多个组件，计算更新组件多选时的左上角坐标
        if (selected.length > 1) {
            let {calculateGroupCoordinate} = eventOperateStore;
            calculateGroupCoordinate(selected);
        }

        //更新底部坐标信息
        let {setCoordinate, setSize} = footerStore;
        const {layoutConfigs} = designerStore;
        if (selected.length === 1) {
            const {position, width, height} = layoutConfigs[selected[0].id];
            setCoordinate([position![0], position![1]]);
            setSize([width!, height!])
        } else if (selected.length > 1) {
            let {groupCoordinate} = eventOperateStore;
            setCoordinate([groupCoordinate.minX!, groupCoordinate.minY!]);
            setSize([groupCoordinate.groupWidth!, groupCoordinate.groupHeight!])
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