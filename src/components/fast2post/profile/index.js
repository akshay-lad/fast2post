import store from "@/store/index.js";
export default {
	data: () => ({
		user: {
			id: 0,
			usertype_id: 10,
			email: "",
			password: "",
			c_password: "",
			profile_image: "",
			firstname: "",
			lastname: "",
			contact_no: "",
			facebook_url: "",
			instagram_url: "",
			twitter_url: "",
			linkedin_url: "",
			whatsapp_number: "",
			isActive: 0,
			isVerify: 0,
			is_allow_api: 0,
			gst_number: "",
			pan_number: "",
			website_ip: "",
			website_url: "",
			gmap_location_url: "",
			upi_id: null,
			bank_name: null,
			bank_branch_name: null,
			bank_ifsc_code: null,
			bank_ac_number: null,
			bank_ac_holder_name: null,
			bank_branch_address: null
		},
		profileImage: null,
		usertyelist: [],
		error: ""
	}),
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.user = {
				id: 0,
				usertype_id: "",
				email: "",
				password: "",
				c_password: "",
				profile_image: "",
				firstname: "",
				lastname: "",
				contact_no: "",
				facebook_url: "",
				instagram_url: "",
				twitter_url: "",
				linkedin_url: "",
				whatsapp_number: "",
				isActive: 0,
				isVerify: 0,
				is_allow_api: 0,
				gst_number: "",
				pan_number: "",
				website_ip: "",
				website_url: "",
				gmap_location_url: "",
				bank_name: null,
				bank_branch_name: null,
				bank_ifsc_code: null,
				bank_ac_number: null,
				bank_ac_holder_name: null,
				bank_branch_address: null
			};
			this.profileImage = null;
		},
		validateUser() {
			this.update();
		},
		update() {
			let _vm = this;
			let fd = new FormData();
			if (_vm.profileImage) {
				fd.append("profile_image", _vm.profileImage);
			}
			Object.keys(_vm.user).forEach(key => {
				if (key !== "profile_image") {
					fd.append(key, _vm.user[key] ? _vm.user[key] : "");
				}
			});
			fd.append("_method", "PATCH");
			this.axios
				.post("/users/" + this.user.id, fd)
				.then(function(response) {
					_vm.user = response.data.data;
					localStorage.setItem(
						process.env.VUE_APP_USER_ACTIVE,
						_vm.user.isActive
					);
					if (_vm.user.id === _vm.$store.state.userDetail.id) {
						_vm.$store.state.userDetail = _vm.user;
					}
					_vm.user_active = localStorage.getItem("fb_user_active");
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getDetail() {
			let _vm = this;
			store.state.isLoaderShow = true;
			this.axios
				.get("/users/" + this.current_user_id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.user = response.data.data;
					if (
						_vm.user.profile_image &&
						_vm.user.profile_image.length > 0
					) {
						$("#imagePreview").css(
							"background-image",
							"url(" + _vm.user.profile_image + ")"
						);
						$("#imagePreview").hide();
						$("#imagePreview").fadeIn(650);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getQueryString() {
			let queryString = "?search=";
			return queryString;
		},
		getUserType() {
			let _vm = this;
			let queryString = this.getQueryString();
			this.axios
				.get("/user-types" + queryString)
				.then(function(response) {
					_vm.usertyelist = response.data.data.data;
					_vm.user = store.state.userDetail;
					if (
						_vm.user.profile_image &&
						_vm.user.profile_image.length > 0
					) {
						$("#imagePreview").css(
							"background-image",
							"url(" + _vm.user.profile_image + ")"
						);
						$("#imagePreview").hide();
						$("#imagePreview").fadeIn(650);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		selectUserImage(event) {
			let _vm = this;
			var input = event.target;
			if (input.files && input.files[0]) {
				_vm.profileImage = input.files[0];
				var reader = new FileReader();
				reader.onload = function(e) {
					$("#imagePreview").css(
						"background-image",
						"url(" + e.target.result + ")"
					);
					$("#imagePreview").hide();
					$("#imagePreview").fadeIn(650);
				};
				reader.readAsDataURL(input.files[0]);
			}
		}
	},
	mounted() {
		this.getUserType();
		this.usertype = localStorage.getItem("fb_user_type");
		this.user_active = localStorage.getItem("fb_user_active");
	}
};
