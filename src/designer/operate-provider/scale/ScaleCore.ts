/**
 * 缩放参数计算核心类
 */
class ScaleCore {
    max: number = 3;
    min: number = 0.05;
    scale: number = 1;
    ratio: number = 1;

    compute = (type: number) => {
        let _ratio = 1.2;
        // 缩小
        if (type === 0)
            _ratio = 1 / 1.2;
        // 限制缩放倍数
        let _scale = this.scale * _ratio;
        if (_scale > this.max) {
            _ratio = this.max / this.scale;
            _scale = this.max;
        } else if (_scale < this.min) {
            _ratio = this.min / this.scale;
            _scale = this.min;
        }
        this.scale = _scale;
        this.ratio = _ratio;
    }
}

const scaleCore = new ScaleCore();
export default scaleCore;

export {ScaleCore};