import React from "react";
import {MonacoEditor} from "../../../../../ui/code-editor/MonacoEditor";
import {BPRightConfigProps} from "../../../../right/BPRight";
import {debounce} from "lodash";

export const ConditionNodeConfig: React.FC<BPRightConfigProps> = (props) => {
    const {controller} = props;
    const config = controller?.getConfig();
    let handleCode = config.handle || "function handle(data) { \n \n }";
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
