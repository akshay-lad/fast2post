import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import { _ } from "vue-underscore";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import headerList from "@/components/common/header-list.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
import { dashboardMixin } from "@/mixins/dashboardMixin";
import { orderDashboardMixin } from "@/mixins/orderDashboardMixin";
import importOrder from "./../import.vue";
import importTrack from "./../import_track.vue";
import exportOrder from "./../export.vue";
import courierListModal from "./../courier-list.vue";
export default {
	data: () => ({
		orderStatus: localStorage.getItem("fb_user_type")=='staff'?"intransit":"inprogress",
		isImportOrderModal: false,
		courierList:[],
	}),
	mixins: [paginationMixin,dashboardMixin,orderDashboardMixin],
	components: {
		"multi-select": multiselect,
		"header-list": headerList,
		VueCtkDateTimePicker,
		"import-order": importOrder,
		"export-order": exportOrder,
		"import-track":importTrack,
		'courier-list-modal':courierListModal
	},
	computed: {
		totalPayableAmount() {
			if (this.orderList.length > 0 && _.where(this.orderList, { isSelected: true }).length>0) {
				return _.where(this.orderList, { isSelected: true }).reduce((s, f) => {
					return s + parseFloat(f.total_charge_amount);               // return the sum of the accumulator and the current time, as the the new accumulator
				}, 0);
			}
			return 0;
		}
	},
	methods: {
		exportExcel(exportData) {
			this.changeTab(this.orderStatus, exportData);
		},
		updateComplain(orderId) {
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
			this.$dialog
				.confirm("Are you sure you want to complain on selected order?")
				.then(function() {
					_vm.axios
						.post("/order-complain-status-change", { orderIds: orderIds })
						.then(function() {
							_vm.changeTab(_vm.orderStatus);
						})
						.catch(function(error) {
							console.log(error);
						});
				})
				.catch(function(error) {
					console.log("Clicked on cancel", error);
				});
			
		},
		getCourierAll() {
			let _vm = this;
			this.axios
				.get("/couriers?page=1")
				.then(function(response) {
					_vm.courierList = response.data.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		bulkCourierAssign(courierId) {
			let _vm = this;
			let orderIds = [];
			this.orderList.forEach(element => {
				if (element.isSelected == true) {
					orderIds.push(element.id);
				}
			});
			_vm.axios
				.post("/bulk-courier-assign", { orderIds: orderIds ,'courier_id':courierId,})
				.then(function() {
					_vm.changeTab(_vm.orderStatus);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		updatePayment(orderId) {
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
				.post("/orders-payment", { orderIds: orderIds })
				.then(function(response) {
					console.log(response.data.data.payment_page);
					window.location.href = response.data.data.payment_page;
					//_vm.changeTab(_vm.orderStatus);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		
		returnedOrder(orderId) {
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
				.post("/order-returned",{ orderIds: orderIds })
				.then(function() {
					_vm.changeTab(_vm.orderStatus);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		pickUpOrder(orderId) {
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
				.post("/order-pickup",{
					"orderIds":orderIds
				})
				.then(function() {
					_vm.changeTab(_vm.orderStatus);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		deliverToCourier(orderId) {
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
				.post("/order-deliver-to-courier",{
					"orderIds":orderIds
				})
				.then(function() {
					_vm.changeTab(_vm.orderStatus);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		delivered(orderId) {
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
				.post("/order-delivered",{
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
			let _vm = this;
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
		changeTab(_status, exportData,barcodeExport=false) {
			let _vm = this;
			let queryString = _vm.getQueryString() + `&status=${_status}`;
			this.updateQueryStringUrl(queryString);
			if (exportData) {
				if(barcodeExport){
					queryString +=
					"&barcode-export=true";
				}else{
				queryString +=
					"&export=true";
				}
					if(exportData.type){
						queryString +=
						"&type=" +
						exportData.type;
					}
					if(exportData.courier){
						queryString +=
						"&courier=" +
						exportData.courier;
					}
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
						if(exportData.type){
							a.download =
							exportData.type +
							"_" +
							exportData.courier +
							"_" +
							response.data.data.name; //File name Here
						}else{
							a.download = "Order Barcode";
						}
						
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
		}
	},
	mounted() {
		this.getCourierAll();
	}
};
