export default {
	data: () => ({
	}),
	props:{
		selectedComplain:Object
	},
	components: {},
	methods: {
		uploadComplain() {
			let _vm = this;
			this.axios.post("/order-complain/"+this.selectedComplain.id, {
				...this.selectedComplain,
				_method: "PATCH"
			}).then(() => {
				_vm.$emit("orderUploaded");
				document.getElementById("closeModal").click();
			});
		}
	},
	mounted() {
		document.body.appendChild(document.getElementById("staticComplainModal"));
	}
};
