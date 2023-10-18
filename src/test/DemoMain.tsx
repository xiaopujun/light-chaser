import React from 'react';
import DragScaleProvider from "../framework/drag-scale/DragScaleProvider";
import {idGenerate} from "../utils/IdGenerate";
import {observer} from "mobx-react";
import {NodeLayer} from "../blueprint/node/NodeLayer";
import bpStore from "../blueprint/store/BPStore";

const addNodes = () => {
    const {addNodes} = bpStore;
    const id = idGenerate.generateId();
    addNodes({
        id: id,
        name: '测试' + id,
        input: [],
        output: [],
        position: {x: 100, y: 100},
        titleBgColor: '#a112e0',
    })
}

class MyComponent extends React.Component {

    container: HTMLDivElement | null = null;
    content: HTMLDivElement | null = null;

    componentDidMount() {
        new DragScaleProvider({
            container: this.container,
            content: this.content,
            posOffset: {x: 0, y: 100},
        });
    }

    render() {
        // const {addNodes} = bpStore;
        return (
            <>
                {/*<FrameLayout header={<BPHeader/>}*/}
                {/*             left={<BPLeft/>}*/}
                {/*             content={<BPCanvas/>}*/}
                {/*             footer={<BPFooter/>}*/}
                {/*             right={<BPRight/>}*/}
                {/*/>*/}
                <button onClick={addNodes}>添加
                </button>
                <NodeLayer/>

            </>

        )
    }

}

export default observer(MyComponent);
