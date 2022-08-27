/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare const DEBUG: boolean;

declare type LogFunction = (...data: any[]) => void;

declare interface ILogger {
    error: LogFunction;
    warn: LogFunction;
    info: LogFunction;
    debug: LogFunction;
}
