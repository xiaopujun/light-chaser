import React, {Component} from 'react';
import {HighlightFilled, LineOutlined} from "@ant-design/icons";
import './style/LcConfigContent.less';
import LcCanvasSet from "../config/canvas/LcCanvasSet";
import LcEmBaseInfo from "../config/info/LcEmBaseInfo";
import LcCompBaseStyleSet from "../config/base/LcCompBaseStyleSet";
import {LCDesignerProps} from "../../types/LcDesignerType";
import getChartsConfig from "../config/chart/ComponentSetInit";

interface LcConfigContentProps {
    title?: string;
    icon?: any;
    activeMenu?: string;
    LCDesignerStore?: LCDesignerProps;
    updateRightVisible?: (data?: any) => void;
    updateActive?: (data?: any) => void;
    updateBaseStyle?: (data?: any) => void;
    updateChartProps?: (data?: any) => void;
    updateBaseInfo?: (data?: any) => void;
    updateCanvasSet?: (data?: any) => void;
}

class LcConfigContent extends Component<LcConfigContentProps> {

    doRenderConfig = () => {
        let {LCDesignerStore, activeMenu} = this.props;
        const {activated, chartConfigs, canvasSet} = LCDesignerStore!;
        if (activated.id == -1)
            activeMenu = '';
        switch (activeMenu) {
            case 'info':
                return <LcEmBaseInfo updateBaseInfo={this.props.updateBaseInfo}
                                     baseInfo={chartConfigs[activated.id]?.baseInfo}/>
            case 'style':
                let ChartsConfig: any = getChartsConfig(activated.type);
                return <>
                    <LcCompBaseStyleSet updateBaseStyle={this.props.updateBaseStyle}
                                        baseStyle={chartConfigs[activated.id]?.baseStyle}/>
                    <ChartsConfig updateChartProps={this.props.updateChartProps}
                                  chartProps={chartConfigs[activated.id]?.chartProps}/>
                </>
            case 'data':
                return <div>开发中...</div>
            case 'animation':
                return <div>开发中...</div>
            case 'theme':
                return <div>开发中...</div>
            default:
                return <LcCanvasSet canvasSet={canvasSet} updateCanvasSet={this.props.updateCanvasSet}/>;
        }
    }

    render() {
        return (
            <div className={'lc-config-panel'}>
                <div className={'lc-panel-top'}>
                    <div className={'panel-title'}><HighlightFilled/>&nbsp;<span>样式</span></div>
                    <div className={'panel-operate'}><LineOutlined/></div>
                </div>
                <div className={'lc-panel-content'}>
                    {this.doRenderConfig()}
                </div>
            </div>
        );
    }
}

export default LcConfigContent;