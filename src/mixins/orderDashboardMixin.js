import { _ } from "vue-underscore";
export const orderDashboardMixin = {
	data() {
		return {
			orderList: [],
			downloadPageSize:1,
			ordersTotal: {},
			searchText: "",
			pagePerRecord:"25",
			showLoader: false,
			selectedClient: [],
			usertype: localStorage.getItem("fb_user_type"),
			selectedDateRange: null,
			clientList: [],
			paymentType:'all',
		};
	},
	computed: {
		isTheme() {
			return this.$store.state.theme === "light" ? false : true;
		},
		selectAllOrder() {
			if (this.orderList.length > 0) {
				return (
					_.where(this.orderList, { isSelected: true }).length ===
					this.orderList.length
				);
			}
			return false;
		}
	},
	methods: {
		checkUncheckedOrderList(event) {
			this.orderList.forEach(element => {
				element.isSelected = event.target.checked;
			});
		},
		deleteRecord(id) {
			let _vm = this;
			let orderIds = [];
			if (id) {
				orderIds = [id];
			} else {
				this.orderList.forEach(element => {
					if (element.isSelected == true) {
						orderIds.push(element.id);
					}
				});
			}
			this.$dialog
				.confirm("Are you sure you want to delete this record?")
				.then(function() {
					_vm.axios
						.post("/orders-delete" , { orderIds: orderIds })
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
		getNextPage(page) {
			this.$refs.paginate.selected = page;
			this.paginate.current_page = page;
			this.changeTab(this.orderStatus);
		},
		search(value) {
			this.searchText = value;
			this.getNextPage(1);
		},
		downloadPdf(orderId) {
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
				.post("/orders-label-pdf", { orderIds: orderIds,'pagesize': this.downloadPageSize })
				.then(function(response) {
					var a = document.createElement("a"); //Create <a>
					a.href = response.data.data.file; //Image Base64 Goes here
					a.download = response.data.data.name; //File name Here
					a.click(); //Downloaded file
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getQueryString() {
			let queryString = "?page=" + this.paginate.current_page+"&take="+this.paginate.per_page;
			queryString +=
				this.searchText.length > 0 ? "&search=" + this.searchText : "";
			queryString +=
				`&start_date=${this.selectedDateRange.start}` +
				`&end_date=${this.selectedDateRange.end}`;
			queryString += this.paymentType!='all'?`&type=${this.paymentType}`:'';
			let clientIds = _.pluck(this.selectedClient, "id");
			if (clientIds.length > 0) {
				queryString += `&client=${_.pluck(
					this.selectedClient,
					"id"
				).join(",")}`;
			}
			return queryString;
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
		if(this.usertype == 'admin' || this.usertype == 'superadmin' || this.usertype == 'staff'){
			this.getAllClients();
		}
		this.updateDefaultParameters();
		let params = this.getUrlData();
		if(Object.keys(params).length>0){
			this.selectedDateRange.start = params['start_date'];
			this.selectedDateRange.end = params['end_date'];
			this.orderStatus = params['status'];
			this.paginate.per_page = params['take'];
		}
		this.changeTab(this.orderStatus);
	}
};
