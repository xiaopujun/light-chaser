import html2canvas from "html2canvas";
import scaleCore from "../designer/operate-provider/scale/ScaleCore";
import localforage from "localforage";
import {idGenerate} from "./IdGenerate";

/**
 * 将html转换为图片，并生成一个可直接访问的url地址
 * @param dom
 */
export async function htmlToImgWithUrl(dom: HTMLElement) {
    try {
        const canvas = await html2canvas(dom, {scale: scaleCore.scale});
        const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            });
        });
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('生成截图失败', error);
        return null;
    }
}

/**
 * 将html转换为图片，并保存到本地存储，返回本地存储对应的id
 * @param dom
 * @param options
 */
export async function htmlToImgWithId(dom: HTMLElement, options?: any) {
    try {
        const canvas = await html2canvas(dom, {...options});
        return await new Promise<string>((resolve) => {
            canvas.toBlob((blob) => {
                const key = idGenerate.generateId();
                localforage.setItem(key, blob);
                resolve(key);
            })
        });
    } catch (error) {
        console.error('保存截图到本地存储异常', error);
        return null;
    }
}