<template>
        <div class="row row-cols-4">
            <div class="card col" style="width: 18rem;" v-for="movie in movies" :key="movie.id">
            <OneMovie
              :id="movie.id"
              :title="movie.title"
              :poster_path="movie.poster_path"
              :release_date="movie.release_date"
              :vote_average="movie.vote_average"
            />
            </div>
        </div>
</template>

<script>
import OneMovie from "./OneMovie.vue";
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
};
</script>