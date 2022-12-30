import store from "@/store/index.js";
export default {
	data: () => ({
		user: {
			email: "",			
			firstname:"",
			lastname:"",
			contact_no:"",
			password: "",
			c_password: ""
		}
	}),
	props: {
		source: String
	},
	methods: {
		validateUser() {
			store.state.isLoaderShow = true;
			this.axios
				.post("/users/client-registration", this.user)
				.then(function() {
					store.state.isLoaderShow = false;
					window.location.href = "/";
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
};
