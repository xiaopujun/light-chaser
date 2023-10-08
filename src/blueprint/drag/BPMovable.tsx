import React, {useEffect} from "react";
import Moveable, {OnDrag, OnDragStart} from "react-moveable";
import bpStore from "../store/BPStore";
import {observer} from "mobx-react";
import {CanvasLineType} from "../types";
import CanvasUtil from "../util/CanvasUtil";

export interface BPMovableProps {
    children?: React.ReactNode;
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

        const {connectedLines, downCtx} = bpStore;
        //更新每条线的起始点和终点
        connectedLines.forEach((line: CanvasLineType) => {
            //重新设置连线的起始点和终点
            const {startDom, endDom} = line;
            const {left: startX, top: startY} = startDom!.getBoundingClientRect();
            const {left: endX, top: endY} = endDom!.getBoundingClientRect();
            //+5定位到锚点中心
            line.startPoint = [startX + 5 - 60, startY + 5 - 40];
            line.endPoint = [endX + 5 - 60, endY + 5 - 40];
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
