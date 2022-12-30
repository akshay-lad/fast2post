import headerList from "@/components/common/header-list.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
export default {
	data: () => ({
		pageList: [],
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
						.delete("/pages/" + id)
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
		getNextPage(page) {
			this.$refs.paginate.selected = page;
			this.paginate.current_page = page;
			this.getAll();
		},
		updatePageStatus(page, event) {
			let _vm = this;
			let _msg =
				page.is_active == true
					? "Are you sure you want to active this page?"
					: "Are you sure you want to deactive this page?";
			let _isActive = page.is_active == true ? 1 : 0;
			this.$dialog
				.confirm(_msg)
				.then(function() {
					_vm.axios
						.post(
							"/pages/change-status?id=" +
								page.id +
								"&is_active=" +
								_isActive
						)
						.then(function() {
							_vm.getAll();
						})
						.catch(function(error) {
							console.log(error);
						});
				})
				.catch(function(error) {
					event.target.checked = !page.is_active;
					console.log("Clicked on cancel", error);
				});
		},
		search(value) {
			this.searchText = value;
			this.getAll();
		},
		getQueryString() {
			let queryString =
				"?type=client&page=" + this.paginate.current_page;
			queryString +=
				this.searchText.length > 0 ? "&search=" + this.searchText : "";
			return queryString;
		},
		getAll() {
			let _vm = this;
			let queryString = this.getQueryString();
			_vm.showLoader = true;
			this.axios
				.get("/pages" + queryString)
				.then(function(response) {
					_vm.showLoader = false;
					_vm.pageList = response.data.data.data;
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
