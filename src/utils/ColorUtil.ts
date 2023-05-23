export const colorConversion = (color: string) => {
    if (color.length >= 4 && color.length <= 9 && color[0] === '#') {
        const rgba = hexToRgba(color, 1);
        return {hex: color, rgba: rgba};
    } else if (color.includes('rgb')) {
        const hex = rgbaToHex(color);
        return {hex: hex, rgba: color};
    } else {
        console.warn('color is not valid', color);
        return {hex: '#000000', rgba: 'rgba(0,0,0,1)'};
    }
}

export const hexToRgba = (hex: string, alpha: number) => {
    // 去掉颜色值中的 # 符号
    hex = hex.replace('#', '');
    // 计算 RGB 值
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // 返回 RGBA 值
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const rgbaToHex = (rgba: string) => {
    let parts = rgba.substring(rgba.indexOf('(')).split(',');
    let r = parseInt(parts[0].substring(1).trim());
    let g = parseInt(parts[1].trim());
    let b = parseInt(parts[2].trim());
    let a = parseFloat(parts[3].substring(0, parts[3].length - 1).trim());

    let rr = r.toString(16).length === 1 ? "0" + r.toString(16) : r.toString(16);
    let gg = g.toString(16).length === 1 ? "0" + g.toString(16) : g.toString(16);
    let bb = b.toString(16).length === 1 ? "0" + b.toString(16) : b.toString(16);

    let aa = Math.round(a * 255).toString(16).length === 1 ? "0" + Math.round(a * 255).toString(16) : Math.round(a * 255).toString(16);
    return "#" + rr + gg + bb + aa;
}