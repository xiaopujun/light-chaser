import {IBPLine, IPoint} from "../manager/BluePrintManager.ts";
import bluePrintGroupManager from "../manager/BluePrintGroupManager.ts";

export interface CubicBezierCurvesCP {
    firstCP: IPoint;
    secondCP: IPoint;
}

export default class CanvasUtil {

    //绘制贝塞尔曲线
    public static drawBezierCurves(ctx: CanvasRenderingContext2D, lines: IBPLine[]) {
        ctx.beginPath();
        for (let i = 0; i < lines.length; i++) {
            const {startPoint, endPoint, firstCP, secondCP, color, lineWidth, lineDash} = lines[i];
            ctx.strokeStyle = color!;
            ctx.lineWidth = lineWidth!;
            ctx.moveTo(startPoint!.x, startPoint!.y);
            ctx.setLineDash(lineDash!)
            ctx.lineDashOffset = 0;
            ctx.bezierCurveTo(firstCP!.x, firstCP!.y, secondCP!.x, secondCP!.y, endPoint!.x, endPoint!.y)
        }
        ctx.stroke();
    }

    //计算三次贝塞尔曲线的2个控制点
    public static calculateControlPoint(startPos: IPoint, endPos: IPoint): CubicBezierCurvesCP {
        const direction = endPos.x < startPos.x ? 'left' : 'right';
        const boxWidth = Math.abs(endPos.x - startPos.x);
        const firstCP: IPoint = {x: 0, y: 0};
        const secondCP: IPoint = {x: 0, y: 0};
        //计算贝塞尔控制点
        if (direction === 'right') {
            firstCP.x = startPos.x + (boxWidth * 0.5);
            firstCP.y = startPos.y;
            secondCP.x = endPos.x - (boxWidth * 0.5);
            secondCP.y = endPos.y;
        } else {
            firstCP.x = startPos.x + (boxWidth * 0.8);
            firstCP.y = startPos.y;
            secondCP.x = endPos.x - (boxWidth * 0.8);
            secondCP.y = endPos.y;
        }
        return {firstCP, secondCP};
    }

    //计算贝塞尔曲线采样点
    public static sampleBezierCurve(startPoi: IPoint, firstCP: IPoint, secondCP: IPoint, endPoi: IPoint, numSamples: number): IPoint[] {
        const points: IPoint[] = [];
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

    //绘制点元素
    public static drawPoint(ctx: CanvasRenderingContext2D, point: IPoint, size: number, color: string) {
        ctx.fillStyle = color;
        ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
    }

    public static isMouseInRectangle(mousePoint: IPoint, rectStart: IPoint, rectEnd: IPoint): boolean {
        //放大保卫盒边界（兼容线段结束点在起始点左边时贝塞尔曲线反向弯曲后增加的宽度）
        const boxWidth = Math.abs(rectEnd.x - rectStart.x);
        let x1, x2;
        if (rectEnd.x < rectStart.x) {
            //结束点在起始点左边,注：0.05这个比例只是一个估计值，非精确值。在保证起始点在结束点左边的情况下，能正确判定鼠标点是否在控制点包围盒内即可。
            //这个比例值和计算贝塞尔曲线的控制点所用到的比例是相关的：代码位置：light-chaser/src/blueprint/util/CanvasUtil.ts:38
            x1 = Math.min(rectStart.x + (boxWidth * 0.2), rectEnd.x - (boxWidth * 0.2));
            x2 = Math.max(rectStart.x + (boxWidth * 0.2), rectEnd.x - (boxWidth * 0.2));
        } else {
            //结束点在起始点右边
            x1 = Math.min(rectStart.x, rectEnd.x);
            x2 = Math.max(rectStart.x, rectEnd.x);
        }
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
    public static distanceBetweenPointAndLine(point: IPoint, lineStart: IPoint, lineEnd: IPoint): number {
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
    public static isMouseOnLine(mousePoint: IPoint, pointArray: IPoint[], precision: number): boolean {
        for (let i = 0; i < pointArray.length - 1; i++) {
            const distance = CanvasUtil.distanceBetweenPointAndLine(mousePoint, pointArray[i], pointArray[i + 1]);
            if (distance <= precision)
                return true; // 鼠标指针在线段上
        }
        return false; // 鼠标指针不在任何线段上
    }

    /**
     * 更新蓝图线段采样点
     * 注：本方法单独更新线段采样点，调用时机应为所有线段都渲染完毕后单独调用此方法。
     * 单独计算线段采样点可以避免渲染线段同时大量无效采样点的计算（只有最后一次渲染的采样点是有效的）
     */
    public static updSegmentSamplingPoint() {
        const {bluePrintManager} = bluePrintGroupManager;
        const {bpLines} = bluePrintManager;
        Object.values(bpLines).forEach(line => {
            const {startPoint, firstCP, secondCP, endPoint} = line;
            line.samplePoints = CanvasUtil.sampleBezierCurve(startPoint!, firstCP!, secondCP!, endPoint!, 20);
        })
    }
}
