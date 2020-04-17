<template>

  <form class="needs-validation" novalidate @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="firstName">First name</label>
        <input
          id="firstName"
          v-model="$v.firstName.$model"
          type="text"
          class="form-control"
          placeholder
          value
          required
          style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfBJREFUWAntVk1OwkAUZkoDKza4Utm61iP0AqyIDXahN2BjwiHYGU+gizap4QDuegWN7lyCbMSlCQjU7yO0TOlAi6GwgJc0fT/fzPfmzet0crmD7HsFBAvQbrcrw+Gw5fu+AfOYvgylJ4TwCoVCs1ardYTruqfj8fgV5OUMSVVT93VdP9dAzpVvm5wJHZFbg2LQ2pEYOlZ/oiDvwNcsFoseY4PBwMCrhaeCJyKWZU37KOJcYdi27QdhcuuBIb073BvTNL8ln4NeeR6NRi/wxZKQcGurQs5oNhqLshzVTMBewW/LMU3TTNlO0ieTiStjYhUIyi6DAp0xbEdgTt+LE0aCKQw24U4llsCs4ZRJrYopB6RwqnpA1YQ5NGFZ1YQ41Z5S8IQQdP5laEBRJcD4Vj5DEsW2gE6s6g3d/YP/g+BDnT7GNi2qCjTwGd6riBzHaaCEd3Js01vwCPIbmWBRx1nwAN/1ov+/drgFWIlfKpVukyYihtgkXNp4mABK+1GtVr+SBhJDbBIubVw+Cd/TDgKO2DPiN3YUo6y/nDCNEIsqTKH1en2tcwA9FKEItyDi3aIh8Gl1sRrVnSDzNFDJT1bAy5xpOYGn5fP5JuL95ZjMIn1ya7j5dPGfv0A5eAnpZUY3n5jXcoec5J67D9q+VuAPM47D3XaSeL4AAAAASUVORK5CYII=&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;"
          :class="{ 'is-invalid': $v.firstName.$error && !$v.firstName.required }"
        />
        <div class="invalid-feedback">Valid first name is required.</div>
      </div>
      <div class="col-md-6 mb-3">
        <label for="lastName">Last name</label>
        <input
          id="lastName"
          v-model="$v.lastName.$model"
          type="text"
          class="form-control"
          placeholder
          value
          required
          :class="{ 'is-invalid': $v.lastName.$error && !$v.lastName.required }"
        />
        <div class="invalid-feedback">Valid last name is required.</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="$v.email.$model"
          type="email"
          class="form-control"
          placeholder="you@example.com"
          :class="{ 'is-invalid': $v.email.$error }"
        />
        <div class="invalid-feedback">Please enter a valid email address</div>
      </div>

      <div class="col-md-6 mb-3">
        <label for="phone">Phone</label>
        <input
          id="phone"
          v-model="$v.phone.$model"
          type="text"
          class="form-control"
          placeholder="XXX XXX XXXX"
          required
          :class="{ 'is-invalid': $v.phone.$error }"
        />
        <div class="invalid-feedback">Please enter a valid phone numver.</div>
      </div>
    </div>
    <div v-if="fullForm">
      <!-- <div class="mb-3">
        <label for="Brief">
          brief
          <span class="text-muted">(Optional)</span>
        </label>
        <textarea id="brief" v-model="brief" class="form-control" placeholder />
      </div>

      <hr class="mb-4" /> -->

      <h4 class="mb-3">Social Media Accounts</h4>
      <div class="mb-3">
        <label for="instagram">
          <i class="fa fa-instagram" /> Instagram
        </label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">@</span>
          </div>
          <input
            id="instagram"
            v-model="instagram"
            type="text"
            class="form-control"
            placeholder="Username"
            required
          />
          <div class="invalid-feedback" style="width: 100%;">Your instagram is required.</div>
        </div>
      </div>
      <div class="mb-3">
        <label for="twitter">
          <i class="fa fa-twitter" /> Twitter
        </label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">@</span>
          </div>
          <input
            id="twitter"
            v-model="twitter"
            type="text"
            class="form-control"
            placeholder="Username"
            required
          />
          <div class="invalid-feedback" style="width: 100%;">Your twitter is required.</div>
        </div>
      </div>
      <div class="mb-3">
        <label for="facebook">
          <i class="fa fa-facebook-square" /> Facebook
        </label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-globe" />
            </span>
          </div>
          <input
            id="facebook"
            v-model="$v.facebook.$model"
            type="text"
            class="form-control"
            placeholder="Page or Profile URL"
            required
            :class="{ 'is-invalid': $v.facebook.$error }"
          />
          <div class="invalid-feedback" style="width: 100%;">Your facebook is required.</div>
        </div>
      </div>
      <div class="mb-3">
        <label for="youtube">
          <i class="fa fa-youtube" /> Youtube
        </label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-globe" />
            </span>
          </div>
          <input
            id="youtube"
            v-model="$v.youtube.$model"
            type="text"
            class="form-control"
            placeholder="Youtube Channel URL"
            required
            :class="{ 'is-invalid': $v.youtube.$error }"
          />
          <div class="invalid-feedback" style="width: 100%;">Your youtube is required.</div>
        </div>
      </div>
    </div>
    <hr class="mb-4" />
    <button
      class="btn btn-lg btn-primary btn-block"
      :disabled="$v.$invalid || $props.loading"
      type="submit"
    >Submit</button>
  </form>
</template>

<script>
import Vue from "vue";
import Vuelidate, { validationMixin } from "vuelidate";
import { email, required, url } from "vuelidate/lib/validators";
import { helpers } from 'vuelidate/lib/validators'

const phoneNumberValidator = helpers.regex('phone', /^\+?[- ]?([0-9- ]{10,})$/)
// const phoneNumberValidator = helpers.regex('phone', /^\+?([0-9]{2})\)?[- ]?([0-9- ]{10,})$/)

Vue.use(Vuelidate);
// Vue.use(VueReCaptcha, { siteKey: config.recaptchaKey })

export default {
  mixins: { validationMixin },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      twitter: null,
      instagram: null,
      youtube: null,
      facebook: null,
      brief: null
    }
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email
    },
    phone: {
      required,
      phoneNumberValidator
    },
    youtube: {
      url
    },
    facebook: {
      url
    }
  },
  props: {
    submitHandler: {
      type: Function,
      default: function () {}
    },
    loadingIndicator: Boolean,
    fullForm: Boolean
  },
  methods: {
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.submitHandler({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phone,
        facebook: this.facebook,
        twitter: this.twitter,
        instagram: this.instagram,
        youtube: this.youtube,
        brief: this.brief,
      })
    }
  }
}
</script>
