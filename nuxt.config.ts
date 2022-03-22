import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
    buildModules: ['@pinia/nuxt'],
    server: {
        port: 3001,
    },
    css: [
        '~/assets/styles.css',
        '~/assets/plone_styles.css',
        '~/assets/font_awesome/font-awesome.min.css'
    ]
})
