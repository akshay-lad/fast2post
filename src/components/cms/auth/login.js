export default {
	data: () => ({
		user: {},
		login: {
			user_name: "",
			password: ""
		},
	}),
	props: {
		source: String
	},
	methods: {
		validateUser() {
			this.axios
				.post("/login", {
					email: this.login.user_name,
					password: this.login.password
				})
				.then(function(response) {
					localStorage.setItem(
						process.env.VUE_APP_TOKEN_NAME,
						response.data.data.token
					);
					localStorage.setItem(
						process.env.VUE_APP_USER_TYPE,
						response.data.data.user.usertype_name
					);
					localStorage.setItem(
						process.env.VUE_APP_USER_ACTIVE,
						response.data.data.user.isActive
					);
					localStorage.setItem(
						process.env.VUE_APP_USER_ID,
						response.data.data.user.id
					);
					if (
						!response.data.data.user.isVerify &&
						response.data.data.user.usertype_name == "client"
					) {
						window.location.href =
							"/client-profile/" + response.data.data.user.id;
					}else{
					window.location.href = "/dashboard";
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
};
