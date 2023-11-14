import * as React from "react";
import Moveable, {
    MoveableManagerInterface,
    OnDrag,
    OnDragEnd,
    OnDragGroup,
    OnDragGroupEnd,
    OnDragStart,
    OnResize,
    OnResizeEnd,
    OnResizeGroup,
    OnResizeGroupEnd,
    OnResizeGroupStart,
    OnResizeStart
} from "react-moveable";
import {observer} from "mobx-react";
import eventOperateStore from "../EventOperateStore";
import designerStore from "../../store/DesignerStore";
import {MovableItemType} from "./types";
import historyRecordOperateProxy from "../undo-redo/HistoryRecordOperateProxy";

interface GroupMovableProps {
    readonly?: boolean;
}

class GroupMovable extends React.Component<GroupMovableProps> {
    movableRef = React.createRef<Moveable>();
    verticalGuidelines: number[] = [];
    horizontalGuidelines: number[] = [];

    constructor(props: GroupMovableProps) {
        super(props);
        this.state = {
            targets: [],
        };
        const {canvasConfig: {width, height}} = designerStore;
        this.verticalGuidelines = this.generateSnapStep(50, width!);
        this.horizontalGuidelines = this.generateSnapStep(50, height!);
    }

    componentDidMount() {
        const {setMovableRef} = eventOperateStore;
        setMovableRef(this.movableRef);
    }

    onDragStart = (e: OnDragStart) => {
        const {target} = e;
        const {layoutConfigs} = designerStore;
        const {lock} = layoutConfigs[target.id];
        if (lock) return false;
    }

