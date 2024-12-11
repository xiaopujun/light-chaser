import React, {useEffect} from "react";
import Moveable, {OnDrag, OnDragEnd, OnDragGroup, OnDragGroupEnd, OnDragStart} from "react-moveable";
import bluePrintManager, {IBPLine, IPoint} from "../manager/BluePrintManager.ts";
import {observer} from "mobx-react";
import CanvasUtil from "../util/CanvasUtil";

export interface BPMovableProps {
    children?: React.ReactNode;
}

export const reRenderAllLine = () => {
    const {bpLines} = bluePrintManager;
    reRenderLine(Object.values(bpLines));
}

export const reRenderLine = (lines: IBPLine[]) => {
    const {downCtx, canvasOffset, nodeContainerRef} = bluePrintManager;
    const {width: canvasW, height: canvasH} = nodeContainerRef?.getBoundingClientRect()!;
    //更新每条线的起始点和终点
    lines.forEach((line: IBPLine) => {
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
    });

    //重新绘制连线
    downCtx!.clearRect(0, 0, canvasW + 10, canvasH + 10);
    CanvasUtil.drawBezierCurves(downCtx!, lines);
}

export const updNodeAndLinePos = (nodeId: string, position: IPoint) => {
    const {
        bpNodeControllerInsMap, bpAPLineMap, bpLines,
        updLinePos, updBpNodeLayout, canvasOffset
    } = bluePrintManager;
    //更新节点位置
    updBpNodeLayout({
        id: nodeId,
        position: {
            x: position.x,
            y: position.y
        }
    })
    //更新线段位置
    const bpNodeCtrlIns = bpNodeControllerInsMap[nodeId];
    const {input = [], output = []} = bpNodeCtrlIns.getConfig();
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
            const {setBpMovableRef} = bluePrintManager;
            setBpMovableRef(movableRef.current!);
        })

        const onDrag = (e: OnDrag) => {
            const {target, beforeTranslate} = e;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
            reRenderAllLine();
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
            CanvasUtil.updSegmentSamplingPoint();
        }

        const onDragGroup = (e: OnDragGroup) => {
            e.events.forEach((ev: OnDrag) => ev.target.style.transform = ev.transform);
            //重绘连线
            reRenderAllLine();
        }

        const onDragGroupEnd = (e: OnDragGroupEnd) => {
            e.events.forEach((ev: OnDragEnd) => {
                const {target, lastEvent} = ev;
                if (lastEvent) {
                    const nodeId = target.id.split(':')[1];
                    const {beforeTranslate} = lastEvent;
                    updNodeAndLinePos(nodeId, {x: beforeTranslate[0], y: beforeTranslate[1]});
                }
            })
            CanvasUtil.updSegmentSamplingPoint();
        }

        const {selectedNodes} = bluePrintManager;
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
                          onDragGroup={onDragGroup}
                          onDragGroupEnd={onDragGroupEnd}
                />
            </>
        )
    }
)
