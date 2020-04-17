<template>
  <div class="footer">
    <p class="text-muted text-center">
      © {{ year }} Lanistar
    </p>
  </div>
</template>

<style scoped>
.footer {
  margin: 2rem 0;
  text-align: center;
}
</style>

<script>
export default {
  data () {
    return {
      year: (new Date()).getFullYear()
    }
  }
}
</script>>
