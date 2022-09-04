import React, {Component} from 'react';
import OutInnerRadius from "../out_inner_radius";
import StartEndAngle from "../start_end_angle";

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
