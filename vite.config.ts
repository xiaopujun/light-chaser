import {defineConfig} from 'vite'
import viteBaseConfig from "./vite.base.config";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";

const viteConfig = {
    'build': () => ({...viteBaseConfig, ...viteProdConfig}),
    'serve': () => ({...viteBaseConfig, ...viteDevConfig}),
}

export default defineConfig(({command, mode}) => {
    return viteConfig[command]();
});
