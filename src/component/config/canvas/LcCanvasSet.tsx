import React, {Component} from 'react';
import './LcCanvasSet.less';
import LCNumberInput from "../../base/LCNumberInput";
import BaseColorPicker from "../../base/BaseColorPicker";
import Dragger from "antd/es/upload/Dragger";
import {RcFile, UploadProps} from "antd/es/upload";
import LcRadialButton from "../../base/LcRadialButton";

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
                <div className={'lc-cfg-item'}>
                    <div className={'item-name'}>背景模式 :</div>
                    <div className={'item-value'}>
                        <button className={'lc-bg-mode'}>无</button>
                        <button className={'lc-bg-mode'}>图片</button>
                        <button className={'lc-bg-mode'}>颜色</button>
                    </div>
                </div>
                <div className={'lc-cfg-item'}>
                    <div className={'item-name'}>图片尺寸 :</div>
                    <div className={'item-value'} style={{display: 'flex'}}>
                        <LCNumberInput width={100} value={1920}/>
                        <div className={'middle-icon'}>&nbsp;&nbsp;&nbsp; × &nbsp;&nbsp;&nbsp;</div>
                        <LCNumberInput width={100} value={1080}/>
                    </div>
                </div>
                <div className={'lc-cfg-item'}>
                    <div className={'item-name'}>填充方式 :</div>
                    <div className={'item-value'} style={{display: 'flex'}}>
                        <LcRadialButton className={'lc-bg-fill'}>x轴</LcRadialButton>
                        <LcRadialButton className={'lc-bg-fill'}>y轴</LcRadialButton>
                        <LcRadialButton className={'lc-bg-fill'}>无</LcRadialButton>
                    </div>
                </div>
                <div className={'lc-cfg-item'}>
                    <div className={'item-name'}>颜色模式 :</div>
                    <div className={'item-value'} style={{display: 'flex'}}>
                        <button className={'lc-color-mode'}>单色</button>
                        <button className={'lc-color-mode'}>线性渐变</button>
                        <button className={'lc-color-mode'}>径向渐变</button>
                    </div>
                </div>
                <div className={'lc-cfg-item'}>
                    <div className={'item-name'}>背景颜色 :</div>
                    <div className={'item-value'} style={{display: 'flex'}}>
                        <div className={'bg-color-block'}>
                            <BaseColorPicker style={{width: '100%', height: '25px', borderRadius: 2}} showText={true}/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default LcCanvasSet;