import Vue from "vue";
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

Sentry.init({
  dsn: "https://76fd3de623fb44a6baad2847a59f0008@sentry.io/5173223",
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
});
