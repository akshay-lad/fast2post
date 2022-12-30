export default {
	data: () => ({
		selectedFile: []
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
		uploadOrder() {
			let _vm = this;
			let fd = new FormData();
			fd.append("select_file", this.selectedFile[0]);
			this.axios.post("/import-order-payment", fd).then(() => {
				document.getElementById("file-input").value = null;
				_vm.selectedFile = [];
				_vm.$emit("orderUploaded");
				document.getElementById("closeOrderPaidModal").click();
			});
		}
	},
	mounted() {
		document.body.appendChild(document.getElementById("staticOrderPaidModal"));
	}
};
