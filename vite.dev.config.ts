import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '^/(api|static)/.*': {
                target: 'http://192.168.30.34:8080',
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
