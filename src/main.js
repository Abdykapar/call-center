// Import Vue
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueMaterial from 'vue-material';
import Antd from 'ant-design-vue';
import Toaster from 'v-toaster';
import { store } from './_store';
import { router } from './_helpers';
import Lang from 'vuejs-localization';

import 'ant-design-vue/dist/antd.css';
import '../node_modules/v-toaster/dist/v-toaster.css';
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'


import App from './App';

Lang.requireAll(require.context('./lang', true, /\.js$/));

Vue.use(VeeValidate);
Vue.use(Antd);
Vue.use(Toaster);
Vue.use(VueMaterial);
Vue.use(Lang);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
