import React, {Component} from 'react';
import DesignerBackground from "../../comps/lc/background/DesignerBackground";
import designerStore from "../store/DesignerStore";
import designerStarter from "../DesignerStarter";
import './DesignerView.less';
import {MovableItemType} from "../../lib/lc-movable/types";

interface LcShowProps {

}

class DesignerView extends Component<LcShowProps | any> {

    state: any = {};

    calculateChartConfig = (elemId: string | number) => {
        const {elemConfigs} = designerStore;
        if (elemConfigs)
            return elemConfigs[elemId];
    }

    generateElement = () => {
        const {layoutConfigs} = designerStore!;
        const {customComponentInfoMap}: any = designerStarter;
        const sortLayout = Object.values(layoutConfigs).sort((a: any, b: any) => a.order - b.order);
        return sortLayout.map((item: MovableItemType) => {
            let Chart: any = customComponentInfoMap[item.type + ''].getComponent();
            const compConfig: any = this.calculateChartConfig(item.id + '');
            let position = item.position || [0, 0];
            return <div id={item.id}
                        data-type={item.type}
                        data-locked={item.locked}
                        data-hide={false}
                        key={item.id + ''}
                        style={{
                            width: item.width,
                            height: item.height,
                            transform: `translate(${position[0]}px, ${position[1]}px)`,
                            position: 'absolute',
                        }} className={'lc-comp-item'}>
                <Chart config={compConfig} realTimeRefresh={true}/>
            </div>
        });
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