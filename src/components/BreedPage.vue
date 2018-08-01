<template>
  <div class="breeds-list">
    <div class="images">
      <img :src="image" alt="image" v-for=" image in images" :key="image.id">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreedPage',
  computed: {
    images () {
      return this.$store.getters.setImages
    }
  }
}
</script>

<style scoped>
  .breeds-list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90vh;
    margin: auto;
  }
  .images{
    text-align: center;
    margin: auto;
  }
  img{
    max-height: 180px;
    margin: 10px;
  }
</style>
