import Vue from 'vue';
Vue.component('layers', require('./components/html/layers.vue.html'));
Vue.component('graphs', require('./components/html/graphs.vue.html'));
Vue.component('employment', require('./components/html/employment.vue.html'));
Vue.component('gender', require('./components/html/gender.vue.html'));
Vue.component('income', require('./components/html/income.vue.html'));
Vue.component('asset', require('./components/html/asset.vue.html'));
Vue.component('house', require('./components/html/house.vue.html'));
Vue.component('household', require('./components/html/household.vue.html'));
Vue.component('population', require('./components/html/population.vue.html'));
new Vue({
    el: '#app'
});
//# sourceMappingURL=app.js.map