import React from "react";
import LineLayer from "./line/LineLayer";
import {NodeLayer} from "./node/NodeLayer";

export const BPCanvas: React.FC = () => {
    return (
        <div className={'blue-print'} id={'blue-print'} style={{overflow: "hidden"}}>
            <LineLayer/>
            <NodeLayer/>
        </div>
    )
}




