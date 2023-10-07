import {Point} from "./line/LineLayer";

export interface CanvasLineType {
    id?: string;
    color: string;
    lineWidth: number;
    lineDash: number[];
    startPoint: [number, number];
    endPoint: [number, number];
    firstCP: [number, number];
    secondCP: [number, number];
    //采样点列表
    samplePoints?: Point[];
    startDom?: HTMLElement;
    endDom?: HTMLElement;
}