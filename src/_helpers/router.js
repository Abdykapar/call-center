import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../components/home/HomePage';
import LoginPage from '../components/login/LoginPage';
import CallHistory from '@/components/call-history/CallHistory';
import CallHistoryOutgoing from '@/components/call-history/CallHistoryOutgoing';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: HomePage },
        { path: '/login', component: LoginPage },
        {
            name: 'CallHistory',
            path: '/call-history',
            component: CallHistory
        },
        {
            name: 'CallHistoryOutgoing',
            path: '/call-history-outgoing',
            component: CallHistoryOutgoing
        },
        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = [ '/login', '/register' ];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});