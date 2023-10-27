import React from "react";
import AxisConfig from "./axis/AxisConfig";
import {Axis} from "@antv/g2plot";
import {WritableOptions} from "../types";

export interface AntdCartesianCoordinateSysProps {
    config?: WritableOptions;

    onChange(config?: WritableOptions): void;
}

export const AntdCartesianCoordinateSys: React.FC<AntdCartesianCoordinateSysProps> = ({config, onChange}) => {

    const xAxisChange = (data?: Axis) => {
        onChange({xAxis: data});
    }
    const yAxisChange = (data?: Axis) => {
        onChange({yAxis: data});
    }

    return (
        <>
            <AxisConfig title={'X轴'} config={config?.xAxis}
                        onChange={xAxisChange}/>
            <AxisConfig title={'Y轴'} config={config?.yAxis}
                        onChange={yAxisChange}/>
        </>
    )
}