import axios from "axios";
import store from "./store";
import { ALERT_CLASS, FADE_IN, DELAY, FADE_OUT } from "@/constants";
import router from "@/router/index";
let HTTP = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	headers: {
		"Content-Type": "application/json"
		//Authorization: "Bearer " + localStorage.getItem(common.token.name),
	}
});
HTTP.interceptors.request.use(
	function(config) {
		config.headers.authorization =
			"Bearer " + localStorage.getItem(process.env.VUE_APP_TOKEN_NAME);
		if (config.method != "get" && !store.state.isLoaderShow) {
			store.state.isLoaderShow = true;
		}
		return config;
	},
	function(error) {
		Promise.reject(error);
	}
);

HTTP.interceptors.response.use(
	function(response) {
		store.state.isLoaderShow = false;
		if (response.config.method != "get") {
			let alert_message = response.data.msg;
			$(".alert").removeClass(ALERT_CLASS.danger);
			$(".alert")
				.html(alert_message)
				.addClass(ALERT_CLASS.success)
				.fadeIn(FADE_IN)
				.delay(DELAY)
				.fadeOut(FADE_OUT);
		}
		return response;
	},
	function(error) {
		console.log(error);
		store.state.isLoaderShow = false;
		$(".alert").removeClass(ALERT_CLASS.success);
		switch (error.response.status) {
			case 401: {
				$(".alert")
					.html(
						error.response.data.error +
							": " +
							error.response.data.message
					)
					.addClass(ALERT_CLASS.danger)
					.fadeIn(FADE_IN)
					.delay(DELAY)
					.fadeOut(FADE_OUT);
				localStorage.removeItem(process.env.VUE_APP_TOKEN_NAME);
				window.location.href = "/";
				break;
			}
			case 422: {
				let data = error.response.data;
				let alert_message = "<ul>";
				for (var k in data) {
					alert_message += "<li>" + data[k][0] + "</li>";
				}
				alert_message += "</ul>";
				$(".alert")
					.html(alert_message)
					.addClass(ALERT_CLASS.danger)
					.fadeIn(FADE_IN)
					.delay(DELAY)
					.fadeOut(FADE_OUT);
				break;
			}
			case 403: {
				router.replace("/restricted-access");
				break;
			}
		}
		return Promise.reject(error);
	}
);
export default HTTP;
