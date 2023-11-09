import {Component} from 'react';
import './DesignerView.less';
import {MovableItemType} from "../operate-provider/movable/types";
import designerStore from "../store/DesignerStore";
import ComponentContainer from "../../framework/core/ComponentContainer";
import {observer} from "mobx-react";
import Loading from "../../ui/loading/Loading";
import DesignerLoaderFactory from "../loader/DesignerLoaderFactory";

class DesignerView extends Component {

    constructor(props: any) {
        super(props);
        DesignerLoaderFactory.getLoader().load();
    }

    generateElement = () => {
        let {layoutConfigs} = designerStore!;
        const sortLayout = Object.values(layoutConfigs).sort((a: MovableItemType, b: MovableItemType) => a.order! - b.order!);
        return sortLayout.map((item: MovableItemType) => {
            return <ComponentContainer layout={item} key={item.id}/>
        });
    }

    render() {
        let {loaded, canvasConfig: {width, height}} = designerStore!;
        console.log("view render", loaded)
        if (!loaded)
            return <Loading/>;
        return (
            <div style={{width, height, background: 'black', overflow: 'hidden', position: "relative"}}>
                {this.generateElement()}
            </div>
        );
    }
}

export default observer(DesignerView);