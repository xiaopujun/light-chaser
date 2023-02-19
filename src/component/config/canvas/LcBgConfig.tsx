import React, {PureComponent} from 'react';
import './LcBgConfig.less';
import LCNumberInput from "../../base/LCNumberInput";
import BaseColorPicker from "../../base/BaseColorPicker";
import Dragger from "antd/es/upload/Dragger";
import {UploadProps} from "antd/es/upload";
import LcConfigItem from "../../base/LcConfigItem";
import LcRadio from "../../base/LcRadio";
import {Radio} from "antd";
import CfgItemBorder from "../../base/CfgItemBorder";
import localforage from "localforage";
import lcDesignerContentStore from '../../designer/store/LcDesignerContentStore';

interface LcBgConfigProps {
    bgConfig?: any;
    updateBgConfig?: (data?: any) => void;
}

class LcBgConfig extends PureComponent<LcBgConfigProps> {

    state = {
        bgImgUrl: null
    }

    handleChange: UploadProps['onChange'] = ({fileList: newFileList}) => this.setState({fileList: newFileList});

    beforeUpload = (file: any) => {
        const fileReader = new FileReader();
        const {updateBgConfig} = lcDesignerContentStore;
        //文件读取完毕后会的处理事件
        fileReader.onload = (event: any) => {
            const blob = new Blob([event.target.result], {type: file.type});
            const bgImgUrl = URL.createObjectURL(blob);
            localforage.setItem('lc-bg-img-source', blob).then(() => {
                this.setState({bgImgUrl: bgImgUrl});
                updateBgConfig({bgImgUrl: bgImgUrl});
                //todo 更换图片的时候要释放链接和内存的关联，可以提高部分性能
                // URL.revokeObjectURL(objectUrl);
            });
        };
        //通过二进制流读取文件，读取完毕后会调用上方设置好的onload事件
        fileReader.readAsArrayBuffer(file);
        return false;
    }

    render() {
        const {bgImgUrl} = this.state;
        return (
            <div className={'lc-canvas-config'}>
                <div className={'lc-bg-upload'}>
                    <div className={'lc-upload-content'}>
                        {bgImgUrl ?
                            <img alt={"bg"} width={'100%'} height={187} src={bgImgUrl}/> :
                            <Dragger listType={'picture-card'}
                                     showUploadList={false}
                                     beforeUpload={this.beforeUpload}
                                     onChange={this.handleChange}>
                                请上传背景图
                            </Dragger>}
                    </div>
                </div>
                <br/>
                <LcConfigItem title={'背景模式'}>
                    <LcRadio>
                        <Radio value="1">无</Radio>
                        <Radio value="2">图片</Radio>
                        <Radio value="3">颜色</Radio>
                    </LcRadio>
                </LcConfigItem>
                <LcConfigItem title={'图片尺寸'}>
                    <LCNumberInput style={{textAlign: 'center', width: '48%'}} value={1920}/>
                    <LCNumberInput style={{textAlign: 'center', width: '48%'}} value={1080}/>
                </LcConfigItem>
                <LcConfigItem title={'填充方式'}>
                    <LcRadio>
                        <Radio value="1">无</Radio>
                        <Radio value="2">x轴</Radio>
                        <Radio value="3">y轴</Radio>
                    </LcRadio>
                </LcConfigItem>
                <LcConfigItem title={'颜色模式'}>
                    <LcRadio>
                        <Radio value="1">单色</Radio>
                        <Radio value="2">线性</Radio>
                        <Radio value="3">径向</Radio>
                    </LcRadio>
                </LcConfigItem>
                <LcConfigItem title={'背景颜色'}>
                    <CfgItemBorder width={'50%'}>
                        <BaseColorPicker style={{width: '100%', height: '18px', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </LcConfigItem>
            </div>
        );
    }
}

export default LcBgConfig;