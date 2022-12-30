import headerList from "@/components/fast2post/courier/courier-rate/add-courier-rate.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
import store from "@/store/index.js";
export default {
	data: () => ({
		serviceChargeList: [],
		searchText: "",
		showLoader: false,
		serviceCharge: {
			id: 0,
			maintainance_charge: "",
			insurance: ""
		},
		error: ""
	}),
	mixins: [paginationMixin],
	components: { "header-list": headerList },
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.serviceCharge = {
				id: 0,
				maintainance_charge: "",
				insurance: ""
			};
		},
		validateServiceCharge() {
			this.serviceCharge.id > 0 ? this.update() : this.add();
		},
		add() {
			let _vm = this;
			this.axios
				.post("/service-charge", this.serviceCharge)
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
				.post("/service-charge/" + this.serviceCharge.id, {
					...this.serviceCharge,
					_method: "PATCH"
				})
				.then(function() {
					_vm.resetForm();
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
		deleteRecord(id) {
			let _vm = this;
			this.$dialog
				.confirm("Are you sure you want to delete this record?")
				.then(function() {
					_vm.axios
						.delete("/service-charge/" + id)
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
			let queryString = this.getQueryString();
			this.axios
				.get("/service-charge" + queryString)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.serviceChargeList = response.data.data.data;
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
