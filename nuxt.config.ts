import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
    buildModules: ['@pinia/nuxt',],
    server: {
        port: 3001,
    }
})
