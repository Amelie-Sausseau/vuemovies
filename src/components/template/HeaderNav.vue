<template>
<nav class="navbar bg-dark navbar-expand-lg fixed-top bg-body-tertiary" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand text-white h4" href="#">VueMovies</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link text-white h4" aria-current="page" to="/">Accueil</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white h4" to="/frenchMovies">Films français</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white h4" to="/americanMovies">Films américains</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white h4" to="/top50Movies">Top 50</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white h4" to="/lastMovies">Sorties 2023</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white h4" to="/searchMovies">Rechercher un film</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<script>
export default {
  name: 'HeaderNav',
  props: {
    msg: String
  }
}
</script>