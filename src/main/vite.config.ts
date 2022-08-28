import * as path from "path";
import { defineConfig } from "vite";
import autoExternal from "rollup-plugin-auto-external";
import rollupCopy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "./index.ts"),
            name: "main",
            formats: ["cjs"],
        },
        rollupOptions: {
            plugins: [
                rollupCopy({
                    targets: [
                        { src: "src/main/preload.js", dest: "dist/dev/" },
                    ],
                    verbose: true,
                }),
                autoExternal({
                    packagePath: path.resolve(__dirname, "./package.json"),
                }),
            ],
        },
    },
});
