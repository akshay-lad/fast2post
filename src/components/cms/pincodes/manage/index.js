import store from "@/store/index.js";
export default {
	data: () => ({
		pincode: {
			id: 0,
			country_id: "",
			state_id: "",
			city_id: "",
			pincode: ""
		},
		countryList: [],
		stateList: [],
		cityList: [],
		backUrl: "/pincodes"
	}),
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.pincode = {
				id: 0,
				country_id: "",
				state_id: "",
				city_id: "",
				pincode: ""
			};
		},
		validateUserType() {
			this.pincode.id > 0 ? this.update() : this.add();
		},
		update() {
			let _vm = this;
			this.axios
				.post("/pincodes/" + this.pincode.id, {
					...this.pincode,
					_method: "PATCH"
				})
				.then(function(response) {
					_vm.pincode = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		add() {
			let _vm = this;
			this.axios
				.post("/pincodes", this.pincode)
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
				.get("/pincodes/" + this.$route.params.id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.pincode = response.data.data;
					_vm.getStateByCountry(_vm.pincode.country_id);
					_vm.getCityByState(_vm.pincode.state_id);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getCityByState(stateId) {
			let _vm = this;
			if (!(stateId && stateId > 0)) {
				_vm.cityList = [];
				return;
			}
			_vm.$store.state.isLoaderShow = true;
			this.axios
				.get("/city-list-by-state/" + stateId)
				.then(function(response) {
					_vm.cityList = response.data.data;
					_vm.$store.state.isLoaderShow = false;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getStateByCountry(countryId) {
			let _vm = this;
			if (!(countryId && countryId > 0)) {
				_vm.cityList = [];
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
