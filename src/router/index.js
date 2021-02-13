import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';

Vue.use(Router);

export const Routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        icon: "home",
        title: "Home Page",
        super: false
    }
];


export default new Router({
    routes: Routes
});
