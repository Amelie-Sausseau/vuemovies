<template>
    <div class="container">
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
            <div class="card col" style="width: 18rem;" v-for="movie in topMoviesList" :key="movie.id">
                <img class="m-auto" v-bind:src="preUrl + movie.poster_path" alt="moviePoster" />
                <div class="card-body">
                    <h5 class="card-title">{{ movie.title }}</h5>
                    <p class="card-text">Année de sortie : {{ movie.release_date }}</p>
                    <p class="card-text">Note moyenne : {{ movie.vote_average }} /10</p>
                    <router-link :to="`/movieDetails/${movie.id}`" class="btn btn-dark">Voir le détail</router-link>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Top50MoviesList',
    props: [
        "topMoviesList"
    ],
    data() {
        return {
            preUrl: "https://image.tmdb.org/t/p/original/",
            sortedByTitle: false,
            sortedByDate: false,
            sortedByRating: false,
        }
    },
    methods: {
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