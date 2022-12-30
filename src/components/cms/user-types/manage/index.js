import store from "@/store/index.js";
export default {
	data: () => ({
		userType: {
			id: 0,
			userType: ""
		},
		backUrl: "/user-types"
	}),
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.userType = {
				id: 0,
				userType: ""
			};
		},
		validateUserType() {
			this.userType.id > 0 ? this.update() : this.add();
		},
		update() {
			let _vm = this;
			this.axios
				.post("/user-types/" + this.userType.id, {
					...this.userType,
					_method: "PATCH"
				})
				.then(function(response) {
					_vm.userType = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		add() {
			let _vm = this;
			this.axios
				.post("/user-types", this.userType)
				.then(function() {
					_vm.$router.push(_vm.backUrl);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getDetail() {
			let _vm = this;
			store.state.isLoaderShow = true;
			this.axios
				.get("/user-types/" + this.$route.params.id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.userType = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	mounted() {
		if (this.$route.params.id > 0) {
			this.getDetail();
		}
	}
};
