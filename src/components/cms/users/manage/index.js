import store from "@/store/index.js";
export default {
	data: () => ({
		user: {
			id: 0,
			usertype_id: "",
			email: null,
			password: null,
			c_password: null,
			profile_image: null,
			firstname: null,
			lastname: null,
			contact_no: null,
			facebook_url: null,
			instagram_url: null,
			twitter_url: null,
			linkedin_url: null,
			whatsapp_number: null,
			isActive: 0,
			isVerify: 0,
			is_allow_api: 0,
			gst_number: null,
			pan_number: null,
			website_ip: null,
			website_url: null,
			gmap_location_url: null
		},
		usertyelist: [],
		profileImage: null,
		error: "",
		backUrl: "/users"
	}),
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.user = {
				id: 0,
				usertype_id: "",
				email: null,
				password: null,
				c_password: null,
				profile_image: null,
				firstname: null,
				lastname: null,
				contact_no: null,
				facebook_url: null,
				instagram_url: null,
				twitter_url: null,
				linkedin_url: null,
				whatsapp_number: null,
				isActive: 0,
				isVerify: 0,
				is_allow_api: 0,
				gst_number: null,
				pan_number: null,
				website_ip: null,
				website_url: null,
				gmap_location_url: null
			};
			this.profileImage = null;
		},
		validateUser() {
			this.user.id > 0 ? this.update() : this.add();
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
					_vm.profileImage = null;
					if (_vm.user.id === _vm.$store.state.userDetail.id) {
						_vm.$store.state.userDetail = _vm.user;
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		add() {
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
			this.axios
				.post("/users", fd)
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
				.get("/users/" + this.$route.params.id)
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
		if (this.$route.params.id > 0) {
			this.getDetail();
		}
	}
};
