import React, {Component} from 'react';
import ReactGridLayout from 'react-grid-layout';
import getChartsTemplate from "../charts/ComponentChartInit";
import getBorder from "../border";

class Preview extends Component<any, any> {

    state: any = {};

    constructor(props: any) {
        super(props);
        const {location} = this.props;
        let screens = JSON.parse(window.localStorage.lightChaser);
        let screen;
        for (let i = 0; i < screens.length; i++) {
            if (screens[i].id == location.state.id) {
                screen = screens[i];
                break;
            }
        }
        screen.layoutConfig = JSON.parse(screen.layoutConfig);
        screen.chartConfigs = JSON.parse(screen.chartConfigs);
        this.state = {LCDesignerStore: screen};
    }

    generateElement = () => {
        const {LCDesignerStore} = this.state;
        const {layoutConfig = [], chartConfigs} = LCDesignerStore!;
        return layoutConfig.map((item: any) => {
            let ElementChart = getChartsTemplate(item.name);
            let borderType = chartConfigs[item.id].elemBaseProperties.borderType;
            let Border = getBorder(borderType);
            return (
                <div key={item?.id + ''} style={{width: '100%', height: '100%'}}>
                    <Border elemId={item?.id} LCDesignerStore={LCDesignerStore} {...this.props}>
                        <ElementChart elemId={item?.id} LCDesignerStore={LCDesignerStore}/>
                    </Border>
                </div>
            );
        })
    }

    render() {
        const {LCDesignerStore} = this.state;
        const {layoutConfig = []} = LCDesignerStore;
        return (
            <div className="site-layout-background" style={{height: window.innerHeight - 64}}>
                <ReactGridLayout className="layout"
                                 layout={layoutConfig}
                                 cols={48}
                                 rowHeight={10}
                                 margin={[15, 15]}
                                 useCSSTransforms={true}
                                 preventCollision={true}
                                 allowOverlap={true}
                                 isBounded={true}
                                 isDroppable={false}
                                 style={{height: window.innerHeight}}
                                 width={window.innerWidth}>
                    {this.generateElement()}
                </ReactGridLayout>
            </div>
        );
    }
}

export default Preview;