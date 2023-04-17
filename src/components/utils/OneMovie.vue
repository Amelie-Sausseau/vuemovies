<template>
    <img class="m-auto" v-bind:src="preUrl + movie.poster_path" alt="moviePoster" />
    <div class="card-body">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-text">Année de sortie : {{ movie.release_date }}</p>
        <p class="card-text">Note moyenne : {{ movie.vote_average }} /10</p>
        <router-link :to="`/movieDetails/${movie.id}`" class="btn btn-dark">Voir le détail</router-link>
    </div>
</template>

<script>
export default {
  name: "OneMovie",
  props: [
    "id",
    "title",
    "poster_path",
    "release_date",
    "vote_average",
  ],
  data() {
    return {
      preUrl: "https://image.tmdb.org/t/p/original/",
    };
  },
};
</script>