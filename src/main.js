import Vue from 'vue';
import router from './router';
import VueMaterial from 'vue-material';
import axios from 'axios';


Vue.use(VueMaterial);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;


new Vue({
    el: '#app',
    router,
    data() {
        return {
        };
    },
    methods: {
    },
    watch: {
    },
    mounted: function () {
        this.ApplicationStarted();
    }
});
