import {CanvasLineType, PointType} from "../types";

export interface CubicBezierCurvesCP {
    firstCP: PointType;
    secondCP: PointType;
}

export default class CanvasUtil {

    //绘制贝塞尔曲线
    public static drawBezierCurves(ctx: CanvasRenderingContext2D, lineConfig: CanvasLineType) {
        const {startPoint, endPoint, firstCP, secondCP, color, lineWidth, lineDash} = lineConfig;
        ctx.strokeStyle = color!;
        ctx.lineWidth = lineWidth!;
        ctx.beginPath(); //新建一条path
        ctx.moveTo(startPoint!.x, startPoint!.y);
        ctx.setLineDash(lineDash!)
        ctx.lineDashOffset = 0;
        ctx.bezierCurveTo(firstCP!.x, firstCP!.y, secondCP!.x, secondCP!.y, endPoint!.x, endPoint!.y)
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

    public static isMouseInRectangle(mousePoint: PointType, rectStart: PointType, rectEnd: PointType): boolean {
        const x1 = Math.min(rectStart.x, rectEnd.x);
        const x2 = Math.max(rectStart.x, rectEnd.x);
        const y1 = Math.min(rectStart.y, rectEnd.y);
        const y2 = Math.max(rectStart.y, rectEnd.y);

        return (
            mousePoint.x >= x1 && mousePoint.x <= x2 &&
            mousePoint.y >= y1 && mousePoint.y <= y2
        );
    }

    /**
     * 计算点到线段的距离（基于向量计算）
     * @param point
     * @param lineStart
     * @param lineEnd
     */
    public static distanceBetweenPointAndLine(point: PointType, lineStart: PointType, lineEnd: PointType): number {
        const A = point.x - lineStart.x;
        const B = point.y - lineStart.y;
        const C = lineEnd.x - lineStart.x;
        const D = lineEnd.y - lineStart.y;

        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = -1;
        if (lenSq !== 0) {
            param = dot / lenSq;
        }

        let closestX, closestY;
        if (param < 0) {
            closestX = lineStart.x;
            closestY = lineStart.y;
        } else if (param > 1) {
            closestX = lineEnd.x;
            closestY = lineEnd.y;
        } else {
            closestX = lineStart.x + param * C;
            closestY = lineStart.y + param * D;
        }

        const dx = point.x - closestX;
        const dy = point.y - closestY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * 判断目标点是否在canvas线上
     * @param mousePoint 鼠标指针位置
     * @param pointArray 线段采样点数组
     * @param precision 精度范围
     */
    public static isMouseOnLine(mousePoint: PointType, pointArray: PointType[], precision: number): boolean {
        for (let i = 0; i < pointArray.length - 1; i++) {
            const distance = CanvasUtil.distanceBetweenPointAndLine(mousePoint, pointArray[i], pointArray[i + 1]);
            if (distance <= precision)
                return true; // 鼠标指针在线段上
        }
        return false; // 鼠标指针不在任何线段上
    }
}