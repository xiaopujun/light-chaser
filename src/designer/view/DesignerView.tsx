import React, {Component} from 'react';
import DesignerBackground from "../../comps/lc/background/DesignerBackground";
import designerStarter from "../DesignerStarter";
import './DesignerView.less';
import {MovableItemType} from "../../lib/lc-movable/types";
import {parseUrlParams} from "../../utils/URLUtil";
import Loading from "../../lib/loading/Loading";
import LocalOperator from "../../framework/operate/LocalOperator";

interface LcShowProps {

}

class DesignerView extends Component<LcShowProps | any> {

    elemConfigs: any = {};
    layoutConfigs: any = {};
    state: any = {
        loaded: false
    };

    componentDidMount() {
        let urlParams = parseUrlParams();
        //todo 要使用策略模式替换。本地存储和远程存储
        new LocalOperator().getProject(urlParams.id).then((project: any) => {
            if (project) {
                const {scannerCustomComponents} = designerStarter;
                scannerCustomComponents();
                this.elemConfigs = project.elemConfigs;
                this.layoutConfigs = project.layoutConfigs;
                this.setState({loaded: true});
            }
        });
    }

    calculateChartConfig = (elemId: string | number) => {
        if (this.elemConfigs)
            return this.elemConfigs[elemId];
    }

    generateElement = () => {
        const {customComponentInfoMap}: any = designerStarter;
        const sortLayout: MovableItemType[] | any = Object.values(this.layoutConfigs).sort((a: any, b: any) => a.order - b.order);
        return sortLayout.map((item: MovableItemType) => {
            let Chart: any = customComponentInfoMap[item.type + ''].getComponent();
            const compConfig: any = this.calculateChartConfig(item.id + '');
            console.log('compConfig', compConfig)
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
        const {loaded} = this.state;
        return (
            <>
                {loaded ? <DesignerBackground config={this.elemConfigs['-1']['background'] || {}}>
                    {this.generateElement()}
                </DesignerBackground> : <Loading/>}
            </>
        );
    }
}

export default DesignerView;