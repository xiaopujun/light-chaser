import React, {Component} from 'react';
import Ruler, {RulerProps} from "@scena/react-ruler";
import {KMMap} from "../../designer/operate-provider/keyboard-mouse/KeyboardMouse";
import eventManager from "../../designer/operate-provider/core/EventManager";
import scaleCore from "../../designer/operate-provider/scale/ScaleCore";

interface DesignerRulerProps {
    offsetX?: number;
    offsetY?: number;
}

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
class DesignerRuler extends Component<RulerProps & DesignerRulerProps> {

    wheelTimerId: any = null;
    pointerMoveTimerId: any = null;

    state = {
        render: 0
    }

    unit = 50;

    baseOffset = 20;
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

    componentDidMount() {
        const {offsetX: ofX = 0, offsetY: ofY = 0} = this.props;
        eventManager.register('wheel', () => {
            this.startPosX = this.mousePosX - ((this.mousePosX - this.startPosX) / scaleCore.ratio);
            this.scrollPosX = this.startPosX;
            this.startPosY = this.mousePosY - ((this.mousePosY - this.startPosY) / scaleCore.ratio);
            this.scrollPosY = this.startPosY;
            this.unit = Math.floor(50 / scaleCore.scale);
            clearTimeout(this.wheelTimerId);
            this.wheelTimerId = setTimeout(() => {
                this.setState({render: this.state.render + 1})
            }, 400);
        });

        eventManager.register('pointermove', (e: any) => {
            const {scale} = scaleCore;
            this.mousePosX = this.startPosX + ((e.clientX - this.baseOffset - ofX) / scale);
            this.mousePosY = this.startPosY + ((e.clientY - this.baseOffset - ofY) / scale);
            if (KMMap.rightClick) {
                this.offsetX = this.offsetX - e.movementX;
                this._scrollPosX = this.startPosX + (this.offsetX / scale)
                this.offsetY = this.offsetY - e.movementY;
                this._scrollPosY = this.startPosY + (this.offsetY / scale)

                clearTimeout(this.pointerMoveTimerId);
                this.pointerMoveTimerId = setTimeout(() => {
                    this.rulerX && this.rulerX.scroll(this._scrollPosX);
                    this.rulerY && this.rulerY.scroll(this._scrollPosY);
                }, 400);
            }
        });

        eventManager.register('pointerdown', (e: PointerEvent) => {
            if (e.button === 2) {
                this.offsetX = 0;
                this.offsetY = 0;
            }
        });

        eventManager.register('pointerup', (e: PointerEvent) => {
            if (e.button === 2) {
                this.offsetX = 0;
                this.offsetY = 0;
                this.scrollPosX = this._scrollPosX;
                this.startPosX = this._scrollPosX;
                this.scrollPosY = this._scrollPosY;
                this.startPosY = this._scrollPosY;
            }
        });
    }

    componentWillUnmount() {
        eventManager.unregister('wheel');
        eventManager.unregister('pointermove');
        eventManager.unregister('pointerdown');
        eventManager.unregister('pointerup');
        clearTimeout(this.wheelTimerId);
        clearTimeout(this.pointerMoveTimerId);
    }


    render() {
        const {scale} = scaleCore;
        return (
            <div className={'lc-ruler'} style={{position: 'relative'}}>
                <div style={{
                    position: 'absolute',
                    width: 20,
                    height: 20,
                    color: '#838383',
                    textAlign: 'center',
                    fontSize: 12,
                    top: -1
                }}>px
                </div>
                <div className={'lc-ruler-horizontal'}
                     style={{
                         height: this.baseOffset,
                         width: `calc(100% - ${this.baseOffset}px)`,
                         position: 'relative',
                         left: this.baseOffset
                     }}>
                    <Ruler ref={ref => this.rulerX = ref}
                           scrollPos={this.scrollPosX}
                           zoom={scale}
                           lineColor={'#444b4d'}
                           textColor={'#a6a6a6'}
                           segment={2}
                           negativeRuler={true}
                           textOffset={[0, 10]}
                           backgroundColor={'#090f1d'}
                           unit={this.unit}/>
                </div>
                <div className={'lc-ruler-vertical'}
                     style={{
                         width: this.baseOffset,
                         height: window.innerHeight - this.baseOffset - 90,
                         position: 'relative',
                         overflow: 'hidden'
                     }}>
                    <Ruler ref={ref => this.rulerY = ref}
                           type={'vertical'}
                           scrollPos={this.scrollPosY}
                           lineColor={'#444b4d'}
                           textColor={'#a6a6a6'}
                           zoom={scale}
                           segment={2}
                           negativeRuler={true}
                           textOffset={[10, 0]}
                           backgroundColor={'#090f1d'}
                           unit={this.unit}/>
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