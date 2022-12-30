import headerList from "@/components/common/header-list.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
export default {
	data: () => ({
		logList: [],
		error: "",
		searchText: "",
		showLoader: false
	}),
	mixins: [paginationMixin],
	components: { "header-list": headerList },
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
			let queryString = "?type=client&page=" + this.paginate.current_page;
			queryString +=
				this.searchText.length > 0 ? "&search=" + this.searchText : "";
			return queryString;
		},
		getAll() {
			let _vm = this;
			let id = this.$route.params.id;
			let queryString = this.getQueryString();
			_vm.showLoader = true;
			this.axios
				.get("/client-sync-log/" + id + queryString)
				.then(function(response) {
					_vm.showLoader = false;
					_vm.logList = response.data.data.data;
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
