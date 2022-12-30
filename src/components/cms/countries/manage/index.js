import store from "@/store/index.js";
export default {
	data: () => ({
		country: {
			id: 0,
			name: "",
			code: ""
		},
		backUrl: "/countries"
	}),
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.country = {
				id: 0,
				name: "",
				code: ""
			};
		},
		validateCountry() {
			this.country.id > 0 ? this.update() : this.add();
		},
		update() {
			let _vm = this;
			this.axios
				.post("/countries/" + this.country.id, {
					...this.country,
					_method: "PATCH"
				})
				.then(function(response) {
					_vm.country = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		add() {
			let _vm = this;
			this.axios
				.post("/countries", this.country)
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
				.get("/countries/" + this.$route.params.id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.country = response.data.data;
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
