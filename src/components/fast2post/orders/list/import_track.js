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
			this.axios.post("/order-track-import", fd).then(() => {
				document.getElementById("track-file-input").value = null;
				_vm.selectedFile = [];
				document.getElementById("closeTrackModal").click();
			});
		}
	},
	mounted() {
		document.body.appendChild(document.getElementById("staticTrackModal"));
	}
};
