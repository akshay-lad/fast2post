import courierDashboard from "@/components/fast2post/courier-dashboard/list/index.vue";
export default {
	data: () => ({
        usertype:"guest",
        user_active:0
        }),
        components: { 
              "courier-dashboard": courierDashboard
        },
	mounted() {
                this.usertype = localStorage.getItem("fb_user_type");
                this.user_active = localStorage.getItem("fb_user_active");
	}
};
