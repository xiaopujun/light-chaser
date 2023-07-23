import AbstractComponent from "../../../framework/core/AbstractComponent";
import {Bar} from "@antv/g2plot";

export default class AntdBar extends AbstractComponent<Bar, any> {

    constructor() {
        super();
        this.config = {
            info: {
                id: '',
                name: '基础条形图',
                type: 'AntdBaseBar',
                des: '基于antd实现的基础条形图',
            },
            style: {
                baseStyle: {
                    padding: "10px",
                    backgroundColor: "rgba(14,16,20,0.11)",
                    border: "2px solid #00deffff",
                    borderRadius: "3px"
                },
                chartStyle: {
                    data: [
                        {
                            name: "1951 年",
                            value: 48
                        },
                        {
                            name: "1952 年",
                            value: 52
                        },
                        {
                            name: "1956 年",
                            value: 22
                        }
                    ],
                    xField: "value",
                    yField: "name",
                    seriesField: "name",
                    xAxis: {
                        grid: null,
                        label: {
                            style: {
                                fill: "#00FFEAFF"
                            }
                        },
                        line: {
                            style: {
                                stroke: "#00ffbbff",
                                lineWidth: 1
                            }
                        },
                        tickLine: {
                            style: {
                                stroke: "#00baffff",
                                lineWidth: 2
                            },
                            alignTick: true,
                            length: 3
                        },
                        subTickLine: {
                            style: {
                                stroke: "#1a98b5ff",
                                lineWidth: 3
                            },
                            count: 5,
                            length: 3
                        },
                        position: "right",
                        title: null
                    },
                    yAxis: {
                        grid: null,
                        label: {
                            style: {
                                fill: "#00FFEAFF"
                            }
                        },
                        line: {
                            style: {
                                stroke: "#00dbffff",
                                lineWidth: 1
                            }
                        },
                        tickLine: {
                            style: {
                                stroke: "#21f2f5ff",
                                lineWidth: 2
                            },
                            alignTick: true,
                            length: 3
                        },
                        subTickLine: {
                            style: {
                                stroke: "#03b7a3ff",
                                lineWidth: 3
                            },
                            count: 5,
                            length: 2
                        },
                        position: "bottom",
                        title: null
                    },
                    color: "#00ffea",
                    legend: {
                        position: "right-top",
                        layout: "vertical",
                        itemName: {
                            style: {
                                fill: "#00f0ffff",
                                fontSize: 12
                            }
                        }
                    },
                    maxBarWidth: 14,
                    supportCSSTransform: true,
                }
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: [
                        {
                            name: "1951 年",
                            value: 38
                        },
                        {
                            name: "1952 年",
                            value: 52
                        },
                        {
                            name: "1956 年",
                            value: 61
                        }
                    ]
                },
            },
        }
    }

    async create(container: HTMLElement, props: any): Promise<any> {
        if (!this.instance) {
            this.instance = new Bar(container, this.config.style.chartStyle);

        }
        this.instance.render();
        return this;
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
    }

    getConfig(): any {
    }

    update(props: any, operateType: any): void {
    }

    updateConfig(config: any): void {
    }

}