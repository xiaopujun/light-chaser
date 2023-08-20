import React, {Component} from 'react';
import Selecto from "react-selecto";
import eventOperateStore from "../../designer/operate-provider/EventOperateStore";
import {observer} from "mobx-react";
import Moveable from 'react-moveable';

class GroupSelectable extends Component {
    selectorRef = React.createRef<Selecto>();

    componentDidMount() {
        const {setSelectorRef} = eventOperateStore;
        setSelectorRef(this.selectorRef);
    }

    onSelectEnd = (e: any) => {
        const {movableRef, setTargets, setTargetIds} = eventOperateStore;
        if (!movableRef) return;
        const movable: Moveable = movableRef!.current!;
        if (e.isDragStart) {
            e.inputEvent.preventDefault();
            setTimeout(() => {
                movable.dragStart(e.inputEvent);
            });
        }
        let selected = e.selected.filter((item: any) => {
            return item.dataset.locked !== 'true';
        });
        //如果展示了图层列表，则同步勾选图层列表中的元素
        if (e.inputEvent.target.className.indexOf('menu-item') === -1) {
            let targetIds: string[] = [];
            selected.forEach((item: any) => targetIds.push(item.id));
            setTargetIds(targetIds);
        }
        setTargets(selected);
        if (selected.length > 1) {
            //计算组件多选时的左上角坐标
            let {calculateGroupRootCoordinate} = eventOperateStore;
            calculateGroupRootCoordinate(selected);
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
                         onDragStart={e => {
                             const {movableRef, targets} = eventOperateStore;
                             const movable: Moveable = movableRef!.current!;
                             const target = e.inputEvent.target;
                             if ((movable.isMoveableElement(target))
                                 || targets.some((t: any) => t === target || t.contains(target))
                             ) {
                                 e.stop();
                             }
                         }}
                         onSelectEnd={this.onSelectEnd}
                />
            </>
        );
    }
}

export default observer(GroupSelectable);