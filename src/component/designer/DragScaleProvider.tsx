import React, {Component} from 'react';

interface DragScaleProviderProps {
    containerWidth?: number;
    containerHeight?: number;
    contentWidth?: number;
    contentHeight?: number;
    changeScale?: (scale: number) => void;
}

class DragScaleProvider extends Component<DragScaleProviderProps> {

    config: any = {
        contentWidth: 1920,
        contentHeight: 1080,
        x: 0,
        y: 0,
        scale: 1,
        minScale: 0.1, //最小缩放倍数
        maxScale: 5,  //最大缩放倍数
        isPointerdown: false, // 鼠标指针是否按下
        point: {x: 0, y: 0}, // 第一个点坐标
        diff: {x: 0, y: 0}, // 相对于上一次pointermove移动差值
        lastPointermove: {x: 0, y: 0}, // 用于计算diff
        ctrlDown: false,
    }

    componentDidMount() {
        this.config.contentWidth = this.props.contentWidth || 1920;
        this.config.contentHeight = this.props.contentHeight || 1080;
        this.doInit();
    }

    doInit = () => {
        // 获取dom
        const container: any = document.getElementById('lc-drag-scale-container');
        const content: any = document.getElementById('lc-drag-scale-content');
        this.config.x = (window.innerWidth - 600 - this.config.contentWidth) * 0.5;
        this.config.y = (window.innerHeight - 64 - this.config.contentHeight) * 0.5;
        content.style.transform = 'translate3d(' + this.config.x + 'px, ' + this.config.y + 'px, 0) scale(1)';
        document.addEventListener('keyup', ev => {
            if (ev.keyCode === 32)
                this.config.ctrlDown = false;
        })
        document.addEventListener('keydown', ev => {
            if (ev.keyCode === 32)
                this.config.ctrlDown = true;
        })
        // 拖拽查看
        this.designerDrag(content);
        // 滚轮缩放
        this.wheelZoom(container, content);
    }

    // 拖拽查看
    designerDrag = (designer: any) => {
        designer.addEventListener('pointerdown', (e: any) => {
            if (this.config.ctrlDown) {
                this.config.isPointerdown = true;
                designer.setPointerCapture(e.pointerId);
                this.config.point = {x: e.clientX, y: e.clientY};
                this.config.lastPointermove = {x: e.clientX, y: e.clientY};
            }
        });
        designer.addEventListener('pointermove', (e: any) => {
            if (this.config.ctrlDown) {
                if (this.config.isPointerdown) {
                    const current1 = {x: e.clientX, y: e.clientY};
                    this.config.diff.x = current1.x - this.config.lastPointermove.x;
                    this.config.diff.y = current1.y - this.config.lastPointermove.y;
                    this.config.lastPointermove = {x: current1.x, y: current1.y};
                    this.config.x += this.config.diff.x;
                    this.config.y += this.config.diff.y;
                    designer.style.transform = 'translate3d(' + this.config.x + 'px, ' + this.config.y + 'px, 0) scale(' + this.config.scale + ')';
                }
                e.preventDefault();
            }
        });
        designer.addEventListener('pointerup', () => {
            if (this.config.ctrlDown) {
                if (this.config.isPointerdown) {
                    this.config.isPointerdown = false;
                }
            }
        });
        designer.addEventListener('pointercancel', () => {
            if (this.config.ctrlDown) {
                if (this.config.isPointerdown) {
                    this.config.isPointerdown = false;
                }
            }
        });
    }

    //滚轮缩放
    wheelZoom = (container: any, designer: any) => {
        container.addEventListener('wheel', (e: any) => {
            if (this.config.ctrlDown) {
                let ratio = 1.1;
                // 缩小
                if (e.deltaY > 0)
                    ratio = 1 / 1.1;
                // 限制缩放倍数
                const _scale = this.config.scale * ratio;
                if (_scale > this.config.maxScale) {
                    ratio = this.config.maxScale / this.config.scale;
                    this.config.scale = this.config.maxScale;
                } else if (_scale < this.config.minScale) {
                    ratio = this.config.minScale / this.config.scale;
                    this.config.scale = this.config.minScale;
                } else {
                    this.config.scale = _scale;
                }
                const origin = {
                    x: (ratio - 1) * this.config.contentWidth * 0.5,
                    y: (ratio - 1) * this.config.contentHeight * 0.5
                };
                // 计算偏移量
                this.config.x -= (ratio - 1) * (e.clientX - this.config.x - 300) - origin.x;
                this.config.y -= (ratio - 1) * (e.clientY - this.config.y - 64) - origin.y;
                designer.style.transform = 'translate3d(' + this.config.x + 'px, ' + this.config.y + 'px, 0) scale(' + this.config.scale + ')';
                e.preventDefault();
                // this.setState({scale: this.config.scale})
                this.changeScale(this.config.scale);
            }
        });
    }

    changeScale = (scale: number) => {
        const {changeScale} = this.props;
        changeScale && changeScale(scale);
    }


    render() {
        const {contentHeight, contentWidth, containerHeight, containerWidth} = this.props;
        return (
            <div id={'lc-drag-scale-container'} style={{
                overflow: "hidden",
                height: containerHeight,
                width: containerWidth,
                backgroundColor: '#434343'
            }}>
                <div id={'lc-drag-scale-content'}
                     style={{width: contentWidth, height: contentHeight}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default DragScaleProvider;