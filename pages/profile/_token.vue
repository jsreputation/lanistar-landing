<template>
  <div>
    <Spinner :show="spinnerVisible" />
    <div class="alert alert-warning" v-if="errorSummary">
      {{ errorSummary }}
    </div>
    <div class="row" v-if="profileInfo.firstName">
      <div class="col-md-6 offset-md-3 text-center">
        <h1 class>
          {{ profileInfo.firstName }} {{ profileInfo.lastName }}
        </h1>
        <p> <a :href="`mailto:${profileInfo.email}`">{{ profileInfo.email }}</a> </p>
        <p> <a :href="`tel:${profileInfo.phone}`">{{ profileInfo.phone }}</a></p>
        <hr>
      </div>
      <div class="col-md-6 offset-md-3 text-center">
        <p>Your Reference Link</p>
        <a href="#">{{ referrerLink }}</a>
        <br>
        <span class="tip">Copy and Paste this link to any Referalls you may have. Soon as they sign up the Referal is yours!</span>
        <br>
        <br>
        <a href="#" class="btn" :class="{ 'btn-success': referrerLinkCopied, 'btn-info': !referrerLinkCopied }" @click.prevent="copyToClipboard(referrerLink)">Copy</a>
        <hr>
      </div>
      <div class="col-md-6 offset-md-3 text-center">
        <a v-if="profileInfo.facebook"
          :href="profileInfo.facebook" class="sc-link" target="_blank">
          <i class="socicon socicon-facebook-square" />
        </a>
        <a v-if="profileInfo.instagram"
          :href="`https://instagram.com${profileInfo.instagram}`" class="sc-link" target="_blank">
          <i class="socicon socicon-instagram" />
        </a>
        <a v-if="profileInfo.twitter"
          :href="`https://twitter.com${profileInfo.twitter}`" class="sc-link" target="_blank">
          <i class="socicon socicon-twitter" />
        </a>
        <a v-if="profileInfo.tiktok"
          :href="`https://www.tiktok.com@${profileInfo.tiktok}`" class="sc-link" target="_blank">
          <i class="socicon socicon-tiktok" />
        </a>
        <a v-if="profileInfo.youtube"
          :href="profileInfo.youtube" class="sc-link" target="_blank">
          <i class="socicon socicon-youtube" />
        </a>
        <hr>
      </div>
      <div class="col-md-6 offset-md-3 text-center">
        <h2>Your total number of users referred by you: {{ referredInfluencers.length }}</h2>
        <div>
          <span>Please press CTRL + D on Windows OR CMD + D on MacOS to bookmark this page</span>
        </div>
        <div class="user-list">
          <div v-for="(user, index) in referredInfluencers" :key="'user' + index" class="user-list__item" :class="user.contractStatus === 4 ? 'green': 'red'">
            <h3>{{ user.firstName }} {{ user.lastName }}</h3>
            <a v-if="user.facebook" :href="user.facebook" class="sc-link" target="_blank">
              <i class="socicon sociconfa-facebook-square" />
            </a>
            <a v-if="user.instagram" :href="`https://instagram.com${user.instagram}`" class="sc-link" target="_blank">
              <i class="socicon socicon-instagram" />
            </a>
            <a v-if="user.twitter" :href="`https://twitter.com/${user.twitter}`" class="sc-link" target="_blank">
              <i class="socicon socicon-twitter" />
            </a>
            <a v-if="user.tiktok" :href="`https://www.tiktok.com/@${user.tiktok}`" class="sc-link" target="_blank">
              <i class="socicon socicon-tiktok" />
            </a>
            <a v-if="user.youtube" :href="user.youtube" class="sc-link" target="_blank">
              <i class="socicon socicon-youtube" />
            </a>
            <span class="value">{{ referralValueFormatted }}</span>
            <span class="contract">({{ getContractStatus(user) }})</span>
          </div>
        </div>
        <hr>
        <div class="total" v-if="totalValue">Total: {{ totalValue }}</div>
      </div>
      <div class="col-md-12" />
  </div>
  </div>
</template>

