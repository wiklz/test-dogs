<template>
  <div id="breed" class="breed-container">
    <h1 class="title">{{breed}}</h1>
    <h2 class="">{{id}}</h2>
  </div>
</template>

<script>
export default {
  name: 'BreedPage',
  data () {
    return {
      id: null,
      breed: null
    }
  },
  mounted () {
    this.breed = this.$store.state.breedsList[this.$route.params.id]
    // console.log(this.$route.params.id)
  },
  /* Called when this component is reused.
Here we have a chance to update the component
since mounted() and other life-cycle hooks won't be called
when a component is reused. */
  beforeRouteUpdate (to, from, next) {
    this.breed = ''
    next()
    // console.log(this.$route.params.id)
    this.breed = this.$store.state.breedsList[this.$route.params.id]
    // console.log(this.$store.state.breeds)
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
</style>
