import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import pages from 'vite-plugin-pages'

import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'

import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      pages(),
      autoImport({resolvers: [ElementPlusResolver()]}),
      components({resolvers: [ElementPlusResolver()]}),
  ]
})
