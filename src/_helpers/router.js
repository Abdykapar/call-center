import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../components/home/HomePage'
import LoginPage from '../components/login/LoginPage'
import RegisterPage from '../components/register/RegisterPage'
import Country from '../components/location/country/Country';
import CountryCreate from "../components/location/country/CountryCreate";
import CountryEdit from "../components/location/country/CountryEdit";

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/location/country', component: Country },
    { path: '/location/country/create', component: CountryCreate },
    { name:"countryEdit", path: '/location/country/edit/:id', component: CountryEdit },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})