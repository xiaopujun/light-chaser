export interface CanvasLineType {
    id?: string;
    color: string;
    lineWidth: number;
    lineDash: number[];
    startPoint: PointType;
    endPoint: PointType;
    firstCP: PointType;
    secondCP: PointType;
    //采样点列表
    samplePoints?: PointType[];
    startDom?: HTMLElement;
    endDom?: HTMLElement;
}

export type PointType = { x: number; y: number; }