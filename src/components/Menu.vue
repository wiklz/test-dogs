<template>
<div class="menu">
  <button class="menu-btn" @click="(menuOpen = !menuOpen) || (submenuOpen = false)">Menu</button>
  <ul class="list" v-show="menuOpen">
    <li @click="(menuOpen = false) || (submenuOpen = false)"><router-link class="menu-link" to="/">Home</router-link></li>
    <li><span class="menu-link" @click="submenuOpen = !submenuOpen">Breeds</span>
      <ul class="submenu">
        <li :key="breed.id" v-for="breed in breeds" v-show="submenuOpen" @click="$store.dispatch('pageChange', { id: breed.id })"><router-link class="menu-link" :to="'/breed/' + breed.id">{{breed.name}}</router-link></li>
      </ul>
    </li>
    <li @click="(menuOpen = false) || (submenuOpen = false)"><router-link class="menu-link" to="/favorites">Favourites</router-link></li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      menuOpen: false,
      submenuOpen: false
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
  .menu{
    background: #2c3e50;
    margin: 0;
    height: 50px;
    /*width: 100vw;*/
    display: flex;
    width: 100%;
  }
   .menu-btn{
     font-size: 16px;
     background: #ffffff;
     border: none;
     border-radius: 5px;
     color: #2c3e50;
     cursor: pointer;
     margin: auto 25px;
     padding: 5px 10px;
   }
  .list{
    padding: 10px 20px;
    background: #2c3e50;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 30px;
    left: 0;
    list-style: none;
    z-index: 1;
  }
  .list li{
    margin: 20px 15px;
  }
  .menu-link {
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
    text-transform: capitalize;
  }
</style>
