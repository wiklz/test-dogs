<template>
  <div id="breed" class="breed-container">
    <h1 class="title">{{breed.name}}</h1>
    <h2 class="title">{{breed.id}}</h2>
  </div>
</template>

<script>
export default {
  name: 'BreedPage',
  computed: {
    breed () {
      return this.$store.state.breeds[this.$route.params.id]
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    return this.$store.state.breeds[this.$route.params.id]
  }
}
</script>

<style scoped>
  .breed-container{
    text-align: center;
  }
  .title{
    text-transform: capitalize;
  }
  img{
    width: auto;
    height: 200px;
    margin: 15px;
  }
</style>
