export const paginationMixin = {
	data() {
		return {
			paginate: {
				page_count: 1,
				selected: 1,
				per_page: 25,
				current_page: 1
			}
		};
	},
	methods: {
		getPageCount(dividend, devider) {
			let page = Math.floor(dividend / devider);
			if (dividend % devider == 0) return page;
			else return page + 1;
		}
	}
};
