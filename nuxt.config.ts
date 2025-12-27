// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'My Service Store',
      meta: [
        {
          name: 'description',
          content: 'Welcome to my general service store.',
        },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ['/', '/about', '/contact', '/pricing', '/products'],
      ignore: ['/dashboard', '/dashboard/**'],
      crawlLinks: true,
    },
  },
  fonts: {
    families: [
      {
        name: 'Roboto',
        provider: 'google',
        weights: [400, 500, 700, 900],
        display: 'swap',
      },
    ],
  },
});
