import "dotenv/config";
import { resolve } from "path";
import { toNumber } from "lodash";
import { defineConfig, ProxyOptions } from "vite";
import vue from "@vitejs/plugin-vue";

const _DEBUG = process.env.NODE_ENV !== "production";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {
                find: /^@\/(.+)$/,
                replacement: resolve(__dirname, "./src/$1"),
            },
            {
                find: /^@comps\/(.*)/,
                replacement: resolve(__dirname, "./src/components/$1"),
            },
            {
                find: /^\$\/(.+)/,
                replacement: resolve(__dirname, "./src/assets/$1"),
            },
        ],
    },
    plugins: [
        vue(),
    ],
    server: {
        host: "0.0.0.0",
        port: 3000,
    },
    build: {
        outDir: "./dist",
    },
});
