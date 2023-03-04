import React, {Component, Suspense} from 'react';
import ReactGridLayout from 'react-grid-layout';
import getChartsTemplate from "../charts/ChartsCollection";
import {RouteComponentProps} from "react-router-dom";
import Loading from "../loading/Loading";
import LcDesignerBackground from "../designer/LcDesignerBackground";

interface LcShowProps extends RouteComponentProps {

}

class LcShow extends Component<LcShowProps | any> {

    state: any = {};

    constructor(props: any) {
        super(props);
        const {location} = this.props;
        let screens = JSON.parse(window.localStorage.lightChaser);
        let screen;
        for (let i = 0; i < screens.length; i++) {
            if (screens[i].id === location.state.id) {
                screen = screens[i];
                break;
            }
        }
        screen.layoutConfigs = JSON.parse(screen.layoutConfigs);
        screen.chartConfigs = JSON.parse(screen.chartConfigs);
        this.state = {LCDesignerStore: screen};
    }

    calculateChartConfig = (elemId: string | number) => {
        const {LCDesignerStore: {chartConfigs}} = this.state;
        return chartConfigs[elemId];
    }

    generateElement = () => {
        const {LCDesignerStore} = this.state;
        const {layoutConfigs = []} = LCDesignerStore!;
        return layoutConfigs.map((item: any) => {
            let Chart: any = getChartsTemplate(item.name);
            const chartConfig = this.calculateChartConfig(item.id);
            return (
                <div key={item?.id + ''} style={{width: '100%', height: '100%'}}>
                    <Suspense fallback={<Loading width={'100%'} height={'100%'}/>}>
                        <Chart elemId={item?.id} chartConfig={chartConfig}/>
                    </Suspense>
                </div>
            );
        })
    }

    render() {
        const {LCDesignerStore} = this.state;
        const {layoutConfigs = [], canvasConfig} = LCDesignerStore;
        for (let i = 0; i < layoutConfigs.length; i++)
            layoutConfigs[i].isDraggable = false;
        return (
            <LcDesignerBackground>
                <ReactGridLayout className="layout"
                                 layout={layoutConfigs}
                                 cols={48}
                                 rowHeight={10}
                                 margin={[15, 15]}
                                 useCSSTransforms={true}
                                 preventCollision={true}
                                 allowOverlap={true}
                                 style={{
                                     height: canvasConfig.screenHeight,
                                     width: canvasConfig.screenWidth,
                                     backgroundColor: '#131e26',
                                 }}
                                 width={canvasConfig.screenWidth}>
                    {this.generateElement()}
                </ReactGridLayout>
            </LcDesignerBackground>
        );
    }
}

export default LcShow;