    onDragEnd = (e: OnDragEnd) => {
        const {updateLayout} = designerStore;
        let {backoff, setBackoff} = eventOperateStore;
        const {lastEvent, target} = e;
        if (lastEvent) {
            const {beforeTranslate} = lastEvent;
            const data: MovableItemType[] = [
                {
                    id: target.id,
                    width: (target as HTMLDivElement).offsetWidth,
                    height: (target as HTMLDivElement).offsetHeight,
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
        }
    }

    onDragGroupEnd = (e: OnDragGroupEnd) => {
        const {targets} = e;
        //通过第一个元素来判断。 框选的所有组件是否处于锁定状态，处于锁定状态，则不允许拖拽和缩放。
        const {updateLayout, layoutConfigs} = designerStore;
        const firstLock = layoutConfigs[targets[0].id].lock;
        if (firstLock) return false;

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
    }

    onResizeEnd = (e: OnResizeEnd) => {
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
                historyRecordOperateProxy.doResize(data, direction);
        }
    }

    onResizeGroupEnd = (e: OnResizeGroupEnd) => {
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
            if (direction[0] === -1 || direction[1] === -1) {
                //缩放元素左侧或上侧，此时需要同时改变坐标
                setGroupCoordinate({
                    minX: groupCoordinate.minX! - dist[0],
                    minY: groupCoordinate.minY! - dist[1],
                    groupWidth: groupCoordinate.groupWidth + dist[0],
                    groupHeight: groupCoordinate.groupHeight + dist[1],
                })
            } else {
                setGroupCoordinate({
                    groupWidth: groupCoordinate.groupWidth + dist[0],
                    groupHeight: groupCoordinate.groupHeight + dist[1],
                })
            }
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

    onResizeStart = (e: OnResizeStart) => {
        const {target} = e;
        const {layoutConfigs} = designerStore;
        const {lock} = layoutConfigs[target.id];
        if (lock) return false;
    }

    onDrag = (e: OnDrag) => {
        const {target, beforeTranslate} = e;
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    }

    onDragGroup = (e: OnDragGroup) => {
        const {targets} = e;
        const {layoutConfigs} = designerStore;
        //通过第一个元素来判断。 框选的所有组件是否处于锁定状态，处于锁定状态，则不允许拖拽和缩放。
        const firstLock = layoutConfigs[targets[0].id].lock;
        if (firstLock)
            return false;
        else
            e.events.forEach(ev => ev.target.style.transform = ev.transform)
    }

    onResizeGroupStart = (e: OnResizeGroupStart) => {
        const {targets} = e;
        const {layoutConfigs} = designerStore;
        const firstLock = layoutConfigs[targets[0].id].lock;
        if (firstLock) return false;
    }

    generateSnapStep = (step: number, max: number) => {
        let snapStep = [];
        for (let i = 0; i < max; i += step)
            snapStep.push(i);
        return snapStep;
    }

    render() {
        const {readonly = false} = this.props;
        const {selectorRef, targets, scale} = eventOperateStore;
        const {canvasConfig: {rasterize, dragStep, resizeStep}} = designerStore;
        //获取需要辅助线导航的元素
        const selectedTargets = document.getElementsByClassName("lc-comp-item");
        return (
            <>
                {this.props.children}
                <Moveable<DimensionViewableProps>
                    ref={this.movableRef}
                    target={targets}
                    zoom={1 / scale}
                    draggable={!readonly}
                    resizable={!readonly}
                    keepRatio={false}

                    maxSnapElementGapDistance={100}
                    maxSnapElementGuidelineDistance={100}
                    snappable={true}
                    snapGap={true}
                    snapThreshold={5}
                    isDisplaySnapDigit={true}
                    snapDirections={{
                        top: true,
                        right: true,
                        bottom: true,
                        left: true,
                        center: true,
                        middle: true
                    }}
                    elementSnapDirections={{
                        top: true,
                        right: true,
                        bottom: true,
                        left: true,
                        center: true,
                        middle: true
                    }}
                    ables={[DimensionViewable as any]}
                    dimensionViewable={true}
                    roundable={true}
                    verticalGuidelines={this.verticalGuidelines}
                    horizontalGuidelines={this.horizontalGuidelines}
                    isDisplayInnerSnapDigit={true}
                    isDisplayGridGuidelines={true}
                    isDisplayShadowRoundControls={true}
                    displayAroundControls={true}
                    clipArea={true}
                    clipVerticalGuidelines={[0, "50%", "100%"]}
                    clipHorizontalGuidelines={[0, "50%", "100%"]}
                    clipTargetBounds={true}
                    elementGuidelines={Array.from(selectedTargets!)}

                    throttleDrag={rasterize ? dragStep : 1}
                    throttleResize={rasterize ? resizeStep : 1}
                    onClickGroup={e => (selectorRef.current as any)?.clickTarget(e.inputEvent, e.inputTarget)}
                    onDrag={this.onDrag}
                    onDragStart={this.onDragStart}
                    onDragEnd={this.onDragEnd}
                    onDragGroup={this.onDragGroup}
                    onDragGroupEnd={this.onDragGroupEnd}
                    onResizeStart={this.onResizeStart}
                    onResize={this.onResize}
                    onResizeEnd={this.onResizeEnd}
                    onResizeGroupStart={this.onResizeGroupStart}
                    onResizeGroup={this.onResizeGroup}
                    onResizeGroupEnd={this.onResizeGroupEnd}
                />
            </>
        );
    }
}

export default observer(GroupMovable);


export interface DimensionViewableProps {
    dimensionViewable?: boolean;
}

export const DimensionViewable = {
    name: "dimensionViewable",
    props: {
        dimensionViewable: Boolean,
    },
    events: {},
    render(moveable: MoveableManagerInterface) {
        const rect = moveable.getRect();

        //todo 思考如何保证缩放比例？
        return <div key={"dimension-viewer"} className={"moveable-dimension"} style={{
            left: `-125px`,
            top: `-60px`,
            color: "#cacacaff",
            fontSize: "14px",
            position: 'absolute',
            boxSizing: 'content-box',
            borderRadius: '5px',
            padding: '5px',
            pointerEvents: 'none',
        }}>
            <div>
                <p>位置: {Math.round(rect.left)} x {Math.round(rect.top)}</p>
                <p>尺寸: {Math.round(rect.offsetWidth)} x {Math.round(rect.offsetHeight)}</p>
            </div>
        </div>
    }
} as const;
