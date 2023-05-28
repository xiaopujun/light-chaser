import React, {PureComponent} from 'react';
import './LcBgConfigContent.less';
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import Dragger from "antd/es/upload/Dragger";
import LcRadio from "../../../lib/lc-radio/LcRadio";
import {Button, Radio} from "antd";
import CfgItemBorder from "../../../lib/config-item/CfgItemBorder";
import designerStore from '../../../designer/store/DesignerStore';
import {observer} from "mobx-react";
import {toJS} from "mobx";
import {BackgroundColorMode, BackgroundConfig, BackgroundMode} from "../../../framework/types/DesignerType";
import {ConfigType} from "../../../framework/types/ConfigType";
import ConfigItem from "../../../lib/config-item/ConfigItem";
import ConfigCard from "../../../lib/config-card/ConfigCard";
import Select from "../../../lib/lc-select/Select";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";


class LcBgConfigContent extends PureComponent<ConfigType> {

    //线性渐变颜色
    colors = ['#000000', '#000000'];

    componentDidMount() {
        const {elemConfigs} = designerStore;
        const bgConfig: BackgroundConfig = elemConfigs['-1']['background'];
        if (bgConfig.bgColorMode === BackgroundColorMode.LINEAR_GRADIENT)
            this.colors = bgConfig.colors || ['#000000', '#000000']
    }

    beforeUpload = (file: any) => {
        const fileReader = new FileReader();
        const {updateBgConfig} = designerStore;
        //文件读取完毕后会的处理事件
        fileReader.onload = (event: any) => {
            const blob = new Blob([event.target.result], {type: file.type});
            const bgImgUrl = URL.createObjectURL(blob);
            updateBgConfig({bgImgUrl: bgImgUrl});
            //todo 更换图片的时候要释放链接和内存的关联，可以提高部分性能
            // URL.revokeObjectURL(bgImgUrl);
        };
        //通过二进制流读取文件，读取完毕后会调用上方设置好的onload事件
        fileReader.readAsArrayBuffer(file);
        return false;
    }

    bgModeChange = (e: any) => {
        const {updateBgConfig} = designerStore;
        updateBgConfig({bgMode: e.target.value});
    }

    bgImgSizeChange = (data: any) => {
        let {updateBgConfig, elemConfigs} = designerStore;
        const bgConfig: BackgroundConfig = elemConfigs['-1']['background'];
        let bgImgSize = bgConfig.bgImgSize;
        let tempBgImgSize = toJS(bgImgSize);
        const {value, name} = data;
        if (name === 'bgX' && tempBgImgSize) {
            tempBgImgSize[0] = parseInt(value);
        } else if (name === 'bgY' && tempBgImgSize) {
            tempBgImgSize[1] = parseInt(value);
        }
        updateBgConfig({bgImgSize: tempBgImgSize});
    }

    bgImgPosChange = (data: any) => {
        let {updateBgConfig, elemConfigs} = designerStore;
        const bgConfig: BackgroundConfig = elemConfigs['-1']['background'];
        let bgImgPos = bgConfig.bgImgPos;
        let tempBgImgPos = toJS(bgImgPos);
        const {value, name} = data;
        if (name === 'posX' && tempBgImgPos) {
            tempBgImgPos[0] = parseInt(value);
        } else if (name === 'posY' && tempBgImgPos) {
            tempBgImgPos[1] = parseInt(value);
        }
        updateBgConfig({bgImgPos: tempBgImgPos});
    }

    repeatTypeChange = (value: any) => {
        const {updateBgConfig} = designerStore;
        updateBgConfig({bgImgRepeat: value});
    }

    bgColorModeChange = (e: any) => {
        const {updateBgConfig} = designerStore;
        updateBgConfig({bgColorMode: e.target.value});
    }

    bgColorChange = (color: string) => {
        const {updateBgConfig} = designerStore;
        updateBgConfig({bgColor: color});
    }

