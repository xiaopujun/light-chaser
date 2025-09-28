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

export default class AbstractCache<T = any> {
    private cachePool = new Map<string, T>();

    public addCache(key: string, value: T): void {
        this.cachePool.set(key, value);
    }

    public getCache(key: string): T | null {
        return this.cachePool.get(key) || null;
    }

    public removeCache(key: string): void {
        this.cachePool.delete(key);
    }

    public clearCache(): void {
        this.cachePool.clear();
    }

    public isExistCache(key: string): boolean {
        return this.cachePool.has(key);
    }

    public getCachePool(): Map<string, T> {
        return this.cachePool;
    }
}