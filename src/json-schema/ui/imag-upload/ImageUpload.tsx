/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import React, {useState} from "react";
import {Upload as AntdUpLoad, UploadFile} from "antd";
import './ImageUpload.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import {globalMessage} from "../../../framework/message/GlobalMessage";
import {RcFile} from "antd/es/upload";
import {IImageData} from "../../../comps/lc/base-image/BaseImageComponent";
import {Plus} from "@icon-park/react";
import baseApi from "../../../api/BaseApi.ts";

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
        baseApi.uploadImage(file).then((data) => {
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
