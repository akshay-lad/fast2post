import headerList from "@/components/fast2post/courier/courier-rate/add-courier-rate.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
import store from "@/store/index.js";
export default {
	data: () => ({
		courierRateList: [],
		searchText: "",
		showLoader: false,
		courier_rate: {
			id: 0,
			courier_id: "",
			min_weight: "",
			max_weight: "",
			rate: ""
		},
		error: "",
		backUrl: "/couriers"
	}),
	mixins: [paginationMixin],
	components: { "header-list": headerList },
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.courier_rate = {
				id: 0,
				courier_id: "",
				min_weight: "",
				max_weight: "",
				rate: ""
			};
		},
		validateCourierRate() {
			this.courier_rate.id > 0 ? this.update() : this.add();
		},
		add() {
			let _vm = this;
			_vm.courier_rate.courier_id = this.$route.params.id;
			this.axios
				.post("/couriers-rate", this.courier_rate)
				.then(function() {
					_vm.resetForm();
					_vm.getAll();
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		update() {
			let _vm = this;
			this.axios
				.post("/couriers-rate/" + this.courier_rate.id, {
					...this.courier_rate,
					_method: "PATCH"
				})
				.then(function(response) {
					_vm.resetForm();
					_vm.courier_rate = response.data.data;
					_vm.getAll();
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getDetail(id) {
			let _vm = this;
			store.state.isLoaderShow = true;
			this.axios
				.get("/couriers-rate/" + id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.courier_rate = response.data.data;
					$("html, body").animate({ scrollTop: 0 }, 300);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		deleteRecord(id) {
			let _vm = this;
			this.$dialog
				.confirm("Are you sure you want to delete this record?")
				.then(function() {
					_vm.axios
						.delete("/couriers-rate/" + id)
						.then(function() {
							_vm.resetForm();
							_vm.getAll();
						})
						.catch(function(error) {
							console.log(error);
						});
				})
				.catch(function(error) {
					console.log("Clicked on cancel", error);
				});
		},
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
		getAll() {
			let _vm = this;
			store.state.isLoaderShow = true;
			this.axios
				.get("/couriers/" + this.$route.params.id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.courierRateList = response.data.data.couriers_rates;
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	mounted() {
		this.getAll();
	}
};