    clearBgImg = () => {
        const {updateBgConfig, elemConfigs} = designerStore;
        const bgConfig: BackgroundConfig = elemConfigs['-1']['background'];
        if (bgConfig?.bgImgUrl)
            URL.revokeObjectURL(bgConfig.bgImgUrl);
        updateBgConfig({bgImgUrl: ''});
    }

    bgGradientColorChanged = (color: string, key: string) => {
        const {updateBgConfig, elemConfigs} = designerStore;
        const bgConfig: BackgroundConfig = elemConfigs['-1']['background'];
        if (key === 'startColor')
            this.colors[0] = color;
        if (key === 'endColor')
            this.colors[1] = color;
        //线性渐变
        if (bgConfig?.bgColorMode === BackgroundColorMode.LINEAR_GRADIENT) {
            updateBgConfig({
                bgColor: `linear-gradient(${bgConfig.angle}deg, ${this.colors[0]}, ${this.colors[1]})`,
                colors: [this.colors[0], this.colors[1]]
            });
        }
        //径向渐变
        if (bgConfig?.bgColorMode === BackgroundColorMode.RADIAL_GRADIENT) {
            updateBgConfig({
                bgColor: `radial-gradient(circle, ${this.colors[0]}, ${this.colors[1]})`,
                colors: [this.colors[0], this.colors[1]]
            });
        }
    }

    gradientAngleChanged = (value: any) => {
        const {updateBgConfig, elemConfigs} = designerStore;
        const bgConfig: BackgroundConfig = elemConfigs['-1']['background'];
        if (bgConfig?.bgColorMode === BackgroundColorMode.LINEAR_GRADIENT)
            updateBgConfig({
                bgColor: `linear-gradient(${value}deg, ${this.colors[0]}, ${this.colors[1]})`,
                angle: value
            });
        if (bgConfig?.bgColorMode === BackgroundColorMode.RADIAL_GRADIENT)
            updateBgConfig({
                bgColor: `radial-gradient(${this.colors[0]}, ${this.colors[1]})`,
                angle: value
            });
    }


