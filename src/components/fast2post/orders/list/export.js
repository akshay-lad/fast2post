export default {
	data: () => ({
		courier: "speedpost"
	}),
	components: {},
	methods: {
		exportOrder(paymentType) {
			this.$emit("exportOrder", {
				type: paymentType,
				courier: this.courier
			});
			document.getElementById("closeExportModal").click();
		}
	},
	mounted() {
		document.body.appendChild(
			document.getElementById("staticOrderExportModal")
		);
	}
};
