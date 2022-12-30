import store from "@/store/index.js";
export default {
	data: () => ({
		courier: {
			id: 0,
			name: null,
			logo: null,
			email: null,
			pan_number: null,
			gst_number: null,
			website_url: null,
			ip_address: null,
			contact_person: null,
			other_contact: null,
			address: null,
			city: "",
			state: "",
			country: "",
			pincode: null,
			customer_details: null,
			return_charges: null,
			cancellation_charges: null,
			is_approve: 0
		},
		error: "",
		backUrl: "/couriers"
	}),
	methods: {
		resetForm() {
			this.courier = {
				id: 0,
				name: null,
				logo: null,
				email: null,
				pan_number: null,
				gst_number: null,
				website_url: null,
				ip_address: null,
				contact_person: null,
				other_contact: null,
				address: null,
				city: "",
				state: "",
				country: "",
				pincode: null,
				customer_details: null,
				return_charges: null,
				cancellation_charges: null,
				is_approve: 0
			};
			this.$refs.observer.reset();
			//this.getDetail();
		},
		validateCourier() {
			this.courier.id > 0 ? this.update() : this.add();
		},
		update() {
			let _vm = this;

			this.axios
				.post("/couriers/" + this.courier.id, {
					...this.courier,
					_method: "PATCH"
				})
				.then(function(response) {
					_vm.courier = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		add() {
			let _vm = this;
			this.axios
				.post("/couriers", this.courier)
				.then(function() {
					_vm.$router.push(_vm.backUrl);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getDetail() {
			let _vm = this;
			store.state.isLoaderShow = true;
			this.axios
				.get("/couriers/" + this.$route.params.id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.courier = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	mounted() {
		if (this.$route.params.id > 0) {
			this.getDetail();
		}
	}
};
