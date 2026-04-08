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

import ReactDOM from "react-dom";
import {lazy, ReactElement, Suspense} from "react";
import Loading from "../../../../json-schema/ui/loading/Loading.tsx";

const BluePrint = lazy(() => import("../../../blueprint/BluePrint.tsx"));

export default function BluePrintHdImpl() {
    return ReactDOM.createPortal(
        <div style={{
            position: 'relative',
            top: -window.innerHeight,
            zIndex: 2,
            width: '100%',
            height: '100%',
            backgroundColor: '#151515'
        }}>
            <Suspense fallback={<Loading/>}>
                <BluePrint/>
            </Suspense>
        </div>, document.body)! as ReactElement;
}
