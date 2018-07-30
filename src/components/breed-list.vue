<template>
  <div class="breeds-list">
    <h4>{{msg}}</h4>
    <div class="breeds-container">
      <div class="breed" v-bind:key="breed.id" v-for="breed in breeds">
        <h3>{{breed.name}}</h3>
        <span>{{breed.id}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreedList',
  data () {
    return {
      msg: 'Breed list'
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
}
</style>
