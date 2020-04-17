import Axios from "axios";
import eventHub from "./event-hub";

const axios = Axios.create({});
axios.interceptors.request.use(
  conf => {
    eventHub.$emit("before-request");
    return conf;
  },
  error => {
    eventHub.$emit("request-error");
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    eventHub.$emit("after-response");
    return response;
  },
  error => {
    eventHub.$emit("response-error");
    if ($nuxt) {
      $nuxt.$sentry.captureException(error);
    }
    return Promise.reject(error);
  }
);

export default axios;
