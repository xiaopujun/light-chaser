import React, {useState} from "react";
import {Upload as AntdUpLoad, UploadFile} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ImageCache from "../../framework/cache/ImageCache";
import './ImageUpload.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface UploadDataType {
    value: string;
    hashCode: string;
}

export interface UploadProps extends UIContainerProps {
    onChange?: (data: UploadDataType) => void;
    value?: string;
}

export const ImageUpload: React.FC<UploadProps> = (props) => {
    const {onChange, value, ...uiProp} = props;
    const fileInfo = {
        uid: '-1',
        name: 'image.png',
        status: 'done',
    }
    const [fileList, setFileList] = useState(value ? [{...fileInfo, url: value}] : []);

    const fileHash = async (file: File) => {
        const buffer = await file.arrayBuffer();
        const hashArray = await crypto.subtle.digest('SHA-256', buffer);
        return Array.from(new Uint8Array(hashArray))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    const beforeUpload = (file: any) => {
        fileHash(file).then((hashCode) => {
            if (ImageCache.isExistImageCache(hashCode)) {
                const url = ImageCache.getImageCache(hashCode);
                onChange && onChange({value: url!, hashCode});
                setFileList([{...fileInfo, url: url!}]);
            } else {
                const fileReader = new FileReader();
                fileReader.onload = (event: ProgressEvent<FileReader>) => {
                    const blob = new Blob([event.target!.result!], {type: file.type});
                    const url = URL.createObjectURL(blob);
                    onChange && onChange({value: url, hashCode});
                    setFileList([{...fileInfo, url}]);
                    //设置图片缓存
                    ImageCache.addImageCache(hashCode, url);
                    //todo 更换图片的时候要释放链接和内存的关联，可以提高部分性能
                    // URL.revokeObjectURL(bgImgUrl);
                };
                //通过二进制流读取文件，读取完毕后会调用上方设置好的onload事件
                fileReader.readAsArrayBuffer(file);
            }

        });
        return false;
    }
    return (
        <UIContainer {...uiProp} className={'image-upload'}>
            <AntdUpLoad name={'file'} beforeUpload={beforeUpload} listType={'picture-card'}
                        fileList={fileList as Array<UploadFile>}
                        onRemove={() => {
                            setFileList([]);
                            onChange && onChange({value: '', hashCode: ''});
                            //todo 后续要加上定时清理缓存
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
