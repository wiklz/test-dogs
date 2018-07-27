<template>
<div class="menu">
  <button class="menu-btn" @click="menuOpen = !menuOpen">Menu</button>
  <ul v-show="menuOpen">
    <li><router-link to="/">Home</router-link></li>
    <li><a href="#">Breeds</a></li>
    <li><router-link to="/favorites">Favourites</router-link></li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      menuOpen: false
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
  ul{
    padding: 10px 20px;
    background: #2c3e50;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 30px;
    left: 0;
    list-style: none;
  }
  li{
    margin: 20px 15px;
  }
  a{
    color: #ffffff;
    text-decoration: none;
  }
</style>
