import React, {Suspense, useState} from "react";
import {BPRightConfigProps} from "../../../../right/BPRight";
import {debounce} from "lodash";
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
