import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import headerList from "@/components/common/header-list.vue";
import updateComplain from "./update.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
import { dashboardMixin } from "@/mixins/dashboardMixin";
import { orderDashboardMixin } from "@/mixins/orderDashboardMixin";
export default {
	data: () => ({
		orderStatus: "complain-requested",
		selectedComplain:{},
	}),
	mixins: [paginationMixin,dashboardMixin,orderDashboardMixin],
	components: {
		"multi-select": multiselect,
		"header-list": headerList,
		"update-complain":updateComplain,
		VueCtkDateTimePicker,
	},
	methods: {
		changeTab(_status, exportData) {
			let _vm = this;
			let queryString = _vm.getQueryString() + `&status=${_status}`;
			this.updateQueryStringUrl(queryString);
			if (exportData) {
				queryString +=
					"&export=true";
			} else {
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
						a.download =response.data.data.name; //File name Here
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
	}
};
