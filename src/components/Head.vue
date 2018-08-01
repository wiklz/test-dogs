<template>
<header>
  <label for="selectByBreed">
    <h3>Sort by breed</h3>
  </label>
  <br>
  <select @change="changeSort" name="selectByBreed" id="selectByBreed">
    <option value="all" selected>All</option>
    <option :value="breed" v-for="breed in breeds" :key="breed.id">{{breed}}</option>
  </select>
</header>
</template>

<script>
export default {
  name: 'Head',
  computed: {
    breeds () {
      return this.$store.getters.getBreeds
    }
  },
  methods: {
    changeSort: function (e) {
      this.$store.dispatch('changeSort', { breed: e.target.value })
    }
  },
  mounted () {
    this.$store.dispatch('initialSort')
  }
}
</script>

<style scoped>
header {
  text-align: center;
  color: #2c3e50;
}
header select{
  margin: auto 15px;
  border-radius: 5px;
}
header select, header select option{
  text-transform: capitalize;
  text-align: center;
  border: none;
  padding: 2px 5px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
