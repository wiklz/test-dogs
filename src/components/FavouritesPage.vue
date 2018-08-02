<template>
  <div>
    <h1>FavouritesPage</h1>
    <div class="breeds-list">
      <div class="images">
        <div class="img-wrapper" v-for=" image in images" :key="image.id">
          <img :src="image" alt="image" class="img" @click="removeFavourite">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavouritesPage',
  mounted () {
    this.$store.dispatch('getFavourites')
  },
  computed: {
    images () {
      return this.$store.getters.getFavourites
    }
  },
  methods: {
    removeFavourite (e) {
      this.$store.dispatch('removeFromFavourites', {src: e.target.src})
    }
  }
}
</script>

<style scoped>
h1{
  text-align: center;
}
.breeds-list{
  margin-top: 50px;
}
.images{
  text-align: center;
  margin: auto;
}
.img-wrapper{
  display: inline-block;
  margin: 10px;
  height: 250px;
}
img{
  height: 100%;
}
</style>
