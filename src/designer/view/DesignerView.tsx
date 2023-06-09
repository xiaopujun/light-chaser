import React, {Component} from 'react';
import DesignerBackground from "../../comps/lc/background/DesignerBackground";
import designerStore from "../store/DesignerStore";
import designerStarter from "../DesignerStarter";
import './DesignerView.less';
import {MovableItemData} from "../../lib/lc-movable/types";

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

    calculateChartConfig = (elemId: string | number) => {
        const {elemConfigs} = designerStore;
        if (elemConfigs)
            return elemConfigs[elemId];
    }

    generateElement = () => {
        const {layoutConfigs} = designerStore!;
        if (layoutConfigs && layoutConfigs.length > 0) {
            const {customComponentInfoMap}: any = designerStarter;
            return layoutConfigs.map((item: MovableItemData) => {
                let Chart: any = customComponentInfoMap[item.type + ''].getComponent();
                const compConfig: any = this.calculateChartConfig(item.id + '');
                return (
                    <div id={item.id} data-type={item.type} key={item.id + ''}
                         style={{
                             width: item.width,
                             height: item.height,
                             transform: `translate(${item.position[0]}px, ${item.position[1]}px)`,
                             position: 'absolute'
                         }} className={'lc-comp-item'}>
                        <Chart config={compConfig}/>
                    </div>
                );
            })
        }
    }

    render() {
        const {elemConfigs = {}} = designerStore;
        return (
            <DesignerBackground config={elemConfigs['-1']['background'] || {}}>
                {this.generateElement()}
            </DesignerBackground>
        );
    }
}

export default DesignerView;