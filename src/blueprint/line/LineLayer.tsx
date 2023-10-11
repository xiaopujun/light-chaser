import React from 'react';
import {CanvasLineType} from "../types";
import './LineLayer.less';
import CanvasUtil from "../util/CanvasUtil";
import bpStore from "../store/BPStore";

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
        const {setUpCtx, setDownCtx} = bpStore;
        setUpCtx(this.upLayer!.getContext('2d')!);
        setDownCtx(this.downLayer!.getContext('2d')!);
        document.addEventListener('mousedown', (e) => {
            const {target} = e;
            if (!target || !(target as HTMLElement).classList.contains('ap-circle')) return;
            //设置起始点坐标
            this.currentLine.startPoint = {x: e.clientX - 60, y: e.clientY - 40}
            this.currentLine.startDom = target as HTMLElement;
            this.currentLine.startAnchorId = (e!.target as HTMLElement).id;
            this.keyDown = true;
        });

        document.addEventListener('mouseup', (e) => {
            if (!this.keyMove || !e.target || !(e.target as HTMLElement).classList.contains('ap-circle')) {
                //清空画布
                bpStore.upCtx?.clearRect(0, 0, 1920, 1080);
                this.keyDown = false;
                return;
            }
            this.keyMove = false;
            this.keyDown = false;
            bpStore.upCtx!.clearRect(0, 0, 1920, 1080)
            //在下层绘制当前操作的线条
            this.currentLine.lineDash = [];
            this.currentLine.lineWidth = 2;
            this.currentLine.color = "#a7a7a7";
            this.currentLine.endDom = e.target as HTMLElement
            this.currentLine.endAnchorId = (e!.target as HTMLElement).id;
            CanvasUtil.drawBezierCurves(bpStore.downCtx!, this.currentLine)
            //计算线条的采样点，用于计算线条是否被选中
            const {startPoint, endPoint, firstCP, secondCP, startDom, endDom} = this.currentLine;
            const samplePointArr = CanvasUtil.sampleBezierCurve(startPoint, firstCP, secondCP, endPoint, 20);
            const {connectedLines, addAnchorRelationship, anchorRelationship} = bpStore;
            connectedLines.push({
                color: "#fff",
                lineWidth: 1,
                lineDash: [],
                startPoint: {...startPoint},
                endPoint: {...endPoint},
                firstCP: {...firstCP},
                secondCP: {...secondCP},
                samplePoints: samplePointArr,
                startDom: startDom,
                endDom: endDom
            })
            addAnchorRelationship(this.currentLine.startAnchorId!, this.currentLine.endAnchorId)
            console.log(anchorRelationship)
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.keyDown) return;
            this.keyMove = true;
            const {startPoint, endPoint} = this.currentLine;
            //设置鼠标坐标
            this.currentLine.endPoint = {x: e.clientX - 60, y: e.clientY - 40}

            const contPoi = CanvasUtil.calculateControlPoint(startPoint, endPoint)
            this.currentLine.firstCP = contPoi.firstCP
            this.currentLine.secondCP = contPoi.secondCP
            this.draw();
        });

    }

    //开始绘画
    draw = () => {
        if (!bpStore.upCtx) return;
        //清空画布
        bpStore.upCtx.clearRect(0, 0, 1920, 1080)


        const {startPoint, endPoint, firstCP, secondCP} = this.currentLine;
        CanvasUtil.drawBezierCurves(bpStore.upCtx!, {
            color: "#c0c0c0",
            lineWidth: 1,
            lineDash: [10, 10],
            startPoint: startPoint,
            endPoint: endPoint,
            firstCP: firstCP,
            secondCP: secondCP
        })
    }

    render() {
        return (
            <div style={{position: "absolute", width: '100%', height: '100%'}}>
                <canvas style={{position: "inherit", top: 0, left: 0}} width={1920} height={1080}
                        ref={ref => this.downLayer = ref}/>
                <canvas style={{position: "inherit", top: 0, left: 0}} width={1920} height={1080}
                        ref={ref => this.upLayer = ref}/>
            </div>
        )
    }

}

export default LineLayer;
