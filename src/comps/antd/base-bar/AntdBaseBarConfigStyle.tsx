import React, {Component} from 'react';
import Accordion from "../../../lib/lc-accordion/Accordion";
import CfgItemBorder from "../../../lib/config-item-border/CfgItemBorder";
import BaseStyleSet from "../../../lib/common-fragment/base-style/BaseStyleSet";
import {ConfigType} from "../../../framework/types/ConfigType";
import ConfigItem from "../../../lib/config-item/ConfigItem";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import ConfigCard from "../../../lib/config-card/ConfigCard";
import NumberInput from "../../../lib/lc-input/NumberInput";
import {calculateLegendConfig} from "../../../utils/AntdChartConfigUtil";
import Legend from "../../../lib/common-fragment/legend/Legned";
import AxisConfig from "../../../lib/common-fragment/axis/AxisConfig";
import {toJS} from "mobx";

class AntdBaseBarConfigStyle extends Component<ConfigType> {

    state: any = {
        colors: []
    }

    barWidthChanged = (value: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({
            style: {
                chartStyle: {
                    maxBarWidth: value
                }
            }
        })
    }

    fillColorChanged = (color: string) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({style: {chartStyle: {color: color}}});
    }

    groupColorChanged = (value: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({
            color: value
        })
    }

    legendChanged = (key: string, data: any) => {
        const {updateConfig} = this.props;
        switch (key) {
            case 'position':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            legend: {
                                position: data
                            }
                        }
                    }
                });
                break;
            case 'direction':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            legend: {
                                layout: data
                            }
                        }
                    }
                });
                break;
            case 'color':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            legend: {
                                itemName: {
                                    style: {
                                        fill: data
                                    }
                                },
                            }
                        }
                    }
                });
                break;
            case 'enable':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            legend: data
                        }
                    }
                });
                break;
            default:
                console.warn('未知的图例配置项');
        }
    }

    axisChanged = (key: string, data: any) => {
        const {updateConfig} = this.props;
        switch (key) {
            case 'enable':
                updateConfig && updateConfig(data ? {
                    style: {
                        chartStyle: {
                            xAxis: {
                                grid: null,
                                label: {
                                    style: {
                                        fill: 'rgb(0,255,234)'
                                    },
                                },
                            }
                        }
                    }
                } : {
                    style: {
                        chartStyle: {
                            xAxis: {
                                grid: null,
                                label: null,
                                line: null,
                                tickLine: null
                            }
                        }
                    }
                });
                break;
            case 'position':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            xAxis: {
                                position: data
                            }
                        }
                    }
                });
                break;
            case 'title-enable':
                updateConfig && updateConfig(data ? {
                    style: {
                        chartStyle: {
                            xAxis: {
                                title: {
                                    text: 'x轴',
                                }
                            }
                        }
                    }
                } : {
                    style: {
                        chartStyle: {
                            xAxis: {
                                title: null
                            }
                        }
                    }
                });
                break;
            case 'title-position':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            xAxis: {
                                title: {
                                    position: data
                                }
                            }
                        }
                    }
                });
                break;
            case 'title-content':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            xAxis: {
                                title: {
                                    text: data
                                }
                            }
                        }
                    }
                });
                break;
            case 'title-color':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            xAxis: {
                                title: {
                                    style: {
                                        fill: data
                                    }
                                }
                            }
                        }
                    }
                });
                break;
            case 'title-offset':
                updateConfig && updateConfig({
                    style: {
                        chartStyle: {
                            xAxis: {
                                title: {
                                    offset: data
                                }
                            }
                        }
                    }
                });
                break;

            default:
                console.warn('未知的坐标轴配置项');
        }
    }


    render() {
        // const colors = calculateFillColor(this.props.config);
        // const sorts = dataSort('type', this.props.config.data);
        const {updateConfig, config} = this.props;
        console.log(toJS(config))
        const {chartStyle} = config;
        return (
            <>
                <BaseStyleSet config={config} updateConfig={updateConfig}/>
                <div className={'elem-chart-config'}>
                    <Accordion title={'图形'}>
                        <ConfigCard title={'x轴'}>
                            <ConfigItem title={'宽度'}>
                                <NumberInput min={1} onChange={this.barWidthChanged}
                                             defaultValue={chartStyle.maxBarWidth}
                                             size={'small'}/>
                            </ConfigItem>
                            <ConfigItem title={'颜色'}>
                                <CfgItemBorder>
                                    <BaseColorPicker onChange={this.fillColorChanged}
                                                     value={chartStyle.color}
                                                     style={{width: '100%', height: '15px', borderRadius: 2}}
                                                     showText={true}/>
                                </CfgItemBorder>
                            </ConfigItem>
                        </ConfigCard>
                    </Accordion>
                    <Legend config={calculateLegendConfig(config.chartStyle)}
                            onChange={this.legendChanged}/>
                    <AxisConfig onChange={this.axisChanged}/>
                    {/*<RightAngleCoordinates {...calculateRightAngleCoordinates(chartStyle)}*/}
                    {/*                       chartProps={chartStyle}*/}
                    {/*                       updateElemConfig={updateConfig}/>*/}
                </div>
            </>
        );
    }
}

export default AntdBaseBarConfigStyle;