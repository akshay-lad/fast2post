import headerList from "@/components/common/header-list.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
export default {
	data: () => ({
		courierList: [],
		error: "",
		searchText: "",
		showLoader: false
	}),
	mixins: [paginationMixin],
	components: { "header-list": headerList },
	methods: {
		deleteRecord(id) {
			let _vm = this;
			this.$dialog
				.confirm("Are you sure you want to delete this record?")
				.then(function() {
					_vm.axios
						.delete("/couriers/" + id)
						.then(function() {
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
		updateCourierStatus(courier, event) {
			let _vm = this;
			let _msg =
			courier.deleted_at
					? "Are you sure you want to active this courier?"
					: "Are you sure you want to deactive this courier?";
			let status = courier.deleted_at? 'activate' : 'deactivate';
			this.$dialog
				.confirm(_msg)
				.then(function() {
					_vm.axios
						.post(
							"/courier-change-status/" +
							courier.id +
								"/" +
								status
						)
						.then(function() {
							_vm.getAll();
						})
						.catch(function(error) {
							console.log(error);
						});
				})
				.catch(function(error) {
					event.target.checked = !courier.deleted_at;
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
			let queryString = this.getQueryString();
			_vm.showLoader = true;
			this.axios
				.get("/couriers" + queryString)
				.then(function(response) {
					_vm.showLoader = false;
					_vm.courierList = response.data.data.data;
					_vm.paginate.page_count = _vm.getPageCount(
						response.data.data.total_record,
						_vm.paginate.per_page
					);
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
