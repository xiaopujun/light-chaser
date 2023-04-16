import React, {Component} from 'react';
import CfgGroup from "../../../base/CfgGroup";

interface PolarCoordinateSystemProps {
    updateChartProps?: (data: any) => void;
    outRadius?: number;
    innerRadius?: number;
    startAngle?: number;
    endAngle?: number;
    items?: any;
}

/**
 * 极坐标系
 */
export default class PolarCoordinateSystem extends Component<PolarCoordinateSystemProps> {

    state: any = {
        outRadius: 1,
        innerRadius: 0,
        startAngle: 0,
        endAngle: 2,
    }

    constructor(props: PolarCoordinateSystemProps) {
        super(props);
        const {outRadius, innerRadius, startAngle = 0, endAngle = 2} = this.props;
        this.state = {
            outRadius: outRadius,
            innerRadius: innerRadius,
            startAngle: startAngle / Math.PI,
            endAngle: endAngle / Math.PI,
        }
    }

    outRadiusChanged = (radius: number) => {
        const {updateChartProps} = this.props;
        const {innerRadius} = this.state;
        if (radius > innerRadius) {
            updateChartProps && updateChartProps({
                radius: radius
            })
            this.setState({outRadius: radius})
        }

    }


    innerRadiusChanged = (radius: number) => {
        const {updateChartProps} = this.props;
        const {outRadius} = this.state;
        if (outRadius > radius) {
            updateChartProps && updateChartProps({
                innerRadius: radius
            })
            this.setState({innerRadius: radius})
        }
    }
    startAngleChanged = (angle: number) => {
        const {updateChartProps} = this.props;
        const {endAngle} = this.state;
        if (angle <= endAngle - 0.1) {
            updateChartProps && updateChartProps({
                startAngle: Math.PI * angle
            })
            this.setState({startAngle: angle})
        }
    }

    endAngleChanged = (angle: number) => {
        const {updateChartProps} = this.props;
        const {startAngle} = this.state;
        if (startAngle <= angle - 0.1) {
            updateChartProps && updateChartProps({
                endAngle: Math.PI * angle
            })
            this.setState({endAngle: angle})
        }
    }

    generatePolarCoordinatesystemConfig = () => {
        const {outRadius, innerRadius, startAngle, endAngle} = this.state;
        return [
            {
                label: '外半径',
                comp: "LcNumberInput",
                config: {
                    checked: outRadius,
                    onChange: this.outRadiusChanged,
                    max: 1,
                    min: 0,
                    step: 0.1,
                },
            },
            {
                label: '内半径',
                comp: "LcNumberInput",
                config: {
                    color: innerRadius,
                    onChange: this.innerRadiusChanged,
                    max: 1,
                    min: 0,
                    step: 0.1,
                },
            },
            {
                label: '起始角度(单位:π)',
                comp: "LcNumberInput",
                config: {
                    value: startAngle,
                    onChange: this.startAngleChanged,
                    max: 2,
                    min: 0,
                    step: 0.1,
                },
            },
            {
                label: '结束角度(单位:π)',
                comp: "LcNumberInput",
                config: {
                    value: endAngle,
                    onChange: this.endAngleChanged,
                    max: 2,
                    min: 0,
                    step: 0.1,
                },
            },
        ]
    }


    render() {
        let items = this.generatePolarCoordinatesystemConfig();
        return <CfgGroup items={items}/>
    }
}
