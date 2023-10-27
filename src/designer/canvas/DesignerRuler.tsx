import React, {PureComponent} from 'react';
import Ruler, {RulerProps} from "@scena/react-ruler";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {PointType} from "../../blueprint/types";

interface DesignerRulerProps {
    offset?: PointType;
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
class DesignerRuler extends PureComponent<RulerProps & DesignerRulerProps> {

    state = {
        render: 0
    }

    rulerX: any = null;
    rulerY: any = null;

    unit = 50;

    scrollPos: PointType = {x: 0, y: 0};

    baseOffset = 20;

    ruleWheel = (scale: number) => {
        const {dsContentRef} = eventOperateStore;
        const {x, y} = dsContentRef?.getBoundingClientRect()!;
        this.scrollPos.x = -(x - 80) / scale;
        this.scrollPos.y = -(y - 70) / scale;

        this.unit = Math.floor(50 / scale);
        this.setState({render: this.state.render + 1})
    }

    ruleDrag = () => {
        const {dsContentRef, scale} = eventOperateStore;
        const {x, y} = dsContentRef?.getBoundingClientRect()!;
        this.scrollPos.x = -(x - 80) / scale;
        this.scrollPos.y = -(y - 70) / scale;
        this.rulerX && this.rulerX.scroll(this.scrollPos.x);
        this.rulerY && this.rulerY.scroll(this.scrollPos.y);
    }

    componentDidMount() {
        const {setRuleRef} = eventOperateStore;
        setRuleRef(this);
    }

    render() {
        const {scale} = eventOperateStore;
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
                           scrollPos={this.scrollPos.x}
                           zoom={scale}
                           lineColor={'#444b4d'}
                           textColor={'#a6a6a6'}
                           segment={2}
                           negativeRuler={true}
                           textOffset={[0, 10]}
                           backgroundColor={'#1a1a1a'}
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
                           scrollPos={this.scrollPos.y}
                           lineColor={'#444b4d'}
                           textColor={'#a6a6a6'}
                           zoom={scale}
                           segment={2}
                           negativeRuler={true}
                           textOffset={[10, 0]}
                           backgroundColor={'#1a1a1a'}
                           unit={this.unit}/>
                </div>
                <div className={'lc-ruler-content'} style={{
                    position: 'absolute',
                    overflow: 'hidden',
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