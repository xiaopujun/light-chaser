import React, {Component} from 'react';
import './LayerList.less';
import {LineOutlined} from "@ant-design/icons";
import {Input} from "antd";
import layerListStore from "./LayerListStore";
import CommonDragger from "../../operate-provider/drag/CommonDragger";

class LayerList extends Component {

    dragTargetRef: any = null;
    layerListRef: any = null;

    componentDidMount() {
        if (this.dragTargetRef && this.layerListRef) {
            new CommonDragger(this.layerListRef, this.dragTargetRef, {x: 250, y: -window.innerHeight + 50});
        }
    }


    onClose = () => {
        const {setVisible} = layerListStore;
        setVisible && setVisible(false);
    }

    searchLayer = (e: any) => {
        console.log(e.target.value);
    }

    render() {
        return (
            <div className={'lc-layer-list'} style={{transform: 'translate(250px, calc(-100vh + 50px))'}}
                 ref={ref => this.layerListRef = ref}>
                <div className={'list-title'}>
                    <div className={'title-content'}>图层</div>
                    <div ref={ref => this.dragTargetRef = ref} className={'title-drag-target'}
                         style={{width: '50%', height: '100%'}}>
                    </div>
                    <div className={'title-close-btn'} onClick={this.onClose}><span><LineOutlined/></span></div>
                </div>
                <div className={'list-search'}>
                    <Input placeholder="搜索图层" onPressEnter={this.searchLayer}
                           style={{width: '100%'}}/>
                </div>
                <div className={'list-items'}>

                </div>
            </div>
        );
    }
}

export default LayerList;