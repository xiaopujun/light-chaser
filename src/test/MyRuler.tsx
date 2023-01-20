import React, {Component} from 'react';

class Ruler extends Component {

    ruler: HTMLCanvasElement | undefined;
    ctx: CanvasRenderingContext2D | undefined | null;
    config = {
        width: 1000,
        height: 30,
        bgColor: '#003058',
        fontColor: '#fff',
        scale: 1,
    }

    componentDidMount() {
        if (this.ruler) {
            this.ctx = this.ruler.getContext("2d");
            this.init();
        }
    }

    init(): void {
        if (this.ctx) {
            this.ctx.fillStyle = this.config.bgColor;
            this.ctx.fillRect(0, 0, this.config.width, this.config.height);

            this.ctx.fillStyle = this.config.fontColor;
            for (let i = 0; i < this.config.width / 50; i++) {
                this.ctx.fillText((i * 50) + '', i * 50, 20);
            }
        }
    }


    update(): void {
    }

    render() {
        return (
            <canvas ref={(dom: HTMLCanvasElement) => this.ruler = dom} width={this.config.width}
                    height={this.config.height}/>
        );
    }
}

export default Ruler;