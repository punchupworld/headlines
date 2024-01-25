// https://nuxt.com/docs/api/configuration/nuxt-config

const BASE_URL = "https://punchup.world/";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: "‘พาดหัวข่าว’ เล่าอะไรให้คนไทยฟัง?",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "คนไทยได้เจอข่าวอะไรมากที่สุด ?",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "‘พาดหัวข่าว’ เล่าอะไรให้คนไทยฟัง?",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "คนไทยได้เจอข่าวอะไรมากที่สุด ?",
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "og-image",
          property: "og:image",
          content: BASE_URL + "og_image.png",
        },
        {
          hid: "twitter:image",
          name: "twitter:image:src",
          content: BASE_URL + "og_image.png",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "‘พาดหัวข่าว’ เล่าอะไรให้คนไทยฟัง?",
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content: "คนไทยได้เจอข่าวอะไรมากที่สุด ?",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },

        {
          hid: "twitter:url",
          property: "twitter:url",
          content: BASE_URL,
        },
      ],
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  css: [
    "~/assets/styles/main.scss", // you should add main.scss somewhere in your app
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/styles/_colors.scss" as *;
          @use "@/assets/styles/_mixins.scss" as *;
          `,
        },
      },
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
