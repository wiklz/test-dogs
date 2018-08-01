<template>
  <div class="main">
    <Head/>
    <BreedList/>
  </div>
</template>

<script>
import Head from './Head'
import BreedList from './breed-list'
export default {
  name: 'MainPage',
  components: {Head, BreedList},
  data () {
    return {
      msg: 'Welcome to Vue.js'
    }
  }
}
</script>

<style scoped>
</style>
