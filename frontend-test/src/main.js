import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import store from "./store";
import App from './App.vue';
import router from './router';



createApp(App).use(store).use(router).mount("#app");



if (process.env.NODE_ENV === 'production') {
    Vue.config.devtools = false;
    Vue.config.productionTip = false;
}

