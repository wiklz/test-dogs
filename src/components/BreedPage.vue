<template>
  <div class="breeds-list">
    <div class="images">
      <div class="img-wrapper" v-for=" image in images" :key="image.id">
        <img :src="image" alt="image" class="img" @click="addToFavourites">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreedPage',
  data () {
    return {
      bottom: false
    }
  },
  computed: {
    images () {
      return this.$store.getters.setImages
    }
  },
  created () {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  },
  methods: {
    addToFavourites (e) {
      this.$store.dispatch('addToFavourites', { src: e.target.src })
    },
    loadMore (breed) {
      this.$store.dispatch('addImages', breed)
    },
    bottomVisible () {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    }
  },
  watch: {
    bottom (bottom) {
      if (bottom) {
        this.loadMore(document.querySelector('#breed-select').value)
      }
    }
  },
  beforeCreate () {
    this.$store.dispatch('loadBreedsList')
  }
}
</script>

<style scoped>
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
