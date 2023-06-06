import React, {Component} from 'react';
import ReactGridLayout from 'react-grid-layout';
import DesignerBackground from "../../comps/lc/background/DesignerBackground";
import designerStore from "../store/DesignerStore";
import designerStarter from "../DesignerStarter";
import './DesignerView.less';

interface LcShowProps {

}

class DesignerView extends Component<LcShowProps | any> {

    state: any = {};

    constructor(props: any) {
        super(props);
        // const {location: {state}} = this.props;
        // getProjectById(state.id).then((project: any) => {
        //     this.state = {projectData: project};
        // });
    }

    getRGLProps = () => {
        const {layoutConfigs, canvasConfig} = designerStore;
        let margin: [number, number] = [0, 0];
        return {
            layout: layoutConfigs,
            cols: canvasConfig?.columns || 1920 / 5,
            rowHeight: 5,
            margin: margin,
            useCSSTransforms: true,
            preventCollision: true,
            allowOverlap: true,
            isBounded: true,
            isDroppable: true,
            // style: {height: 1080},
            // transformScale: 1,
            width: canvasConfig?.width,
        }
    }

    calculateChartConfig = (elemId: string | number) => {
        const {elemConfigs} = designerStore;
        if (elemConfigs)
            return elemConfigs[elemId];
    }

    generateElement = () => {
        const {layoutConfigs} = designerStore!;
        if (layoutConfigs && layoutConfigs.length > 0) {
            const {customComponentInfoMap}: any = designerStarter;
            return layoutConfigs.map((item: any) => {
                let Chart: any = customComponentInfoMap[item.compKey].getComponent();
                const compConfig: any = this.calculateChartConfig(item.id);
                return (
                    <div key={item?.id + ''} className={'lc-comp-item'}
                         id={item.id} data-type={compConfig?.info?.type}
                         style={{width: '100%', height: '100%'}}>
                        <Chart config={compConfig}/>
                    </div>
                );
            })
        }
    }

    render() {
        const {layoutConfigs = [], elemConfigs = {}} = designerStore;
        for (let i = 0; i < layoutConfigs.length; i++)
            layoutConfigs[i].isDraggable = false;
        return (
            <DesignerBackground config={elemConfigs['-1']['background'] || {}}>
                <ReactGridLayout {...this.getRGLProps()}>
                    {this.generateElement()}
                </ReactGridLayout>
            </DesignerBackground>
        );
    }
}

export default DesignerView;