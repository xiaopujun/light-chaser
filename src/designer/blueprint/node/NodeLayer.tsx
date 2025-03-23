/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

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