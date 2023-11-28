import React, {useEffect} from "react";
import LineLayer from "./line/LineLayer";
import {NodeLayer} from "./node/NodeLayer";
import {reRenderAllLine} from "./drag/BPMovable";
import bpStore, {IBPLine} from "./store/BPStore";
import CanvasUtil from "./util/CanvasUtil";

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
            reRenderAllLine();
            CanvasUtil.updSegmentSamplingPoint();
        });
        setSelectedLines([]);
    }
    if (!shiftKey) return;
    const {bpLines, canvasOffset} = bpStore;
    const targetLines: IBPLine[] = [];
    const mousePoint = {x: clientX - canvasOffset.x, y: clientY - canvasOffset.y};
    Object.values(bpLines).forEach((line) => {
        CanvasUtil.isMouseInRectangle(mousePoint, line.startPoint!, line.endPoint!) && targetLines.push(line);
    });
    if (targetLines.length === 0) return;
    //遍历有效范围内的线条是否命中
    const hitLines: IBPLine[] = [];
    for (let i = 0; i < targetLines.length; i++) {
        const targetLine = targetLines[i];
        const {samplePoints} = targetLine!;
        if (CanvasUtil.isMouseOnLine(mousePoint, samplePoints!, 5)) {
            targetLine.lineWidth = 2;
            targetLine.color = '#d9d9d9';
            hitLines.push(targetLine);
            CanvasUtil.drawBezierCurves(downCtx!, [targetLine]);
            CanvasUtil.updSegmentSamplingPoint();
            break;
        }
    }
    setSelectedLines(hitLines);
}

export const BPCanvas: React.FC = () => {
    useEffect(() => {
        //加载完毕后绘制链接线（由于节点组件的创建与渲染都是异步的，需要等节点的锚点都渲染完毕后才能确定连线的位置，因此暂时使用异步延时连线的渲染时机）
        // todo 后续要调整为更精确的时机
        const renderLineTimer = setTimeout(() => {
            reRenderAllLine();
            CanvasUtil.updSegmentSamplingPoint();
            clearTimeout(renderLineTimer);
        }, 50);
        const {nodeContainerRef} = bpStore;
        nodeContainerRef?.addEventListener('click', lineSegmentCollisions);
    }, [])
    return (
        <div className={'blue-print-canvas'} style={{
            overflow: "hidden",
            width: window.innerWidth - 670,
            height: window.innerHeight - 75,
        }}>
            <LineLayer/>
            <NodeLayer/>
        </div>
    )
}
