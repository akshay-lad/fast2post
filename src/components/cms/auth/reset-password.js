export default {
	data: () => ({
		login: {
			user_name: "",
			password: "",
			confirmpassword: ""
		},
		error: ""
	}),
	methods: {
		validateResetPassword() {
			let queryString = window.location.search;
			if(queryString.length>0)
				this.login.user_name = decodeURIComponent(JSON.parse('{"' + decodeURI(queryString.substring(1,queryString.length)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')["email"]);
			this.axios
				.post("users/reset-password", {
					email: this.login.user_name,
					new_password: this.login.password,
					confirm_password: this.login.confirmpassword,
					token: this.$route.params.token
				})
				.then(function() {
					// localStorage.setItem(
					// 	process.env.VUE_APP_TOKEN_NAME,
					// 	response.data.data.token
					// );
					window.location.href = "/";
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
};
