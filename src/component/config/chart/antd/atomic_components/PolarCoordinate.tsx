import React, {Component} from 'react';
import OutInnerRadius from "./OutInnerRadius";
import StartEndAngle from "./StartEndAngle";

interface PolarCoordinateSystemProps {
    updateElemChartSet?: (data: any) => void;
}

/**
 * 直角坐标系
 */
export default class PolarCoordinateSystem extends Component<PolarCoordinateSystemProps> {


    render() {
        const {updateElemChartSet} = this.props;
        return (
            <>
                <OutInnerRadius updateElemChartSet={updateElemChartSet}/>
                <StartEndAngle updateElemChartSet={updateElemChartSet}/>
            </>
        );
    }
}
