import React, {useEffect} from "react";
import Moveable, {OnDrag, OnDragEnd, OnDragStart} from "react-moveable";
import bpStore from "../store/BPStore";
import {observer} from "mobx-react";
import {CanvasLineType, PointType} from "../types";
import CanvasUtil from "../util/CanvasUtil";

export interface BPMovableProps {
    children?: React.ReactNode;
}

export const reRenderLine = () => {
    const {bpLines, downCtx, canvasOffset} = bpStore;
    //更新每条线的起始点和终点
    Object.values(bpLines).forEach((line: CanvasLineType) => {
        //重新设置连线的起始点和终点
        const {startAnchorId, endAnchorId} = line;
        const startDom = document.getElementById(startAnchorId!);
        const endDom = document.getElementById(endAnchorId!);
        const {x: startX, y: startY, width: startW, height: startH} = startDom!.getBoundingClientRect();
        const {x: endX, y: endY, width: endW, height: endH} = endDom!.getBoundingClientRect();
        //定位到锚点中心
        line.startPoint = {
            x: startX + (startW / 2) - canvasOffset.x,
            y: startY + (startH / 2) - canvasOffset.y
        };
        line.endPoint = {
            x: endX + (endW / 2) - canvasOffset.x,
            y: endY + (endH / 2) - canvasOffset.y
        };
        //重新计算二次贝塞尔曲线的控制点
        const controlPoi = CanvasUtil.calculateControlPoint(line.startPoint, line.endPoint);
        line.firstCP = controlPoi.firstCP;
        line.secondCP = controlPoi.secondCP;
        //重新计算采样点
        const {startPoint, firstCP, secondCP, endPoint} = line;
        line.samplePoints = CanvasUtil.sampleBezierCurve(startPoint!, firstCP!, secondCP!, endPoint, 20);
    });

    //重新绘制连线
    downCtx!.clearRect(0, 0, 10000, 10000);
    Object.values(bpLines).forEach((line: CanvasLineType) => {
        CanvasUtil.drawBezierCurves(downCtx!, line);
    })
}

export const updNodeAndLinePos = (nodeId: string, position: PointType) => {
    const {bpNodes, updNodePos, bpAPLineMap, bpLines, updLinePos, canvasOffset} = bpStore;
    //更新节点位置
    updNodePos({
        id: nodeId,
        position: {
            x: position.x,
            y: position.y
        }
    });
    //更新线段位置
    const {input = [], output = []} = bpNodes[nodeId];
    const aps = [...input!, ...output!];
    aps && aps.forEach(ap => {
        const lineIds = bpAPLineMap[ap.id!];
        lineIds && lineIds.forEach(lineId => {
            const lineInfo = bpLines[lineId];
            if (lineInfo) {
                const {startAnchorId, endAnchorId} = lineInfo;
                const startDom = document.getElementById(startAnchorId!);
                const endDom = document.getElementById(endAnchorId!);
                const {x: startX, y: startY, width: startW, height: startH} = startDom!.getBoundingClientRect();
                const {x: endX, y: endY, width: endW, height: endH} = endDom!.getBoundingClientRect();
                updLinePos({
                    id: lineId,
                    //定位到锚点中心
                    startPoint: {
                        x: startX + (startW / 2) - canvasOffset.x,
                        y: startY + (startH / 2) - canvasOffset.y
                    },
                    endPoint: {
                        x: endX + (endW / 2) - canvasOffset.x,
                        y: endY + (endH / 2) - canvasOffset.y
                    }
                })
            }
        })
    });
}

export const BPMovable = observer((props: BPMovableProps) => {
        const {children} = props;
        const movableRef = React.createRef<Moveable>();

        useEffect(() => {
            const {setBpMovableRef} = bpStore;
            setBpMovableRef(movableRef.current!);
        })

        const onDrag = (e: OnDrag) => {
            const {target, beforeTranslate} = e;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
            //重绘连线
            reRenderLine();
        }

        const onDragStart = (e: OnDragStart) => {
            const {inputEvent: {target}} = e;
            //点击锚点时禁止拖拽
            if (target.classList.contains('ap-circle'))
                return false;
        }

        const onDragEnd = (e: OnDragEnd) => {
            const {target, lastEvent} = e;
            //仅点击而不是拖拽则不处理
            if (!lastEvent) return;
            const {beforeTranslate} = lastEvent;
            const nodeId = target.id.split(':')[1];
            updNodeAndLinePos(nodeId, {x: beforeTranslate[0], y: beforeTranslate[1]});
        }

        const onDragGroupStart = (e: any) => {
            // console.log(e)
        }

        const onDragGroup = (e: any) => {
            e.events.forEach((ev: any) => ev.target.style.transform = ev.transform);
            //重绘连线
            reRenderLine();
        }

        const onDragGroupEnd = (e: any) => {
            e.events.forEach((ev: any) => {
                const {target, lastEvent} = ev;
                if (lastEvent) {
                    const nodeId = target.id.split(':')[1];
                    const {beforeTranslate} = lastEvent;
                    updNodeAndLinePos(nodeId, {x: beforeTranslate[0], y: beforeTranslate[1]});
                }
            })
        }

        const {selectedNodes} = bpStore;
        return (
            <>
                {children}
                <Moveable ref={movableRef}
                          target={selectedNodes}
                          draggable={true}
                          origin={false}
                          hideDefaultLines={true}
                          onDragStart={onDragStart}
                          onDrag={onDrag}
                          onDragEnd={onDragEnd}
                          onDragGroupStart={onDragGroupStart}
                          onDragGroup={onDragGroup}
                          onDragGroupEnd={onDragGroupEnd}
                />
            </>
        )
    }
)
