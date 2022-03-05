import React, {Component} from 'react';
import OutRadius from "../out_radius";
import InnerRadius from "../inner_radius";
import StartEndAngle from "../start_end_angle";

export default class PolarCoordinateSystem extends Component<any> {


    render() {
        const {updateElemChartSet} = this.props;
        return (
            <>
                <OutRadius updateElemChartSet={updateElemChartSet}/>
                <InnerRadius updateElemChartSet={updateElemChartSet}/>
                <StartEndAngle updateElemChartSet={updateElemChartSet}/>
            </>
        );
    }
}
