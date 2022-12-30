import headerList from "@/components/fast2post/courier/courier-rate/add-courier-rate.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
import store from "@/store/index.js";
export default {
	data: () => ({
		pincodeList: [],
		countryList: [],
		stateList: [],
		cityList: [],
		deliveryBoyList: [],
		searchText: "",
		showLoader: false,
		deliveryPincode: {
			id: 0,
			country_id: "",
			state_id: "",
			city_id: ""
		},
		error: ""
	}),
	mixins: [paginationMixin],
	components: { "header-list": headerList },
	methods: {
		getDetail(id) {
			let _vm = this;
			store.state.isLoaderShow = true;
			this.axios
				.get("/service-charge/" + id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.serviceCharge = response.data.data;
					$("html, body").animate({ scrollTop: 0 }, 300);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getNextPage(page) {
			this.$refs.paginate.selected = page;
			this.paginate.current_page = page;
			this.getPincodeByCity();
		},
		search(value) {
			this.searchText = value;
			this.getPincodeByCity();
		},
		getQueryString() {
			let queryString = "?page=" + this.paginate.current_page;
			queryString +=
				this.searchText.length > 0 ? "&search=" + this.searchText : "";
			return queryString;
		},

		getPincodeByCity() {
			let _vm = this;
			if (
				!(
					this.deliveryPincode.city_id &&
					this.deliveryPincode.city_id > 0
				)
			) {
				_vm.pincodeList = [];
				return;
			}
			_vm.$store.state.isLoaderShow = true;
			let queryString = this.getQueryString();
			this.axios
				.get(
					"/pincodes-with-deliveryboy/" +
						this.deliveryPincode.city_id +
						queryString
				)
				.then(function(response) {
					_vm.pincodeList = response.data.data.data;
					if(_vm.pincodeList && _vm.pincodeList.length>0){
						_vm.pincodeList.forEach(element => {
							if(element.deliveryboy_pincode){
								element.deliveryboy_id=element.deliveryboy_pincode.deliveryboy_id;
							}
						});
					}
					_vm.paginate.page_count = _vm.getPageCount(
						response.data.data.total_record,
						_vm.paginate.per_page
					);
					_vm.$store.state.isLoaderShow = false;
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
			this.$store.state.isLoaderShow = true;
			if (!(countryId && countryId > 0)) {
				_vm.cityList = [];
				_vm.stateList = [];
				return;
			}
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
		},
		getDeliveryBoys() {
			let _vm = this;
			this.axios
				.get("/users/getusersbytype?type=deliveryboy")
				.then(function(response) {
					_vm.deliveryBoyList = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		assignDeliveryBoy(pincode_id, deliveryboy_id) {
			let _vm = this;
			this.axios
				.post("/deliveryboy-pincode", {
					pincode_id: pincode_id,
					deliveryboy_id: deliveryboy_id
				})
				.then(function() {
					_vm.getPincodeByCity();
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		updateDeliveryBoy(id,pincode_id, deliveryboy_id) {
			let _vm = this;
			this.axios
				.patch("/deliveryboy-pincode/"+id, {
					id: id,
					pincode_id: pincode_id,
					deliveryboy_id: deliveryboy_id
				})
				.then(function() {
					_vm.getPincodeByCity();
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	mounted() {
		this.getCountries();
		this.getDeliveryBoys();
	}
};
