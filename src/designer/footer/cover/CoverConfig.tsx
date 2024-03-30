import Dialog from "../../../json-schema/ui/dialog/Dialog";
import './CoverConfig.less';
import Button from "../../../json-schema/ui/button/Button";
import {useRef, useState} from "react";
import {globalMessage} from "../../../framework/message/GlobalMessage";
import URLUtil from "../../../utils/URLUtil";
import operatorMap from "../../../framework/operate/index";
import {SaveType} from "../../DesignerType";
import {AbstractOperator} from "../../../framework/operate/AbstractOperator";
import {Upload as AntdUpLoad, UploadFile} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {RcFile} from "antd/es/upload";

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
    const [fileList, setFileList] = useState([]);

    const doSave = () => {
        if (!imageFileRef.current) {
            globalMessage.messageApi?.warning('请先上传封面');
            return;
        }
        const {saveType} = URLUtil.parseUrlParams();
        (operatorMap[saveType as SaveType] as AbstractOperator).uploadCover(imageFileRef.current!).then((data) => {
            if (data) globalMessage.messageApi?.info('封面生成成功！');
            else globalMessage.messageApi?.error('封面生成失败！');
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
        //通过二进制流读取文件，读取完毕后会调用上方设置好的onload事件
        fileReader.readAsArrayBuffer(file);
        //阻止默认上传
        return false;
    }

    return (
        <Dialog title={'封面'} className={'cover-config'}
                visible={true} width={500}
                onClose={_onClose}>
            <div className={'cover-content'}>
                <div className={'cover-left'}>
                    <AntdUpLoad name={'file'} beforeUpload={beforeUpload} listType={'picture-card'}
                                fileList={fileList as Array<UploadFile>}
                                accept={'image/*'}
                                onRemove={() => setFileList([])}
                                onPreview={() => window.open((fileList[0] as any).url)}>
                        {fileList.length > 0 ? null : <div className={'upload-btn'}>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>}
                    </AntdUpLoad>
                </div>
                <div className={'cover-right'}>
                    <Button onClick={doSave}>保存</Button>
                </div>
            </div>
        </Dialog>
    );
}
