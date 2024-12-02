import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';
import TrackExpenses from './components/TrackExpenses.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/track-expenses', component: TrackExpenses }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
