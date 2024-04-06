import {observer} from "mobx-react";
import {FormEvent, useRef, useState} from 'react';
import Dialog from "../../../../json-schema/ui/dialog/Dialog";
import {CanvasConfig} from "../../../DesignerType";
import './CanvasHdConfigImpl.less';
import {Grid} from "../../../../json-schema/ui/grid/Grid";
import Switch from "../../../../json-schema/ui/switch/Switch";
import Button from "../../../../json-schema/ui/button/Button";
import NumberInput from "../../../../json-schema/ui/number-input/NumberInput";
import canvasHdStore from "./CanvasManager.ts";
import canvasManager from "./CanvasManager.ts";


const CanvasHdConfigImpl = () => {
    const configRef = useRef<CanvasConfig | null>({...canvasManager.canvasConfig});
    const [_rasterize, setRasterize] = useState(canvasManager.canvasConfig.rasterize || false);
    const {canvasVisible, setCanvasVisible} = canvasHdStore;
    const {width, height, rasterize, dragStep, resizeStep} = configRef.current!;

    const onClose = () => {
        setCanvasVisible(false);
    }

    const doSave = (e: FormEvent<HTMLFormElement>) => {
        canvasManager.updateCanvasConfig(configRef.current!);
        e.preventDefault();
        onClose();
    }

    return (
        <Dialog className={'lc-header-canvas'} title={'画布设置'} visible={canvasVisible} onClose={onClose}>
            <form onSubmit={doSave}>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <Grid gridGap={'15px'} columns={3}>
                        <NumberInput label={'宽度'} defaultValue={width} min={500}
                                     onChange={(width) => configRef.current!.width = width as number}/>
                        <NumberInput label={'高度'} defaultValue={height} min={300}
                                     onChange={(height) => configRef.current!.height = height as number}/>
                        <Switch label={'栅格化'} defaultValue={rasterize} containerStyle={{gridColumn: '1/2'}}
                                onChange={value => {
                                    configRef.current!.rasterize = value;
                                    setRasterize(value)
                                }}/>
                        <NumberInput label={'拖拽'} disabled={!_rasterize}
                                     defaultValue={dragStep} min={1}
                                     onChange={(dragStep) => configRef.current!.dragStep = dragStep}/>
                        <NumberInput label={'缩放'} disabled={!_rasterize}
                                     defaultValue={resizeStep} min={1}
                                     onChange={(resizeStep) => configRef.current!.resizeStep = resizeStep}/>
                    </Grid>
                </div>
                <p className={'canvas-config-desc'}>说明：修改画布设置，会对整体效果产生较大影响，建议先调试好画布设置后再进行大屏设计</p>
                <div className={'lc-header-canvas-footer'}>
                    <Button type={'submit'}>保存</Button>&nbsp;&nbsp;
                    <Button type={'button'} onClick={onClose}>取消</Button>
                </div>
            </form>
        </Dialog>
    );

}

export default observer(CanvasHdConfigImpl);