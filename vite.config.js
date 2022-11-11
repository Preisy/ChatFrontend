import {fileURLToPath, URL} from 'node:url'
import mkcert from 'vite-plugin-mkcert'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        https: true
    },
    plugins: [vue(), mkcert()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {

        /** If you set esmExternals to true, this plugins assumes that
         all external dependencies are ES modules */

        commonjsOptions: {
            esmExternals: true
        },
    },
    devServer: {
        proxy: 'https://localhost:8443'
    }
})
