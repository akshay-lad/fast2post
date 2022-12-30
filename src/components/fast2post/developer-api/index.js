export default {
	data: () => ({
		apiKey: ""
	}),
	methods: {
		generateToken() {
			let _vm = this;
			this.axios
				.post("/generate-api-key")
				.then(function(response) {
					_vm.apiKey = response.data.data.api_key;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getToken() {
			let _vm = this;
			this.axios
				.get("/get-api-key")
				.then(function(response) {
					_vm.apiKey = response.data.data[0].api_key;
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	mounted() {
		this.getToken();
	}
};
