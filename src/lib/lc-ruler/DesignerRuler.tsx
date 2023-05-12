import React, {Component} from 'react';
import Ruler, {RulerProps} from "@scena/react-ruler";
import shortcutKey from "../../designer/event-operate/ShortcutKey";
import eventManager from "../../framework/event/EventManager";
import scaleCore from "../../framework/scale/ScaleCore";

/**
 * 缩放计算公式：
 * 设现有条件：
 * 1) 当前鼠标位置：P
 * 2) 当前缩放倍数：S1
 * 3) 最新缩放倍数：S2
 * 4) 标尺起始位置：St
 * 5) 标尺渲染起始位置：scrollPos
 * 则：scrollPos = P-[(P-St)/(S2/S1)]
 *
 * 鼠标移动计算公式：
 * 设现有条件：
 * 1) 鼠标按下时在当前屏幕分辨路下的真实鼠标位置：mosP
 * 2) 标尺当前的起始位置：startP
 * 3) 鼠标本次移动的距离：mouOffset
 * 4) 标尺当前的缩放系数：scale
 * 5) 在当前缩放系数下，鼠标对应的标尺位置：rulerP
 *
 * 则鼠标指针在当前缩放系数下的位置为：rulerP = startP + (mouOffset / scale)
 * 鼠标移动后的标尺起始位置为：scrollPos = startP + (mouOffset / scale)
 */
class DesignerRuler extends Component<RulerProps> {
    state = {
        scale: 1,
    }

    baseOffset = 30;
    _scrollPosX = 0;
    _scrollPosY = 0;
    rulerX: any = null;
    offsetX = 0;
    mousePosX = 0;
    scrollPosX = 0;
    startPosX = 0;
    rulerY: any = null;
    offsetY = 0;
    mousePosY = 0;
    scrollPosY = 0;
    startPosY = 0;
    mouseDown = false;

    componentDidMount() {
        eventManager.register('wheel', (e: any) => {
            this.startPosX = this.mousePosX - ((this.mousePosX - this.startPosX) / scaleCore.ratio);
            this.scrollPosX = this.startPosX;
            this.startPosY = this.mousePosY - ((this.mousePosY - this.startPosY) / scaleCore.ratio);
            this.scrollPosY = this.startPosY;
            this.setState({scale: scaleCore.scale});
        });

        eventManager.register('mousemove', (e: any) => {
            this.mousePosX = this.startPosX + ((e.clientX - this.baseOffset - 60) / this.state.scale);
            this.mousePosY = this.startPosY + ((e.clientY - this.baseOffset - 50) / this.state.scale);
            if (shortcutKey._space && this.mouseDown) {
                this.offsetX = this.offsetX - e.movementX;
                this._scrollPosX = this.startPosX + (this.offsetX / this.state.scale)
                this.rulerX && this.rulerX.scroll(this._scrollPosX);

                this.offsetY = this.offsetY - e.movementY;
                this._scrollPosY = this.startPosY + (this.offsetY / this.state.scale)
                this.rulerY && this.rulerY.scroll(this._scrollPosY);
            }
        });

        eventManager.register('mousedown', (e: any) => {
            this.mouseDown = true
            this.offsetX = 0;
            this.offsetY = 0;
        });

        eventManager.register('mouseup', (e: any) => {
            this.mouseDown = false
            this.offsetX = 0;
            this.offsetY = 0;
            this.scrollPosX = this._scrollPosX;
            this.startPosX = this._scrollPosX;
            this.scrollPosY = this._scrollPosY;
            this.startPosY = this._scrollPosY;
        });
    }


    render() {
        return (
            <div className={'lc-ruler'} style={{position: 'relative'}}>
                <div className={'lc-ruler-horizontal'}
                     style={{
                         height: this.baseOffset,
                         width: `calc(100% - ${this.baseOffset}px)`,
                         position: 'relative',
                         left: this.baseOffset
                     }}>
                    <Ruler ref={ref => this.rulerX = ref}
                           scrollPos={this.scrollPosX}
                           zoom={this.state.scale}
                           negativeRuler={true}
                           unit={50}/>
                </div>
                <div className={'lc-ruler-vertical'}
                     style={{
                         width: this.baseOffset,
                         height: window.innerHeight - this.baseOffset - 50 - 40,
                         position: 'relative',
                         overflow: 'hidden'
                     }}>
                    <Ruler ref={ref => this.rulerY = ref}
                           type={'vertical'}
                           scrollPos={this.scrollPosY}
                           zoom={this.state.scale}
                           negativeRuler={true}
                           textOffset={[0, 20]}
                           unit={50}/>
                </div>
                <div className={'lc-ruler-content'} style={{
                    position: 'absolute',
                    top: this.baseOffset,
                    left: this.baseOffset,
                }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default DesignerRuler;