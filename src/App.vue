<template>
  <div id="app">
    <HeaderNav />

    <div class="home-container" v-if="$route.path == '/'">
      <h1>Retrouvez tous vos films préférés ! </h1>

    </div>

    <div v-else>
      <router-view :key="$route.fullPath"></router-view>
    </div>


    <FooterNav />
  </div>
</template>


<script>
import HeaderNav from './components/template/HeaderNav.vue'
//import MoviesList from './components/utils/MoviesList.vue'
import FooterNav from './components/template/FooterNav.vue'


export default {
  name: 'App',
  components: {
    HeaderNav,
    //MoviesList,
    FooterNav
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
};

.home-container {
  height: 100vh !important; 
  display: flex !important; 
  flex-direction: column !important;
}

.home-container h1 {
  margin-top: 20rem;
  font-size: 52px;
}

</style>
