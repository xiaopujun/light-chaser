/// <reference types="vite/client" />


import {DesignerMode} from "./designer/DesignerType.ts";

declare global {
    interface Window {
        LC_ENV: {
            projectId?: string;
            mode?: DesignerMode;
            createdController?: number; //已渲染的组件数量
            totalController?: number; //组件总数量
            [key: string]: any;
        };
    }
}