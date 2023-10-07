import React from "react";
import LineLayer from "./line/LineLayer";
import {NodeLayer} from "./node/NodeLayer";
import {BPEvent} from "./event/BPEvent";

export const BluePrint: React.FC = () => {
    return (
        <BPEvent>
            <LineLayer/>
            <NodeLayer/>
        </BPEvent>
    )
}




