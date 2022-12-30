import Vue from "vue";
import { extend } from "vee-validate";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import store from "@/store/index.js";
import { _ } from "vue-underscore";
Vue.directive("disable-all", {
	// When all the children of the parent component have been updated
	componentUpdated: function(el, binding) {
		if (!binding.value) return;
		const tags = ["input", "button", "textarea", "select"];
		tags.forEach(tagName => {
			const nodes = el.getElementsByTagName(tagName);
			for (let i = 0; i < nodes.length; i++) {
				nodes[i].disabled = true;
				nodes[i].tabIndex = -1;
			}
		});
	}
});

extend("decimal", {
	validate: (value, { decimals = "*", separator = "." } = {}) => {
		if (value === null || value === undefined || value === "") {
			return {
				valid: false
			};
		}
		if (Number(decimals) === 0) {
			return {
				valid: /^-?\d*$/.test(value)
			};
		}
		const regexPart = decimals === "*" ? "+" : `{1,${decimals}}`;
		const regex = new RegExp(
			`^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`
		);

		return {
			valid: regex.test(value)
		};
	},
	message: `The {_field_} field must contain only decimal values`
});

export default {
	components: {
		VueCtkDateTimePicker
	},
	data: () => ({
		transactions: [],
		currentTab: "order-detail",
		order: {
			id: 0,
			courier_id: 1,
			barcode_number: "",
			reference_number: "",
			order_number: null,
			order_url: null,
			order_date: null,
			payment_mode: "cod",
			total_weight: null,
			total_charge_amount: null,
			customer_name: null,
			email: null,
			contact_number1: null,
			contact_number2: null,
			address1: null,
			address2: null,
			address3: null,
			country: "",
			state: "",
			pincode: null,
			city: "",
			order_status: "InProgress",
			payment_status: "pending",
			width: null,
			height: null,
			length: null,
			order_items: []
		},
		order_item: {
			id: 0,
			order_id: 0,
			sku: null,
			quantity: null
		},
		showLoader: false,
		error: "",
		backUrl: "/orders",
		selected_courier_id: 0
	}),
	beforeRouteEnter(to, from, next) {
		next(vm => {
		  vm.backUrl = from;
		})
	  },
	computed: {
		isTheme() {
			return this.$store.state.theme === "light" ? false : true;
		}
	},
	methods: {
		changeTab(status) {
			if (this.$route.params.id > 0) {
				this.currentTab = status;
			}
		},
		resetForm() {
			this.$refs.observer.reset();
			(this.order = {
				id: 0,
				courier_id: 1,
				barcode_number: "",
				reference_number: "",
				order_number: null,
				order_url: null,
				order_date: null,
				payment_mode: "cod",
				total_weight: null,
				total_charge_amount: null,
				customer_name: null,
				email: null,
				contact_number1: null,
				contact_number2: null,
				address1: null,
				address2: null,
				address3: null,
				country: "",
				state: "",
				pincode: null,
				city: "",
				order_status: "InProgress",
				payment_status: "pending",
				width: null,
				height: null,
				length: null,
				order_items: []
			}),
				(this.order_item = {
					id: 0,
					order_id: 0,
					sku: null,
					quantity: null
				});
		},
		handleValidationErrorAdvanced() {
			const firstField = _.findKey(this.$refs.observer.errors, function(
				item
			) {
				return item.length > 0;
			});
			let fieldName =
				firstField === "Order Date"
					? "order_date"
					: this.$refs.observer.refs[firstField].fieldName;
			// this assumes you have a conviention of ref and field name here I just add the
			// Input suffix to the field name as you can see in the template.
			let elementsInErrors = document.getElementsByName(fieldName);
			if (elementsInErrors) {
				elementsInErrors[0].focus();
			}
			//this.$refs.observer.refs[firstField].fieldName.scrollIntoView();
		},
		validateOrder() {
			this.$refs.observer.validate().then(success => {
				if (!success) {
					setTimeout(() => {
						this.handleValidationErrorAdvanced();
					}, 100);
				} else {
					this.order.id > 0 ? this.update() : this.add();
				}
			});
		},
		addOrderItem() {
			if (
				!(
					this.order_item.sku &&
					this.order_item.sku.length > 0 &&
					this.order_item.item_code &&
					this.order_item.item_code.length > 0
				)
			) {
				this.$dialog.alert("The sku or item code must be required.");
				return;
			}
			if (this.order_item.sku == null || this.order_item.sku == "") {
				this.$refs.sku.focus();
			} else if (
				this.order_item.quantity == null ||
				this.order_item.quantity == ""
			) {
				this.$refs.item_quantity.focus();
			} else if (!(this.order_item.quantity <= 9999)) {
				this.$refs.item_quantity.focus();
			} else {
				this.order.order_items.push(this.order_item);
				this.order_item = {
					id: 0,
					order_id: this.order.id,
					sku: null,
					quantity: null
				};
			}
		},
		removeOrderItem: function(item) {
			Vue.delete(this.order.order_items, item);
		},
		update() {
			let _vm = this;

			this.axios
				.post("/orders/" + this.order.id, {
					...this.order,
					_method: "PATCH"
				})
				.then(function(response) {
					_vm.order = response.data.data[0];
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		add() {
			let _vm = this;
			this.axios
				.post("/orders", this.order)
				.then(function() {
					_vm.$router.push(_vm.backUrl);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getCityStateCountryByPincode() {
			let _vm = this;
			store.state.isLoaderShow = true;
			this.axios
				.get("/get-city-state-by-pincode/" + _vm.order.pincode)
				.then(function(response) {
					if (response.data.data) {
						_vm.order.city = response.data.data.city;
						_vm.order.state = response.data.data.state;
						_vm.order.country = response.data.data.country;
					} else {
						_vm.order.city = "";
						_vm.order.state = "";
						_vm.order.country = "";
					}
					store.state.isLoaderShow = false;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getDetail() {
			let _vm = this;
			store.state.isLoaderShow = true;
			this.axios
				.get("/orders/" + this.$route.params.id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.order = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getTransactions() {
			let _vm = this;
			store.state.isLoaderShow = true;
			this.axios
				.get("/order-transactions/" + this.$route.params.id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.transactions = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		SelectedCourier(id) {
			this.selected_courier_id = id;
			this.order.courier_id = id;
		}
	},
	mounted() {
		if (this.$route.params.id > 0) {
			this.getDetail();
			this.getTransactions();
		}else{
			window.location.href="https://www.shipshop.in/shipshop_user/user/registration";
		}
	}
};
