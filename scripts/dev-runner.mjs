import { dirname, resolve, join } from "path";
import chalk from "chalk";
import electron from "electron";
import { spawn } from "child_process";
import { createServer, createLogger, build } from "vite";
import { MAIN_ROOT, RENDERER_ROOT } from "./constants.mjs";

let manualRestart;
let electronProcess;

async function startRenderer() {
    try {
        const viteServer = await createServer({
            root: RENDERER_ROOT,
        });
        await viteServer.listen();
        return viteServer;
    } catch (error) {
        createLogger().error(
            chalk.red(`error when starting dev server:\n${error.stack}`)
        );
    }
}

async function watchMainProcess() {
    try {
        const rollupWatcher = await build({
            root: MAIN_ROOT,
            mode: "development",
            build: {
                emptyOutDir: false,
                outDir: resolve("./dist/dev"),
                watch: true,
            },
        });
        return await new Promise((resolve, reject) => {
            rollupWatcher.on("event", (event) => {
                if (event.code === "BUNDLE_END") {
                    resolve(rollupWatcher);
                }
            });
        });
    } catch (error) {
        createLogger().error(
            chalk.red(`error during watch main process:\n${error.stack}`)
        );
        process.exit(1);
    }
}

/**
 * Start Electron Process
 * @param {string} RENDERER_URL Url for renderer
 */
function startElectron(RENDERER_URL) {
    let args = ["--inspect=5858", resolve("./dist/dev/main.js")];

    if (process.env.npm_execpath.endsWith("yarn.js")) {
        args = args.concat(process.argv.slice(3));
    } else if (process.env.npm_execpath.endsWith("npm-cli.js")) {
        args = args.concat(process.argv.slice(2));
    }

    electronProcess = spawn(electron, args, {
        env: {
            RENDERER_URL,
        },
    });

    // Redirect Electron's stdout to node's stdout,
    // so you can use console.log() in Main Process,
    // and see messages on terminal.
    electronProcess.stdout.pipe(process.stdout);

    electronProcess.on("close", () => {
        if (!manualRestart) process.exit();
    });
}

async function start() {
    const rendererServer = await startRenderer();
    const { port = 3000, https = false } = rendererServer.config.server;
    const RENDERER_URL = `http${https ? "s" : ""}://localhost:${port}`;

    const mainWatcher = await watchMainProcess();

    startElectron(RENDERER_URL);

    mainWatcher.on("event", (event) => {
        if (event.code !== "BUNDLE_END") {
            return;
        }

        if (electronProcess && electronProcess.kill) {
            manualRestart = true;
            process.kill(electronProcess.pid);
            electronProcess = null;
            startElectron(RENDERER_URL);

            setTimeout(() => {
                manualRestart = false;
            }, 5000);
        }
    });
}

start();
