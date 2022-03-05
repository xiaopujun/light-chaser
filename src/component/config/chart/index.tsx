import React, {Component} from 'react';
import AntdBarSet from "./antd_bar";
import AntdColumnSet from "./antd_column";
import AntdAreaSet from "./antd_area";
import AntdPieSet from "./antd_pie";
import AntdLiquid from "../../charts/antd/liquid";
import AntdLiquidSet from "./antd_liquid";
import AntdRadarSet from "./antd_radar";
import AntdScatter from "../../charts/antd/scatter";
import AntdScatterSet from "./antd_scatter";

/**
 * 图表配置组件，该组件需要根据不同的组件类型、子类型，渲染不同的组件配置页面
 * 是所有组件属性配置页面的总分发控制枢纽
 */
class ElemChartSet extends Component<any> {
    generateConfig = () => {
        const {dataXDesigner} = this.props;
        const {subType} = dataXDesigner?.active;
        switch (subType) {
            case "AntdBaseBar":
            case "AntdGroupBar":
            case "AntdPercentBar":
            case "AntdZoneBar":
            case "AntdStackBar":
                return <AntdBarSet {...this.props}/>;
            case "AntdBaseColumn":
            case "AntdGroupColumn":
            case "AntdPercentColumn":
            case "AntdZoneColumn":
            case "AntdStackColumn":
                return <AntdColumnSet {...this.props}/>;
            case "AntdStackArea":
                return <AntdAreaSet {...this.props}/>;
            case "AntdPie":
                return <AntdPieSet {...this.props}/>;
            case "AntdLiquid":
                return <AntdLiquidSet {...this.props}/>;
            case "AntdRadar":
                return <AntdRadarSet {...this.props}/>;
            case "AntdScatter":
                return <AntdScatterSet {...this.props}/>;
        }
    }

    render() {
        return (
            <div>
                {this.generateConfig()}
            </div>
        );
    }
}

export default ElemChartSet;