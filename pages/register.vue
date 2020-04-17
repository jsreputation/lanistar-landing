<template>
  <div>
    <Spinner :show="spinnerVisible" />
    <div class="d-flex flex-row justify-content-center mb-4">
      <div class="teaser-text col-md-6">
        <teaser-text />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <register-form
          :full-form="true"
          :loading-indicator="spinnerVisible"
          :submit-handler="handleSubmit" />
        <div v-if="errorSummary" class="row mt-4">
          <div class="col-md-12">
            <div class="alert alert-danger">{{ errorSummary }}</div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <div class="recaptcha text-center">
      <small>
        This site is protected by reCAPTCHA and the Google
        <a
          href="https://policies.google.com/privacy"
        >Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </small>
    </div>
  </div>
</template>

<style scoped>
.recaptcha {
  color: rgb(110, 106, 106);
}
</style>>

<script>
import axios from "../utils/create-axios";

import eventHub from "../utils/event-hub";
import parseApiError from "../utils/parse-api-error";
import config from "../config";

import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm"
import TeaserText from "../components/TeaserText"

export default {
  components: { Footer, Spinner, RegisterForm, TeaserText },
  data() {
    return {
      spinnerVisible: false,
      recaptchaIsReady: false,
      errorSummary: null,
      quickForm: true,

      referredBy: null,
      recaptchaPayload: null
    };
  },
  computed: {},
  created() {
    eventHub.$on("before-request", this.showSpinner);
    eventHub.$on("request-error", this.hideSpinner);
    eventHub.$on("after-response", this.hideSpinner);
    eventHub.$on("response-error", this.hideSpinner);
  },
  beforeDestroy() {
    eventHub.$off("before-request", this.showSpinner);
    eventHub.$off("request-error", this.hideSpinner);
    eventHub.$off("after-response", this.hideSpinner);
    eventHub.$off("response-error", this.hideSpinner);
  },
  async mounted() {
    await this.$recaptcha.init();
    const { ref, full } = this.$route.query;
    this.referredBy = ref;
    this.quickForm = full === "true" ? false : true;
    this.recaptchaPayload = await this.$recaptcha.execute("influencerRegister");
    // console.log(this.recaptchaPayload)
  },
  methods: {
    async handleSubmit(formData) {
      this.errorSummary = "";
      try {
        const registerUrl = `${config.msLandingUrl}/influencer/register`;
        const registerReq = await axios.post(registerUrl, {
          ...formData,
          recaptchaPayload: this.recaptchaPayload,
          referredBy: this.referredBy
        });
        if (!registerReq || !registerReq.data) {
          this.errorSummary =
            "An unexpected error occurred please try again later";
          this.recaptchaPayload = await this.$recaptcha.execute(
            "influencerRegister"
          );
          return;
        }
        this.$nuxt.$router.replace({ path: "/thanks" });
      } catch (error) {
        console.log(error)
        this.recaptchaPayload = await this.$recaptcha.execute(
          "influencerRegister"
        );
        this.errorSummary = parseApiError(error);
      }
    },
    showSpinner() {
      this.spinnerVisible = true;
    },
    hideSpinner() {
      this.spinnerVisible = false;
    }
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href:
            "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        }
      ]
    };
  }
};
</script>

<style>
.test {
  color: #fff;
}
</style>
