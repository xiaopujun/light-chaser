import React, {PureComponent} from 'react';
import './LcBgConfig.less';
import LCNumberInput from "../../base/LCNumberInput";
import BaseColorPicker from "../../base/BaseColorPicker";
import Dragger from "antd/es/upload/Dragger";
import LcConfigItem from "../../base/LcConfigItem";
import LcRadio from "../../base/LcRadio";
import {Button, Radio, Select} from "antd";
import CfgItemBorder from "../../base/CfgItemBorder";
import localforage from "localforage";
import lcDesignerContentStore from '../../designer/store/LcDesignerContentStore';
import {observer} from "mobx-react";
import {toJS} from "mobx";
import LcSelect from "../../base/LCSelect";
import LcRadialButton from "../../base/LcRadialButton";

const {Option} = Select;

interface LcBgConfigProps {
    bgConfig?: any;
    updateBgConfig?: (data?: any) => void;
}

class LcBgConfig extends PureComponent<LcBgConfigProps> {

    beforeUpload = (file: any) => {
        const fileReader = new FileReader();
        const {updateBgConfig} = lcDesignerContentStore;
        //文件读取完毕后会的处理事件
        fileReader.onload = (event: any) => {
            const blob = new Blob([event.target.result], {type: file.type});
            const bgImgUrl = URL.createObjectURL(blob);
            localforage.setItem('lc-bg-img-source', blob).then(() => {
                updateBgConfig({bgImgUrl: bgImgUrl});
                //todo 更换图片的时候要释放链接和内存的关联，可以提高部分性能
                // URL.revokeObjectURL(objectUrl);
            });
        };
        //通过二进制流读取文件，读取完毕后会调用上方设置好的onload事件
        fileReader.readAsArrayBuffer(file);
        return false;
    }

    bgModeChange = (e: any) => {
        const {updateBgConfig} = lcDesignerContentStore;
        updateBgConfig({bgMode: e.target.value});
    }

    bgImgSizeChange = (e: any) => {
        let {updateBgConfig, bgConfig: {bgImgSize}} = lcDesignerContentStore;
        let tempBgImgSize = toJS(bgImgSize);
        const {target: {value, name}} = e;
        if (name === 'bgX' && tempBgImgSize) {
            tempBgImgSize[0] = parseInt(value);
        } else if (name === 'bgY' && tempBgImgSize) {
            tempBgImgSize[1] = parseInt(value);
        }
        updateBgConfig({bgImgSize: tempBgImgSize});
    }

    bgImgPosChange = (e: any) => {
        let {updateBgConfig, bgConfig: {bgImgPosition}} = lcDesignerContentStore;
        let tempBgImgPos = toJS(bgImgPosition);
        const {target: {value, name}} = e;
        if (name === 'posX' && tempBgImgPos) {
            tempBgImgPos[0] = parseInt(value);
        } else if (name === 'posY' && tempBgImgPos) {
            tempBgImgPos[1] = parseInt(value);
        }
        updateBgConfig({bgImgPosition: tempBgImgPos});
    }

    fillTypeChange = (value: any) => {
        const {updateBgConfig} = lcDesignerContentStore;
        updateBgConfig({bgImgRepeat: value});
    }

    bgColorModeChange = (e: any) => {
        const {updateBgConfig} = lcDesignerContentStore;
        updateBgConfig({bgColorMode: e.target.value});
    }

    bgColorChange = (color: string) => {
        const {updateBgConfig} = lcDesignerContentStore;
        updateBgConfig({bgColor: color});
    }

    clearBgImg = () => {
        const {updateBgConfig, bgConfig} = lcDesignerContentStore;
        URL.revokeObjectURL(bgConfig?.bgImgUrl);
        updateBgConfig({bgImgUrl: ''});
    }


    render() {

        const {bgConfig} = lcDesignerContentStore;
        const {bgImgSize = [1920, 1080]} = bgConfig;
        return (
            <div className={'lc-canvas-config'}>

                <LcConfigItem title={'背景模式'}>
                    <LcRadio onChange={this.bgModeChange} defaultValue={bgConfig?.bgMode}>
                        <Radio value="0">无</Radio>
                        <Radio value="1">图片</Radio>
                        <Radio value="2">颜色</Radio>
                    </LcRadio>
                </LcConfigItem>
                {bgConfig?.bgMode === '1' &&
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
                    <LcConfigItem title={'背景控制'}>
                        <Button disabled={bgConfig.bgImgUrl === ''} danger={true} ghost={true}
                                onClick={this.clearBgImg}
                                size={'small'}>清除背景图</Button>
                    </LcConfigItem>
                    <LcConfigItem title={'图片尺寸'}>
                        <LCNumberInput onChange={this.bgImgSizeChange} name={'bgX'}
                                       style={{textAlign: 'center', width: '48%'}}
                                       defaultValue={bgImgSize[0]}/>
                        <LCNumberInput onChange={this.bgImgSizeChange} name={'bgY'}
                                       style={{textAlign: 'center', width: '48%'}}
                                       defaultValue={bgImgSize[1]}/>
                    </LcConfigItem>
                    <LcConfigItem title={'图片位置'}>
                        <LCNumberInput onChange={this.bgImgPosChange} name={'posX'}
                                       style={{textAlign: 'center', width: '48%'}}
                                       defaultValue={bgImgSize[0]}/>
                        <LCNumberInput onChange={this.bgImgPosChange} name={'posY'}
                                       style={{textAlign: 'center', width: '48%'}}
                                       defaultValue={bgImgSize[1]}/>
                    </LcConfigItem>
                    <LcConfigItem title={'重复方式'}>
                        <CfgItemBorder width={'50%'}>
                            <LcSelect onChange={this.fillTypeChange}
                                      defaultValue={bgConfig?.bgImgRepeat}>
                                <Option value={"no-repeat"}>不重复</Option>
                                <Option value={"repeat-x"}>x轴重复</Option>
                                <Option value={"repeat-y"}>y轴重复</Option>
                                <Option value={"repeat"}>铺满</Option>
                            </LcSelect>
                        </CfgItemBorder>
                    </LcConfigItem>
                </>}
                {bgConfig?.bgMode === '2' &&
                <>
                    <LcConfigItem title={'颜色模式'}>
                        <LcRadio onChange={this.bgColorModeChange} defaultValue={bgConfig?.bgColorMode}>
                            <Radio value="0">单色</Radio>
                            <Radio value="1">线性</Radio>
                            <Radio value="2">径向</Radio>
                        </LcRadio>
                    </LcConfigItem>
                    <LcConfigItem title={'背景颜色'}>
                        <CfgItemBorder width={'50%'}>
                            <BaseColorPicker onChange={this.bgColorChange}
                                             style={{width: '100%', height: '18px', borderRadius: 2}}
                                             value={bgConfig?.bgColor}
                                             showText={true}/>
                        </CfgItemBorder>
                    </LcConfigItem>
                </>
                }
            </div>
        );
    }
}

export default observer(LcBgConfig)