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

import React, {Suspense, useState} from "react";
import {BPRightConfigProps} from "../../../../right/BPRight";
import debounce from "lodash/debounce";
import Loading from "../../../../../../json-schema/ui/loading/Loading.tsx";

const CodeEditor = React.lazy(() => import("../../../../../../json-schema/ui/code-editor/CodeEditor.tsx"));

export const ConditionNodeConfig: React.FC<BPRightConfigProps> = (props) => {
    const {controller} = props;
    const config = controller?.getConfig();
    const handleCode = config.handler || "function handler(data) { \n \n }";
    const [count, setCount] = useState(0);
    const onCodeChange = debounce((value: string | undefined) => {
        if (!value) return;
        controller?.update({handler: value});
        setCount(count + 1);
    }, 500);
    return (
        <div className={'condition-node-config'}>
            <Suspense fallback={<Loading/>}>
                <CodeEditor value={handleCode} onChange={onCodeChange} height={400} fullScreen={true}
                            language={'javascript'}/>
            </Suspense>
        </div>
    )
}
