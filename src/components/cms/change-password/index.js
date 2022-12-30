export default {
	data: () => ({
		user: {
			current_password: "",
			new_password: "",
			confirm_password: ""
		},
		error: ""
	}),
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.user = {
				current_password: "",
				new_password: "",
				confirm_password: ""
			};
		},
		update() {
			let _vm = this;
			this.axios
				.post("/users/change-password", this.user)
				.then(function() {
					_vm.resetForm();
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	mounted() {}
};
