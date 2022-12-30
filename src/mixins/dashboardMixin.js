export const dashboardMixin = {
	data() {
		return {
			
		};
	},
	methods: {
		updateQueryStringUrl(queryString) {
			let params = JSON.parse('{"' + decodeURI(queryString.substring(1,queryString.length)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
			this.$router.replace({path: window.location.pathname, query:params});
		},
		getUrlData(){
			let queryString = window.location.search;
			if(queryString.length>0)
				return JSON.parse('{"' + decodeURI(queryString.substring(1,queryString.length)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
			return {};
		},
		updateDefaultParameters(){
			let params = this.getUrlData();
			if(Object.keys(params).length>0){
				this.$refs.paginate.selected = params['page'];
				this.paginate.current_page = params['page'];
				this.searchText = params['search']?params['search']:'';
			}
		}
	}
};
