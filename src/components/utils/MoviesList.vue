<template>
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
            <OneMovie :id="movie.id" :title="movie.title" :poster_path="movie.poster_path"
                :release_date="movie.release_date" :vote_average="movie.vote_average" />
        </div>
    </div>
</template>

<script>
import OneMovie from "./OneMovie.vue";
import dayjs from "dayjs";
export default {
    name: "MoviesList",

    component: {
        OneMovie
    },

    props: [
        "movies",
        "loading",
        "error"
    ],
    methods: {
        formatDate(dateString) {
            const date = dayjs(dateString);
            // Then specify how you want your dates to be formatted
            return date.format('DD/MM/YYYY');
        },
        sortByTitle() {
            let sortedMovies = this.movies;
            if (!this.sortedByTitle) {
                this.sortedByTitle = true;
                sortedMovies.sort((a, b) => {
                    if (a.title < b.title) return -1;
                    return a.title > b.title ? 1 : 0;
                });
            } else {
                this.sortedByTitle = false;
                sortedMovies.sort((a, b) => {
                    if (a.title > b.title) return -1;
                    return a.title < b.title ? 1 : 0;
                });
            }

            this.$emit("sort-movies", sortedMovies);
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