import {observer} from "mobx-react";
import {Component, FormEvent} from 'react';
import Dialog from "../../../../ui/dialog/Dialog";
import {CanvasConfig} from "../../../DesignerType";
import designerStore from "../../../store/DesignerStore";
import headerStore from "../../HeaderStore";
import './CanvasHdConfigImpl.less';
import {Grid} from "../../../../ui/grid/Grid";
import Input from "../../../../ui/input/Input";
import Switch from "../../../../ui/switch/Switch";
import Button from "../../../../ui/button/Button";

/**
 * 画布设置React组件实现
 */
class CanvasHdConfigImpl extends Component {

    config: CanvasConfig | null = null;

    state = {
        _rasterize: false,
    }

    constructor(props: any) {
        super(props);
        const {canvasConfig} = designerStore;
        this.config = {...canvasConfig};
        this.state = {
            _rasterize: canvasConfig.rasterize || false
        }
    }

    onClose = () => {
        const {setCanvasVisible} = headerStore;
        setCanvasVisible(false);
    }

    doSave = (e: FormEvent<HTMLFormElement>) => {
        const {updateCanvasConfig} = designerStore;
        console.log(this.config);
        updateCanvasConfig(this.config!);
        e.preventDefault();
        this.onClose();
    }

    render() {
        const {_rasterize} = this.state;
        const {canvasVisible} = headerStore;
        const {width, height, rasterize, dragStep, resizeStep} = this.config as CanvasConfig;
        return (
            <Dialog className={'lc-header-canvas'} title={'画布设置'} visible={canvasVisible} onClose={this.onClose}>
                <form onSubmit={this.doSave}>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <Grid gridGap={'15px'} columns={3}>
                            <Input label={'宽度'} required={true} type={'number'} defaultValue={width} min={500}
                                   onChange={(width) => this.config!.width = width as number}/>
                            <Input label={'高度'} required={true} type={'number'} defaultValue={height} min={300}
                                   onChange={(height) => this.config!.height = height as number}/>
                            <Switch label={'栅格化'} defaultValue={rasterize} gridColumn={'1/2'} onChange={value => {
                                this.config!.rasterize = value;
                                this.setState({_rasterize: value})
                            }}/>
                            <Input label={'拖拽'} disabled={!_rasterize} type={'number'}
                                   defaultValue={dragStep} min={1}
                                   onChange={(dragStep) => this.config!.dragStep = dragStep as number}/>
                            <Input label={'缩放'} disabled={!_rasterize} type={'number'}
                                   defaultValue={resizeStep} min={1}
                                   onChange={(resizeStep) => this.config!.resizeStep = resizeStep as number}/>
                        </Grid>
                    </div>
                    <p className={'canvas-config-desc'}>说明：修改画布设置，会对整体效果产生较大影响，建议先调试好画布设置后再进行大屏设计</p>
                    <div className={'lc-header-canvas-footer'}>
                        <Button type={'submit'}>保存</Button>
                        <Button type={'button'} onClick={this.onClose}>取消</Button>
                    </div>
                </form>
            </Dialog>
        );
    }
}

export default observer(CanvasHdConfigImpl);