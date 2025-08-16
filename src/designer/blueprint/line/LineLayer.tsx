/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */
import React, {CSSProperties, useEffect, useRef} from "react";
import CanvasUtil from "../util/CanvasUtil";
import bluePrintManager, {IBPLine} from "../manager/BluePrintManager.ts";
import {AnchorPointType} from "../node/core/AbstractBPNodeController";
import IdGenerate from "../../../utils/IdGenerate";

const LineLayer: React.FC = () => {
    const upLayerRef = useRef<HTMLCanvasElement | null>(null);
    const downLayerRef = useRef<HTMLCanvasElement | null>(null);

    const currentLine = useRef<IBPLine>({
        color: "#c0c0c0",
        lineWidth: 1,
        lineDash: [10, 10],
        startPoint: {x: 0, y: 0},
        endPoint: {x: 0, y: 0},
        firstCP: {x: 0, y: 0},
        secondCP: {x: 0, y: 0},
    });

    const keyDown = useRef(false);
    const keyMove = useRef(false);

    useEffect(() => {
        const {setUpCtx, setDownCtx} = bluePrintManager;
        setUpCtx(upLayerRef.current!.getContext("2d")!);
        setDownCtx(downLayerRef.current!.getContext("2d")!);

        const bpMouseDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target || !target.classList.contains("ap-circle")) return;
            const pointInfoArr = target.id.split(":");
            if (pointInfoArr.length === 3 && pointInfoArr[2] === AnchorPointType.INPUT.toString()) return;

            const {canvasOffset} = bluePrintManager;
            const {x, y, width, height} = target.getBoundingClientRect();
            currentLine.current.startPoint = {x: x + width / 2 - canvasOffset.x, y: y + height / 2 - canvasOffset.y};
            currentLine.current.startAnchorId = target.id;
            keyDown.current = true;
        };

        const bpMouseUp = (e: MouseEvent) => {
            const {nodeContainerRef, upCtx, addAPMap, addLine, addAPLineMap} = bluePrintManager;
            const {width: canvasW, height: canvasH} = nodeContainerRef!.getBoundingClientRect()!;
            const endElem = e.target as HTMLElement;

            if (!keyMove.current || !endElem || !endElem.classList.contains("ap-circle")
                || endElem.id.split(":")[2] !== AnchorPointType.INPUT.toString()) {
                upCtx?.clearRect(0, 0, canvasW + 10, canvasH + 10);
                keyDown.current = false;
                return;
            }

            const {canvasOffset} = bluePrintManager;
            keyMove.current = false;
            keyDown.current = false;
            upCtx!.clearRect(0, 0, canvasW + 10, canvasH + 10);

            const line = currentLine.current;
            line.id = IdGenerate.generateId();
            line.lineDash = [];
            line.lineWidth = 1;
            line.color = "#a2a2a2";
            line.endAnchorId = endElem.id;

            const {x, y, width: apw, height: aph} = endElem.getBoundingClientRect();
            line.endPoint = {x: x + apw / 2 - canvasOffset.x, y: y + aph / 2 - canvasOffset.y};

            CanvasUtil.drawBezierCurves(bluePrintManager.downCtx!, [line]);

            const samplePointArr = CanvasUtil.sampleBezierCurve(line.startPoint!, line.firstCP!, line.secondCP!, line.endPoint, 20);
            addLine({
                ...line,
                samplePoints: samplePointArr,
            });

            addAPMap(line.startAnchorId!, line.endAnchorId);
            addAPLineMap(line.startAnchorId!, line.id!);
            addAPLineMap(line.endAnchorId!, line.id!);
        };

        const bpMouseMove = (e: MouseEvent) => {
            if (!keyDown.current) return;
            keyMove.current = true;

            const {nodeContainerRef, canvasOffset, upCtx} = bluePrintManager;
            const {width: canvasW, height: canvasH} = nodeContainerRef!.getBoundingClientRect()!;

            currentLine.current.endPoint = {x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y};
            const contPoi = CanvasUtil.calculateControlPoint(currentLine.current.startPoint!, currentLine.current.endPoint!);
            currentLine.current.firstCP = contPoi.firstCP;
            currentLine.current.secondCP = contPoi.secondCP;

            upCtx!.clearRect(0, 0, canvasW + 10, canvasH + 10);
            CanvasUtil.drawBezierCurves(upCtx!, [{
                ...currentLine.current,
                color: "#c0c0c0",
                lineWidth: 1,
                lineDash: [10, 10],
            }]);
        };

        document.addEventListener("mousedown", bpMouseDown);
        document.addEventListener("mouseup", bpMouseUp);
        document.addEventListener("mousemove", bpMouseMove);

        return () => {
            document.removeEventListener("mousedown", bpMouseDown);
            document.removeEventListener("mouseup", bpMouseUp);
            document.removeEventListener("mousemove", bpMouseMove);
        };
    }, []);

    const width = window.innerWidth - 670;
    const height = window.innerHeight - 85;
    const _canvasStyle: CSSProperties = {position: "inherit", top: 0, left: 0};

    return (
        <div style={{position: "absolute"}}>
            <canvas ref={downLayerRef} style={_canvasStyle} width={width} height={height}/>
            <canvas ref={upLayerRef} style={_canvasStyle} width={width} height={height}/>
        </div>
    );
};

export default LineLayer;

