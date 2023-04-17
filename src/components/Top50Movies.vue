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