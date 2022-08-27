import { resolve } from "path";
import chalk from "chalk";
import ListR from "listr";
import { build as electronBuild } from "electron-builder";
import { build as viteBuild, createLogger } from "vite";

import builderConfig from "../build.config.mjs";
import { MAIN_ROOT, RENDERER_ROOT } from "./constants.mjs";

function build() {
    const tasks = new ListR([
        {
            title: "building renderer process",
            task: buildRenderer,
        },
        {
            title: "building main process",
            task: buildMainProcess,
        },
    ]);

    tasks
        .run()
        .then(() => {
            electronBuild(builderConfig);
        })
        .catch((error) => {
            createLogger().error(
                chalk.red(`error during build application:\n${error.stack}`)
            );
            process.exit(1);
        });
}

async function buildRenderer() {
    try {
        const rendererOutput = await viteBuild({
            root: RENDERER_ROOT,
            base: "./",
            build: {
                outDir: resolve("./dist/renderer"),
            },
        });
        return rendererOutput;
    } catch (error) {
        createLogger().error(
          chalk.red(`error during build renderer:\n${error.stack}`)
        );
        process.exit(1);
    }
}

async function buildMainProcess() {
    try {
        const buildOutput = await viteBuild({
            root: MAIN_ROOT,
            build: {
                outDir: resolve("./dist/main"),
            },
        });
        return buildOutput;
    } catch (error) {
        createLogger().error(
          chalk.red(`error during build main process:\n${error.stack}`)
        );
        process.exit(1);
    }
}

build();
