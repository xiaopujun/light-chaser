import {CanvasLineType} from "../types";
import {Point} from "../line/LineLayer";

export interface CubicBezierCurvesCP {
    firstCP: Point;
    secondCP: Point;
}

export default class CanvasUtil {

    //绘制贝塞尔曲线
    public static drawBezierCurves(ctx: CanvasRenderingContext2D, lineConfig: CanvasLineType) {
        const {startPoint, endPoint, firstCP, secondCP, color, lineWidth, lineDash} = lineConfig;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath(); //新建一条path
        ctx.moveTo(startPoint[0], startPoint[1]);
        ctx.setLineDash(lineDash)
        ctx.lineDashOffset = 0;
        ctx.bezierCurveTo(firstCP[0], firstCP[1], secondCP[0], secondCP[1], endPoint[0], endPoint[1])
        ctx.stroke(); //绘制路径。
    }

    //计算三次贝塞尔曲线的2个控制点
    public static calculateControlPoint(startPos: Point, endPos: Point): CubicBezierCurvesCP {
        const direction = CanvasUtil.calculateBezierCurveDirection(startPos, endPos)
        const boxWidth = Math.abs(endPos[0] - startPos[0]);
        const firstCP: Point = [0, 0];
        const secondCP: Point = [0, 0];
        //计算贝塞尔控制点
        if (direction === 1 || direction === 4) {
            firstCP[0] = startPos[0] + (boxWidth * 0.5);
            firstCP[1] = startPos[1];
            secondCP[0] = endPos[0] - (boxWidth * 0.5);
            secondCP[1] = endPos[1];
        } else if (direction === 2 || direction === 3) {
            firstCP[0] = startPos[0] - (boxWidth * 0.5);
            firstCP[1] = startPos[1];
            secondCP[0] = endPos[0] + (boxWidth * 0.5);
            secondCP[1] = endPos[1];
        }
        return {firstCP, secondCP};
    }

    //计算贝塞尔曲线采样点
    public static sampleBezierCurve(startPoi: Point, firstCP: Point, secondCP: Point, endPoi: Point, numSamples: number): Point[] {
        const points: Point[] = [];
        for (let i = 0; i <= numSamples; i++) {
            const t = i / numSamples;
            const x =
                    (1 - t) ** 3 * startPoi[0] +
                    3 * (1 - t) ** 2 * t * firstCP[0] +
                    3 * (1 - t) * t ** 2 * secondCP[0] +
                    t ** 3 * endPoi[0],
                y =
                    (1 - t) ** 3 * startPoi[1] +
                    3 * (1 - t) ** 2 * t * firstCP[1] +
                    3 * (1 - t) * t ** 2 * secondCP[1] +
                    t ** 3 * endPoi[1];
            points.push([x, y]);
        }
        return points;
    }

    //计算贝塞尔曲线结束点方位,返回值表示结束点位于起始点的第几象限
    public static calculateBezierCurveDirection(startPoi: Point, endPoi: Point): number {
        let direction = 1;
        //判断目标点位置
        if (endPoi[0] < startPoi[0]) {
            if (endPoi[1] > startPoi[1])
                direction = 3;
            else
                direction = 2;
        } else {
            if (endPoi[1] > startPoi[1])
                direction = 4;
        }
        return direction;
    }

    //绘制点元素
    public static drawPoint(ctx: CanvasRenderingContext2D, point: Point, size: number, color: string) {
        ctx.fillStyle = color;
        ctx.fillRect(point[0] - size / 2, point[1] - size / 2, size, size);
    }
}