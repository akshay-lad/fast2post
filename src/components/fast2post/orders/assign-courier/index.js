import { paginationMixin } from "@/mixins/paginationMixin";
import store from "@/store/index.js";
export default {
	data: () => ({
		courierList: [],
		searchText: "",
		error: "",
		backUrl: "/orders/processing",
		orderWeightParam: {
			orderWeight: 0
		},
		courierAssignParam: {
			courier_id: 0,
			courier_charges: 0
		},
		insuranceCharge: 0,
		serviceCharge: 0
	}),
	mixins: [paginationMixin],
	computed: {
		isTheme() {
			return this.$store.state.theme === "light" ? false : true;
		}
	},
	methods: {
		getNextPage(page) {
			this.$refs.paginate.selected = page;
			this.paginate.current_page = page;
			this.getAll();
		},
		search(value) {
			this.searchText = value;
			this.getAll();
		},
		getQueryString() {
			let queryString = "?page=" + this.paginate.current_page;
			queryString +=
				this.searchText.length > 0 ? "&search=" + this.searchText : "";
			return queryString;
		},
		getCourierList() {
			let _vm = this;
			store.state.isLoaderShow = true;
			this.axios
				.get("/orders-get-courier-rates/" + this.$route.params.id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.courierList = response.data.data.courier_rates;
					_vm.insuranceCharge = response.data.data.insurance_charge;
					_vm.serviceCharge = parseFloat(
						response.data.data.service_charge
					).toFixed(2);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		assignCourier(courier) {
			let _vm = this;
			_vm.courierAssignParam.courier_id = courier.courier_id;
			_vm.courierAssignParam.courier_charges =
				courier.couriers_rates_charge;
			store.state.isLoaderShow = true;
			this.axios
				.post(
					"/orders-assign-courier/" + this.$route.params.id,
					_vm.courierAssignParam
				)
				.then(function(response) {
					store.state.isLoaderShow = false;
					
					if(response.data.data.payment_page){
						window.location.href = response.data.data.payment_page;
					}else{
						_vm.$router.push(_vm.backUrl);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	mounted() {
		this.getCourierList();
	}
};
