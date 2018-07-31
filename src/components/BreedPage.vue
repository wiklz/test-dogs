<template>
  <div id="breed" class="breed-container">
    <h1 class="title">{{breed.name}}</h1>
    <img :src="breed.images[0][1]" alt="">
  </div>
</template>

<script>
export default {
  name: 'BreedPage',
  computed: {
    breed () {
      return this.$store.state.breeds[this.$store.state.displayedBreed]
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    return this.$store.state.breeds[this.$store.state.displayedBreed]
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
