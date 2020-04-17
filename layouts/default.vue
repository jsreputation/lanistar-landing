<template>
  <div class="container">
    <div class="py-5 text-center">
      <img
        class="d-block mx-auto mb-4"
        src="/images/lanistar-logo-white-horizontal-bottom-text.png"
        alt=""
        width="250px"
      >
    </div>
    <nuxt />
  </div>
</template>

<script>
export default {}
</script>

<style>
html {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  font-size: 16px;
  background-color: rgba(3,4,8,1);
  background-image: linear-gradient(300deg, rgba(3,4,8,1) 0%, rgba(2,5,10,1) 49%, rgba(25,52,60,1) 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body {
  background-image: linear-gradient(300deg, rgba(3,4,8,1) 0%, rgba(2,5,10,1) 49%, rgba(25,52,60,1) 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

#__layout {
  height: 100vh;
}

a {
  color: #00b5e2 !important;
}
a.btn {
  color: #ffffff !important;
}
.btn {
  font-size: 14px;
}
.btn-primary {
  background-color: #00b5e2 !important;
  border-color: #00b5e2 !important;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.button {
  border: 2px solid #fff;
  border-radius: 50%;
  color: #fff;
  padding: 15px;
  height: 130px;
  width: 130px;
  display: block;
  margin: 0 auto 15px;
  position: relative;
  z-index: 5000;
  -webkit-animation: anim-glow 2s ease infinite;
  animation: anim-glow 2s ease infinite;
}
.checkmark {
  z-index: 8888;
  display: block;
  animation: check 0.4s;
  animation-delay: 0.6s;
  animation-fill-mode: forwards;
  transform: scaleX(-1) rotate(135deg);
  transform-origin: left top;
  border-right: 4px solid transparent;
  border-top: 4px solid transparent;
  content: '';
  height: 80px;
  position: absolute;
  width: 40px;
  top: 65px;
  left: 20px;
}
hr {
  background: #ffffff;
}
h2,
h3 {
  border: none;
}
.sc-link .fa,
.sc-link .socicon {
  color: #ffffff;
  font-size: 45px;
  margin-right: 15px;
}
.table .sc-link .fa,
.table .sc-link .socicon {
  color: #ffffff;
  font-size: 15px;
  margin-right: 5px;
}
a.sc-link:hover {
  text-decoration: none;
  color: #fff;
}

.table td,
.table th {
  border-top: none;
}
.table h3 {
  font-size: 14px;
  color: #ffffff;
}
@-webkit-keyframes anim-glow {
  0% {
    box-shadow: 0 0 #00b5e2;
  }
  100% {
    box-shadow: 0 0 25px 8px transparent;
    border-width: 2px;
  }
}
@keyframes anim-glow {
  0% {
    box-shadow: 0 0 #00b5e2;
  }
  100% {
    box-shadow: 0 0 25px 8px transparent;
    border-width: 2px;
  }
}
@keyframes check {
  0% {
    box-shadow: 0 0 #00b5e2;
    border-color: #fff;
    height: 0;
    width: 0;
  }
  6% {
    box-shadow: 0 0 #00b5e2;
    height: 0;
    width: 0;
  }
  50% {
    width: 40px;
    height: 0;
  }
  100% {
    box-shadow: 0 0 25px 8px transparent;
    border-color: #fff;
  }
}
</style>
