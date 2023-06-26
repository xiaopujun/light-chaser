import html2canvas from "html2canvas";
import scaleCore from "../designer/operate-provider/scale/ScaleCore";

/**
 * 将html转换为图片
 * @param dom
 */
export function htmlToImg(dom: HTMLElement) {
    return new Promise((resolve) => {
        console.log(scaleCore.scale)
        html2canvas(dom, {
            useCORS: true,
            allowTaint: true,
            scale: scaleCore.scale,
        }).then((canvas) => {
            canvas.toBlob((blob) => {
                //请在合适的时候释放该URL，避免内存泄漏。
                const url = URL.createObjectURL(blob);
                alert(url)
                resolve(url);
            })
        }).catch((err) => {
            console.error('生成截图失败', err);
            resolve(null);
        });
    })
}