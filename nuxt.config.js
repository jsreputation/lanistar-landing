
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
 server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: 'Lanistar',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Lanistar, banking of the future'
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'noindex'
      },
      {
        hid: 'googlebot',
        name: 'googlebot',
        content: 'noindex'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://d1azc1qln24ryf.cloudfront.net/114779/Socicon/style-cf.css?u8vidh'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  script: [

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    'plugins/sentry.js'
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/google-analytics'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/recaptcha',
    '@nuxtjs/sentry'
  ],

  sentry: {
    dsn: 'https://76fd3de623fb44a6baad2847a59f0008@sentry.io/5173223',
    config: {}
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  googleAnalytics: {
    id: 'UA-157185651-2',
    debug: {
      enabled: process.env.NODE_ENV !== 'production',
      sendHitTask: process.env.NODE_ENV !== 'production'
    }
  },
  recaptcha: {
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    language: 'en', // Recaptcha language (v2)
    siteKey: process.env.NODE_ENV == 'production'
      ? '6Lf-2tMUAAAAAGLKfRIVxNPYvQPTspNF3KJuzeIt' // prod
      : '6LdTb-IUAAAAAGSoNhaCcJUznU9Iem-aAZiyoeGU', // dev
      // secret for localhost: 6Lf-2tMUAAAAAIoSm_6Luewltw-jIZs_tbKmsWTg
    version: 3, // Version
    size: 'invisible'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    hotMiddleware: false
  }
}
