import {observer} from "mobx-react";
import {Component, FormEvent} from 'react';
import Dialog from "../../../../json-schema/ui/dialog/Dialog";
import {CanvasConfig} from "../../../DesignerType";
import designerStore from "../../../store/DesignerStore";
import headerStore from "../../HeaderStore";
import './CanvasHdConfigImpl.less';
import {Grid} from "../../../../json-schema/ui/grid/Grid";
import Switch from "../../../../json-schema/ui/switch/Switch";
import Button from "../../../../json-schema/ui/button/Button";
import NumberInput from "../../../../json-schema/ui/number-input/NumberInput";

/**
 * 画布设置React组件实现
 */
class CanvasHdConfigImpl extends Component {

    config: CanvasConfig | null = null;

    state = {
        _rasterize: false,
    }

    constructor(props: {}) {
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
                            <NumberInput label={'宽度'} defaultValue={width} min={500}
                                         onChange={(width) => this.config!.width = width as number}/>
                            <NumberInput label={'高度'} defaultValue={height} min={300}
                                         onChange={(height) => this.config!.height = height as number}/>
                            <Switch label={'栅格化'} defaultValue={rasterize} containerStyle={{gridColumn: '1/2'}}
                                    onChange={value => {
                                        this.config!.rasterize = value;
                                        this.setState({_rasterize: value})
                                    }}/>
                            <NumberInput label={'拖拽'} disabled={!_rasterize}
                                         defaultValue={dragStep} min={1}
                                         onChange={(dragStep) => this.config!.dragStep = dragStep as number}/>
                            <NumberInput label={'缩放'} disabled={!_rasterize}
                                         defaultValue={resizeStep} min={1}
                                         onChange={(resizeStep) => this.config!.resizeStep = resizeStep as number}/>
                        </Grid>
                    </div>
                    <p className={'canvas-config-desc'}>说明：修改画布设置，会对整体效果产生较大影响，建议先调试好画布设置后再进行大屏设计</p>
                    <div className={'lc-header-canvas-footer'}>
                        <Button type={'submit'}>保存</Button>&nbsp;&nbsp;
                        <Button type={'button'} onClick={this.onClose}>取消</Button>
                    </div>
                </form>
            </Dialog>
        );
    }
}

export default observer(CanvasHdConfigImpl);