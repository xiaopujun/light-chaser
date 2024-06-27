import React, {Suspense} from "react";
import {debounce} from "lodash";
import Loading from "../../../../../../json-schema/ui/loading/Loading.tsx";
import {AbstractBPNodeController} from "../../AbstractBPNodeController.ts";

const MonacoEditor = React.lazy(() => import("../../../../../../json-schema/ui/code-editor/MonacoEditor"));

export const ConditionNodeConfig = (props: { controller?: AbstractBPNodeController; }) => {
    const {controller} = props;
    const config = controller?.getConfig();
    const handleCode = config.handler || "function handler(data) { \n \n }";
    const onCodeChange = debounce((value: string | undefined) => {
        if (!value) return;
        controller?.update({handler: value});
    }, 500);
    return (
        <div className={'condition-node-config'}>
            <Suspense fallback={<Loading/>}>
                <MonacoEditor value={handleCode} onChange={onCodeChange} height={400}
                              language={'javascript'}/>
            </Suspense>
        </div>
    )
}
