import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/global.css'
import SlideVerify from 'vue-monoplasty-slide-verify';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(ElementUI, {size: 'small'})
Vue.use(SlideVerify);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
