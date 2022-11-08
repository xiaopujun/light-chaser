import React, {Component} from 'react';
import OutInnerRadius from "./OutInnerRadius";
import StartEndAngle from "./StartEndAngle";

interface PolarCoordinateSystemProps {
    updateChartProps?: (data: any) => void;
}

/**
 * 直角坐标系
 */
export default class PolarCoordinateSystem extends Component<PolarCoordinateSystemProps> {


    render() {
        const {updateChartProps} = this.props;
        return (
            <>
                <OutInnerRadius updateChartProps={updateChartProps}/>
                <StartEndAngle updateChartProps={updateChartProps}/>
            </>
        );
    }
}
