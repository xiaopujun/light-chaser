import {CanvasLineType, PointType} from "../types";

export interface CubicBezierCurvesCP {
    firstCP: PointType;
    secondCP: PointType;
}

export default class CanvasUtil {

    //绘制贝塞尔曲线
    public static drawBezierCurves(ctx: CanvasRenderingContext2D, lineConfig: CanvasLineType) {
        const {startPoint, endPoint, firstCP, secondCP, color, lineWidth, lineDash} = lineConfig;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath(); //新建一条path
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.setLineDash(lineDash)
        ctx.lineDashOffset = 0;
        ctx.bezierCurveTo(firstCP.x, firstCP.y, secondCP.x, secondCP.y, endPoint.x, endPoint.y)
        ctx.stroke(); //绘制路径。
    }

    //计算三次贝塞尔曲线的2个控制点
    public static calculateControlPoint(startPos: PointType, endPos: PointType): CubicBezierCurvesCP {
        const direction = CanvasUtil.calculateBezierCurveDirection(startPos, endPos)
        const boxWidth = Math.abs(endPos.x - startPos.x);
        const firstCP: PointType = {x: 0, y: 0};
        const secondCP: PointType = {x: 0, y: 0};
        //计算贝塞尔控制点
        if (direction === 1 || direction === 4) {
            firstCP.x = startPos.x + (boxWidth * 0.5);
            firstCP.y = startPos.y;
            secondCP.x = endPos.x - (boxWidth * 0.5);
            secondCP.y = endPos.y;
        } else if (direction === 2 || direction === 3) {
            firstCP.x = startPos.x - (boxWidth * 0.5);
            firstCP.y = startPos.y;
            secondCP.x = endPos.x + (boxWidth * 0.5);
            secondCP.y = endPos.y;
        }
        return {firstCP, secondCP};
    }

    //计算贝塞尔曲线采样点
    public static sampleBezierCurve(startPoi: PointType, firstCP: PointType, secondCP: PointType, endPoi: PointType, numSamples: number): PointType[] {
        const points: PointType[] = [];
        for (let i = 0; i <= numSamples; i++) {
            const t = i / numSamples;
            const x =
                    (1 - t) ** 3 * startPoi.x +
                    3 * (1 - t) ** 2 * t * firstCP.x +
                    3 * (1 - t) * t ** 2 * secondCP.x +
                    t ** 3 * endPoi.x,
                y =
                    (1 - t) ** 3 * startPoi.y +
                    3 * (1 - t) ** 2 * t * firstCP.y +
                    3 * (1 - t) * t ** 2 * secondCP.y +
                    t ** 3 * endPoi.y;
            points.push({x, y});
        }
        return points;
    }

    //计算贝塞尔曲线结束点方位,返回值表示结束点位于起始点的第几象限
    public static calculateBezierCurveDirection(startPoi: PointType, endPoi: PointType): number {
        let direction = 1;
        //判断目标点位置
        if (endPoi.x < startPoi.x) {
            if (endPoi.y > startPoi.y)
                direction = 3;
            else
                direction = 2;
        } else {
            if (endPoi.y > startPoi.y)
                direction = 4;
        }
        return direction;
    }

    //绘制点元素
    public static drawPoint(ctx: CanvasRenderingContext2D, point: PointType, size: number, color: string) {
        ctx.fillStyle = color;
        ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
    }
}