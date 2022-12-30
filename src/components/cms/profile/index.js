import userProfile from "@/components/fast2post/profile/index.vue";
export default {
	data: () => ({
		user: {
			id: 0,
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
		usertype: "guest",
		error: "",
		profileImage: null
	}),
	components: {
		"user-profile": userProfile
	},
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.user = {
				id: 0,
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
		},
		validateUser() {
			this.update();
		},
		getQueryString() {
			let queryString = "?search=";
			return queryString;
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
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getDetail() {
			let _vm = this;
			this.axios
				.get(
					"/users/" +
						localStorage.getItem(process.env.VUE_APP_USER_ID)
				)
				.then(function(response) {
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
		selectImage(event) {
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
		this.getDetail();
	}
};
