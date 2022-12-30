import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import authRoutes from "./cms/auth.js";
import cmsRoutes from "./cms/index.js";
import fast2postRoutes from "./fast2post/index.js";

const routes = [
	...authRoutes.routes,
	cmsRoutes,
	fast2postRoutes,
	{
		path: "/",
		redirect: "/dashboard",
		component: () =>
			import(
				/* webpackChunkName: "dashboard" */ "@/components/layout/container"
			),
		children: [
			{
				path: "dashboard",
				name: "Dashboard",
				component: () =>
					import(
						/* webpackChunkName: "dashboard" */ "@/components/dashboard/index.vue"
					)
			}
		]
	}
];

const router = new VueRouter({
	linkActiveClass: "active",
	scrollBehavior: () => ({ y: 0 }),
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	if (to.name == "Account") {
		next({ name: "Dashboard" });
	} else {
		next();
	}
});

export default router;
