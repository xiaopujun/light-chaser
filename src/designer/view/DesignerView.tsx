import React, {Component} from 'react';
import DesignerBackground from "../../comps/lc/background/DesignerBackground";
import './DesignerView.less';
import {MovableItemType} from "../../lib/lc-movable/types";
import Loading from "../../lib/loading/Loading";
import designerStore from "../store/DesignerStore";
import ComponentContainer from "../../framework/core/ComponentContainer";
import {observer} from "mobx-react";
import EditorDesignerLoader from "../loader/EditorDesignerLoader";

class DesignerView extends Component {

    componentDidMount() {
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
        let {loaded, elemConfigs} = designerStore!;
        return (
            <>
                {loaded ? <DesignerBackground config={elemConfigs!['80cc666f']['background'] || {}}>
                    {this.generateElement()}
                </DesignerBackground> : <Loading/>}
            </>
        );
    }
}

export default DesignerView;