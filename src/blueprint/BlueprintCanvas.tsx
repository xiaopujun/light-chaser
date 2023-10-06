import React from 'react';
import {CanvasLineType} from "./types";
import './BlueprintCanvas.less';
import CanvasUtil from "./CanvasUtil";

export type Point = [number, number];

class BlueprintCanvas extends React.Component {

    //上层
    upLayer: HTMLCanvasElement | null = null;
    //上层画笔
    upCtx: CanvasRenderingContext2D | null = null;
    //下层
    downLayer: HTMLCanvasElement | null = null;
    //下层画笔
    downCtx: CanvasRenderingContext2D | null = null;

    currentLine: CanvasLineType = {
        color: "#fff",
        lineWidth: 1,
        lineDash: [10, 10],
        startPoint: [0, 0],
        endPoint: [0, 0],
        firstCP: [0, 0],
        secondCP: [0, 0],
    };

    //鼠标是否按下
    keyDown: boolean = false;
    //是否移动
    keyMove: boolean = false;
    //画布引用
    canvasRef: HTMLCanvasElement | null = null;
    //连线数组
    lineArr: CanvasLineType[] = [];


    componentDidMount() {
        this.upCtx = this.upLayer!.getContext('2d');
        this.downCtx = this.downLayer!.getContext('2d');

        document.addEventListener('mousedown', (e) => {
            //设置起始点坐标
            this.currentLine.startPoint = [e.clientX, e.clientY]
            this.keyDown = true;
        });

        document.addEventListener('mouseup', () => {
            if (!this.keyMove) return;
            this.keyMove = false;
            this.keyDown = false;
            const {startPoint, endPoint, firstCP, secondCP} = this.currentLine;
            this.upCtx!.clearRect(0, 0, 1920, 1080)
            //在下层绘制当前操作的线条
            this.currentLine.lineDash = [];
            this.currentLine.color = "#00b2ff";
            CanvasUtil.drawBezierCurves(this.downCtx!, this.currentLine)
            //计算线条的采样点，用于计算线条是否被选中
            const samplePointArr = CanvasUtil.sampleBezierCurve(startPoint, firstCP, secondCP, endPoint, 20);
            this.lineArr.push({
                color: "#fff",
                lineWidth: 1,
                lineDash: [],
                startPoint: [...startPoint],
                endPoint: [...endPoint],
                firstCP: [...firstCP],
                secondCP: [...secondCP],
                samplePoints: samplePointArr,
            })

            //绘制采样点
            samplePointArr.forEach((point) => {
                CanvasUtil.drawPoint(this.downCtx!, point, 8, 'red')
            })
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.keyDown) return;
            this.keyMove = true;
            const {startPoint, endPoint} = this.currentLine;
            //设置鼠标坐标
            this.currentLine.endPoint[0] = e.clientX;
            this.currentLine.endPoint[1] = e.clientY;

            const direction = CanvasUtil.calculateBezierCurveDirection(startPoint, endPoint)
            const contPoi = CanvasUtil.calculateControlPoint(direction, startPoint, endPoint)
            this.currentLine.firstCP = contPoi.firstCP
            this.currentLine.secondCP = contPoi.secondCP
            this.draw();
        });

    }

    //开始绘画
    draw = () => {
        if (!this.upCtx) return;
        //清空画布
        this.upCtx.clearRect(0, 0, 1920, 1080)


        const {startPoint, endPoint, firstCP, secondCP} = this.currentLine;
        CanvasUtil.drawBezierCurves(this.upCtx!, {
            color: "#fff",
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
            <div style={{position: "relative"}}>
                <canvas style={{position: 'absolute', top: 0, left: 0}} width={1920} height={1080}
                        ref={ref => this.downLayer = ref}/>
                <canvas style={{position: 'absolute', top: 0, left: 0}} width={1920} height={1080}
                        ref={ref => this.upLayer = ref}/>
            </div>
        )
    }

}

export default BlueprintCanvas;