<style>
  .green {
    color: lightgreen !important;
  }
  .red {
    color: lightcoral !important;
  }
  .user-list {
    display: flex;
    text-align: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  .user-list__item {
    width: 100%;
    /* width: 50%; */
    padding: 1rem;
    border-bottom: 1px solid #333;
  }
  .user-list__item:last-child {
    border-bottom: 0 none;
  }
  .user-list__item h3 {
    font-size: 14px;
  }
  .user-list__item .sc-link .socicon {
    color: #ffffff;
    font-size: 15px;
    margin-right: 5px;
  }
  span.contract {
    font-size: 13px;
  }
  span.tip {
    font-size: 13px;
  }
  .total{
    margin-bottom: 3rem;
  }
</style>>

<script>
import Vue from 'vue'
import axios from "../../utils/create-axios";

import Footer from '../../components/Footer'
import Spinner from '../../components/Spinner'
import config from '../../config'
import parseApiError from '../../utils/parse-api-error'
import { copyToClipboard } from '../../utils/copy-text-clipboard'

const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  notation: 'standard',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export default Vue.extend({
  components: { Footer, Spinner },
  data () {
    return {
      spinnerVisible: false,
      errorSummary: null,
      profileInfo: {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        facebook: null,
        instagram: null,
        twitter: null,
        youtube: null,
        tiktok: null,
        referralCode: null
      },
      referrerLinkCopied: false,
      referredInfluencers: []
    }
  },
  computed: {
    referrerLink () {
      return `http://inf.iamlanistar.com/register?ref=${this.profileInfo.referralCode}`
    },
    totalValue() {
      if (!this.referredInfluencers || !this.referredInfluencers.length) {
        return '';
      }
      const val = Number(this.profileInfo.referralValue);
      if (!this.profileInfo.referralValue || Number.isNaN(val)) {
        return '';
      }
      const total = this.referredInfluencers.reduce((sum, user) => {
        if (!user || user.notAccepted === true) {
          return sum;
        }
        return sum + val;
      }, 0);
      return formatter.format(total);
    },
    referralValueFormatted() {
      if (!this.profileInfo.referralValue || Number.isNaN(Number(this.profileInfo.referralValue))) {
        return '';
      }
      return formatter.format(this.profileInfo.referralValue)
    },
    contractValueFormatted() {
      return formatter.format(this.profileInfo.contractValue)
    }
  },
  async mounted () {
    this.showSpinner()
    try {
      // const token = '40abad3b-2119-48ee-9948-51788484832c'
      const { token } = this.$route.params
      const profileUrl = `${config.msLandingUrl}/influencer/profile/${token}`
      const result = await axios.get(profileUrl)
      if (!result || !result.data) {
        this.errorSummary = 'An unexpected error occurred please try again later'
      }
      // const {
      //   firstName, lastName, email, phoneNumber, brief,
      //   facebook, twitter, instagram, youtube,
      //   referralCode, referredBy, influencerId
      // } = result.data.profileInfo
      this.profileInfo = result.data.profileInfo
      this.profileInfo = {
        ...result.data.profileInfo
      }
      this.referredInfluencers = result.data.referredInfluencers
    } catch (error) {
      this.errorSummary = parseApiError(error)
    }
    if (!this.profileInfo.firstName) {
      this.$router.replace('/')
    }
    this.hideSpinner()
  },
  methods: {
    changeFormat(value) {
      return formatter.format(value);
    },
    copyToClipboard (txt) {
      copyToClipboard(txt);
      const self = this
      // eslint-disable-next-line no-console
      self.referrerLinkCopied = true
      setTimeout(() => {
        self.referrerLinkCopied = false
      }, 3000)
    },
    showSpinner () {
      this.spinnerVisible = true
    },
    hideSpinner () {
      this.spinnerVisible = false
    },
    getContractStatus(user) {
      const list = [
        'Waiting to be contacted',
        '',
        'Didn\'t attend pitch / to be re-booked',
        'Non contactable / Disappeared',
        'Contract signed',
        'Contract not signed',
        'Rejected',
        'Contacted / Pitch booked / Zoom',
        'Contacted / Pitch booked / HQ',
        'Contacted / awaiting response'
      ];
      return list[user.contractStatus];
    },
  },
  head () {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        }
      ]
    }
  }
})
</script>
