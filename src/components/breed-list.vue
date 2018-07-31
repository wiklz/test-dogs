<template>
  <div class="breeds-list">
    <h4>{{msg}}</h4>
    <div class="breeds-container">
      <div class="breed" :key="breed.id" v-for="breed in breeds" @click="$store.dispatch('pageChange', { id: breed.id })">
        <h3>{{breed.name}}</h3>
        <router-link :to="'/breed/' + breed.id">
          <img :src="breed.images[0][0]" :alt="breed.id" v-if="breed.images[0]">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreedList',
  data () {
    return {
      msg: 'Breed list',
      displayed: null
    }
  },
  computed: {
    breeds () {
      return this.$store.state.breeds
    }
  }
}
</script>

<style scoped>
.breed{
  display: inline-block;
  margin: 50px;
  text-transform: capitalize;
  width: auto;
}
  img{
    height: 200px;
    width: auto;
  }
  h3{
    width: 100%;
    height: auto;
    padding: 15px 0;
    position: relative;
    top: 225px;
    background: rgba(255, 255,255, .8);
  }
</style>
