import headerList from "@/components/common/header-list.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
export default {
	data: () => ({
		userList: [],
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
						.delete("/users/" + id)
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
		updateUserStatus(user, event) {
			let _vm = this;
			let _msg =
				user.isActive == true
					? "Are you sure you want to active this user?"
					: "Are you sure you want to deactive this user?";
			let _isActive = user.isActive == true ? 1 : 0;
			this.$dialog
				.confirm(_msg)
				.then(function() {
					_vm.axios
						.post(
							"/users/change-status?id=" +
								user.id +
								"&isActive=" +
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
					event.target.checked = !user.isActive;
					console.log("Clicked on cancel", error);
				});
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
				.get("/users" + queryString)
				.then(function(response) {
					_vm.showLoader = false;
					_vm.userList = response.data.data.data;
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
