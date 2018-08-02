<template>
  <div id="app">
    <top-menu/>
    <router-view/>
  </div>
</template>

<script>
import Menu from './components/Menu'

export default {
  components: {
    'top-menu': Menu
  },
  beforeCreate () {
    this.$store.dispatch('mainPageLoader', this.$route.path)
  }
}
</script>

<style>
  body{
    margin: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}
</style>
