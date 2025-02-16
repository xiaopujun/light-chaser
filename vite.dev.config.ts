import {defineConfig} from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '^/(api|static)/.*': {
                target: 'http://114.55.91.77:3000',
                changeOrigin: true,
            }
        }
    },
    css: {
        preprocessorOptions: {
            //对css预处理器默认配置的覆盖
        },
        devSourcemap: true,
        postcss: {}
    },
})
