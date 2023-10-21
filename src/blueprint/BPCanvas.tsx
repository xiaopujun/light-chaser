import React, {useEffect} from "react";
import LineLayer from "./line/LineLayer";
import {NodeLayer} from "./node/NodeLayer";
import {reRenderLine} from "./drag/BPMovable";
import bpStore from "./store/BPStore";
import CanvasUtil from "./util/CanvasUtil";
import {CanvasLineType} from "./types";

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
    for (let i = 0; i < targetLines.length; i++) {
        const targetLine = targetLines[i];
        const {samplePoints, id} = targetLine!;
        if (CanvasUtil.isMouseOnLine(mousePoint, samplePoints!, 3)) {
            selectedLines.push(targetLine);
            targetLine.lineWidth = 2;
            targetLine.color = '#1ad6ff';
            CanvasUtil.drawBezierCurves(downCtx!, targetLine);
            break;
        }
    }
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




