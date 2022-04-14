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
    ],
    meta: {
        htmlAttrs: {
            lang: 'de'
        },
//        title: 'DatenAdler: Das Open-Data-Portal für Brandenburg',
        meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'description', content: 'A vue frontend for pkan' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
})
