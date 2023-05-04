import React, {Component} from 'react';
import Ruler from "./Ruler";

class TestRuler extends Component {
    state = {
        scale: 1,
    }
    _scrollPosX = 0;
    _scrollPosY = 0;
    compOffset = 30;
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
        document.addEventListener('wheel', (e) => {
            let {scale} = this.state;
            if (e.deltaY > 0)
                scale += 0.1;
            else
                scale -= 0.1;
            this.startPosX = this.mousePosX - ((this.mousePosX - this.startPosX) / (scale / this.state.scale));
            this.scrollPosX = this.startPosX;
            this.startPosY = this.mousePosY - ((this.mousePosY - this.startPosY) / (scale / this.state.scale));
            this.scrollPosY = this.startPosY;
            this.setState({scale: scale});
        });
        document.addEventListener('mousemove', (e) => {
            this.mousePosX = this.startPosX + ((e.clientX - this.compOffset) / this.state.scale);
            this.mousePosY = this.startPosY + ((e.clientY - this.compOffset) / this.state.scale);
            if (this.mouseDown) {
                this.offsetX = this.offsetX - e.movementX;
                this.offsetY = this.offsetY - e.movementY;
                this._scrollPosX = this.startPosX + (this.offsetX / this.state.scale)
                this._scrollPosY = this.startPosY + (this.offsetY / this.state.scale)
                this.rulerX && this.rulerX.scroll(this._scrollPosX);
                this.rulerY && this.rulerY.scroll(this._scrollPosY);
            }

        });
        document.addEventListener('mousedown', (e) => {
            this.mouseDown = true
            this.offsetX = 0;
            this.offsetY = 0;
        });
        document.addEventListener('mouseup', (e) => {
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
            <div className={'lc-ruler'}>
                <div className={'lc-ruler-horizontal'}
                     style={{
                         height: this.compOffset,
                         width: `calc(100% - ${this.compOffset}px)`,
                         backgroundColor: '#126447',
                         position: 'absolute',
                         left: this.compOffset
                     }}>
                    <Ruler ref={ref => this.rulerX = ref}
                           scrollPos={this.scrollPosX}
                           zoom={this.state.scale}
                           negativeRuler={true}
                           unit={50}/>
                </div>
                <div className={'lc-ruler-vertical'}
                     style={{
                         width: this.compOffset,
                         height: `calc(100% - ${this.compOffset}px)`,
                         backgroundColor: '#606da4',
                         position: 'absolute',
                         top: this.compOffset,
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
            </div>
        );
    }
}

export default TestRuler;