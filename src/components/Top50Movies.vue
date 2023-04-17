<template>
    <div class="container">
        <h1>Top 50</h1>
        <div v-if="loading">
            <p>Chargement en cours</p>
        </div>
        <div v-else>
            <Top50MoviesList v-bind:topMoviesList="topMoviesList" />
        </div>
    </div>
</template>


<script>
import axios from "axios";
import Top50MoviesList from "./utils/Top50MoviesList.vue";
export default {
    name: 'Top50Movies',
    components: {
        Top50MoviesList
    },
    data() {
        return {
            topMoviesList: null,
            preUrl: "https://image.tmdb.org/t/p/original/",
            loading: true,
            sortedByTitle: false,
            sortedByDate: false,
            sortedByRating: false,
        }
    },
    created: function () {
        axios
            .get('https://api.themoviedb.org/3/discover/movie?api_key=34631a980651e8bff8493b4e3578c661&language=fr-FR&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&&vote_count.gte=10000')
            .then(res => {
                let topMovies = res.data.results
                axios
                    .get('https://api.themoviedb.org/3/discover/movie?api_key=34631a980651e8bff8493b4e3578c661&language=fr-FR&sort_by=vote_average.desc&include_adult=false&include_video=false&page=2&&vote_count.gte=10000')
                    .then(res => {
                        let topMovies2 = topMovies.concat(res.data.results)
                        axios
                            .get('https://api.themoviedb.org/3/discover/movie?api_key=34631a980651e8bff8493b4e3578c661&language=fr-FR&sort_by=vote_average.desc&include_adult=false&include_video=false&page=3&&vote_count.gte=10000')
                            .then(res => {
                                let topMoviesList = topMovies2.concat(res.data.results)
                                topMoviesList.splice(50, 10)
                                this.topMoviesList=topMoviesList
                                this.loading = false
                                console.log(topMoviesList)
                            })
                    })
            })
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