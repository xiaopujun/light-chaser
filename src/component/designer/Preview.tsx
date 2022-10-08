import React, {Component} from 'react';
import ReactGridLayout from "react-grid-layout";
import getChartsTemplate from "../charts/ComponentChartInit";
import getBorder from "../border";

class Preview extends Component {

    generateElement = () => {
        const LCDesignerStore = null;
        const {layoutConfig = [], chartConfigMap = new Map()} = LCDesignerStore!;
        return layoutConfig.map((item: any) => {
            let ElementChart = getChartsTemplate(item.name);
            let borderType = chartConfigMap.get(parseInt(item.id)).elemBaseProperties.borderType;
            let Border = getBorder(borderType);
            return (
                <div key={item?.id + ''} style={{width: '100%', height: '100%'}}>
                    <Border {...this.props}>
                        <ElementChart elemId={item?.id} {...this.props}/>
                    </Border>
                </div>
            );
        })
    }

    render() {
        return (
            <div className="site-layout-background" style={{height: window.innerHeight - 64}}>
                <ReactGridLayout className="layout"
                    // layout={layoutConfig}
                                 cols={48}
                                 rowHeight={10}
                                 margin={[15, 15]}
                                 useCSSTransforms={true}
                                 preventCollision={true}
                                 allowOverlap={true}
                                 isBounded={true}
                                 isDroppable={true}
                                 style={{height: window.innerHeight - 64}}
                                 width={window.innerWidth - 600}>
                    {this.generateElement()}
                </ReactGridLayout>
            </div>
        );
    }
}

export default Preview;