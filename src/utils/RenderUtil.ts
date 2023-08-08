export default class RenderUtil {
    private static prev: number = 0;

    public static throttle(fn: Function, delay: number, callback?: Function) {

        return function (...args: any) {
            const now = Date.now();
            if (now - RenderUtil.prev > delay) {
                fn(...args);
                RenderUtil.prev = now;
            } else {
                callback && callback(...args);
            }
        };
    }
}
