import Vue from "vue";
import CKEditor from "ckeditor4-vue";
import store from "@/store/index.js";

Vue.use(CKEditor);

export default {
	data: () => ({
		editorConfig: {
			toolbarGroups: [
				{ name: "document", groups: ["mode", "document", "doctools"] },
				{ name: "clipboard", groups: ["clipboard", "undo"] },
				{
					name: "editing",
					groups: ["find", "selection", "spellchecker", "editing"]
				},
				{ name: "forms", groups: ["forms"] },
				"/",
				{ name: "basicstyles", groups: ["basicstyles", "cleanup"] },
				{
					name: "paragraph",
					groups: [
						"list",
						"indent",
						"blocks",
						"align",
						"bidi",
						"paragraph"
					]
				},
				{ name: "links", groups: ["links"] },
				{ name: "insert", groups: ["insert"] },
				"/",
				{ name: "styles", groups: ["styles"] },
				{ name: "colors", groups: ["colors"] },
				{ name: "tools", groups: ["tools"] },
				{ name: "others", groups: ["others"] },
				{ name: "about", groups: ["about"] }
			],
			height: 350,
			format_tags: "p;h1;h2;h3;h4;h5;h6;pre;address;div",
			removeButtons:
				"NewPage,Save,Print,Preview,Templates,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,BidiLtr,BidiRtl,Language,Image,Flash,PageBreak,About,ShowBlocks"
		},
		page: {
			id: 0,
			name: null,
			page_html: null,
			page_title: null,
			is_active: 0,
			meta_keywords: null,
			meta_description: null
		},
		error: "",
		backUrl: "/pages"
	}),
	methods: {
		resetForm() {
			this.$refs.observer.reset();
			this.user = {
				id: 0,
				name: null,
				page_html: null,
				page_title: null,
				is_active: 0,
				meta_keywords: null,
				meta_description: null
			};
		},
		validatePage() {
			this.page.id > 0 ? this.update() : this.add();
		},
		update() {
			let _vm = this;
			console.log(this.page);
			this.axios
				.post("/pages/" + this.page.id, {
					...this.page,
					_method: "PATCH"
				})
				.then(function(response) {
					_vm.page = response.data.data;
					_vm.getDetail();
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		add() {
			let _vm = this;
			console.log(this.page);
			this.axios
				.post("/pages", this.page)
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
				.get("/pages/" + this.$route.params.id)
				.then(function(response) {
					store.state.isLoaderShow = false;
					_vm.page = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getQueryString() {
			let queryString = "?search=";
			return queryString;
		}
	},
	mounted() {
		if (this.$route.params.id > 0) {
			this.getDetail();
		}
	}
};
