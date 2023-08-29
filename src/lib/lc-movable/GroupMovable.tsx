import * as React from "react";
import Moveable, {OnResize, OnResizeGroup} from "react-moveable";
import {observer} from "mobx-react";
import eventOperateStore from "../../designer/operate-provider/EventOperateStore";
import designerStore from "../../designer/store/DesignerStore";
import {MovableItemType} from "./types";
import footerStore from "../../designer/footer/FooterStore";
import historyRecordOperateProxy from "../../designer/operate-provider/undo-redo/HistoryRecordOperateProxy";

interface GroupMovableProps {
    readonly?: boolean;
}

class GroupMovable extends React.Component<GroupMovableProps> {
    movableRef = React.createRef<Moveable>();

    constructor(props: any) {
        super(props);
        this.state = {
            targets: [],
        };
    }

    componentDidMount() {
        const {setMovableRef} = eventOperateStore;
        setMovableRef(this.movableRef);
    }

    onDragEnd = (e: any) => {
        const {updateLayout} = designerStore;
        const {setCoordinate} = footerStore;
        let {backoff, setBackoff} = eventOperateStore;
        const {lastEvent, target} = e;
        if (lastEvent) {
            const {beforeTranslate} = lastEvent;
            const data: MovableItemType[] = [
                {
                    id: target.id,
                    width: target.offsetWidth,
                    height: target.offsetHeight,
                    type: target.dataset.type,
                    position: [beforeTranslate[0], beforeTranslate[1]]
                }
            ];
            //更新组件位置信息
            if (backoff) {
                updateLayout(data, false);
                setBackoff(false);
            } else
                historyRecordOperateProxy.doDrag(data)
            //更新footer组件中的坐标信息
            setCoordinate([beforeTranslate[0], beforeTranslate[1]])
        }
    }

    onDragGroupEnd = (e: any) => {
        const {updateLayout} = designerStore;
        let {backoff, setBackoff, setGroupCoordinate, groupCoordinate} = eventOperateStore;
        let data: MovableItemType[] = [];
        e.events.forEach((ev: any) => {
            const {target, lastEvent} = ev;
            if (lastEvent) {
                const {beforeTranslate} = lastEvent;
                data.push({
                    id: target.id,
                    width: target.offsetWidth,
                    height: target.offsetHeight,
                    type: target.dataset.type,
                    position: [beforeTranslate[0], beforeTranslate[1]]
                })
            }
        })
        //计算多选组件时的坐标信息
        const posChange = e?.lastEvent?.beforeTranslate || [0, 0]
        const minX = groupCoordinate.minX + posChange[0];
        const minY = groupCoordinate.minY + posChange[1];
        setGroupCoordinate({minX, minY})
        //更新组件位置信息并记录操作
        if (data.length > 0) {
            if (backoff) {
                updateLayout(data, false);
                setBackoff(false);
            } else
                historyRecordOperateProxy.doDrag(data)
        }
        //更新footer组件中的最表信息
        const {setCoordinate} = footerStore;
        setCoordinate([minX, minY])
    }

    onResizeEnd = (e: any) => {
        const {updateLayout} = designerStore;
        let {backoff, setBackoff} = eventOperateStore;
        const {target, lastEvent} = e;
        if (lastEvent) {
            const {width, height, drag: {translate}, direction} = lastEvent;
            const data: MovableItemType[] = [
                {
                    id: target.id,
                    width: width,
                    height: height,
                    type: target.dataset.type,
                    position: [translate[0], translate[1]]
                }
            ];
            //更新组件尺寸信息
            if (backoff) {
                updateLayout(data, false);
                setBackoff(false);
            } else
                historyRecordOperateProxy.doResize(data, direction)
            //更新footer组件中的尺寸和坐标信息
            const {setCoordinate, setSize} = footerStore;
            setCoordinate([translate[0], translate[1]])
            setSize([width, height])
        }
    }

    onResizeGroupEnd = (e: any) => {
        const {updateLayout} = designerStore;
        let {backoff, setBackoff} = eventOperateStore;
        let data: MovableItemType[] = [];
        e.events.forEach((ev: any) => {
            const {target, lastEvent} = ev;
            if (lastEvent) {
                const {drag: {translate}} = lastEvent;
                data.push({
                    id: target.id,
                    width: target.offsetWidth,
                    height: target.offsetHeight,
                    type: target.dataset.type,
                    position: [translate[0], translate[1]]
                })
            }
        })
        if (!e.lastEvent) return;
        const {dist, direction} = e.lastEvent;
        //更新组件尺寸和坐标信息
        if (data.length > 0) {
            if (backoff) {
                updateLayout(data, false);
                setBackoff(false);
            } else
                historyRecordOperateProxy.doResize(data, direction)

            //组件多选情况下，重新计算多选组件的尺寸和坐标信息
            const {setGroupCoordinate, groupCoordinate} = eventOperateStore;
            const {setCoordinate, setSize} = footerStore;
            if (direction[0] === -1 || direction[1] === -1) {
                //缩放元素左侧或上侧，此时需要同时改变坐标
                setGroupCoordinate({
                    minX: groupCoordinate.minX! - dist[0],
                    minY: groupCoordinate.minY! - dist[1],
                    groupWidth: groupCoordinate.groupWidth + dist[0],
                    groupHeight: groupCoordinate.groupHeight + dist[1],
                })
                setCoordinate([groupCoordinate.minX!, groupCoordinate.minY!])
            } else {
                setGroupCoordinate({
                    groupWidth: groupCoordinate.groupWidth + dist[0],
                    groupHeight: groupCoordinate.groupHeight + dist[1],
                })
            }
            setSize([groupCoordinate.groupWidth!, groupCoordinate.groupHeight!])
        }
    }

    onResizeGroup = (e: OnResizeGroup) => {
        e.events.forEach((ev: OnResize) => {
            ev.target.style.width = `${ev.width}px`;
            ev.target.style.height = `${ev.height}px`;
            ev.target.style.transform = ev.drag.transform;
        })
    }

    onResize = (e: OnResize) => {
        const {target, width, height, drag} = e;
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
    }

    render() {
        const {readonly = false} = this.props;
        const {selectorRef, targets} = eventOperateStore;
        const {canvasConfig: {rasterize, dragStep, resizeStep}} = designerStore;
        return (
            <>
                {this.props.children}
                <Moveable ref={this.movableRef}
                          target={targets}
                          draggable={!readonly}
                          resizable={!readonly}
                          keepRatio={false}
                          throttleDrag={rasterize ? dragStep : 1}
                          throttleResize={rasterize ? resizeStep : 1}
                          onClickGroup={e => {
                              (selectorRef.current as any)?.clickTarget(e.inputEvent, e.inputTarget);
                          }}
                          onDrag={({target, beforeTranslate}) => {
                              target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                          }}
                          onDragEnd={this.onDragEnd}
                          onDragGroup={e => e.events.forEach(ev => ev.target.style.transform = ev.transform)}
                          onDragGroupEnd={this.onDragGroupEnd}
                          onResize={this.onResize}
                          onResizeEnd={this.onResizeEnd}
                          onResizeGroup={this.onResizeGroup}
                          onResizeGroupEnd={this.onResizeGroupEnd}
                />
            </>
        );
    }
}

export default observer(GroupMovable);