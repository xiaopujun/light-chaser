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

import eventOperateStore from "../../../designer/operate-provider/EventOperateStore.ts";
import footerStore from "../../../designer/footer/FooterStore.ts";
import {useRef} from "react";
import {Button, Modal} from "antd";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import MonacoEditor from "../../../json-schema/ui/code-editor/MonacoEditor.tsx";

export default function ConfigCode() {
    const codeRef = useRef("");
    const {targetIds} = eventOperateStore;
    const {layerConfigs, compController} = window.LC_ENV.layerManager!;
    if (targetIds.length !== 1 || layerConfigs[targetIds[0]].type === 'group') {
        globalMessage.messageApi?.warning('请选择组件后进行操作');
        return null;
    }
    const componentId = targetIds[0];
    const controller = compController[componentId];
    if (!controller)
        return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {base, ...config} = controller.getConfig();
    codeRef.current = JSON.stringify(config, null, 2);

    const onCancel = () => footerStore.setConfigCodeVisible(false);

    const onChange = (value?: string) => value && (codeRef.current = value)

    const doSave = () => {
        try {
            controller.update(JSON.parse(codeRef.current))
        } catch (e) {
            globalMessage.messageApi?.error('代码错误,请检查');
            console.error(e)
        }
    }

    return (
        <Modal title={'代码编辑'} open={true} width={500} maskClosable={false}
               onCancel={onCancel} style={{top: 0, right: 0, position: 'absolute'}} mask={false}
               footer={[
                   <Button key={'save'} style={{width: 70, height: 30}} onClick={doSave} type="primary">保存</Button>,
                   <Button key={'cancel'} style={{width: 70, height: 30}} onClick={onCancel}>取消</Button>
               ]}>
            <MonacoEditor onChange={onChange} value={codeRef.current} quickSuggestions={true} height={700}/>
        </Modal>
    )
}