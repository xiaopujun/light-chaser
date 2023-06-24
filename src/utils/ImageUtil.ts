export function captureScreen(domElement: HTMLElement | any): string {
    // 创建一个空的Canvas元素
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // 设置Canvas的尺寸与指定元素大小一致
    const {width, height} = domElement.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    // 使用Canvas的drawImage方法绘制指定元素内容
    context?.drawImage(domElement, 0, 0, width, height);

    // 将Canvas转换为图像数据URL
    // 返回图像数据URL
    return canvas.toDataURL('image/png');
}


