import headerList from "@/components/common/header-list.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
import importBarcodes from "./import.vue";
export default {
	data: () => ({
		barcodeList: [],
		searchText: "",
		showLoader: false,
		selectedFile: []
	}),
	mixins: [paginationMixin],
	components: {
		"header-list": headerList,
		"import-barcodes": importBarcodes
	},
	methods: {
		deleteRecord(id) {
			let _vm = this;
			this.$dialog
				.confirm("Are you sure you want to delete this record?")
				.then(function() {
					_vm.axios
						.delete("/barcodes/" + id)
						.then(function() {
							_vm.getAll();
						})
						.catch(function(error) {
							console.log(error);
						});
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
			let queryString =
				"?page=" +
				this.paginate.current_page +
				"&courier_id=" +
				this.$route.params.id;
			queryString +=
				this.searchText.length > 0 ? "&search=" + this.searchText : "";
			return queryString;
		},
		getAll() {
			let _vm = this;
			let queryString = this.getQueryString();
			_vm.showLoader = true;
			this.axios
				.get("/barcodes" + queryString)
				.then(function(response) {
					_vm.showLoader = false;
					_vm.barcodeList = response.data.data.data;
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
