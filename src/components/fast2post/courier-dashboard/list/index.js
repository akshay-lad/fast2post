import Vue from "vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import headerList from "@/components/common/header-list.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
import Multiselect from "vue-multiselect";
import excel from "vue-excel-export";

Vue.use(excel);

export default {
	data: () => ({
		export_fields: {
			"Order No": "order_number",
			Customer: "customer_name",
			"Order Date": "order_date",
			Status: "order_status"
		},
		orderList: [],
		ordersTotal: {},
		error: "",
		searchText: "",
		showLoader: false,
		selectedOption: [{ name: "All Orders", code: "allorders" }],
		statusOptions: [
			{ name: "InProgress", code: "inprogress" },
			{ name: "Ready For Pickup", code: "readyforpickup" },
			{ name: "Ready For Post", code: "readytoship" },
			{ name: "In Transaction", code: "intransist" },
			{ name: "Delivered", code: "delivered" },
			{ name: "All Orders", code: "allorders" }
		],
		orderStatus: "readyforpickup",
		userType: null,
		selectedDateRange: null
	}),
	mixins: [paginationMixin],
	components: {
		Multiselect,
		"header-list": headerList,
		VueCtkDateTimePicker
	},
	computed: {
		isTheme() {
			return this.$store.state.theme === "light" ? false : true;
		}
	},
	methods: {
		filterOrderList() {
			console.log(this.filterDate);
		},
		deleteRecord(id) {
			let _vm = this;
			this.$dialog
				.confirm("Are you sure you want to delete this record?")
				.then(function() {
					_vm.axios
						.delete("/orders/" + id)
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
		search(value) {
			this.searchText = value;
			this.getAll();
		},
		getQueryString() {
			let queryString = "?page=" + this.paginate.current_page;
			queryString +=
				this.searchText.length > 0 ? "&search=" + this.searchText : "";
			queryString +=
				`&start_date=${this.selectedDateRange.start}` +
				`&end_date=${this.selectedDateRange.end}`;
			return queryString;
		},
		pickUpOrder(orderId) {
			let _vm = this;
			_vm.axios
				.post("/order-pickup/" + orderId)
				.then(function() {
					_vm.changeTab(_vm.orderStatus);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		deliverToCourier(orderId) {
			let _vm = this;
			_vm.axios
				.post("/order-deliver-to-courier/" + orderId)
				.then(function() {
					_vm.changeTab(_vm.orderStatus);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		ordersCount() {
			let _vm = this;
			let dateFilterQuery =
				`?start_date=${_vm.selectedDateRange.start}` +
				`&end_date=${_vm.selectedDateRange.end}`;
			this.axios
				.get("/orders-count" + dateFilterQuery)
				.then(function(response) {
					_vm.ordersTotal = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		changeTab(_status) {
			let _vm = this;
			_vm.ordersCount();
			let queryString = _vm.getQueryString() + `&status=${_status}`;
			_vm.showLoader = true;
			_vm.orderStatus = _status;
			this.axios
				.get("/orders" + queryString)
				.then(function(response) {
					_vm.showLoader = false;
					_vm.orderList = response.data.data.data;
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
		this.changeTab("readyforpickup");
		this.usertype = localStorage.getItem("fb_user_type");
	}
};
