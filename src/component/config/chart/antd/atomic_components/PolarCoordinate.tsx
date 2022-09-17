import React, {Component} from 'react';
import OutInnerRadius from "./OutInnerRadius";
import StartEndAngle from "./StartEndAngle";

export default class PolarCoordinateSystem extends Component<any> {


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
