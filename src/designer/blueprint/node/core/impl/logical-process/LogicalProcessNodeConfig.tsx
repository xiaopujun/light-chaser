import React, {Suspense, lazy, useState} from "react";
import {BPRightConfigProps} from "../../../../right/BPRight";
import {debounce} from "lodash";
import Loading from "../../../../../../json-schema/ui/loading/Loading.tsx";

const CodeEditor = lazy(() => import("../../../../../../json-schema/ui/code-editor/CodeEditor.tsx"));

export const LogicalProcessNodeConfig: React.FC<BPRightConfigProps> = (props) => {
    const {controller} = props;
    const config = controller?.getConfig();
    const handleCode = config.handler || "function handle(data) { \n \n }";
    const [count, setCount] = useState(0);
    const onCodeChange = debounce((value: string | undefined) => {
        if (!value) return;
        controller?.update({handler: value});
        setCount(count + 1);
    }, 500);
    return (
        <div className={'logical-process-node-config'}>
            <Suspense fallback={<Loading/>}>
                <CodeEditor value={handleCode} onChange={onCodeChange} height={400} fullScreen={true}
                            language={'javascript'}/>
            </Suspense>
        </div>
    )
}
