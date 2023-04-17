<template>
    <div class="container">
        <h1>{{ movie ? movie.title : '' }}</h1>
        <p class="card-text">"{{ movie.tagline }}"</p>
        <div class="row align-items-start">
            <div class="col">
                <img class="m-auto" v-bind:src="preUrl + movie.poster_path" alt="moviePoster" />
            </div>
            <div class="col">
                <div style="display: flex; justify-content: center; gap: 5%; margin: 2rem;">
                    <div v-for="genre in movie.genres" :key="genre.id"><span class="badge rounded-pill bg-secondary">{{
                        genre.name }}</span></div>
                </div>
                <p class="card-text"> {{ movie.overview }}</p>
                <div class="row">
                    <p class="card-text">Date de sortie : {{ formatDate(movie.release_date) }}</p>
                    <p class="card-text">Note moyenne : {{ movie.vote_average }} /10</p>
                    <p class="card-text">Titre original : {{ movie.original_title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
<script>
import axios from "axios";
import dayjs from 'dayjs';
export default {
    name: "MovieDetails",
    data() {
        return {
            id: this.$route.params.id,
            preUrl: "https://image.tmdb.org/t/p/original/",
            loading: true,
            errored: false,
            movie: {
                title: '',
                release_date: '',
                vote_average: '',
                poster_path: '',
            }
        };
    },
    methods: {
        formatDate(dateString) {
            const date = dayjs(dateString);
                // Then specify how you want your dates to be formatted
            return date.format('DD/MM/YYYY');
        },
        getMovie(component) {
            axios
                .get(
                    "https://api.themoviedb.org/3/movie/" + component.id + "?api_key=34631a980651e8bff8493b4e3578c661&language=fr"
                )
                .then(function (response) {
                    component.loading = false;
                    component.movie = response.data;
                })
                .catch(function () {
                    component.errored = true;
                });
        },
    },
    created() {
        this.getMovie(this);
        console.log(this.$route.params.id);
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