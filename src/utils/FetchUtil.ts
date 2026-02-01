/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {isTauri} from '@tauri-apps/api/core';

export interface HttpResponse {
    code: number;
    msg: string;
    data: any;
}

export default class FetchUtil {
    private static isTauri(): boolean {
        return isTauri();
    }

    private static getApiBaseUrl(): string {
        // API 基础地址选择优先级：
        // 1) 显式环境变量（便于切换到远端服务 / CI / 自定义端口）
        // 2) Tauri 环境：使用本地 Rust 后端（固定端口 14210）
        // 3) 开发环境：为了避免 Vite 代理在后端未启动时产生大量 ECONNREFUSED 日志，
        //    直接将 /api 与 /static 指向本地后端，让前端“等后端起来再正常请求”
        const envBaseUrl = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
        if (envBaseUrl && envBaseUrl.trim() !== '') {
            return envBaseUrl.replace(/\/+$/, '');
        }
        if (FetchUtil.isTauri()) {
            return 'http://127.0.0.1:14210';
        }
        if ((import.meta as any)?.env?.DEV) {
            return 'http://127.0.0.1:14210';
        }
        return '';
    }

    private static normalizeUrl(url: string): string {
        // URL 归一化：
        // - 绝对地址（http/https）保持不变，便于外部传入完整 URL
        // - 相对地址中，仅对 /api 与 /static 增加 baseUrl 前缀：
        //   1) 保持代码里原有的 “/api/xxx” 调用方式不变
        //   2) 同时兼容浏览器（走同源/代理）与桌面端（直连本地后端）
        if (!url) return url;
        if (/^https?:\/\//i.test(url)) return url;
        const baseUrl = FetchUtil.getApiBaseUrl();
        if (!baseUrl) return url;
        if (url.startsWith('/api/') || url.startsWith('/static/')) {
            return `${baseUrl}${url}`;
        }
        return url;
    }

    /**
     * GET请求
     * @param url
     * @param options
     */
    static async get(url: string, options: RequestInit = {}): Promise<HttpResponse> {
        options.method = 'GET';
        return FetchUtil.request(url, options);
    }

    /**
     * POST请求
     * @param url
     * @param data
     * @param options
     */
    static async post(url: string, data: any, options: RequestInit = {}): Promise<HttpResponse> {
        options.method = 'POST';
        //默认'Content-Type': 'application/json',
        options.headers = options.headers || {};
        if (!options.headers || !('Content-Type' in options.headers)) {
            (options.headers as any)['Content-Type'] = 'application/json';
        }

        const contentType = (options.headers as any)['Content-Type'] || 'application/json';
        if (contentType === 'application/json') {
            options.body = JSON.stringify(data);
        } else if (contentType === 'application/x-www-form-urlencoded') {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(data)) {
                params.append(key, value as string);
            }
            options.body = params.toString();
        } else if (contentType === 'multipart/form-data') {
            // multipart/form-data 不能直接设置 Content-Type，因为需要由浏览器自动生成
            delete (options.headers as any)['Content-Type'];
            if (data instanceof FormData) {
                options.body = data;
            } else {
                const formData = new FormData();
                data.values().forEach((value: any, key: string) => {
                    formData.append(key, value as Blob | string);
                })
                options.body = formData;
            }
        } else {
            // 默认处理为 text/plain
            options.body = data.toString();
        }
        return FetchUtil.request(url, options);
    }

    /**
     * 请求的标准返回结果必须包含code、msg字段，data字段可选，且code为200时，data为有效数据
     * @param url
     * @param options
     * @private
     */
    private static async request(url: string, options: RequestInit = {}): Promise<HttpResponse> {
        let response: Response | null = null;
        try {
            response = await fetch(FetchUtil.normalizeUrl(url), options);
            if (!response.ok) {
                console.error('请求错误:', response?.status, response?.statusText);
                return {code: response?.status ?? 500, msg: response?.statusText ?? '', data: null};
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const res = await response.json();
                if (typeof res === 'object' && 'code' in res && 'msg' in res)
                    return res;
                else
                    return {code: 200, msg: '操作成功', data: res};
            } else if (contentType && (contentType.includes('text/html') || contentType.includes('text/plain'))) {
                const text = await response.text()
                return {code: 200, msg: '操作成功', data: text}
            } else {
                const blob = await response.blob()
                return {code: 200, msg: '操作成功', data: blob}
            }
        } catch (error: any) {
            return {code: response?.status ?? 500, msg: response?.statusText ?? '', data: null};
        }
    }

    /**
     * 返回原生结果，不做任何封装
     * @param url
     * @param options
     * @private
     */
    private static async requestNativeResult(url: string, options: RequestInit = {}): Promise<any> {
        let response: Response | null = null;
        try {
            response = await fetch(FetchUtil.normalizeUrl(url), options);
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return await response.json();
                } else if (contentType && (contentType.includes('text/html') || contentType.includes('text/plain'))) {
                    return await response.text()
                } else {
                    return await response.blob()
                }
            } else {
                console.error('请求错误:', response?.status, response?.statusText);
                return null;
            }
        } catch (error) {
            console.error('请求错误:', error);
            return null;
        }
    }

    /**
     * 请求前置处理，返回处理后的url和options
     * @param url
     * @param method
     * @param headers
     * @param params
     * @private
     */
    private static doRequestBefore(url: string, method: string, headers: Record<string, string>, params: FormData | Record<string, any>): {
        url: string,
        options: RequestInit
    } {
        url = FetchUtil.normalizeUrl(url);
        const options: RequestInit = {
            method: method.toUpperCase(),
            headers: headers,
        };
        if (params) {
            if (method.toUpperCase() === 'GET') {
                const queryString = new URLSearchParams(params as Record<string, string>).toString();
                url = `${url}?${queryString}`;
            } else {
                options.headers = {
                    'Content-Type': 'application/json',
                    ...options.headers,
                };
                options.body = JSON.stringify(params);
            }
        }
        return {url, options};
    }

    /**
     * 执行自定义请求，请求参数均通过外部指定，返回结果必须为HttpResponse对象，必须包含code、msg字段，data字段可选
     * @param url
     * @param method
     * @param headers
     * @param params
     */
    static async doRequest(url: string, method: string, headers: Record<string, string>, params: FormData | Record<string, any>): Promise<HttpResponse> {
        const reqInfo = FetchUtil.doRequestBefore(url, method, headers, params);
        return FetchUtil.request(reqInfo.url, reqInfo.options);
    }

    /**
     * 执行自定义请求，请求参数均通过外部指定，返回结果为接口原生结果
     * @param url
     * @param method
     * @param headers
     * @param params
     */
    static async doRequestNativeResult(url: string, method: string, headers: Record<string, string>, params: FormData | Record<string, any>): Promise<object> {
        const reqInfo = FetchUtil.doRequestBefore(url, method, headers, params);
        return FetchUtil.requestNativeResult(reqInfo.url, reqInfo.options);
    }

    /**
     * 获取RSA公钥
     * @returns {Promise<string>} RSA公钥PEM格式字符串
     */
    static async getRSAPublicKey(): Promise<string> {
        const response = await FetchUtil.get('/api/crypto/public-key');
        if (response.code === 200) {
            return response.data; // RSA公钥
        }
        throw new Error(`获取RSA公钥失败: ${response.msg}`);
    }

}
