import store from "@/store/index.js";
export default {
	data: () => ({
		company: {
			id: 1,
			name: "",
			email: "",
			email2: "",
			contact_no: "",
			contact_no2: "",
			address: "",
			city: "",
			state: "",
			country: "",
			pincode: "",
			whatsapp: "",
			facebook: "",
			google: "",
			meta_title: "",
			meta_keyword: "",
			meta_description: ""
		},
		selectedFavicon: null,
		selectedLogo: null,
		error: ""
	}),
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.getDetail();
		},
		validateCompany() {
			this.update();
		},
		update() {
			let _vm = this;
			let fd = new FormData();
			if (_vm.selectedLogo) {
				fd.append("company_logo", _vm.selectedLogo);
			}
			if (_vm.selectedFavicon) {
				fd.append("company_favicon", _vm.selectedFavicon);
			}
			Object.keys(_vm.company).forEach(key => {
				fd.append(key, _vm.company[key]);
			});
			this.axios
				.post("/company/update", fd)
				.then(function() {
					_vm.getDetail();
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		selectImage(event, imageType) {
			let _vm = this;
			var input = event.target;
			if (input.files && input.files[0]) {
				let previewId =
					imageType === "favicon"
						? "faviconImagePreview"
						: "imagePreview";
				if (imageType === "favicon") {
					_vm.selectedFavicon = input.files[0];
				} else {
					_vm.selectedLogo = input.files[0];
				}
				var reader = new FileReader();
				reader.onload = function(e) {
					$("#" + previewId).css(
						"background-image",
						"url(" + e.target.result + ")"
					);
					$("#" + previewId).hide();
					$("#" + previewId).fadeIn(650);
				};
				reader.readAsDataURL(input.files[0]);
			}
		},
		getDetail() {
			let _vm = this;
			store.state.isLoaderShow = true;
			this.axios
				.get("/company/getcompany")
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.company = response.data.data[0];
					_vm.company.id = 1;
					if (_vm.company.logo && _vm.company.logo.length > 0) {
						$("#imagePreview").css(
							"background-image",
							"url(" + _vm.company.logo + ")"
						);
						$("#imagePreview").hide();
						$("#imagePreview").fadeIn(650);
					}
					if (_vm.company.favicon && _vm.company.favicon.length > 0) {
						$("#faviconImagePreview").css(
							"background-image",
							"url(" + _vm.company.favicon + ")"
						);
						$("#faviconImagePreview").hide();
						$("#faviconImagePreview").fadeIn(650);
					}
				})
				.catch(function(error) {
					console.log("error:" + error);
				});
		}
	},
	mounted() {
		this.getDetail();
	}
};
