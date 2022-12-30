import store from "@/store/index.js";
import { _ } from "vue-underscore";
export default {
	data: () => ({
		user: {
			id: 0,
			usertype_id: null,
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
			isActive: 0,
			isVerify: 0,
			gmap_location_url: "",
			pincode:'',
			city:'',
			state:'',
		},
		profileImage: null,
		chequeFile: null,
		aadharCard: null,
		usertyelist: [],
		error: "",
		backUrl: "/delivery-boys",
		isProfilePage: false
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
				isActive: 0,
				isVerify: 0,
				is_allow_api: 0,
				gmap_location_url: "",
			};
			this.profileImage = null;
			this.user.usertype_id = _.where(this.usertyelist, {
				name: "deliveryboy"
			})[0].id;
		},
		validateUser() {
			this.user.id > 0 ? this.update() : this.add();
		},
		update() {
			let _vm = this;
			let fd = new FormData();
			_vm.user.isActive = _vm.user.isActive == true ? 1 : 0;
			_vm.user.isVerify = _vm.user.isVerify == true ? 1 : 0;
			_vm.user.is_hide_contact_number = _vm.user.is_hide_contact_number == true ? 1 : 0;
			if (_vm.profileImage) {
				fd.append("profile_image", _vm.profileImage);
			}
			let allowBoolean = ['isActive','isVerify','is_hide_contact_number','is_allow_api']
			Object.keys(_vm.user).forEach(key => {
				if (key !== "profile_image") {
					if(_vm.user[key] || allowBoolean.indexOf(key)>-1){
						fd.append(key, _vm.user[key]);
					}
				}
			});
			fd.append("_method", "PATCH");
			this.axios
				.post("/users/" + this.user.id, fd)
				.then(function(response) {
					_vm.user = response.data.data;
					_vm.profileImage = null;
					if(!_vm.isProfilePage){
						_vm.$router.push(_vm.backUrl);
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
			_vm.user.isActive = _vm.user.isActive == true ? 1 : 0;
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
		uploadAttachment(e,type) {
			let _vm = this;
			let fd = new FormData();
			let files = e.target.files || e.dataTransfer.files;
			if (!files.length) {
				return;
			}
			fd.append("attachment", files[0]);
			fd.append("attachment_type", type);
			fd.append("user_id", _vm.user.id);
			this.axios
				.post("/user-attachments", fd)
				.then(function() {
					_vm.getDetail();
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		verifyUser(){
			let _vm = this;
			let _msg =
				_vm.user.isVerify == false
					? "Are you sure you want to verify this user?"
					: "Are you sure you want to unverify this user?";
			let _isActive = _vm.user.isVerify == false ? 1 : 0;
			this.$dialog
				.confirm(_msg)
				.then(function() {
					_vm.axios
						.post(
							"/users/verify-user?id=" +
								_vm.user.id +
								"&isVerify=" +
								_isActive
						)
						.then(function() {
							_vm.getDetail();
						})
						.catch(function(error) {
							console.log(error);
						});
				})
				.catch(function() {
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
					if(_vm.user.user_attachment && _vm.user.user_attachment.length>0){
						_vm.user.user_attachment.forEach(element => {
							switch (element.attachment_type) {
								case 'cheque':
									_vm.chequeFile=element.attachment_path;
									break;
								case 'aadhar_card':
									_vm.aadharCard=element.attachment_path;
									break;
								default:
									break;
							}
						});
					}
					if(_vm.user.addresses && _vm.user.addresses.length>0){
						_vm.user.address1= _vm.user.addresses[0].address1;
						_vm.user.address2= _vm.user.addresses[0].address2;
						_vm.user.address3= _vm.user.addresses[0].address3;
						_vm.user.city= _vm.user.addresses[0].city;
						_vm.user.state= _vm.user.addresses[0].state;
						_vm.user.country= _vm.user.addresses[0].country;
						_vm.user.pincode= _vm.user.addresses[0].pincode;
						_vm.user.gmap_location_url= _vm.user.addresses[0].gmap_location_url;
					}
					if(_vm.user.role_based && _vm.user.role_based.length>0){
						_vm.user.deliveryboy_charge= _vm.user.role_based[0].deliveryboy_charge;
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
					_vm.user.usertype_id = _.where(_vm.usertyelist, {
						name: "deliveryboy"
					})[0].id;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getCityStateCountryByPincode() {
			let _vm = this;
			store.state.isLoaderShow = true;
			this.axios
				.get("/get-city-state-by-pincode/" + _vm.user.pincode)
				.then(function(response) {
					if (response.data.data) {
						_vm.user['city'] = response.data.data.city;
						_vm.user['state'] = response.data.data.state;
						_vm.user['country'] = response.data.data.country;
					} else {
						_vm.user.city = "";
						_vm.user.state = "";
						_vm.user.country = "";
					}
					store.state.isLoaderShow = false;
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
		this.isProfilePage =
			this.$route.fullPath.split("/")[1] === "delivery-boy-profile";
	}
};
