// Import Vue
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Toaster from 'v-toaster';
import '../node_modules/v-toaster/dist/v-toaster.css';
import { store } from './_store';
import { router } from './_helpers';

import App from './App';

Vue.use(VeeValidate);
Vue.use(Antd);
Vue.use(Toaster);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
