import App from './App.vue'
import AmericanMovies from './components/AmericanMovies.vue'
import Top50Movies from './components/Top50Movies.vue'
import LastMovies from './components/LastMovies.vue'
import FrenchMovies from './components/FrenchMovies.vue'
import MovieDetails from './components/MovieDetails.vue'
import SearchMovies from './components/SearchMovies.vue'
import { createWebHistory } from 'vue-router';
import { createRouter } from 'vue-router';

const routes = [   
  {
    path: '/', 
    component: App 
  },
  {
    path: '/americanMovies', 
    component: AmericanMovies
  },
  {
    path: '/top50Movies', 
    component: Top50Movies
  },
  {
    path: '/LastMovies', 
    component: LastMovies
  },
  {
    path: '/frenchMovies', 
    component: FrenchMovies
  },
  {
    path: '/movieDetails/:id', 
    component: MovieDetails,
  },
  {
    path: '/searchMovies', 
    component: SearchMovies
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;

