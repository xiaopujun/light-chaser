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
import './CoverConfig.less';
import {useRef, useState} from "react";
import {globalMessage} from "../../../framework/message/GlobalMessage";
import {Button, Modal, Upload as AntdUpLoad, UploadFile} from "antd";
import URLUtil from "../../../utils/URLUtil";
import operatorMap from "../../../framework/operate/index";
import {SaveType} from "../../DesignerType";
import {AbstractOperator} from "../../../framework/operate/AbstractOperator";
import {RcFile} from "antd/es/upload";
import {UploadLaptop} from "@icon-park/react";

export interface CoverConfigProps {
    onClose: () => void;
}

export const CoverConfig = (prop: CoverConfigProps) => {
    const {onClose} = prop;
    const urlRef = useRef<string | null>(null);
    const imageFileRef = useRef<File | null>(null);
    const fileInfo = {
        uid: '-1',
        name: 'image.png',
        status: 'done',
    }
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const doSave = () => {
        if (!imageFileRef.current) {
            globalMessage.messageApi?.warning('请先上传封面');
            return;
        }
        const {saveType} = URLUtil.parseUrlParams();
        (operatorMap[saveType as SaveType] as AbstractOperator).uploadCover(imageFileRef.current!).then((data) => {
            if (data) {
                globalMessage.messageApi?.info('封面生成成功！');
                _onClose();
            } else globalMessage.messageApi?.error('封面生成失败！');
        });
    }

    const _onClose = () => {
        if (urlRef.current) {
            URL.revokeObjectURL(urlRef.current!);
            imageFileRef.current = null;
        }
        onClose();
    }

    const beforeUpload = (file: RcFile) => {
        imageFileRef.current = file;
        const fileReader = new FileReader();
        fileReader.onload = async (event: ProgressEvent<FileReader>) => {
            const blob = new Blob([event.target!.result!], {type: file.type});
            const url = URL.createObjectURL(blob);
            urlRef.current = url;
            setFileList([{...fileInfo, url}] as any);
        };
        fileReader.readAsArrayBuffer(file);
        return false;
    }

    return (
        <Modal
            title={<span className="cover-modal-title">封面配置</span>}
            className="cover-config-modal"
            open={true}
            width={600}
            footer={null}
            onCancel={_onClose}
            bodyStyle={{padding: '20px'}}
        >
            <div className="cover-content">
                <div className="cover-upload-container">
                    <AntdUpLoad
                        name="file"
                        beforeUpload={beforeUpload}
                        listType="picture-card"
                        fileList={fileList}
                        accept="image/*"
                        onRemove={() => setFileList([])}
                        onPreview={() => window.open((fileList[0] as any).url)}
                    >
                        {fileList.length > 0 ? null : (
                            <div className="upload-btn-content">
                                <UploadLaptop theme="outline" size={30} fill="#4FB8FF" strokeWidth={2}/>
                                <div className="upload-text">选择文件上传</div>
                                <div className="upload-hint">支持 JPG/PNG 格式</div>
                            </div>
                        )}
                    </AntdUpLoad>
                </div>
                <div className="cover-action-container">
                    <Button type="primary"
                            onClick={doSave}
                            className="cover-save-btn">
                        保存封面
                    </Button>
                </div>
            </div>
        </Modal>
    );
}