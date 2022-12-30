import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		theme: localStorage.getItem("theme")
			? localStorage.getItem("theme")
			: "light",
		menuList: [],
		userDetail: {},
		isOpenSideBar: true,
		isLoaderShow: false,
		isMobileDevice: false,
		isOpenAccountDropDown: false
	},
	mutations: {
		setMenu(state, data) {
			state.menuList = data;
		},
		setUserDetail(state, data) {
			state.userDetail = data;
		}
	},
	actions: {},
	modules: {}
});
