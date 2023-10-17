import React, {useEffect} from "react";
import LineLayer from "./line/LineLayer";
import {NodeLayer} from "./node/NodeLayer";
import {reRenderLine} from "./drag/BPMovable";

export const BPCanvas: React.FC = () => {
    useEffect(() => {
        //加载完毕后绘制链接线
        reRenderLine();
    }, [])
    return (
        <div className={'blue-print'} id={'blue-print'} style={{overflow: "hidden"}}>
            <LineLayer/>
            <NodeLayer/>
        </div>
    )
}




