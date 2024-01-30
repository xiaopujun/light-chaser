import React, {useState} from "react";
import {Upload as AntdUpLoad, UploadFile} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import './ImageUpload.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import operatorMap from "../../../framework/operate/index";
import URLUtil from "../../../utils/URLUtil";
import {AbstractOperator} from "../../../framework/operate/AbstractOperator";
import {globalMessage} from "../../../framework/message/GlobalMessage";
import {SaveType} from "../../../designer/DesignerType";
import {RcFile} from "antd/es/upload";
import {IImageData} from "../../../comps/lc/base-image/BaseImageComponent";

export interface UploadDataType {
    url?: string;
    hash?: string;
}

export interface UploadProps extends UIContainerProps {
    onChange?: (data: UploadDataType) => void;
    defaultValue?: string;
}

export const ImageUpload: React.FC<UploadProps> = (props) => {
    const {onChange, defaultValue, ...uiProp} = props;
    const fileInfo = {
        uid: '-1',
        name: 'image.png',
        status: 'done',
    }
    const [fileList, setFileList] = useState(defaultValue ? [{...fileInfo, url: defaultValue}] : []);

    const beforeUpload = (file: RcFile) => {
        const {saveType} = URLUtil.parseUrlParams();
        (operatorMap[saveType as SaveType] as AbstractOperator).uploadImage(file).then((data) => {
            if (!data) {
                globalMessage.messageApi?.error('上传失败');
            } else {
                const {url, hash} = data as IImageData;
                onChange && onChange({url, hash});
                setFileList([{...fileInfo, url}]);
            }
        });
        //阻止默认上传
        return false;
    }
    return (
        <UIContainer {...uiProp} className={'image-upload'}>
            <AntdUpLoad name={'file'} beforeUpload={beforeUpload} listType={'picture-card'}
                        fileList={fileList as Array<UploadFile>}
                        onRemove={() => {
                            setFileList([]);
                            onChange && onChange({url: '', hash: ''});
                            //todo 要加上定时清理缓存
                        }}
                        onPreview={() => window.open(fileList[0].url)}>
                {fileList.length > 0 ? null : <div className={'upload-btn'}>
                    <PlusOutlined/>
                    <div style={{marginTop: 8}}>Upload</div>
                </div>}
            </AntdUpLoad>
        </UIContainer>
    )
}
