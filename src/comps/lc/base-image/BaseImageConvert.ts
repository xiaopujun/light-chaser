import AbstractConvert from "../../../framework/convert/AbstractConvert";
import {BaseImageComponentProps} from "./BaseImageController";

/**
 * 图片转换器，用于将图片资源地址转换为唯一id，图片资源使用blob存入indexDB
 */
export default class BaseImageConvert extends AbstractConvert<BaseImageComponentProps> {

    // private savedImgHash: string[] = []

    getKey(): string {
        return "LcBaseImage";
    }

    convert(data: BaseImageComponentProps): void {
        //将本地上传的图片数据以blob形式存入indexDB，并替换localUrl属性为blobId
        // const {hashCode, localUrl} = data.style!;
        // if (this.savedImgHash.includes(hashCode!)) return;
        // if (hashCode && localUrl) {
        //     ImgUtil.saveImgToLocal(localUrl, hashCode).then(() => this.savedImgHash.push(hashCode));
        // }
    }

    async convertBack(data: BaseImageComponentProps): Promise<void> {
        // const {hashCode} = data.style!;
        // const obj = await ImgUtil.getImageFromLocalWithKey(hashCode!);
        // data.style!.localUrl = obj[hashCode!];
        // //设置好缓存
        // ImageCache.addImageCache(hashCode!, obj[hashCode!]);
    }

}