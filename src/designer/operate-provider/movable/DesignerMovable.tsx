import * as React from "react";
import Moveable, {
    MoveableManagerInterface,
    OnClickGroup,
    OnDrag,
    OnDragEnd,
    OnDragGroup,
    OnDragGroupEnd,
    OnDragGroupStart,
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
import historyRecordOperateProxy from "../undo-redo/HistoryRecordOperateProxy";
import {ILayerItem} from "../../DesignerType";
import './DesignerMovable.less';
import baseInfoStore from "../../../comps/common-component/base-info/BaseInfoStore";
import LayerUtil from "../../left/layer-list/util/LayerUtil";

export interface DesignerMovableProps {
    children?: React.ReactNode;
}

export interface DesignerMovableState {
    throttleDragRotate: number;
    keepRatio: boolean;
}

class DesignerMovable extends React.Component<DesignerMovableProps, DesignerMovableState> {
    movableRef = React.createRef<Moveable>();

    constructor(props: {}) {
        super(props);
        this.state = {
            throttleDragRotate: 0,
            keepRatio: false
        };
    }

    componentDidMount() {
        const {setMovableRef} = eventOperateStore;
        setMovableRef(this.movableRef.current!);
    }

    onDragStart = (e: OnDragStart) => {
        const {target, inputEvent} = e;
        const {layerConfigs} = designerStore;
        const {lock} = layerConfigs[target.id];
        if (lock) return false;
        if (inputEvent && inputEvent.shiftKey)
            this.setState({throttleDragRotate: 90});
    }

    onDrag = (e: OnDrag) => {
        const {target, beforeTranslate} = e;
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    }

    onDragEnd = (e: OnDragEnd) => {
        const {updateLayer} = designerStore;
        let {backoff, setBackoff} = eventOperateStore;
        const {lastEvent, target} = e;
        if (lastEvent) {
            const {beforeTranslate} = lastEvent;
            const data: ILayerItem[] = [
                {
                    id: target.id,
                    width: (target as HTMLDivElement).offsetWidth,
                    height: (target as HTMLDivElement).offsetHeight,
                    type: target.dataset.type,
                    x: beforeTranslate[0],
                    y: beforeTranslate[1]
                }
            ];
            //更新组件位置信息
            if (backoff) {
                updateLayer(data, false);
                setBackoff(false);
            } else
                historyRecordOperateProxy.doDrag(data);
            //更新右侧菜单中的位置信息
            const {updateBaseConfig} = baseInfoStore;
            updateBaseConfig(data[0]);
        }
        const {throttleDragRotate} = this.state;
        if (throttleDragRotate !== 0)
            this.setState({throttleDragRotate: 0});
    }

    onDragGroupStart = (e: OnDragGroupStart) => {
        const {inputEvent} = e;
        if (inputEvent && inputEvent.shiftKey)
            this.setState({throttleDragRotate: 90});
    }

    onDragGroup = (e: OnDragGroup) => {
        const {targets} = e;
        const {layerConfigs} = designerStore;
        //通过第一个元素来判断。 框选的所有组件是否处于锁定状态，处于锁定状态，则不允许拖拽和缩放。
        const firstLock = layerConfigs[targets[0].id].lock;
        if (firstLock)
            return false;
        else
            e.events.forEach(ev => ev.target.style.transform = ev.transform)
    }

    onDragGroupEnd = (e: OnDragGroupEnd) => {
        const {targets} = e;
        //通过第一个元素来判断。 框选的所有组件是否处于锁定状态，处于锁定状态，则不允许拖拽和缩放。
        const {updateLayer, layerConfigs} = designerStore;
        const firstLock = layerConfigs[targets[0].id].lock;
        if (firstLock) return false;

        let {backoff, setBackoff, setGroupCoordinate, groupCoordinate, targetIds} = eventOperateStore;
        let data: ILayerItem[] = [];
        e.events.forEach((ev: OnDragEnd) => {
            const {target, lastEvent} = ev;
            if (lastEvent) {
                const {beforeTranslate} = lastEvent;
                data.push({
                    id: target.id,
                    width: (target as HTMLElement).offsetWidth,
                    height: (target as HTMLElement).offsetHeight,
                    type: target.dataset.type,
                    x: beforeTranslate[0],
                    y: beforeTranslate[1]
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
                updateLayer(data, false);
                setBackoff(false);
            } else
                historyRecordOperateProxy.doDrag(data)
        }
        const {throttleDragRotate} = this.state;
        if (throttleDragRotate !== 0)
            this.setState({throttleDragRotate: 0});
        //更新右侧菜单中的位置信息
        const layerIds = LayerUtil.findTopGroupLayer(targetIds, true);
        if (layerIds.length === 1) {
            const {updateBaseConfig} = baseInfoStore;
            updateBaseConfig({
                id: layerIds[0],
                x: Math.round(minX),
                y: Math.round(minY),
            });
        }
    }

    onResizeStart = (e: OnResizeStart) => {
        const {target, inputEvent} = e;
        const {layerConfigs} = designerStore;
        const {lock} = layerConfigs[target.id];
        if (lock) return false;
        if (inputEvent && inputEvent.ctrlKey)
            this.setState({keepRatio: true});
    }

    onResize = (e: OnResize) => {
        const {target, width, height, drag} = e;
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
    }

    onResizeEnd = (e: OnResizeEnd) => {
        const {updateLayer} = designerStore;
        let {backoff, setBackoff} = eventOperateStore;
        const {target, lastEvent} = e;
        if (lastEvent) {
            const {width, height, drag: {translate}, direction} = lastEvent;
            const data: ILayerItem[] = [
                {
                    id: target.id,
                    width: width,
                    height: height,
                    type: target.dataset.type,
                    x: translate[0],
                    y: translate[1],
                }
            ];
            //更新组件尺寸信息
            if (backoff) {
                updateLayer(data, false);
                setBackoff(false);
            } else
                historyRecordOperateProxy.doResize(data, direction);
            //更新右侧菜单中的尺寸信息
            const {updateBaseConfig} = baseInfoStore;
            updateBaseConfig(data[0]);
        }
        const {keepRatio} = this.state;
        if (keepRatio)
            this.setState({keepRatio: false});
    }

    onResizeGroupStart = (e: OnResizeGroupStart) => {
        const {targets, inputEvent} = e;
        const {layerConfigs} = designerStore;
        const firstLock = layerConfigs[targets[0].id].lock;
        if (firstLock) return false;
        if (inputEvent && inputEvent.ctrlKey)
            this.setState({keepRatio: true});
    }

    onResizeGroup = (e: OnResizeGroup) => {
        e.events.forEach((ev: OnResize) => {
            ev.target.style.width = `${ev.width}px`;
            ev.target.style.height = `${ev.height}px`;
            ev.target.style.transform = ev.drag.transform;
        })
    }

    onResizeGroupEnd = (e: OnResizeGroupEnd) => {
        const {updateLayer} = designerStore;
        let {backoff, setBackoff, targetIds} = eventOperateStore;
        let data: ILayerItem[] = [];
        e.events.forEach((ev: OnResizeEnd) => {
            const {target, lastEvent} = ev;
            if (lastEvent) {
                const {drag: {translate}} = lastEvent;
                data.push({
                    id: target.id,
                    width: (target as HTMLElement).offsetWidth,
                    height: (target as HTMLElement).offsetHeight,
                    type: target.dataset.type,
                    x: translate[0],
                    y: translate[1]
                })
            }
        })
        if (!e.lastEvent) return;
        const {dist, direction} = e.lastEvent;
        //更新组件尺寸和坐标信息
        if (data.length > 0) {
            if (backoff) {
                updateLayer(data, false);
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
            //更新右侧菜单中的尺寸，位置信息
            const layerIds = LayerUtil.findTopGroupLayer(targetIds, true);
            if (layerIds.length === 1) {
                const {updateBaseConfig} = baseInfoStore;
                updateBaseConfig({
                    id: layerIds[0],
                    x: Math.round(groupCoordinate.minX!),
                    y: Math.round(groupCoordinate.minY!),
                    width: Math.round(groupCoordinate.groupWidth!),
                    height: Math.round(groupCoordinate.groupHeight!)
                });
            }
        }
        const {keepRatio} = this.state;
        if (keepRatio)
            this.setState({keepRatio: false});
    }

    render() {
        const {throttleDragRotate, keepRatio} = this.state;
        const {selectorRef, targets} = eventOperateStore;
        const {canvasConfig: {rasterize, dragStep, resizeStep}} = designerStore;
        //获取需要辅助线导航的元素 todo 思考是否可以优化？是否每次都要进行一次过滤
        const selectedTargets = Array.from(document.getElementsByClassName("lc-comp-item"))
            .filter((item) => !targets.includes(item as HTMLElement));
        return (
            <>
                {this.props.children}
                <Moveable<DimensionViewableProps>
                    ref={this.movableRef}
                    target={targets}
                    draggable={true}
                    resizable={true}
                    //保持尺寸比例
                    keepRatio={keepRatio}
                    throttleDragRotate={throttleDragRotate}

                    //辅助线设置
                    hideChildMoveableDefaultLines={true}
                    maxSnapElementGuidelineDistance={200}
                    isDisplaySnapDigit={true}
                    snappable={true}
                    snapGap={false}
                    snapThreshold={5}
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
                    verticalGuidelines={['0', '100%']}
                    horizontalGuidelines={['0', '100%']}
                    isDisplayInnerSnapDigit={true} //控件内部显示辅助线
                    elementGuidelines={Array.from(selectedTargets!)} //可拖拽元素辅助线

                    //外挂dom元素
                    ables={[DimensionViewable as any]}
                    dimensionViewable={true}
                    throttleDrag={rasterize ? dragStep : 1}
                    throttleResize={rasterize ? resizeStep : 1}
                    onClickGroup={(e: OnClickGroup) => selectorRef?.clickTarget(e.inputEvent, e.inputTarget)}
                    onDrag={this.onDrag}
                    onDragStart={this.onDragStart}
                    onDragEnd={this.onDragEnd}
                    onDragGroupStart={this.onDragGroupStart}
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

export default observer(DesignerMovable);


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
