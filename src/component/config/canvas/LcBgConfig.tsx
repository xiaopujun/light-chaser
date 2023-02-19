import React, {PureComponent} from 'react';
import './LcBgConfig.less';
import LCNumberInput from "../../base/LCNumberInput";
import BaseColorPicker from "../../base/BaseColorPicker";
import Dragger from "antd/es/upload/Dragger";
import LcConfigItem from "../../base/LcConfigItem";
import LcRadio from "../../base/LcRadio";
import {Radio} from "antd";
import CfgItemBorder from "../../base/CfgItemBorder";
import localforage from "localforage";
import lcDesignerContentStore from '../../designer/store/LcDesignerContentStore';
import {observer} from "mobx-react";
import {toJS} from "mobx";

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
        console.log('tempBgImgSize', tempBgImgSize)
        updateBgConfig({bgImgSize: tempBgImgSize});
    }

    fillTypeChange = (e: any) => {
        const {updateBgConfig} = lcDesignerContentStore;
        updateBgConfig({bgFillType: e.target.value});
    }

    bgColorModeChange = (e: any) => {
        const {updateBgConfig} = lcDesignerContentStore;
        updateBgConfig({bgColorMode: e.target.value});
    }

    bgColorChange = (color: string) => {
        const {updateBgConfig} = lcDesignerContentStore;
        updateBgConfig({bgColor: color});
    }


    render() {
        console.log('LcBgConfig render')
        const {bgConfig: {bgImgUrl}} = lcDesignerContentStore;
        return (
            <div className={'lc-canvas-config'}>
                <div className={'lc-bg-upload'}>
                    <div className={'lc-upload-content'}>
                        {bgImgUrl ?
                            <img alt={"bg"} width={'100%'} height={187} src={bgImgUrl}/> :
                            <Dragger listType={'picture-card'}
                                     showUploadList={false}
                                     beforeUpload={this.beforeUpload}>
                                请上传背景图
                            </Dragger>}
                    </div>
                </div>
                <br/>
                <LcConfigItem title={'背景模式'}>
                    <LcRadio onChange={this.bgModeChange}>
                        <Radio value="0">无</Radio>
                        <Radio value="1">图片</Radio>
                        <Radio value="2">颜色</Radio>
                    </LcRadio>
                </LcConfigItem>
                <LcConfigItem title={'图片尺寸'}>
                    <LCNumberInput onChange={this.bgImgSizeChange} name={'bgX'}
                                   style={{textAlign: 'center', width: '48%'}} defaultValue={1920}/>
                    <LCNumberInput onChange={this.bgImgSizeChange} name={'bgY'}
                                   style={{textAlign: 'center', width: '48%'}} defaultValue={1080}/>
                </LcConfigItem>
                <LcConfigItem title={'填充方式'}>
                    <LcRadio onChange={this.fillTypeChange}>
                        <Radio value="0">无</Radio>
                        <Radio value="1">x轴</Radio>
                        <Radio value="2">y轴</Radio>
                    </LcRadio>
                </LcConfigItem>
                <LcConfigItem title={'颜色模式'}>
                    <LcRadio onChange={this.bgColorModeChange}>
                        <Radio value="0">单色</Radio>
                        <Radio value="1">线性</Radio>
                        <Radio value="2">径向</Radio>
                    </LcRadio>
                </LcConfigItem>
                <LcConfigItem title={'背景颜色'}>
                    <CfgItemBorder width={'50%'}>
                        <BaseColorPicker onChange={this.bgColorChange}
                                         style={{width: '100%', height: '18px', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </LcConfigItem>
            </div>
        );
    }
}

export default observer(LcBgConfig)