export default class ColorUtil {

    public static colorConversion(color: string) {
        if (color.length >= 4 && color.length <= 9 && color[0] === '#') {
            const rgba = ColorUtil.hexToRgba(color, 1);
            return {hex: color, rgba: rgba};
        } else if (color.includes('rgb')) {
            const hex = ColorUtil.rgbaToHex(color);
            return {hex: hex, rgba: color};
        } else {
            console.warn('color is not valid', color);
            return {hex: '#000000', rgba: 'rgba(0,0,0,1)'};
        }
    }

    public static hexToRgba(hex: string, alpha: number) {
        // 去掉颜色值中的 # 符号
        hex = hex.replace('#', '');
        // 计算 RGB 值
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        // 返回 RGBA 值
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    public static rgbaToHex(rgba: string) {
        let parts = rgba.substring(rgba.indexOf('(')).split(',');
        let r = parseInt(parts[0].substring(1).trim());
        let g = parseInt(parts[1].trim());
        let b = parseInt(parts[2].trim());
        let a = parseFloat(parts[3] ? parts[3].substring(0, parts[3].length - 1).trim() : '1');

        let rr = r.toString(16).length === 1 ? "0" + r.toString(16) : r.toString(16);
        let gg = g.toString(16).length === 1 ? "0" + g.toString(16) : g.toString(16);
        let bb = b.toString(16).length === 1 ? "0" + b.toString(16) : b.toString(16);

        let aa = Math.round(a * 255).toString(16).length === 1 ? "0" + Math.round(a * 255).toString(16) : Math.round(a * 255).toString(16);
        return "#" + rr + gg + bb + aa;
    }

    public static parseGradient(gradient: string) {
        // 提取角度
        const angle = gradient.match(/-?\d+deg/);
        const angleValue = angle ? parseInt(angle[0]) : 0;

        // 提取颜色和位置
        const colors = gradient.match(/rgba?\([^)]+\) \d+(\.\d+)?%?/g);
        const parsedColors = colors?.map((color, index) => {
            const cutPos = color.lastIndexOf(' ');
            return {
                color: color.substring(0, cutPos),
                pos: parseFloat(color.substring(cutPos)) / 100
            };
        });

        return {
            angle: angleValue,
            colors: parsedColors
        };
    }

    public static parseAntdGradientToCss(gradient: string) {
        const angle = gradient.match(/l\((\d+)\)/);
        const angleValue = angle ? parseInt(angle[1]) : 0;

        const colors = gradient.match(/(\d+):rgba?\([^)]+\)/g);

        const parsedColors = colors?.map((color) => {
            const [pos, rgba] = color.split(':');
            return {
                color: rgba,
                pos: parseFloat(pos) / 100
            };
        });

        return `linear-gradient(${angleValue}deg,${parsedColors?.map((color) =>
            `${color.color} ${color.pos * 100}%`)
            .join(', ')})`;
    }


}
