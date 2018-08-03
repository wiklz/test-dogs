<template>
  <div class="breeds-list">
    <div class="images">
      <div class="wrapper" v-for=" image in images" :key="image.id">
        <div class="img-wrapper">
          <img :src="image" alt="image" class="img">
        </div>
        <div class="btn-wrapper">
          <button class="addBtn" @click="addToFavourites(image, $event)">Add</button>
        </div>
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
    addToFavourites (image, e) {
      this.$store.dispatch('addToFavourites', { src: image, btn: e.target })
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
  h1{
    text-align: center;
  }
  .breeds-list{
    margin: 50px auto auto 100px;
  }
  .images{
    text-align: center;
    margin: auto;
  }
  .wrapper{
    display: inline-block;
    text-align: center;
    margin: 10px;
  }
  .wrapper:hover img{
    opacity: .5;
  }
  .wrapper:hover button{
    opacity: 1;
  }
  .img-wrapper{
    display: inline-block;
    height: 250px;
  }
  img{
    height: 100%;
    border-radius: 5px;
    transition: opacity .3s ease-in-out;
  }
  .btn-wrapper{
    height: 0;
    position: relative;
    bottom: 50px;
  }
  .addBtn {
    opacity: 0;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #2c3e50;
    color: #ffffff;
    cursor: pointer;
    transition: opacity .3s ease-in-out;
  }
  /*button.addBtn.disabled {*/
    /*background-color: darkgreen;*/
  /*}*/
</style>
