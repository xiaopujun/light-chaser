import React, {Component} from 'react';
import './DesignerView.less';
import {MovableItemType} from "../../lib/lc-movable/types";
import Loading from "../../lib/loading/Loading";
import designerStore from "../store/DesignerStore";
import ComponentContainer from "../../framework/core/ComponentContainer";
import {observer} from "mobx-react";
import EditorDesignerLoader from "../loader/EditorDesignerLoader";

class DesignerView extends Component {

    constructor(props: any) {
        super(props);
        EditorDesignerLoader.getInstance().load();
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
        if (!loaded)
            return <Loading/>;
        return (
            <div style={{width, height, background: 'black', overflow: 'hidden'}}>
                {this.generateElement()}
            </div>
        );
    }
}

export default observer(DesignerView);