import React, {Component} from 'react';
import Selecto from "react-selecto";
import eventOperateStore from "../../designer/operate-provider/EventOperateStore";
import {observer} from "mobx-react";
import Moveable from 'react-moveable';
import footerStore from "../../designer/footer/FooterStore";
import designerStore from "../../designer/store/DesignerStore";

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