import store from "@/store/index.js";
export default {
	data: () => ({
		city: {
			id: 0,
			country_id: "",
			state_id: "",
			name: "",
			code: ""
		},
		countryList: [],
		stateList: [],
		backUrl: "/cities"
	}),
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.city = {
				id: 0,
				country_id: "",
				state_id: "",
				name: "",
				code: ""
			};
		},
		validateCity() {
			this.city.id > 0 ? this.update() : this.add();
		},
		update() {
			let _vm = this;
			this.axios
				.post("/cities/" + this.city.id, {
					...this.city,
					_method: "PATCH"
				})
				.then(function(response) {
					_vm.city = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		add() {
			let _vm = this;
			this.axios
				.post("/cities", this.city)
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
				.get("/cities/" + this.$route.params.id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.city = response.data.data;
					_vm.getStateByCountry(_vm.city.country_id);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getStateByCountry(countryId) {
			let _vm = this;
			if (!(countryId && countryId > 0)) {
				_vm.stateList = [];
				return;
			}
			_vm.$store.state.isLoaderShow = true;
			this.axios
				.get("/state-list-by-country/" + countryId)
				.then(function(response) {
					_vm.stateList = response.data.data;
					_vm.$store.state.isLoaderShow = false;
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
