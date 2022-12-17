import React, {Component} from 'react';

class TestRuler extends Component {

    lcRuler: any = null;// 标尺元素
    lcRulerContext: any = null;//  标尺canvas上下文
    startPos = 0;// 渲染开始位置
    unit = 50;// 单元区间
    mouseDown = false;// 鼠标指针是否按下
    rulerLength = window.innerWidth;// 标尺长度
    scale = 1;// 缩放大小
    clientX = 0;// 鼠标指针x坐标
    clientY = 0;// 鼠标指针y坐标
    mousePos = 0;// 鼠标指针位置

    componentDidMount() {
        let lcRuler: any = document.getElementById('lcRuler');
        this.lcRuler = lcRuler;
        this.lcRulerContext = lcRuler.getContext("2d");

        this.draw();

        document.addEventListener('wheel', (e: any) => {
            if (e.deltaY > 0)
                this.scale = Number((this.scale + 0.1).toFixed(1));
            else
                this.scale = Number((this.scale - 0.1).toFixed(1));

            //计算标尺缩放后的刻度
            this.startPos = this.mousePos - (this.mousePos / this.scale);
            this.rulerLength = this.rulerLength / this.scale;
            this.draw();
        });

        document.addEventListener('mousemove', (event: any) => {
            this.clientX = event.clientX;
            this.clientY = event.clientY;
            if (this.mouseDown) {
                this.startPos -= event.movementX;
                this.draw();
            }
        });

        document.addEventListener('mousedown', (event: any) => {
            this.mouseDown = true;
            //计算鼠标指针位置
            this.mousePos = this.startPos + (event.clientX / this.scale);
        });

        document.addEventListener('mouseup', (event: any) => this.mouseDown = false);


    }

    draw = () => {

        //绘制底色
        this.lcRulerContext.beginPath();
        this.lcRulerContext.fillStyle = '#003851';
        //定义间隔单元

        this.lcRulerContext.save();
        this.lcRulerContext.fillRect(0, 0, window.innerWidth, 30);
        this.lcRulerContext.scale(this.scale, 1);
        let index = this.startPos - 50;
        for (let i = -50; i < this.rulerLength; i++, index++) {
            if (index % this.unit == 0) {
                this.lcRulerContext.fillStyle = '#00f2ff';
                this.lcRulerContext.font = "14px serif";
                this.lcRulerContext.fillText(index + '', i, 20);
            }
        }
        this.lcRulerContext.restore();
    }


    render() {
        return (
            <canvas width={window.innerWidth} height={'30px'} id={'lcRuler'}/>
        );
    }
}

export default TestRuler;