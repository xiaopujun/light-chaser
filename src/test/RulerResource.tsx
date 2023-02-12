import * as React from "react";
import {ref} from "framework-utils";
import {convertUnitSize} from "@daybrush/utils";
import {RulerInterface, RulerProps} from "@scena/react-ruler";

export default class Ruler extends React.PureComponent<RulerProps> implements RulerInterface {
    public static defaultProps: Partial<RulerProps> = {
        type: "horizontal",
        zoom: 1,
        width: 0,
        height: 0,
        unit: 50,
        negativeRuler: true,
        mainLineSize: "100%",
        longLineSize: 10,
        shortLineSize: 7,
        segment: 10,
        direction: "end",
        style: {width: "100%", height: "100%"},
        backgroundColor: "#333333",
        font: "10px sans-serif",
        textColor: "#ffffff",
        textBackgroundColor: 'transparent',
        lineColor: "#777777",
        range: [-Infinity, Infinity],
        rangeBackgroundColor: 'transparent',
        lineWidth: 1,
    };
    public divisionsElement!: HTMLElement;
    public state = {
        scrollPos: 0,
    };
    public canvasElement!: HTMLCanvasElement;
    private canvasContext!: CanvasRenderingContext2D;
    private width: number = 0;
    private height: number = 0;
    private _zoom = 0;

    public render() {
        const props = this.props;
        const portalContainer = props.portalContainer;
        let portalAttributes: Record<string, any> = {};

        if ((React.version || "").indexOf("simple") > -1 && portalContainer) {
            portalAttributes = {portalContainer};
        }
        this._zoom = props.zoom!;
        return <canvas
            ref={ref(this, "canvasElement")}
            {...portalAttributes}
            style={this.props.style}/>;
    }

    public componentDidMount() {
        const canvas = this.canvasElement;
        const context = canvas.getContext("2d")!;
        this.canvasContext = context;
        this.resize();
    }

    public componentDidUpdate() {
        this.resize();
    }

    /**
     * @method Ruler#scroll
     * @param scrollPos
     */
    public scroll(scrollPos: number, nextZoom?: number) {
        this.draw(scrollPos, nextZoom);
    }

    /**
     * @method Ruler#resize
     */
    public resize(nextZoom?: number) {
        const canvas = this.canvasElement;
        const {width, height, scrollPos,} = this.props;

        this.width = width || canvas.offsetWidth;
        this.height = height || canvas.offsetHeight;
        canvas.width = this.width * 2;
        canvas.height = this.height * 2;
        this.draw(scrollPos, nextZoom);
    }

    private draw(scrollPos: number = this.state.scrollPos, nextZoom = this._zoom) {
        this._zoom = nextZoom;
        const props = this.props;
        const {
            unit, type, backgroundColor, lineColor, textColor, textBackgroundColor,
            direction, range = [-Infinity, Infinity], lineWidth = 1,
        } = props as Required<RulerProps>;
        const width = this.width;
        const height = this.height;
        const state = this.state;
        state.scrollPos = scrollPos;
        const context = this.canvasContext;
        const isHorizontal = type === "horizontal";
        const textAlign = props.textAlign || "left";
        const textOffset = props.textOffset || [0, 0];
        const containerSize = isHorizontal ? height : width;
        const mainLineSize = convertUnitSize(`${props.mainLineSize || "100%"}`, containerSize);

        if (backgroundColor === "transparent") {
            // Clear existing paths & text
            context.clearRect(0, 0, width * 2, height * 2);
        } else {
            // Draw the background
            context.rect(0, 0, width * 2, height * 2);
            context.fillStyle = backgroundColor;
            context.fill();
        }

        context.save();
        context.scale(2, 2);
        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
        context.fillStyle = textColor;
        context.beginPath();
        const size = width;
        const zoomUnit = nextZoom * unit;
        const minRange = Math.floor(scrollPos * nextZoom / zoomUnit);
        const maxRange = Math.ceil((scrollPos * nextZoom + size) / zoomUnit);
        const length = maxRange - minRange;
        const alignOffset = Math.max(["left", "center", "right"].indexOf(textAlign) - 1, -1);
        const barSize = height;
        // Render Labels
        for (let i = 0; i <= length; ++i) {
            const value = i + minRange;
            const startValue = value * unit;
            const startPos = (startValue - scrollPos) * nextZoom;
            if (startPos < -zoomUnit || startPos >= size + unit * nextZoom || startValue < range[0] || startValue > range[1]) {
                continue;
            }
            let origin = 0
            switch (direction) {
                case "start":
                    origin = 17;
                    break;
                case "center":
                    origin = barSize / 2;
                    break;
                case "end":
                    origin = barSize - 17;
                    break;
            }
            let [startX, startY] = [startPos + alignOffset * -3, origin];
            let text = `${startValue}`;
            context.textAlign = textAlign;
            let backgroundOffset = 0
            const textSize = context.measureText(text).width;
            context.save();
            let colors = ['#00ff6e', '#9d6800']
            // context.fillStyle = textBackgroundColor;
            context.fillStyle = i % 2 == 0 ? colors[0] : colors[1];
            context.fillRect(startX + textOffset[0] + backgroundOffset, 0, textSize, mainLineSize);
            context.restore();
            context.fillText(text, startX + textOffset[0], startY + textOffset[1]);
        }
        context.restore();
    }
}