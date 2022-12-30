export default {
	data: () => ({
		selectedFile: [],
		payment_mode: "c"
	}),
	components: {},
	methods: {
		onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length) {
				return;
			}
			this.selectedFile = [];
			Array.prototype.forEach.call(files, item => {
				this.selectedFile.push(item);
			});
		},
		uploadBarcode() {
			let _vm = this;
			let fd = new FormData();
			fd.append("select_file", this.selectedFile[0]);
			fd.append("payment_allow", this.payment_mode);
			fd.append("courier_id", this.$route.params.id);
			this.axios.post("/barcodes", fd).then(() => {
				document.getElementById("file-input").value = null;
				_vm.selectedFile = [];
				_vm.$emit("barcodeUpdated");
				document.getElementById("closeModal").click();
			});
		},
		uploadOrder() {
			let _vm = this;
			let fd = new FormData();
			fd.append("orders_file", this.selectedFile[0]);
			this.axios.post("/orders-import", fd).then(() => {
				document.getElementById("file-input").value = null;
				_vm.selectedFile = [];
				_vm.$emit("orderUploaded");
				document.getElementById("closeModal").click();
			});
		}
	},
	mounted() {
		document.body.appendChild(
			document.getElementById("staticBarcodeModal")
		);
	}
};
