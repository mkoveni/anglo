import Vue  from 'vue'


Vue.component('hello', require('./components/html/hello.vue.html'))
Vue.component('layers', require('./components/html/layers.vue.html'))

new Vue({
    el : '#app'
});