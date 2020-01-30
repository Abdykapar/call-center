import Vue from 'vue';
import Router from 'vue-router';
import $user from '@/_helpers/protect-route';

import HomePage from '../components/home/HomePage';
import LoginPage from '../components/login/LoginPage';
import CallHistory from '@/components/call-history/CallHistory';
import CallHistoryOutgoing from '@/components/call-history/CallHistoryOutgoing';
import CallDatabse from '@/components/call-database/CallDatabase';
import Report from '@/components/report/Report';
import ParentSubstitute from '@/components/parent-substitute/ParentSubstitute';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
            beforeEnter: (to, from, next) => {
                $user.checkOperator(next);
            },
        },
        { path: '/login', component: LoginPage },
        {
            name: 'CallHistory',
            path: '/call-history',
            component: CallHistory,
            beforeEnter: (to, from, next) => {
                $user.checkOperator(next);
            },
        },
        {
            name: 'CallHistoryOutgoing',
            path: '/call-history-outgoing',
            component: CallHistoryOutgoing,
            props: true,
            beforeEnter: (to, from, next) => {
                $user.checkOperator(next);
            },
        },
        {
            name: 'CallDatabase',
            path: '/call-data',
            component: CallDatabse,
            beforeEnter: (to, from, next) => {
                $user.checkOperator(next);
            },
        },
        {
            name: 'Report',
            path: '/report',
            component: Report,
            beforeEnter: (to, from, next) => {
                $user.checkOperator(next);
            },
        },
        {
            name: 'ParentSubstitute',
            path: '/parent-substitute',
            component: ParentSubstitute,
            beforeEnter: (to, from, next) => {
                $user.checkOperator(next);
            },
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
