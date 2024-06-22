import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import store from "./store";
import App from './App.vue';
import router from './router';



createApp(App).use(store).use(router).mount("#app");




