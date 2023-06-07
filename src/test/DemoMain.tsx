import React from 'react';
import MovableItem from "./MovableItem";
import AntdBaseBar from "../comps/antd/base-bar/AntdBaseBar";

const DemoMain: React.FC = () => {
    return (
        <div className="moveable" style={{width: '100px', height: '100px', background: '#0d5876'}}/>
    );
}

const Example: React.FC = () => {


    return (
        <div>
            <MovableItem onChange={(data) => console.log(data.position)}>
                <AntdBaseBar config={{
                    style: {
                        baseStyle: {
                            padding: "10px",
                            backgroundColor: "#0f273db5",
                            border: "2px solid #00deffff",
                            borderRadius: "3px"
                        },
                        chartStyle: {
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
                            ],
                            xField: "value",
                            yField: "name",
                            seriesField: "name",
                            xAxis: {
                                grid: {
                                    line: {
                                        style: {
                                            stroke: "#00fffaff",
                                            lineWidth: 1
                                        }
                                    },
                                    alignTick: true
                                },
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
                                title: {
                                    text: "标题",
                                    style: {
                                        fill: "#00fff2ff"
                                    },
                                    position: "end"
                                }
                            },
                            yAxis: {
                                grid: {
                                    line: {
                                        style: {
                                            stroke: "#16a0b5ff",
                                            lineWidth: 2
                                        }
                                    },
                                    alignTick: true
                                },
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
                                title: {
                                    text: "y轴",
                                    style: {
                                        fill: "#00ddffff"
                                    },
                                    position: "start"
                                }
                            },
                            color: "#00FFEA33",
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
                        }
                    }
                }}/>
            </MovableItem>

        </div>
    );
};
export default Example;