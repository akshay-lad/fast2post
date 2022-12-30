export default {
	data: () => ({
		login: {
			user_name: ""
		},
		error: ""
	}),
	methods: {
		validateForgotPassword() {
			this.sendLink();
		},
		sendLink() {
			let _vm = this;
			this.axios
				.post("users/forgot-password", {
					email:_vm.login.user_name,
				})
				.then(function(response) {
					_vm.login = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
	}
};
