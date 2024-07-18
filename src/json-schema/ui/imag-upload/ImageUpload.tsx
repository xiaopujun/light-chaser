import React, {useState} from "react";
import {Upload as AntdUpLoad, UploadFile} from "antd";
import './ImageUpload.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import operatorMap from "../../../framework/operate/index";
import URLUtil from "../../../utils/URLUtil";
import {AbstractOperator} from "../../../framework/operate/AbstractOperator";
import {globalMessage} from "../../../framework/message/GlobalMessage";
import {SaveType} from "../../../designer/DesignerType";
import {RcFile} from "antd/es/upload";
import {IImageData} from "../../../comps/lc/base-image/BaseImageComponent";
import {Plus} from "@icon-park/react";

export interface UploadDataType {
    url?: string;
    hash?: string;
}

export interface UploadProps extends UIContainerProps {
    defaultValue?: string;
    accept?: string;
    size?: number;
    onChange?: (data: UploadDataType) => void;
}

export const ImageUpload: React.FC<UploadProps> = (props) => {
    const {onChange, defaultValue, accept, size, ...uiProp} = props;
    const fileInfo = {
        uid: '-1',
        name: 'image.png',
        status: 'done',
    }
    const [fileList, setFileList] = useState(defaultValue ? [{...fileInfo, url: defaultValue}] : []);

    const beforeUpload = (file: RcFile) => {
        if (size && file.size > size * 1024 * 1024) {
            globalMessage.messageApi?.warning(`文件大小不能超过${size}M`);
            return false;
        }
        const {saveType} = URLUtil.parseUrlParams();
        (operatorMap[saveType as SaveType] as AbstractOperator).uploadImage(file).then((data) => {
            if (!data) {
                globalMessage.messageApi?.error('上传失败');
            } else {
                const {url, hash} = data as IImageData;
                console.log(url)
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
                        accept={accept}
                        onRemove={() => {
                            setFileList([]);
                            onChange && onChange({url: '', hash: ''});
                        }}
                        onPreview={() => window.open(fileList[0].url)}>
                {fileList.length > 0 ? null : <div className={'upload-btn'}>
                    <Plus/>
                    <div style={{marginTop: 8}}>Upload</div>
                </div>}
            </AntdUpLoad>
        </UIContainer>
    )
}
