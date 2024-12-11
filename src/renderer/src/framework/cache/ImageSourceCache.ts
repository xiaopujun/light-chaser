import AbstractCache from "./AbstractCache";
import {IImageData} from "../../comps/lc/base-image/BaseImageComponent";

class ImageSourceCache extends AbstractCache<any> {
    public getAllImageCache(): IImageData[] {
        return Array.from(this.getCachePool().values()) || [];
    }
}

const imageSourceCache = new ImageSourceCache();
export default imageSourceCache;

