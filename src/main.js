import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import axios from "./axios-auth";
import VueAxios from "vue-axios";
require("dotenv").config();
Vue.config.productionTip = false;
require("./plugins/vee-validate");

Vue.use(VueAxios, axios);
import VuejsDialog from "vuejs-dialog";

// include the default style
import "vuejs-dialog/dist/vuejs-dialog.min.css";
Vue.use(VuejsDialog, {
	html: true,
	okText: "Ok",
	cancelText: "Cancel",
	animation: "bounce"
});

import Paginate from "vuejs-paginate";
Vue.component("paginate", Paginate);
import "./assets/scss/main.scss";
export const eventBus = new Vue();
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
