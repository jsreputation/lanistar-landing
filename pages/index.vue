<template>
  <div>
    <Spinner :show="spinnerVisible" />
    <div v-show="magicLinkHasBeenSent === true" class="row">
      <div class="col">
        <div class="alert alert-info">
          Your login link has been sent your email address <span class="muted">({{ email }})</span>.
          Please check your inbox.
        </div>
      </div>
    </div>
    <div v-if="errorSummary" class="row">
      <div class="col">
        <div class="alert alert-danger">
          {{ errorSummary }}
        </div>
      </div>
    </div>
    <div v-show="!magicLinkHasBeenSent" class="row">
      <form class="form-signin" @submit.prevent="handleSubmit">
        <h1 class="h3 mb-3 font-weight-normal text-center">
          Please enter your email address
        </h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          id="inputEmail"
          v-model="$v.email.$model"
          type="email"
          class="form-control"
          placeholder="Email address"
          required=""
          autofocus=""
          autocomplete="off"
          :class="{ 'is-invalid': $v.email.$error }"
          style="margin-bottom:15px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAYAAADo6zjiAAAAAXNSR0IArs4c6QAAAbNJREFUWAntV8FqwkAQnaymUkpChB7tKSfxWCie/Yb+gbdeCqGf0YsQ+hU95QNyDoWCF/HkqdeiIaEUqyZ1ArvodrOHxanQOiCzO28y781skKwFW3scPV1/febP69XqarNeNTB2KGs07U3Ttt/Ozp3bh/u7V7muheQf6ftLUWyYDB5yz1ijuPAub2QRDDunJsdGkAO55KYYjl0OUu1VXOzQZ64Tr+IiPXedGI79bQHdbheCIAD0dUY6gV6vB67rAvo6IxVgWVbFy71KBKkAFaEc2xPQarXA931ot9tyHphiPwpJgSbfe54Hw+EQHMfZ/msVEEURjMfjCjbFeG2dFxPo9/sVOSYzxmAwGIjnTDFRQLMQAjQ5pJAQkCQJ5HlekeERxHEsiE0xUUCzEO9AmqYQhiF0Oh2Yz+ewWCzEY6aYKKBZCAGYs1wuYTabKdNNMWWxnaA4gp3Yry5JBZRlWTXDvaozUgGTyQSyLAP0dbb3DtQlmcan0yngT2ekE9ARc+z4AvC7nauh9iouhpcGamJeX8XF8MaClwaeROWRA7nk+tUnyzGvZrKg0/40gdME/t8EvgG0/NOS6v9NHQAAAABJRU5ErkJggg==); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;"
        >
        <div class="invalid-feedback">Please enter a valid email address</div>
        <button class="btn btn-lg btn-primary btn-block mt-2" type="submit">
          Sign in
        </button>
        <p style="text-align: center;" class="mt-2">
          or
        </p>
        <nuxt-link to="/register" class="btn btn-lg btn-primary btn-block">
          Submit Profile
        </nuxt-link>

        <Footer />
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from '../utils/create-axios'
import Vuelidate, { validationMixin } from 'vuelidate'

import { email, required } from 'vuelidate/lib/validators'
import eventHub from '../utils/event-hub'
import parseApiError from '../utils/parse-api-error'
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'
import config from '../config'

Vue.use(Vuelidate)

export default {
  components: {
    Spinner,
    Footer
  },
  mixins: { validationMixin },
  data () {
    return {
      email: null,
      recaptchaPayload: null,
      spinnerVisible: false,
      submitDisabled: true,
      errorSummary: null,
      magicLinkHasBeenSent: false
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  created () {
    eventHub.$on('before-request', this.showSpinner)
    eventHub.$on('request-error', this.hideSpinner)
    eventHub.$on('after-response', this.hideSpinner)
    eventHub.$on('response-error', this.hideSpinner)
  },
  beforeDestroy () {
    eventHub.$off('before-request', this.showSpinner)
    eventHub.$off('request-error', this.hideSpinner)
    eventHub.$off('after-response', this.hideSpinner)
    eventHub.$off('response-error', this.hideSpinner)
  },
  async mounted () {
    await this.$recaptcha.init()
    this.recaptchaPayload = await this.$recaptcha.execute('influencerRegister')
  },
  methods: {
    async handleSubmit () {
      this.errorSummary = ''
      this.submitDisabled = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        const sendMagicLinkUrl = `${config.msLandingUrl}/influencer/magiclink/`
        const sendMagicLinkReq = await axios.post(sendMagicLinkUrl, {
          email: this.email,
          recaptchaPayload: this.recaptchaPayload
        })
        if (!sendMagicLinkReq || !sendMagicLinkReq.data || !sendMagicLinkReq.data.success) {
          this.errorSummary = parseApiError(sendMagicLinkReq)
          this.recaptchaPayload = await this.$recaptcha.execute('influencerRegister')
          return
        }
        this.magicLinkHasBeenSent = true
      } catch (error) {
        this.errorSummary = parseApiError(error)
        this.recaptchaPayload = await this.$recaptcha.execute('influencerRegister')
      }
    },
    showSpinner () {
      this.spinnerVisible = true
    },
    hideSpinner () {
      this.spinnerVisible = false
    }
  }
}
</script>

<style>
.test {
  color: #fff;
}
</style>
