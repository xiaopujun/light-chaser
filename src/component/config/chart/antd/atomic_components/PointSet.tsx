import React, {Component} from 'react';
import CfgGroup from "../../../base/CfgGroup";

interface PointSetProps {
    updateChartProps?: (data: any) => void;
    pointSize?: [number];
    pointShape?: string;
}

/**
 * 点系统设置
 */
class PointSet extends Component<PointSetProps> {

    shapeChanged = (shape: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            shape: shape
        });
    }

    pointSizeChanged = (size: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({size: [1, size]})
    }
    generateCanvasSet = () => {
        const {pointSize = [1, 1], pointShape} = this.props;
        return [
            {
                label: '点元素尺寸',
                comp: "LcNumberInput",
                config: {
                    value: pointSize[1],
                    onChange: this.pointSizeChanged,
                },
            },
            {
                label: '点元素形状',
                comp: "LcSelect",
                config: {
                    value: pointShape,
                    onChange: this.shapeChanged,
                    options: [
                        {
                            content: '请选择',
                            value: ''
                        },
                        {
                            content: 'circle',
                            value: 'circle'
                        },
                        {
                            content: 'square',
                            value: 'square'
                        },
                        {
                            content: 'bowtie',
                            value: 'bowtie'
                        },
                        {
                            content: 'diamond',
                            value: 'diamond'
                        },
                        {
                            content: 'hexagon',
                            value: 'hexagon'
                        },
                        {
                            content: 'triangle',
                            value: 'triangle'
                        },
                        {
                            content: 'triangle-down',
                            value: 'triangle'
                        },
                    ]
                },
            },
        ]
    }

    render() {
        const items = this.generateCanvasSet();
        return <CfgGroup items={items}/>;
    }
}

export default PointSet;