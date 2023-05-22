import {createApp, markRaw} from 'vue'
import { createPinia} from "pinia";
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import HeaderApp from "@/components/HeaderApp.vue";
import SidebarHome from "@/components/SidebarHome.vue";
import router from "./router";
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
	broadcaster: 'pusher',
	key: '0ef8d31fe818b7949d4b',
	cluster: 'eu',
	encrypted: true,
});

const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPluginPersistedstate)
pinia.use(({ store }) => {
	store.router = markRaw(router)
})

app.component('header-app', HeaderApp)
app.component('sidebar-home', SidebarHome)
app.use(pinia)
app.use(router)
app.mount('#app')
