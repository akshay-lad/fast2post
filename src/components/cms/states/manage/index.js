import store from "@/store/index.js";
export default {
	data: () => ({
		state: {
			id: 0,
			country_id: "",
			code: "",
			name: ""
		},
		countryList: [],
		backUrl: "/states"
	}),
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.state = {
				id: 0,
				country_id: "",
				code: "",
				name: ""
			};
		},
		validateState() {
			this.state.id > 0 ? this.update() : this.add();
		},
		update() {
			let _vm = this;
			this.axios
				.post("/states/" + this.state.id, {
					...this.state,
					_method: "PATCH"
				})
				.then(function(response) {
					_vm.state = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		add() {
			let _vm = this;
			this.axios
				.post("/states", this.state)
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
				.get("/states/" + this.$route.params.id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.state = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getCountries() {
			let _vm = this;
			this.axios
				.get("/country-list")
				.then(function(response) {
					_vm.countryList = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	mounted() {
		this.getCountries();
		if (this.$route.params.id > 0) {
			this.getDetail();
		}
	}
};
