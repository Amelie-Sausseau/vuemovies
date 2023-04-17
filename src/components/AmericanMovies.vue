<template>
  <div class="container">
    <h1>Films américains</h1>
    <div class="container pb-5">
      <button class="btn btn-dark m-1" @click="sortByTitle()">
        Trier par titre
      </button>
      <button class="btn btn-dark m-1" @click="sortByDate()">
        Trier par date de sortie
      </button>
      <button class="btn btn-dark m-1" v-on:click="sortByRating()">
        Trier par note
      </button>
    </div>
    <div class="row row-cols-4">
      <div class="card col" style="width: 18rem;" v-for="movie in movies" :key="movie.id">
        <img class="m-auto" v-bind:src="preUrl + movie.poster_path" alt="moviePoster" />
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
import dayjs from"dayjs";
export default {
  name: 'AmericanMovies',
  props: [
    "id",
    "title",
    "vote_average",
    "poster_path",
    "release_date"
  ],
  data() {
    return {
      movies: null,
      preUrl: "https://image.tmdb.org/t/p/original/",
      sortedByTitle: false, 
      sortedByDate: false, 
      sortedByRating: false, 
    }

  },

  created: function () {
    axios
      .get('https://api.themoviedb.org/3/discover/movie?api_key=34631a980651e8bff8493b4e3578c661&language=fr-FR&region=us&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=100')
      .then(res => {
        this.movies = res.data.results;
      })
  },

  methods: {
    formatDate(dateString) {
            const date = dayjs(dateString);
                // Then specify how you want your dates to be formatted
            return date.format('DD/MM/YYYY');
        },
    sortByTitle() {
      let sortedMovies = this.movies; // on déclare une variable qui contient les films en props
      if (!this.sortedByTitle) {
        // si les films ne sont PAS DEJA triés pas titre => tri normal par ordre alphabétique
        this.sortedByTitle = true; // on déclare le tri effectué
        sortedMovies.sort((a, b) => {
          //this.movies.sort((a, b) => {      // on effectue le tri des films stockés dans movies, avec la fonction sort()
          if (a.title < b.title) return -1; // si le titre du film a vient AVANT celui de b dans l'alphabet, on va lui donner un indice inférieur à b (-1) => il sera classé AVANT
          return a.title > b.title ? 1 : 0; // ligne 28 : équivalent d'un else if / else (opérateur ternaire)
          // si titre a > titre de b dans l'alphabet => indice 1 => a sera classé APRES b
        }); // sinon : pas de changement (titres identiques)
      } else {
        // si les films sont DEJA triés pas titre
        this.sortedByTitle = false; // on déclare le tri NON EFFECTUE (obligatoirement ici car un return va suivre)
        sortedMovies.sort((a, b) => {
          //this.movie.sort((a, b) => {  ancienne syntaxe (mutation des props encore possible)
          if (a.title > b.title) return -1;
          return a.title < b.title ? 1 : 0;
        });
      }
      
      this.$emit("sort-movies", sortedMovies); // déclenchement d'un évènement personnalisé : nom évènement + variable
      // to emit = émettre en anglais
    },
    sortByDate() {
      let sortedMovies = this.movies;
      if (!this.sortedByDate) {
        this.sortedByDate = true;
        sortedMovies.sort((a, b) => {
          if (a.release_date < b.release_date) return -1;
          return a.release_date > b.release_date ? 1 : 0;
        });
      } else {
        this.sortedByDate = false;
        sortedMovies.sort((a, b) => {
          if (a.release_date > b.release_date) return -1;
          return a.release_date < b.release_date ? 1 : 0;
        });
      }
      this.$emit("sort-movies", sortedMovies);
    },
    sortByRating() {
      let sortedMovies = this.movies;
      if (!this.sortedByRating) {
        this.sortedByRating = true;
        sortedMovies.sort((a, b) => {
          if (a.vote_average < b.vote_average) return -1;
          return a.vote_average > b.vote_average ? 1 : 0;
        });
      } else {
        this.sortedByRating = false;
        sortedMovies.sort((a, b) => {
          if (a.vote_average > b.vote_average) return -1;
          return a.vote_average < b.vote_average ? 1 : 0;
        });
      }
      this.$emit("sort-movies", sortedMovies);
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