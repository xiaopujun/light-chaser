import Dialog from "../../../ui/dialog/Dialog";
import './SnapshotConfig.less';
import Button from "../../../ui/button/Button";
import html2canvas from "html2canvas";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {useRef, useState} from "react";
import designerStore from "../../store/DesignerStore";
import {globalMessage} from "../../../framework/message/GlobalMessage";
import URLUtil from "../../../utils/URLUtil";
import operatorMap from "../../../framework/operate/index";
import {SaveType} from "../../DesignerType";
import {AbstractOperator} from "../../../framework/operate/AbstractOperator";

export interface SnapshotConfigProps {
    onClose: () => void;
}

export const SnapshotConfig = (prop: SnapshotConfigProps) => {
    const {onClose} = prop;

    const [url, setUrl] = useState<string | null>(null);

    const imageBlob = useRef<Blob | null>(null);

    const {canvasConfig: {width, height}} = designerStore;
    const imageStyle = width > height ? {width: '100%'} : {height: '100%'};

    const generate = () => {
        if (!url) {
            URL.revokeObjectURL(url!);
            imageBlob.current = null;
        }
        const designerCanvas = document.getElementById("designer-ds-content");
        const {scale} = eventOperateStore;
        if (designerCanvas) {
            html2canvas(designerCanvas, {
                useCORS: true,
                allowTaint: true,
                scale: window.devicePixelRatio / scale,
            }).then(canvas => {
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob!);
                    setUrl(url);
                    imageBlob.current = blob;
                });
            });
        }
    }

    const exportImage = () => {
        if (!url) {
            globalMessage.messageApi?.warning('请先生成快照');
            return;
        }
        const a = document.createElement('a');
        a.href = url;
        a.download = `snapshot${new Date().getTime()}.png`;
        a.click();
    }

    const doSave = () => {
        if (!imageBlob.current) {
            globalMessage.messageApi?.warning('请先生成快照');
            return;
        }
        const file = new File([imageBlob.current], Date.now() + ".jpeg", {
            type: "image/jpeg",
            lastModified: Date.now()
        });
        const {saveType} = URLUtil.parseUrlParams();
        (operatorMap[saveType as SaveType] as AbstractOperator).uploadCover(file).then((data) => {
            if (data) globalMessage.messageApi?.info('封面生成成功！');
            else globalMessage.messageApi?.error('封面生成失败！');
        });
    }

    return (
        <Dialog title={'快照截图'} className={'snapshot-config'}
                visible={true} width={500}
                onClose={() => {
                    if (url) {
                        URL.revokeObjectURL(url!);
                        imageBlob.current = null;
                    }
                    onClose();
                }}>
            <div className={'snapshot-content'}>
                <div className={'snapshot-left'}>
                    <div className={'image-preview'}>
                        {url ? <img src={url} style={imageStyle} alt={'快照'}/> : <span>请生成快照截图</span>}
                    </div>
                </div>
                <div className={'snapshot-right'}>
                    <Button onClick={generate}>生成</Button>
                    <Button onClick={doSave}>保存</Button>
                    <Button onClick={exportImage}>导出</Button>
                </div>

            </div>
            <p>说明：</p>
            <p>1、为较好的生成效果，请将画布放大后生成快照，避免出现模糊，白边问题</p>
            <p>2、不支持跨域图片的快照生成（如在线图片会被忽略）</p>
        </Dialog>
    );
}
