import React, {Component} from 'react';
import './style/AntdLiquidSet.less';
import FillColor from "./atomic_components/FillColor";
import ColorPicker from "../../../color_picker/BaseColorPicker";
import CfgGroup from "../../base/CfgGroup";


interface AntdLiquidSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
}


class AntdLiquidSet extends Component<AntdLiquidSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            color: color
        })
    }

    outRadiusChanged = (radius: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            radius: radius
        })
    }

    outLineWidthChanged = (width: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            outline: {
                border: parseFloat(width)
            }
        })
    }

    outLineColorChanged = (color: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            outline: {
                style: {
                    stroke: color,
                }
            }
        })
    }

    numberOfWaterWavesChanged = (count: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            wave: {
                count: count
            }
        })
    }

    waveLengthChanged = (length: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            wave: {
                length: length
            }
        })
    }

    titleChanged = (data: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                title: {
                    content: data
                }
            }
        })
    }

    titleColorChanged = (color: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                title: {
                    style: {
                        fill: color,
                        size: 23
                    }
                }
            }
        })
    }


    subscriptionColorChanged = (color: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                content: {
                    style: {
                        fill: color
                    }
                }
            }
        })
    }


    titleFontSizeChanged = (size: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                title: {
                    style: {
                        fontSize: parseInt(size)
                    }
                }
            }
        })
    }


    subscriptionFontSizeChanged = (size: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                content: {
                    style: {
                        fontSize: parseInt(size)
                    }
                }
            }
        })
    }

    subscriptionLineHeightChanged = (size: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            statistic: {
                content: {
                    style: {
                        lineHeight: parseInt(size)
                    }
                }
            }
        })
    }

    shapeChanged = (value: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            shape: value
        })
    }

    calculateLiquidConfig = () => {
        const {outline, shape, radius, wave, statistic} = this.props.chartProps;
        return {
            shape: shape,
            outRadius: radius,
            outlineWidth: outline?.border,
            outlineColor: outline?.style?.stroke,
            waterNum: wave?.count,
            waterLength: wave?.length,
            title: statistic?.title?.content,
            titleColor: statistic?.title?.style?.fill,
            titleFontSize: statistic?.title?.style?.fontSize,
            desColor: statistic?.content?.style?.fill,
            desFontSize: statistic?.content?.style?.fontSize,
            desLineHeight: statistic?.content?.style?.lineHeight,
        }
    }

    generateAntdLiquidSet = () => {
        const config = this.calculateLiquidConfig();
        return [
            {
                label: '图形选择',
                comp: "LcSelect",
                config: {
                    value: config.shape,
                    onChange: this.shapeChanged,
                    options: [
                        {
                            content: 'circle',
                            value: 'circle'
                        },
                        {
                            content: 'diamond',
                            value: 'diamond'
                        },
                        {
                            content: 'triangle',
                            value: 'triangle'
                        },
                        {
                            content: 'pin',
                            value: 'pin'
                        },
                        {
                            content: 'rect',
                            value: 'rect'
                        },
                    ]
                },
            },
            {
                label: '外半径',
                comp: "LcNumberInput",
                config: {
                    color: config.outRadius,
                    onChange: this.outRadiusChanged,
                    max: 1,
                    min: 0.1,
                    step: 0.01,
                },
            },
            {
                label: '边框线宽度',
                comp: "LcNumberInput",
                config: {
                    value: config.outlineWidth,
                    onChange: this.outLineWidthChanged,
                    max: 20,
                    min: 0,
                    step: 0.1,
                },
            },
            {
                label: '边框线颜色',
                comp: "ColorPicker",
                config: {
                    color: config.outlineColor,
                    onChange: this.outLineColorChanged,
                },
            },
            {
                label: '水波个数',
                comp: "LcNumberInput",
                config: {
                    color: config.waterNum,
                    onChange: this.numberOfWaterWavesChanged,
                    max: 10,
                    min: 0,
                    step: 1,
                },
            },
            {
                label: '水波长度',
                comp: "LcNumberInput",
                config: {
                    color: config.waterLength,
                    onChange: this.waveLengthChanged,
                    max: 500,
                    min: 10,
                    step: 5,
                },
            },
            {
                label: '中心标题',
                comp: "LcTextInput",
                config: {
                    color: config.title,
                    onChange: this.titleChanged,
                },
            },
            {
                label: '中心标题颜色',
                comp: "ColorPicker",
                config: {
                    color: config.titleColor,
                    onChange: this.titleColorChanged,
                },
            },
            {
                label: '中心标题字体大小',
                comp: "LcNumberInput",
                config: {
                    color: config.titleFontSize,
                    onChange: this.titleFontSizeChanged,
                    max: 50,
                    min: 0,
                    step: 1,
                },
            },
            {
                label: '描述颜色',
                comp: "ColorPicker",
                config: {
                    color: config.desColor,
                    onChange: this.subscriptionColorChanged,
                },
            },
            {
                label: '描述字体大小',
                comp: "LcNumberInput",
                config: {
                    color: config.desFontSize,
                    onChange: this.subscriptionFontSizeChanged,
                    max: 50,
                    min: 0,
                    step: 1,
                },
            },
            {
                label: '描述字体行高',
                comp: "LcNumberInput",
                config: {
                    color: config.desLineHeight,
                    onChange: this.subscriptionLineHeightChanged,
                    max: 50,
                    min: 0,
                    step: 1,
                },
            },
        ]
    }


    render() {
        const items = this.generateAntdLiquidSet();
        return (
            <>
                <FillColor onChange={this.fillColorChanged}/>
                <CfgGroup items={items}/>
            </>
        );
    }
}

export default AntdLiquidSet;