    render() {
        const bgConfig: BackgroundConfig = designerStore.elemConfigs['-1']['background'];
        console.log('bgConfig', toJS(bgConfig))
        return (
            <div className={'lc-background-config'}>
                <ConfigItem title={'模式'} contentStyle={{width: '250px', paddingLeft: '20px'}}>
                    <LcRadio onChange={this.bgModeChange} value={bgConfig?.bgMode}>
                        <Radio value={0}>无</Radio>
                        <Radio value={1}>图片</Radio>
                        <Radio value={2}>颜色</Radio>
                    </LcRadio>
                </ConfigItem>
                {bgConfig?.bgMode === BackgroundMode.PICTURE &&
                <>
                    <div className={'lc-bg-upload'}>
                        <div className={'lc-upload-content'}>
                            {bgConfig?.bgImgUrl ?
                                <img alt={"bg"} width={'100%'} height={187} src={bgConfig?.bgImgUrl}/> :
                                <Dragger listType={'picture-card'}
                                         showUploadList={false}
                                         beforeUpload={this.beforeUpload}>
                                    请上传背景图
                                </Dragger>}
                        </div>
                    </div>
                    <br/>
                    {
                        bgConfig.bgImgUrl === '' ? null : <ConfigItem title={'背景控制'} contentStyle={{paddingLeft: 10}}>
                            <Button danger={true} ghost={true}
                                    onClick={this.clearBgImg}
                                    size={'small'}>清除背景图</Button>
                        </ConfigItem>
                    }
                    <ConfigCard title={'尺寸'}>
                        <ConfigItem title={"宽度"}>
                            <UnderLineInput name={'bgX'} type={'number'}
                                            onChange={(value: any) => this.bgImgSizeChange({name: 'bgX', value})}
                                            defaultValue={bgConfig.width}/>
                        </ConfigItem>
                        <ConfigItem title={"高度"}>
                            <UnderLineInput name={'bgY'} type={'number'}
                                            onChange={(value: any) => this.bgImgSizeChange({name: 'bgY', value})}
                                            defaultValue={bgConfig.height}/>
                        </ConfigItem>
                    </ConfigCard>
                    <ConfigCard title={'位置'}>
                        <ConfigItem title={"X轴"}>
                            <UnderLineInput type={'number'}
                                            onChange={(value: any) => this.bgImgPosChange({name: 'posX', value})}
                                            defaultValue={0}/>
                        </ConfigItem>
                        <ConfigItem title={"Y轴"}>
                            <UnderLineInput type={'number'}
                                            onChange={(value: any) => this.bgImgPosChange({name: 'posY', value})}
                                            defaultValue={0}/>
                        </ConfigItem>
                    </ConfigCard>
                    <ConfigItem title={'重复方式'} contentStyle={{paddingLeft: '20px'}}>
                        <Select options={[{label: '不重复', value: 'no-repeat'},
                            {label: 'x轴重复', value: 'repeat-x'},
                            {label: 'y轴重复', value: 'repeat-y'},
                            {label: '铺满', value: 'repeat'},
                        ]} defaultValue={bgConfig?.bgImgRepeat} onChange={this.repeatTypeChange}/>
                    </ConfigItem>
                </>}
                {bgConfig?.bgMode === BackgroundMode.COLOR &&
                <>
                    <ConfigItem title={'类型'} contentStyle={{paddingLeft: '20px'}}>
                        <LcRadio onChange={this.bgColorModeChange} value={bgConfig?.bgColorMode}>
                            <Radio value={0}>单色</Radio>
                            <Radio value={1}>线性</Radio>
                            <Radio value={2}>径向</Radio>
                        </LcRadio>
                    </ConfigItem>
                    {
                        bgConfig?.bgColorMode === BackgroundColorMode.SINGLE &&
                        <ConfigItem title={'颜色'} contentStyle={{width: 130, paddingLeft: 18}}>
                            <CfgItemBorder>
                                <BaseColorPicker onChange={this.bgColorChange}
                                                 style={{width: '100%', height: '15px', borderRadius: 2}}
                                                 value={bgConfig?.bgColor}
                                                 showText={true}/>
                            </CfgItemBorder>
                        </ConfigItem>
                    }
                    {
                        (bgConfig?.bgColorMode === BackgroundColorMode.LINEAR_GRADIENT || bgConfig?.bgColorMode === BackgroundColorMode.RADIAL_GRADIENT) && <>
                            <ConfigItem title={'颜色'} contentStyle={{width: '250px', paddingLeft: 18, display: "flex"}}>
                                <CfgItemBorder>
                                    <BaseColorPicker
                                        onChange={(value) => this.bgGradientColorChanged(value, 'startColor')}
                                        style={{width: '100%', height: '15px', borderRadius: 2}}
                                        value={bgConfig?.colors && bgConfig?.colors[0]}
                                        showText={true}/>
                                </CfgItemBorder>
                                &nbsp;&nbsp;
                                <CfgItemBorder>
                                    <BaseColorPicker
                                        onChange={(value) => this.bgGradientColorChanged(value, 'endColor')}
                                        style={{width: '100%', height: '15px', borderRadius: 2}}
                                        value={bgConfig?.colors && bgConfig?.colors[1]}
                                        showText={true}/>
                                </CfgItemBorder>
                            </ConfigItem>
                            {
                                bgConfig?.bgColorMode === BackgroundColorMode.LINEAR_GRADIENT &&
                                <ConfigItem title={'角度'} contentStyle={{paddingLeft: 18}}>
                                    <UnderLineInput type={"number"} defaultValue={bgConfig.angle} min={0} max={360}
                                                    onChange={this.gradientAngleChanged}/>
                                </ConfigItem>
                            }
                        </>
                    }
                </>
                }
            </div>
        );
    }
}

export default observer(LcBgConfigContent)