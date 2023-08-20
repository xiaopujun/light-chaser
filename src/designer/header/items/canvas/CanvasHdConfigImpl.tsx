import {observer} from "mobx-react";
import {ChangeEvent, Component, FormEvent} from 'react';
import LcButton from "../../../../lib/lc-button/LcButton";
import ConfigItem from "../../../../lib/lc-config-item/ConfigItem";
import Dialog from "../../../../lib/lc-dialog/Dialog";
import UnderLineInput from "../../../../lib/lc-input/UnderLineInput";
import LcSwitch from "../../../../lib/lc-switch/LcSwitch";
import {CanvasConfig} from "../../../DesignerType";
import designerStore from "../../../store/DesignerStore";
import headerStore from "../../HeaderStore";
import './CanvasHdConfigImpl.less';
import AbstractComponent from "../../../../framework/core/AbstractComponent";

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
        const {updateCanvasConfig, canvasConfig} = designerStore;
        updateCanvasConfig(this.config!);
        e.preventDefault();
        //是否开启辅助线框
        if (!canvasConfig.wireframe && this.config!.wireframe) {
            const {compInstances} = designerStore;
            Object.values(compInstances).forEach((instance: AbstractComponent) => {
                instance.container && instance.container.style.setProperty('border', '1px solid #44aaff');
            })
        } else if (canvasConfig.wireframe && !this.config!.wireframe) {
            const {compInstances} = designerStore;
            Object.values(compInstances).forEach((instance: AbstractComponent) => {
                instance.container && instance.container.style.setProperty('border', 'none');
            })
        }
        this.onClose();
    }

    render() {
        const {_rasterize} = this.state;
        const {canvasVisible} = headerStore;
        const {width, height, rasterize, dragStep, resizeStep, wireframe} = this.config as CanvasConfig;
        return (
            <Dialog className={'lc-header-canvas'} title={'画布设置'} visible={canvasVisible} onClose={this.onClose}>
                <form onSubmit={this.doSave}>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <ConfigItem title={'宽度'} contentStyle={{width: 110}}>
                            <UnderLineInput type={'number'} defaultValue={width}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => this.config!.width = parseInt(event.target.value)}
                                            required={true} min={500}/>
                        </ConfigItem>
                        <ConfigItem title={'高度'} contentStyle={{width: 110}}>
                            <UnderLineInput type={'number'} defaultValue={height}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => this.config!.height = parseInt(event.target.value)}
                                            required={true} min={300}/>
                        </ConfigItem>
                        <ConfigItem title={'辅助线框'} contentStyle={{width: 60}}>
                            <LcSwitch defaultValue={wireframe} onChange={value => {
                                this.config!.wireframe = value;
                            }}/>
                        </ConfigItem>
                        <ConfigItem title={'栅格化'} contentStyle={{width: 60}}>
                            <LcSwitch defaultValue={rasterize} onChange={value => {
                                this.config!.rasterize = value;
                                this.setState({_rasterize: value});
                            }}/>
                        </ConfigItem>
                        <ConfigItem title={'拖拽步长'} contentStyle={{width: 60}}>
                            <UnderLineInput readOnly={!_rasterize} type={'number'} defaultValue={dragStep}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => this.config!.dragStep = parseInt(event.target.value)}/>
                        </ConfigItem>
                        <ConfigItem title={'缩放步长'} contentStyle={{width: 60}}>
                            <UnderLineInput readOnly={!_rasterize} type={'number'} defaultValue={resizeStep}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => this.config!.resizeStep = parseInt(event.target.value)}/>
                        </ConfigItem>
                    </div>
                    <p style={{
                        color: '#7c7c7c',
                        padding: '0 5px',
                        fontSize: '12px'
                    }}>说明：修改画布设置，会对整体效果产生较大影响，建议先调试好画布设置后再进行大屏设计</p>
                    <div className={'lc-header-canvas-footer'}>
                        <LcButton type={'submit'}>保存</LcButton>
                        <LcButton type={'button'} onClick={this.onClose}>取消</LcButton>
                    </div>
                </form>
            </Dialog>
        );
    }
}

export default observer(CanvasHdConfigImpl);