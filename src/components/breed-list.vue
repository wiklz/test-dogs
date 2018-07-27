<template>
  <div class="breeds-list">
    <h4>{{msg}}</h4>
    <div class="breeds-container">
      <div class="breed" :key="breed.id" v-for="breed in breeds">{{breed.name}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BreedList',
  data () {
    return {
      msg: 'Breed list'
    }
  },
  mounted () {
    this.$store.dispatch('loadBreedslist')
  },
  computed: mapState(['breeds'])
}
</script>

<style scoped>
.breed{
  display: inline-block;
  margin: 50px;
}
</style>
