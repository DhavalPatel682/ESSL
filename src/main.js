import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import the router
import AOS from 'aos'
import 'aos/dist/aos.css'
router.beforeEach((to, from, next) => {
    AOS.init({
        duration: 800
    }); // Initialize AOS
    next();
  });
createApp(App)
  .use(router) // Use the router in the app
  .mount('#app')
