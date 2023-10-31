import React from "react";
import {MonacoEditor} from "../../../../../ui/code-editor/MonacoEditor";
import Button from "../../../../../ui/button/Button";
import './ConditionNodeConfig.less';

export const ConditionNodeConfig: React.FC = () => {
    return (
        <div className={'condition-node-config'}>
            <MonacoEditor value={"function doIf(data) { \n \n }"} height={300} language={'javascript'}/>
            <div className={'cnc-footer'}>
                <Button>保存</Button>
            </div>
        </div>
    )
}
