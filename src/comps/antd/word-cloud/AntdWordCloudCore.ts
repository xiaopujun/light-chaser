import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import antdWordCloudImg from "./antd-wordcloud.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdWordCloudConfig = React.lazy(() => import("./AntdWordCloudConfig").then(module => ({default: module.AntdWordCloudConfig})));
const AnimationConfig = React.lazy(() => import("../../../lib/common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../../lib/common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../../lib/common-fragment/base-info/BaseInfo"));
const AntdWordCloud = React.lazy(() => import("./AntdWordCloud"));
const DataConfig = React.lazy(() => import("../../../lib/common-fragment/data-config/DataConfig"));

class AntdWordCloudCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "词云图",
            key: 'AntdWordCloud',
            typeName: "词云图",
            typeKey: "venn",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return antdWordCloudImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdWordCloud;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '词云图',
                type: 'AntdWordCloud',
                des: '基于antd实现的词云图',
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
                            "value": 9,
                            "name": "AntV"
                        },
                        {
                            "value": 8,
                            "name": "F2"
                        },
                        {
                            "value": 8,
                            "name": "G2"
                        },
                        {
                            "value": 8,
                            "name": "G6"
                        },
                        {
                            "value": 8,
                            "name": "DataSet"
                        },
                        {
                            "value": 8,
                            "name": "墨者学院"
                        },
                        {
                            "value": 6,
                            "name": "Analysis"
                        },
                        {
                            "value": 6,
                            "name": "Data Mining"
                        },
                        {
                            "value": 6,
                            "name": "Data Vis"
                        },
                        {
                            "value": 6,
                            "name": "Design"
                        },
                        {
                            "value": 6,
                            "name": "Grammar"
                        },
                        {
                            "value": 6,
                            "name": "Graphics"
                        },
                        {
                            "value": 6,
                            "name": "Graph"
                        },
                        {
                            "value": 6,
                            "name": "Hierarchy"
                        },
                        {
                            "value": 6,
                            "name": "Labeling"
                        },
                        {
                            "value": 6,
                            "name": "Layout"
                        },
                        {
                            "value": 6,
                            "name": "Quantitative"
                        },
                        {
                            "value": 6,
                            "name": "Relation"
                        },
                        {
                            "value": 6,
                            "name": "Statistics"
                        },
                        {
                            "value": 6,
                            "name": "可视化"
                        },
                        {
                            "value": 6,
                            "name": "数据"
                        },
                        {
                            "value": 6,
                            "name": "数据可视化"
                        },
                        {
                            "value": 4,
                            "name": "Arc Diagram"
                        },
                        {
                            "value": 4,
                            "name": "Bar Chart"
                        },
                        {
                            "value": 4,
                            "name": "Canvas"
                        },
                        {
                            "value": 4,
                            "name": "Chart"
                        },
                        {
                            "value": 4,
                            "name": "DAG"
                        },
                        {
                            "value": 4,
                            "name": "DG"
                        },
                        {
                            "value": 4,
                            "name": "Facet"
                        },
                        {
                            "value": 4,
                            "name": "Geo"
                        },
                        {
                            "value": 4,
                            "name": "Line"
                        },
                        {
                            "value": 4,
                            "name": "MindMap"
                        },
                        {
                            "value": 4,
                            "name": "Pie"
                        },
                        {
                            "value": 4,
                            "name": "Pizza Chart"
                        },
                        {
                            "value": 4,
                            "name": "Punch Card"
                        },
                        {
                            "value": 4,
                            "name": "SVG"
                        },
                        {
                            "value": 4,
                            "name": "Sunburst"
                        },
                        {
                            "value": 4,
                            "name": "Tree"
                        },
                        {
                            "value": 4,
                            "name": "UML"
                        },
                        {
                            "value": 3,
                            "name": "Chart"
                        },
                        {
                            "value": 3,
                            "name": "View"
                        },
                        {
                            "value": 3,
                            "name": "Geom"
                        },
                        {
                            "value": 3,
                            "name": "Shape"
                        },
                        {
                            "value": 3,
                            "name": "Scale"
                        },
                        {
                            "value": 3,
                            "name": "Animate"
                        },
                        {
                            "value": 3,
                            "name": "Global"
                        },
                        {
                            "value": 3,
                            "name": "Slider"
                        },
                        {
                            "value": 3,
                            "name": "Connector"
                        },
                        {
                            "value": 3,
                            "name": "Transform"
                        },
                        {
                            "value": 3,
                            "name": "Util"
                        },
                        {
                            "value": 3,
                            "name": "DomUtil"
                        },
                        {
                            "value": 3,
                            "name": "MatrixUtil"
                        },
                        {
                            "value": 3,
                            "name": "PathUtil"
                        },
                        {
                            "value": 3,
                            "name": "G"
                        },
                        {
                            "value": 3,
                            "name": "2D"
                        },
                        {
                            "value": 3,
                            "name": "3D"
                        },
                        {
                            "value": 3,
                            "name": "Line"
                        },
                        {
                            "value": 3,
                            "name": "Area"
                        },
                        {
                            "value": 3,
                            "name": "Interval"
                        },
                        {
                            "value": 3,
                            "name": "Schema"
                        },
                        {
                            "value": 3,
                            "name": "Edge"
                        },
                        {
                            "value": 3,
                            "name": "Polygon"
                        },
                        {
                            "value": 3,
                            "name": "Heatmap"
                        },
                        {
                            "value": 3,
                            "name": "Render"
                        },
                        {
                            "value": 3,
                            "name": "Tooltip"
                        },
                        {
                            "value": 3,
                            "name": "Axis"
                        },
                        {
                            "value": 3,
                            "name": "Guide"
                        },
                        {
                            "value": 3,
                            "name": "Coord"
                        },
                        {
                            "value": 3,
                            "name": "Legend"
                        },
                        {
                            "value": 3,
                            "name": "Path"
                        },
                        {
                            "value": 3,
                            "name": "Helix"
                        },
                        {
                            "value": 3,
                            "name": "Theta"
                        },
                        {
                            "value": 3,
                            "name": "Rect"
                        },
                        {
                            "value": 3,
                            "name": "Polar"
                        },
                        {
                            "value": 3,
                            "name": "Dsv"
                        },
                        {
                            "value": 3,
                            "name": "Csv"
                        },
                        {
                            "value": 3,
                            "name": "Tsv"
                        },
                        {
                            "value": 3,
                            "name": "GeoJSON"
                        },
                        {
                            "value": 3,
                            "name": "TopoJSON"
                        },
                        {
                            "value": 3,
                            "name": "Filter"
                        },
                        {
                            "value": 3,
                            "name": "Map"
                        },
                        {
                            "value": 3,
                            "name": "Pick"
                        },
                        {
                            "value": 3,
                            "name": "Rename"
                        },
                        {
                            "value": 3,
                            "name": "Filter"
                        },
                        {
                            "value": 3,
                            "name": "Map"
                        },
                        {
                            "value": 3,
                            "name": "Pick"
                        },
                        {
                            "value": 3,
                            "name": "Rename"
                        },
                        {
                            "value": 3,
                            "name": "Reverse"
                        },
                        {
                            "value": 3,
                            "name": "sort"
                        },
                        {
                            "value": 3,
                            "name": "Subset"
                        },
                        {
                            "value": 3,
                            "name": "Partition"
                        },
                        {
                            "value": 3,
                            "name": "Imputation"
                        },
                        {
                            "value": 3,
                            "name": "Fold"
                        },
                        {
                            "value": 3,
                            "name": "Aggregate"
                        },
                        {
                            "value": 3,
                            "name": "Proportion"
                        },
                        {
                            "value": 3,
                            "name": "Histogram"
                        },
                        {
                            "value": 3,
                            "name": "Quantile"
                        },
                        {
                            "value": 3,
                            "name": "Treemap"
                        },
                        {
                            "value": 3,
                            "name": "Hexagon"
                        },
                        {
                            "value": 3,
                            "name": "Binning"
                        },
                        {
                            "value": 3,
                            "name": "kernel"
                        },
                        {
                            "value": 3,
                            "name": "Regression"
                        },
                        {
                            "value": 3,
                            "name": "Density"
                        },
                        {
                            "value": 3,
                            "name": "Sankey"
                        },
                        {
                            "value": 3,
                            "name": "Voronoi"
                        },
                        {
                            "value": 3,
                            "name": "Projection"
                        },
                        {
                            "value": 3,
                            "name": "Centroid"
                        },
                        {
                            "value": 3,
                            "name": "H5"
                        },
                        {
                            "value": 3,
                            "name": "Mobile"
                        },
                        {
                            "value": 3,
                            "name": "K线图"
                        },
                        {
                            "value": 3,
                            "name": "关系图"
                        },
                        {
                            "value": 3,
                            "name": "烛形图"
                        },
                        {
                            "value": 3,
                            "name": "股票图"
                        },
                        {
                            "value": 3,
                            "name": "直方图"
                        },
                        {
                            "value": 3,
                            "name": "金字塔图"
                        },
                        {
                            "value": 3,
                            "name": "分面"
                        },
                        {
                            "value": 3,
                            "name": "南丁格尔玫瑰图"
                        },
                        {
                            "value": 3,
                            "name": "饼图"
                        },
                        {
                            "value": 3,
                            "name": "线图"
                        },
                        {
                            "value": 3,
                            "name": "点图"
                        },
                        {
                            "value": 3,
                            "name": "散点图"
                        },
                        {
                            "value": 3,
                            "name": "子弹图"
                        },
                        {
                            "value": 3,
                            "name": "柱状图"
                        },
                        {
                            "value": 3,
                            "name": "仪表盘"
                        },
                        {
                            "value": 3,
                            "name": "气泡图"
                        },
                        {
                            "value": 3,
                            "name": "漏斗图"
                        },
                        {
                            "value": 3,
                            "name": "热力图"
                        },
                        {
                            "value": 3,
                            "name": "玉玦图"
                        },
                        {
                            "value": 3,
                            "name": "直方图"
                        },
                        {
                            "value": 3,
                            "name": "矩形树图"
                        },
                        {
                            "value": 3,
                            "name": "箱形图"
                        },
                        {
                            "value": 3,
                            "name": "色块图"
                        },
                        {
                            "value": 3,
                            "name": "螺旋图"
                        },
                        {
                            "value": 3,
                            "name": "词云"
                        },
                        {
                            "value": 3,
                            "name": "词云图"
                        },
                        {
                            "value": 3,
                            "name": "雷达图"
                        },
                        {
                            "value": 3,
                            "name": "面积图"
                        },
                        {
                            "value": 3,
                            "name": "马赛克图"
                        },
                        {
                            "value": 3,
                            "name": "盒须图"
                        },
                        {
                            "value": 3,
                            "name": "坐标轴"
                        },
                        {
                            "value": 3,
                            "name": ""
                        },
                        {
                            "value": 3,
                            "name": "Jacques Bertin"
                        },
                        {
                            "value": 3,
                            "name": "Leland Wilkinson"
                        },
                        {
                            "value": 3,
                            "name": "William Playfair"
                        },
                        {
                            "value": 3,
                            "name": "关联"
                        },
                        {
                            "value": 3,
                            "name": "分布"
                        },
                        {
                            "value": 3,
                            "name": "区间"
                        },
                        {
                            "value": 3,
                            "name": "占比"
                        },
                        {
                            "value": 3,
                            "name": "地图"
                        },
                        {
                            "value": 3,
                            "name": "时间"
                        },
                        {
                            "value": 3,
                            "name": "比较"
                        },
                        {
                            "value": 3,
                            "name": "流程"
                        },
                        {
                            "value": 3,
                            "name": "趋势"
                        },
                        {
                            "value": 2,
                            "name": "亦叶"
                        },
                        {
                            "value": 2,
                            "name": "再飞"
                        },
                        {
                            "value": 2,
                            "name": "完白"
                        },
                        {
                            "value": 2,
                            "name": "巴思"
                        },
                        {
                            "value": 2,
                            "name": "张初尘"
                        },
                        {
                            "value": 2,
                            "name": "御术"
                        },
                        {
                            "value": 2,
                            "name": "有田"
                        },
                        {
                            "value": 2,
                            "name": "沉鱼"
                        },
                        {
                            "value": 2,
                            "name": "玉伯"
                        },
                        {
                            "value": 2,
                            "name": "画康"
                        },
                        {
                            "value": 2,
                            "name": "祯逸"
                        },
                        {
                            "value": 2,
                            "name": "绝云"
                        },
                        {
                            "value": 2,
                            "name": "罗宪"
                        },
                        {
                            "value": 2,
                            "name": "萧庆"
                        },
                        {
                            "value": 2,
                            "name": "董珊珊"
                        },
                        {
                            "value": 2,
                            "name": "陆沉"
                        },
                        {
                            "value": 2,
                            "name": "顾倾"
                        },
                        {
                            "value": 2,
                            "name": "Domo"
                        },
                        {
                            "value": 2,
                            "name": "GPL"
                        },
                        {
                            "value": 2,
                            "name": "PAI"
                        },
                        {
                            "value": 2,
                            "name": "SPSS"
                        },
                        {
                            "value": 2,
                            "name": "SYSTAT"
                        },
                        {
                            "value": 2,
                            "name": "Tableau"
                        },
                        {
                            "value": 2,
                            "name": "D3"
                        },
                        {
                            "value": 2,
                            "name": "Vega"
                        },
                        {
                            "value": 2,
                            "name": "统计图表"
                        }
                    ],
                    wordField: 'name',
                    weightField: 'value',
                    colorField: 'name',
                    wordStyle: {
                        fontFamily: 'Verdana',
                        fontSize: [8, 32],
                        rotation: 0,
                    },
                    random: () => 0.5,
                },
            },
            data: {
                dataSource: 'static',
                staticData: {
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
                },
            },
            animation: {},
            theme: {
                themeId: '',
            },
        };
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): { [key: string]: React.Component | React.FC | any } {
        return {
            'info': BaseInfo,
            'style': AntdWordCloudConfig,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdWordCloudCore;