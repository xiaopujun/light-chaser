import React, {Component} from 'react';
import DesignerBackground from "../../comps/lc/background/DesignerBackground";
import designerStore from "../store/DesignerStore";
import designerStarter from "../DesignerStarter";
import './DesignerView.less';
import MovableItem, {MovableItemData} from "../../lib/lc-movable/MovableItem";

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
                    <MovableItem key={item.id + ''}
                                 data={{
                                     width: item.width,
                                     height: item.height,
                                     position: item.position,
                                     id: item.id,
                                     type: item.type
                                 }}>
                        <Chart config={compConfig}/>
                    </MovableItem>
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