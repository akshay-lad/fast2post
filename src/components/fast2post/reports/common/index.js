import headerList from "@/components/common/header-list.vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { paginationMixin } from "@/mixins/paginationMixin";
import { _ } from "vue-underscore";
export default {
	data: () => ({
		orderList: [],
		error: "",
		title: "Courier Payment",
		apiUrl: "courier-payment",
		searchText: "",
		showLoader: false,
		selectedDateRange: null,
		clientList: [],
		selectedClient: []
	}),
	mixins: [paginationMixin],
	components: {
		"header-list": headerList,
		VueCtkDateTimePicker,
		"multi-select": multiselect
	},
	computed: {
		isTheme() {
			return this.$store.state.theme === "light" ? false : true;
		},
		url() {
			let path = window.location.pathname.split("/");
			return path[2];
		}
	},
	watch: {
		$route(to) {
			this.setTitleAndUrl(to.params.status);
			this.resetReport();
		}
	},
	methods: {
		resetReport() {
			this.orderList = [];
			this.searchText = "";
			this.showLoader = false;
			this.selectedDateRange = null;
			this.getNextPage(1);
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
			let queryString = "?&page=" + this.paginate.current_page;
			queryString +=
				this.searchText.length > 0 ? "&search=" + this.searchText : "";
				queryString +=
				`&start_date=${this.selectedDateRange.start}` +
				`&end_date=${this.selectedDateRange.end}`;
			let clientIds = _.pluck(this.selectedClient, "id");
			if (clientIds.length > 0) {
				queryString += `&client=${_.pluck(
					this.selectedClient,
					"id"
				).join(",")}`;
			}
			return queryString;
		},
		exportExcel() {
			this.getAll(true);
		},
		getAll(isExport) {
			let _vm = this;
			let queryString = this.getQueryString();
			_vm.showLoader = true;
			queryString += isExport ? "&export=true" : "";
			this.axios
				.get("/reports/" + this.apiUrl + queryString)
				.then(function(response) {
					_vm.showLoader = false;
					if (isExport) {
						let a = document.createElement("a"); //Create <a>
						a.href = response.data.data.file; //Image Base64 Goes here
						a.download = response.data.data.name; //File name Here
						a.click(); //Downloaded file
					} else {
						_vm.orderList = response.data.data.data;
						_vm.paginate.page_count = _vm.getPageCount(
							response.data.data.total_record,
							_vm.paginate.per_page
						);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		setTitleAndUrl(url) {
			switch (url) {
				case "courier":
					this.apiUrl = "courier-payment";
					this.title = "Courier Report";
					break;
				case "order":
					this.apiUrl = "orders-payment";
					this.title = "Order Report";
					break;
				case "delivery-boy":
					this.apiUrl = "orders-payment";
					this.title = "Delivery Boy Payment Report";
					break;
				case "gst":
					this.apiUrl = "orders-payment";
					this.title = "GST Report";
					break;
				case "cod-order":
					this.apiUrl = "cod-orders-payment";
					this.title = "COD Order Report";
					break;
				case "payment-cycle-15":
					this.apiUrl = "cod-orders-payment";
					this.title = "Payment Cycle Report";
					this.selectedDateRange.start="2020-01-01";
					var last = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
					var day =last.getDate();
					var month=last.getMonth()+1;
					var year=last.getFullYear();
					this.selectedDateRange.end= `${year}-${month}-${day}`;
					break;
				default:
					break;
			}
		},
		getAllClients() {
			let _vm = this;
			this.axios
				.get("/users/getusersbytype?type=client")
				.then(function(response) {
					_vm.clientList = response.data.data;
					response.data.data.forEach(element => {
						element["displayName"] =
							element.firstname +
							element.lastname +
							"(" +
							element.email +
							")";
					});
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	mounted() {
		this.setTitleAndUrl(this.$route.params.status);
		this.getAll();
		this.getAllClients();
	}
};
