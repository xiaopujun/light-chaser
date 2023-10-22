import React, {useEffect} from "react";
import LineLayer from "./line/LineLayer";
import {NodeLayer} from "./node/NodeLayer";
import {reRenderLine} from "./drag/BPMovable";
import bpStore from "./store/BPStore";
import CanvasUtil from "./util/CanvasUtil";
import {CanvasLineType} from "./types";

/**
 * todo 该方法要做性能优化，考虑防抖避免频繁采样和线段重复绘制，用算法做好碰撞检测
 * 蓝图画布点击事件，监控鼠标是否命中线段
 * @param event
 */
const lineSegmentCollisions = (event: MouseEvent) => {
    const {clientX, clientY, shiftKey} = event;
    const {selectedLines, setSelectedLines, downCtx} = bpStore;
    //清除之前的选中线
    if (selectedLines.length > 0) {
        selectedLines.forEach((line) => {
            line.lineWidth = 1;
            line.color = '#a2a2a2';
            //todo 需要做好性能优化，非必要的线可以不用重复渲染
            reRenderLine();
        });
        setSelectedLines([]);
    }
    if (!shiftKey) return;
    const {bpLines, canvasOffset} = bpStore;
    const targetLines: CanvasLineType[] = [];
    const mousePoint = {x: clientX - canvasOffset.x, y: clientY - canvasOffset.y};
    Object.values(bpLines).forEach((line) => {
        CanvasUtil.isMouseInRectangle(mousePoint, line.startPoint!, line.endPoint!) && targetLines.push(line);
    });
    if (targetLines.length === 0) return;
    //遍历有效范围内的线条是否命中
    const hitLines: CanvasLineType[] = [];
    for (let i = 0; i < targetLines.length; i++) {
        const targetLine = targetLines[i];
        const {samplePoints} = targetLine!;
        if (CanvasUtil.isMouseOnLine(mousePoint, samplePoints!, 5)) {
            targetLine.lineWidth = 2;
            targetLine.color = '#1ad6ff';
            hitLines.push(targetLine);
            CanvasUtil.drawBezierCurves(downCtx!, targetLine);
            break;
        }
    }
    setSelectedLines(hitLines);
}

export const BPCanvas: React.FC = () => {
    useEffect(() => {
        //加载完毕后绘制链接线
        reRenderLine();
        const {nodeContainerRef} = bpStore;
        nodeContainerRef?.addEventListener('click', lineSegmentCollisions);
    }, [])
    return (
        <div className={'blue-print'} id={'blue-print'} style={{overflow: "hidden"}}>
            <LineLayer/>
            <NodeLayer/>
        </div>
    )
}
