import React, {Component} from 'react';
import ReactGridLayout from 'react-grid-layout';
import {RouteComponentProps} from "react-router-dom";
import LcDesignerBackground from "../content/DesignerBackground";
import {getProjectById} from "../../utils/LocalStorageUtil";

interface LcShowProps extends RouteComponentProps {

}

class LcShow extends Component<LcShowProps | any> {

    state: any = {};

    constructor(props: any) {
        super(props);
        const {location: {state}} = this.props;
        getProjectById(state.id).then((project: any) => {
            this.state = {LCDesignerStore: project};
        });
    }

    calculateChartConfig = (elemId: string | number) => {
        const {LCDesignerStore: {chartConfigs}} = this.state;
        return chartConfigs[elemId];
    }

    generateElement = () => {
        return <></>
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