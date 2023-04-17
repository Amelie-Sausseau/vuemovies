<template>
  <div class="container">
    <h1>Rechercher un film</h1>
    <form class="d-flex" style="display: flex; justify-content: center;">
      <input class="form-control me-2" type="text" v-model="query" @keyup="getResult(query)" placeholder="Rechercher"
         style="max-width: 50%; margin: 2rem;">
      <SortButtons :movies="movies" @sort-movies="sortMovies" />
    </form>
    <div class="row row-cols-4">
      <div class="card col" style="width: 18rem;" v-for="movie in movies" :key="movie.id">
        <img class="m-auto" v-bind:src="preUrl + movie.poster_path" :alt="movie.title"  />
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text">Date de sortie : {{ formatDate(movie.release_date) }}</p>
          <p class="card-text">Note moyenne : {{ movie.vote_average }} /10</p>
          <router-link :to="`/movieDetails/${movie.id}`" class="btn btn-dark">Voir le détail</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
export default {
  name: 'SearchMovies',
  props: [
    "id",
    "title",
    "vote_average",
    "poster_path",
    "release_date"
  ],
  data() {
    return {
      query: "",
      preUrl: "https://image.tmdb.org/t/p/original/",
      movies: [],
    };

  },
  methods: {
    formatDate(dateString) {
            const date = dayjs(dateString);
                // Then specify how you want your dates to be formatted
            return date.format('DD/MM/YYYY');
        },
    sortMovies(movies) {
      this.movies = movies;
    },
    getResult(query) {
      axios
        .get(
          "https://api.themoviedb.org/3/search/movie?api_key=34631a980651e8bff8493b4e3578c661&language=fr-FR&include_adult=false&query=" +
          query
        )
        .then((response) => {
          this.movies = response.data.results;
        });
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 3rem;
}

.card {
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.container {
  padding-top: 1rem;
}

.row {
  margin: 3rem auto 5rem auto;
  justify-content: center;
}

.m-auto {
  max-width: 100%;
}
</style>