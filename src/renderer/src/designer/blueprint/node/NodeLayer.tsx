import {BPMovable} from "../drag/BPMovable";
import {BPSelectable} from "../drag/BPSelectable";
import {observer} from "mobx-react";
import bluePrintManager from "../manager/BluePrintManager.ts";
import {BPDragScaleContainer} from "./BPDragScaleContainer";
import {BPNodeContainer} from "./core/node-container/BPNodeContainer";
import {useEffect, useRef} from "react";

const NodeLayer = observer(() => {
    const {bpNodeLayoutMap} = bluePrintManager;
    const _npNodeConRef = useRef(null);

    useEffect(() => {
        const {setNodeContainerRef} = bluePrintManager;
        setNodeContainerRef(_npNodeConRef.current!);
    }, []);

    return (
        <div id={'bp-node-container'} style={{position: 'relative', width: '100%', height: '100%'}}
             ref={_npNodeConRef}>
            <BPSelectable>
                <BPDragScaleContainer>
                    <BPMovable>
                        {Object.values(bpNodeLayoutMap).map((layout) => {
                            return <BPNodeContainer key={layout.id} layout={layout}/>
                        })}
                    </BPMovable>
                </BPDragScaleContainer>
            </BPSelectable>
        </div>
    )
})

export default NodeLayer;