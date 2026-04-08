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

export default class Base64Util {
    public static toBase64(str: string) {
        const utf8Array = new TextEncoder().encode(str);
        let binaryString = "";
        utf8Array.forEach((byte) => {
            binaryString += String.fromCharCode(byte);
        });
        return btoa(binaryString);
    }

    public static fromBase64(base64: string) {
        const binaryString = atob(base64);
        const utf8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            utf8Array[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder().decode(utf8Array);
    }

}