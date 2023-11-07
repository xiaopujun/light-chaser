/**
 * 将pending设置解析成对象格式。
 * @param paddingString
 */
import {parseInt} from "lodash";

export default class CssStyleUtil {
    public static parsePadding(paddingString: string = '0') {
        const paddingValues = paddingString.split(' ');
        let paddingTop = 0;
        let paddingRight = 0;
        let paddingBottom = 0;
        let paddingLeft = 0;

        if (paddingValues.length === 1) {
            paddingTop = parseInt(paddingValues[0], 10);
            paddingRight = parseInt(paddingValues[0], 10);
            paddingBottom = parseInt(paddingValues[0], 10);
            paddingLeft = parseInt(paddingValues[0], 10);
        } else if (paddingValues.length === 2) {
            paddingTop = parseInt(paddingValues[0], 10);
            paddingBottom = parseInt(paddingValues[0], 10);
            paddingRight = parseInt(paddingValues[1], 10);
            paddingLeft = parseInt(paddingValues[1], 10);
        } else if (paddingValues.length === 3) {
            paddingTop = parseInt(paddingValues[0], 10);
            paddingRight = parseInt(paddingValues[1], 10);
            paddingBottom = parseInt(paddingValues[2], 10);
            paddingLeft = parseInt(paddingValues[1], 10);
        } else if (paddingValues.length === 4) {
            paddingTop = parseInt(paddingValues[0], 10);
            paddingRight = parseInt(paddingValues[1], 10);
            paddingBottom = parseInt(paddingValues[2], 10);
            paddingLeft = parseInt(paddingValues[3], 10);
        }

        return {
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
        };
    }

    /**
     * 生成合法的padding的值
     * @param pos
     * @param value
     * @param oldValue
     */
    public static generatePaddingValue(pos: string, value: number, oldValue: string = '0') {
        const oldPadding = CssStyleUtil.parsePadding(oldValue);
        let paddingString: string;
        switch (pos) {
            case 'top':
                paddingString = `${value}px ${oldPadding.paddingRight}px ${oldPadding.paddingBottom}px ${oldPadding.paddingLeft}px`;
                break;
            case 'right':
                paddingString = `${oldPadding.paddingTop}px ${value}px ${oldPadding.paddingBottom}px ${oldPadding.paddingLeft}px`;
                break;
            case 'bottom':
                paddingString = `${oldPadding.paddingTop}px ${oldPadding.paddingRight}px ${value}px ${oldPadding.paddingLeft}px`;
                break;
            case 'left':
                paddingString = `${oldPadding.paddingTop}px ${oldPadding.paddingRight}px ${oldPadding.paddingBottom}px ${value}px`;
                break;
            default:
                paddingString = `${value}px ${value}px ${value}px ${value}px`;
                break;
        }
        return paddingString;
    }

    /**
     * 生成合法的border配置项目。 例如：border: 1px solid #000000
     * @param key
     * @param value
     * @param oldValue
     */
    public static generateBorder(key: string, value: string, oldValue = '0px solid #000000') {
        const oldValueArray = oldValue.split(' ');
        switch (key) {
            case 'width':
                if (/^\d+(\.\d+)?(px)?$/.test(value)) {
                    oldValueArray[0] = value + 'px';
                } else {
                    console.warn('Invalid value for key "width"');
                }
                break;
            case 'type':
                if (['none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'].includes(value)) {
                    oldValueArray[1] = value;
                } else {
                    console.warn('Invalid value for key "type"');
                }
                break;
            case 'color':
                if (/^#(?:[0-9a-fA-F]{3}){1,2}(?:[0-9a-fA-F]{2})?$/.test(value)) {
                    oldValueArray[2] = value;
                } else {
                    console.warn('Invalid value for key "color"');
                }
                break;
            default:
                console.warn('Invalid key');
                break;
        }
        return oldValueArray.join(' ');
    }

    /**
     * 解析border配置项目。 例如：border: 1px solid #000000
     * @param border
     */
    public static parseBorder(border: any) {
        const [width, type, color] = border.match(/(\d+(?:\.\d+)?(?:px)?)[ ]*([a-z]+)[ ]*([#a-z0-9]+)/i).slice(1);
        return {width: parseInt(width), type, color};
    }

}