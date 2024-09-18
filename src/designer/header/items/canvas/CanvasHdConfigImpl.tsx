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
        config: {gridGap: '15px'},
        children: [
            {
                type: 'number-input',
                label: '宽度',
                value: width,
                key: 'width',
            },
            {
                type: 'number-input',
                label: '高度',
                value: height,
                key: 'height',
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
                    ]
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
                    },
                    {
                        type: 'number-input',
                        label: '缩放步长',
                        value: resizeStep,
                        key: 'resizeStep',
                    }
                ]
            }
        ]
    }


    return (
        <Modal title="画布设置" width={350} open={canvasVisible} onOk={doSave} onCancel={onClose}
               footer={[
                   <Button key="submit" style={{width: 70, height: 30}} size="small" type="primary"
                           onClick={doSave}>确定</Button>,
                   <Button key="back" style={{width: 70, height: 30}} size="small" onClick={onClose}>取消</Button>
               ]}
               className={"lc-header-canvas"}>
            <LCGUI schema={schema} onFieldChange={onFieldChange}/>
            <p className={'canvas-config-desc'}>说明：修改画布设置，会对整体效果产生较大影响，建议先调试好画布设置后再进行大屏设计</p>
        </Modal>
    );

})

export default CanvasHdConfigImpl;