import React from 'react';
import {CanvasLineType} from "../types";
import './LineLayer.less';
import CanvasUtil from "../util/CanvasUtil";
import bpStore from "../store/BPStore";
import {AnchorPointType} from "../node/BPNode";

class LineLayer extends React.Component {

    //上层
    upLayer: HTMLCanvasElement | null = null;
    //下层
    downLayer: HTMLCanvasElement | null = null;

    currentLine: CanvasLineType = {
        color: "#fff",
        lineWidth: 2,
        lineDash: [10, 10],
        startPoint: {x: 0, y: 0},
        endPoint: {x: 0, y: 0},
        firstCP: {x: 0, y: 0},
        secondCP: {x: 0, y: 0},
    };

    //鼠标是否按下
    keyDown: boolean = false;
    //是否移动
    keyMove: boolean = false;
    //画布引用
    canvasRef: HTMLCanvasElement | null = null;

    componentDidMount() {
        const {setUpCtx, setDownCtx, canvasOffset} = bpStore;
        setUpCtx(this.upLayer!.getContext('2d')!);
        setDownCtx(this.downLayer!.getContext('2d')!);
        document.addEventListener('mousedown', (e) => {
            const {target} = e;
            if (!target || !(target as HTMLElement).classList.contains('ap-circle')) return;
            const pointDom = e.target as HTMLElement;
            const pointInfoArr = pointDom.id.split("_");
            if (pointInfoArr && pointInfoArr.length === 4 && pointInfoArr[3] === AnchorPointType.INPUT.toString())
                return;

            //设置起始点坐标
            const {x, y, width, height} = pointDom.getBoundingClientRect();
            this.currentLine.startPoint = {x: x + width / 2 - canvasOffset.x, y: y + height / 2 - canvasOffset.y}
            this.currentLine.startAnchorId = pointDom.id;
            this.keyDown = true;
        });

        document.addEventListener('mouseup', (e) => {
            if (!this.keyMove || !e.target || !(e.target as HTMLElement).classList.contains('ap-circle')) {
                //清空画布
                bpStore.upCtx?.clearRect(0, 0, 10000, 10000);
                this.keyDown = false;
                return;
            }
            this.keyMove = false;
            this.keyDown = false;
            bpStore.upCtx!.clearRect(0, 0, 10000, 10000)
            //在下层绘制当前操作的线条
            this.currentLine.lineDash = [];
            this.currentLine.lineWidth = 2;
            this.currentLine.color = "#a7a7a7";
            this.currentLine.endAnchorId = (e!.target as HTMLElement).id;
            const {x, y, width, height} = (e.target as HTMLElement).getBoundingClientRect();
            this.currentLine.endPoint = {x: x + width / 2 - canvasOffset.x, y: y + height / 2 - canvasOffset.y}
            CanvasUtil.drawBezierCurves(bpStore.downCtx!, this.currentLine)
            //计算线条的采样点，用于计算线条是否被选中
            const {startPoint, endPoint, firstCP, secondCP, startAnchorId, endAnchorId} = this.currentLine;
            const samplePointArr = CanvasUtil.sampleBezierCurve(startPoint, firstCP, secondCP, endPoint, 20);
            const {connectedLines, addAnchorRelationship} = bpStore;
            connectedLines.push({
                color: "#949494",
                lineWidth: 1,
                lineDash: [],
                startPoint: {...startPoint},
                endPoint: {...endPoint},
                firstCP: {...firstCP},
                secondCP: {...secondCP},
                samplePoints: samplePointArr,
                startAnchorId: startAnchorId!,
                endAnchorId: endAnchorId!,
            })
            addAnchorRelationship(this.currentLine.startAnchorId!, this.currentLine.endAnchorId)
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.keyDown) return;
            this.keyMove = true;
            const {startPoint, endPoint} = this.currentLine;
            const {canvasOffset} = bpStore;
            //设置鼠标坐标
            this.currentLine.endPoint = {x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y}

            const contPoi = CanvasUtil.calculateControlPoint(startPoint, endPoint)
            this.currentLine.firstCP = contPoi.firstCP
            this.currentLine.secondCP = contPoi.secondCP
            //清空画布
            bpStore.upCtx!.clearRect(0, 0, 10000, 10000)
            CanvasUtil.drawBezierCurves(bpStore.upCtx!, {
                color: "#c0c0c0",
                lineWidth: 1,
                lineDash: [10, 10],
                startPoint: this.currentLine.startPoint,
                endPoint: this.currentLine.endPoint,
                firstCP: this.currentLine.firstCP,
                secondCP: this.currentLine.secondCP
            })
        });

    }

    render() {
        return (
            <div style={{position: "absolute"}}>
                <canvas style={{position: "inherit", top: 0, left: 0}}
                        width={window.innerWidth - 670}
                        height={window.innerHeight - 75}
                        ref={ref => this.downLayer = ref}/>
                <canvas style={{position: "inherit", top: 0, left: 0}}
                        width={window.innerWidth - 670}
                        height={window.innerHeight - 75}
                        ref={ref => this.upLayer = ref}/>
            </div>
        )
    }

}

export default LineLayer;
