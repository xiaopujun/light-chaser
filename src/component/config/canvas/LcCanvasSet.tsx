import React, {Component} from 'react';
import './LcCanvasSet.less';
import LCNumberInput from "../../base/LCNumberInput";
import BaseColorPicker from "../../base/BaseColorPicker";
import Dragger from "antd/es/upload/Dragger";
import {RcFile, UploadProps} from "antd/es/upload";
import LcConfigItem from "../../base/LcConfigItem";
import LcRadio from "../../base/LcRadio";
import {Radio} from "antd";
import CfgItemBorder from "../../base/CfgItemBorder";

interface LcCanvasSetProps {
    canvasConfig?: any;
    updateCanvasConfig?: (data?: any) => void;
}

class LcCanvasSet extends Component<LcCanvasSetProps> {

    state = {
        fileList: [],
        previewImage: '',
        previewTitle: '',
        file: null
    }

    handleChange: UploadProps['onChange'] = ({fileList: newFileList}) => this.setState({fileList: newFileList});

    beforeUpload = (file: any, fileList: any) => {
        this.getBase64(file as RcFile).then(value => {
            this.setState({file: value})
            return false;
        })
    }

    getBase64 = (file: RcFile): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }

    render() {
        return (
            <div className={'lc-canvas-config'}>
                <div className={'lc-bg-upload'}>
                    <div className={'lc-upload-content'}>
                        {this.state.file ? <img alt={"bg"} width={'100%'} height={187} src={this.state.file}/> :
                            <Dragger listType={'picture-card'}
                                     showUploadList={false}
                                     beforeUpload={this.beforeUpload}
                                     fileList={this.state.fileList}
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

export default LcCanvasSet;