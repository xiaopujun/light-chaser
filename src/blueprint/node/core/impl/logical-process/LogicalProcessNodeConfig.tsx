import React, {Suspense, lazy} from "react";
import {BPRightConfigProps} from "../../../../right/BPRight";
import {debounce} from "lodash";
import Loading from "../../../../../json-schema/ui/loading/Loading.tsx";

const MonacoEditor = lazy(() => import("../../../../../json-schema/ui/code-editor/MonacoEditor"));

export const LogicalProcessNodeConfig: React.FC<BPRightConfigProps> = (props) => {
    const {controller} = props;
    const config = controller?.getConfig();
    const handleCode = config.handler || "function handle(data) { \n \n }";
    const onCodeChange = debounce((value: string | undefined) => {
        if (!value) return;
        controller?.update({handler: value});
    }, 500);
    return (
        <div className={'logical-process-node-config'}>
            <Suspense fallback={<Loading/>}>
                <MonacoEditor value={handleCode} onChange={onCodeChange} height={400}
                              language={'javascript'}/>
            </Suspense>
        </div>
    )
}
