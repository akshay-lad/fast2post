import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import headerList from "@/components/common/header-list.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
import { dashboardMixin } from "@/mixins/dashboardMixin";
import { orderDashboardMixin } from "@/mixins/orderDashboardMixin";
export default {
	data: () => ({
		orderStatus: "returned",
		isImportOrderModal: false,
	}),
	mixins: [paginationMixin,dashboardMixin,orderDashboardMixin],
	components: {
		"multi-select": multiselect,
		"header-list": headerList,
		VueCtkDateTimePicker,
	},
	methods: {
		exportExcel(exportData) {
			this.changeTab(this.orderStatus, exportData);
		},
		returnedOrder(orderId) {
			let _vm = this;
			_vm.axios
				.post("/order-returned/" + orderId)
				.then(function() {
					_vm.changeTab(_vm.orderStatus);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		returnToHUB(orderId) {
			let _vm = this;
			let orderIds = [];
			if (orderId) {
				orderIds = [orderId];
			} else {
				this.orderList.forEach(element => {
					if (element.isSelected == true) {
						orderIds.push(element.id);
					}
				});
			}
			_vm.axios
				.post("/order-returned-to-hub",{
					"orderIds":orderIds
				})
				.then(function() {
					_vm.changeTab(_vm.orderStatus);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		returnToSender(orderId) {
			let _vm = this;
			let orderIds = [];
			if (orderId) {
				orderIds = [orderId];
			} else {
				this.orderList.forEach(element => {
					if (element.isSelected == true) {
						orderIds.push(element.id);
					}
				});
			}
			_vm.axios
				.post("/order-returned-to-sender",{
					"orderIds":orderIds
				})
				.then(function() {
					_vm.changeTab(_vm.orderStatus);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		returnToSenderDelivered(orderId) {
			let _vm = this;
			let orderIds = [];
			if (orderId) {
				orderIds = [orderId];
			} else {
				this.orderList.forEach(element => {
					if (element.isSelected == true) {
						orderIds.push(element.id);
					}
				});
			}
			_vm.axios
				.post("/order-returned-to-sender-delivered" ,{
					"orderIds":orderIds
				})
				.then(function() {
					_vm.changeTab(_vm.orderStatus);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		ordersCount() {
			let _vm=this;
			let queryString = _vm.getQueryString();
			this.axios
				.get("/orders-count" + queryString)
				.then(function(response) {
					_vm.ordersTotal = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		changeTab(_status, exportData) {
			let _vm = this;
			let queryString = _vm.getQueryString() + `&status=${_status}`;
			this.updateQueryStringUrl(queryString);
			if (exportData) {
				queryString +=
					"&export=true"
			} else {
				_vm.ordersCount();
				_vm.showLoader = true;
			}
			_vm.orderStatus = _status;
			this.axios
				.get("/orders" + queryString)
				.then(function(response) {
					_vm.showLoader = false;
					if (exportData) {
						let a = document.createElement("a"); //Create <a>
						a.href = response.data.data.file; //Image Base64 Goes here
							a.download =
							response.data.data.name; //File name Here
					
						
						a.click(); //Downloaded file
					} else {
						let data = response.data.data.data;
						for (let index = 0; index < data.length; index++) {
							data[index]["serial_number"] = index + 1;
							data[index]["isSelected"] = false;
						}
						_vm.orderList = data;
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
	},
	mounted() {
	}
};
