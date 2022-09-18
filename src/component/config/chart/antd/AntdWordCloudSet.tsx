import React, {Component} from 'react';
import FillColor from "./atomic_components/FillColor";

class AntdWordCloudSet extends Component<any> {
    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            color: color,
            autoFit: true,
        });
    }

    shapeChanged = (shape: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            shape: shape
        });
    }

    pointSizeChanged = (range: [number, number]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            size: range
        })
    }

    curveRendering = (data: boolean) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
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