/**
 * @description 日期时间格式化工具函数
 * @param date 时间对象
 * @param format 日期时间格式
 * @returns {*} 格式化后的日期时间字符串
 */
import {Entry} from "webpack";

export const dataTimeFormat = (date: any, format: any) => {
    let o: any = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
}

/**
 * map对象转普通对象
 * @param strMap
 */
export const mapToObj = (map: any) => {
    return Object.fromEntries(map.entries())
}

/**
 *map转换为json
 */
export const mapToJsonStr = (map: any) => {
    return JSON.stringify(mapToObj(map));
}

/**
 * obj转map
 * @param obj
 */
export const objToMap = (obj: any) => {
    let map = new Map();
    let entries = Object.entries(obj);
    Object.entries(obj).map((entry: any) => {
        map.set(parseInt(entry[0]), entry[1]);
    });
    return map;
}