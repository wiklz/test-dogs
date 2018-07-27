<template>
  <div class="main">
    <h1>{{ msg }}</h1>
    <BreedList/>
  </div>
</template>

<script>
import BreedList from './breed-list'
export default {
  name: 'MainPage',
  components: {BreedList},
  data () {
    return {
      msg: 'Welcome to Vue.js'
    }
  }
}
</script>

<style scoped>
  .main{
    text-align: center;
  }
</style>
