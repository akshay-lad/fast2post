import courierRateList from "@/components/fast2post/courier/courier-rate/index.vue";
import courierManage from "@/components/fast2post/courier/manage/index.vue";
import barcode from "@/components/fast2post/courier/barcode/index.vue";
export default {
	data: () => ({
		currentTab: "courier-manage",
		isCourierRateDisabled: false
	}),
	components: {
		"courier-rate-list": courierRateList,
		"courier-manage": courierManage,
		barcode
	},
	methods: {
		changeTab(tab) {
			if (!this.isCourierRateDisabled) {
				this.currentTab = tab;
			}
		}
	},
	mounted() {
		if (this.$route.params.id == 0) {
			this.isCourierRateDisabled = true;
		}
	}
};
