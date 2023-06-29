import html2canvas from "html2canvas";
import scaleCore from "../designer/operate-provider/scale/ScaleCore";

/**
 * 将html转换为图片
 * @param dom
 */
export async function htmlToImg(dom: HTMLElement) {
    try {
        const canvas = await html2canvas(dom, {
            useCORS: true,
            allowTaint: true,
            scale: scaleCore.scale,
        });
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