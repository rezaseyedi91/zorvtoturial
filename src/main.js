import { createApp } from 'vue'
import App from './components/App.vue'
import store from './store/index'
import router from './router/router'

//farsi int:


const myApp = createApp(App)

myApp.use(router)
myApp.use(store)

myApp.mount('#app')
