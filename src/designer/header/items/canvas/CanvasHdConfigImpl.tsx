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
import {observer} from "mobx-react";
import {MouseEvent, useRef, useState} from 'react';
import {CanvasConfig} from "../../../DesignerType";
import './CanvasHdConfigImpl.less';
import {Button, Modal} from "antd";
import {Control} from "../../../../json-schema/SchemaTypes.ts";
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI.tsx";
import canvasHdStore from "./CanvasManager.ts";
import canvasManager from "./CanvasManager.ts";

const CanvasHdConfigImpl = observer(() => {
    const configRef = useRef<CanvasConfig | null>({...canvasManager.canvasConfig});
    const {canvasVisible, setCanvasVisible} = canvasHdStore;
    const {width, height, rasterize, dragStep, resizeStep} = configRef.current!;
    const [count, setCount] = useState(0);

    const onClose = () => {
        setCanvasVisible(false);
    }

    const doSave = (e: MouseEvent<HTMLButtonElement>) => {
        canvasManager.updateCanvasConfig(configRef.current!);
        e.preventDefault();
        onClose();
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment, reRender} = fieldChangeData;
        configRef.current = {...configRef.current!, ...dataFragment};
        if (reRender)
            setCount(count + 1);
    }

    const schema: Control = {
        type: 'grid',
        config: {gridGap: '16px'},
        children: [
            {
                type: 'number-input',
                label: '宽度',
                value: width,
                key: 'width',
                config: {
                    style: {
                        backgroundColor: '#2C2C3E',
                        borderColor: '#3A3A4E',
                        color: '#FFFFFF'
                    }
                }
            },
            {
                type: 'number-input',
                label: '高度',
                value: height,
                key: 'height',
                config: {
                    style: {
                        backgroundColor: '#2C2C3E',
                        borderColor: '#3A3A4E',
                        color: '#FFFFFF'
                    }
                }
            },
            {
                type: 'select',
                label: '屏幕适配',
                value: configRef.current!.adaptationType,
                key: 'adaptationType',
                config: {
                    options: [
                        {label: '自适应', value: 'scale'},
                        {label: '撑满宽度', value: 'full-x'},
                        {label: '撑满高度', value: 'full-y'},
                        {label: '撑满全屏', value: 'full-screen'},
                        {label: '无自适应', value: 'none'}
                    ],
                    style: {
                        backgroundColor: '#2C2C3E',
                        borderColor: '#3A3A4E',
                        color: '#FFFFFF'
                    }
                }
            },
            {
                type: 'switch',
                label: '栅格化',
                value: rasterize,
                reRender: true,
                key: 'rasterize',
            },
            {
                rules: "{rasterize} === 'true'",
                children: [
                    {
                        type: 'number-input',
                        label: '拖拽步长',
                        value: dragStep,
                        key: 'dragStep',
                        config: {
                            style: {
                                backgroundColor: '#2C2C3E',
                                borderColor: '#3A3A4E',
                                color: '#FFFFFF'
                            }
                        }
                    },
                    {
                        type: 'number-input',
                        label: '缩放步长',
                        value: resizeStep,
                        key: 'resizeStep',
                        config: {
                            style: {
                                backgroundColor: '#2C2C3E',
                                borderColor: '#3A3A4E',
                                color: '#FFFFFF'
                            }
                        }
                    }
                ]
            }
        ]
    }

    return (
        <Modal
            title={<span className="canvas-config-title">画布设置</span>}
            width={400}
            open={canvasVisible}
            onCancel={onClose}
            footer={[
                <Button
                    key="cancel"
                    className="canvas-config-btn secondary"
                    onClick={onClose}
                >
                    取消
                </Button>,
                <Button
                    key="submit"
                    className="canvas-config-btn primary"
                    type="primary"
                    onClick={doSave}
                >
                    确定
                </Button>
            ]}
            className="lc-header-canvas-modal"
            bodyStyle={{padding: '20px'}}
        >
            <div className="canvas-config-content">
                <LCGUI schema={schema} onFieldChange={onFieldChange}/>
                <p className="canvas-config-desc">
                    说明：修改画布设置，会对整体效果产生较大影响，建议先调试好画布设置后再进行大屏设计
                </p>
            </div>
        </Modal>
    );
})

export default CanvasHdConfigImpl;