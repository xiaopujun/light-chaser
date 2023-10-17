import React, {useEffect} from "react";
import Moveable, {OnDrag, OnDragStart} from "react-moveable";
import bpStore from "../store/BPStore";
import {observer} from "mobx-react";
import {CanvasLineType} from "../types";
import CanvasUtil from "../util/CanvasUtil";

export interface BPMovableProps {
    children?: React.ReactNode;
}

export const reRenderLine = () => {
    const {connectedLines, downCtx, canvasOffset} = bpStore;
    //更新每条线的起始点和终点
    connectedLines.forEach((line: CanvasLineType) => {
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
    downCtx!.clearRect(0, 0, 10000, 10000);
    connectedLines.forEach((line: CanvasLineType) => {
        CanvasUtil.drawBezierCurves(downCtx!, line);
    })
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
    const {selectedNodes} = bpStore;
    return (
        <>
            {children}
            <Moveable ref={movableRef}
                      target={selectedNodes}
                      draggable={true}
                      origin={false}
                      onDrag={onDrag}
                      hideDefaultLines={true}
                      onDragStart={(e: OnDragStart) => {
                          const {inputEvent: {target}} = e;
                          if (target.classList.contains('ap-circle'))
                              return false;
                      }}
            />
        </>
    )
})
