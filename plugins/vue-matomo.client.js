import VueMatomo from "vue-matomo"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  if (!config.public.matomoURL) {
    nuxtApp.vueApp.use(VueMatomo, {
      siteId: config.public.matomoID,
      trackerUrl: config.public.matomoURL,
      trackerScriptUrl: config.public.matomoScriptURL,
      enableHeartBeatTimer: true,
      preInitActions: config.public.matomoActions.split(";").map((x) => [x]),
      router: nuxtApp.$router,
      // enableLinkTracking: true,
      // requireConsent: false,
      // trackInitialView: true,
      // disableCookies: true,
      // requireCookieConsent: false,
    })
  }
})