import AbstractScaleObserver from "./AbstractScaleObserver.ts";

export default class ScaleAction {

    public static xScale: number = 1;
    public static yScale: number = 1;

    public static observers: AbstractScaleObserver[] = [];

    public static doScale(xScale: number, yScale: number) {
        ScaleAction.xScale = xScale;
        ScaleAction.yScale = yScale;
        ScaleAction.observers.forEach(observer => observer.doScale(xScale, yScale));
    }

    public static add(observer: AbstractScaleObserver) {
        ScaleAction.observers.push(observer);
        if (ScaleAction.xScale !== 1 || ScaleAction.yScale !== 1) {
            observer.doScale(ScaleAction.xScale, ScaleAction.yScale);
        }
    }
}