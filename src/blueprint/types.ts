export interface CanvasLineType {
    id?: string;
    color?: string;
    lineWidth?: number;
    lineDash?: number[];
    startPoint?: PointType;
    endPoint?: PointType;
    firstCP?: PointType;
    secondCP?: PointType;
    //采样点列表
    samplePoints?: PointType[];
    //起始锚点id
    startAnchorId?: string;
    //结束锚点id
    endAnchorId?: string;
}

export type PointType = { x: number; y: number; }