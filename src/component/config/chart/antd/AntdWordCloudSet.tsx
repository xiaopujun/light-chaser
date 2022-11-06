import React, {Component} from 'react';
import FillColor from "./atomic_components/FillColor";

interface AntdWordCloudSetProps {
    updateElemChartSet?: (data: any) => void;
    chartProps?: any;
    activated?: any;
}

class AntdWordCloudSet extends Component<AntdWordCloudSetProps> {
    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            color: color,
            autoFit: true,
        });
    }

    shapeChanged = (shape: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            shape: shape
        });
    }

    pointSizeChanged = (range: [number, number]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            size: range
        })
    }

    curveRendering = (data: boolean) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet && updateElemChartSet({
            smooth: data
        })
    }

    render() {

        return (
            <div className={'elem-chart-config'}>

                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged} paletteCount={1}/>

            </div>
        );
    }
}

export default AntdWordCloudSet;