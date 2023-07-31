import React, {Component} from 'react';
import Selecto from "react-selecto";
import eventOperateStore from "../../designer/operate-provider/EventOperateStore";
import {observer} from "mobx-react";

class GroupSelectable extends Component {
    selectorRef = React.createRef<Selecto>();

    componentDidMount() {
        const {setSelectorRef} = eventOperateStore;
        setSelectorRef(this.selectorRef);
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
                             if (!movableRef) return;
                             const movable: any = movableRef.current;
                             const target = e.inputEvent.target;
                             if ((movable.isMoveableElement(target))
                                 || targets.some((t: any) => t === target || t.contains(target))
                             ) {
                                 e.stop();
                             }
                         }}
                         onSelectEnd={e => {
                             const {movableRef, setTargets, setTargetIds} = eventOperateStore;
                             if (!movableRef) return;
                             const movable: any = movableRef.current;
                             if (e.isDragStart) {
                                 e.inputEvent.preventDefault();
                                 setTimeout(() => {
                                     movable.dragStart(e.inputEvent);
                                 });
                             }
                             let selected = e.selected.filter((item: any) => {
                                 return item.dataset.locked !== 'true';
                             });
                             if (e.inputEvent.target.className.indexOf('menu-item') === -1) {
                                 let targetIds: string[] = [];
                                 selected.forEach((item: any) => targetIds.push(item.id));
                                 setTargetIds(targetIds);
                             }
                             setTargets(selected);
                         }}
                />
            </>
        );
    }
}

export default observer(GroupSelectable);