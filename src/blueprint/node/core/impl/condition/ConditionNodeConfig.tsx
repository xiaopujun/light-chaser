import React from "react";
import {MonacoEditor} from "../../../../../json-schema/ui/code-editor/MonacoEditor";
import {BPRightConfigProps} from "../../../../right/BPRight";
import {debounce} from "lodash";

export const ConditionNodeConfig: React.FC<BPRightConfigProps> = (props) => {
    const {controller} = props;
    const config = controller?.getConfig();
    const handleCode = config.handler || "function handler(data) { \n \n }";
    const onCodeChange = debounce((value: string | undefined) => {
        if (!value) return;
        controller?.update({handler: value});
    }, 500);
    return (
        <div className={'condition-node-config'}>
            <MonacoEditor value={handleCode} onChange={onCodeChange} height={400}
                          language={'javascript'}/>
        </div>
    )
}
