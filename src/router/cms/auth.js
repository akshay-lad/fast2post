const login = resolve => {
	require.ensure(
		["@/components/cms/auth/login.vue"],
		() => {
			resolve(require("@/components/cms/auth/login.vue"));
		},
		"login"
	);
};

const client_register = resolve => {
	require.ensure(
		["@/components/fast2post/client/register/client-register.vue"],
		() => {
			resolve(require("@/components/fast2post/client/register/client-register.vue"));
		},
		"client_register"
	);
};

const loginResource = resolve => {
	require.ensure(
		["@/components/fast2post/resource/index.vue"],
		() => {
			resolve(require("@/components/fast2post/resource/index.vue"));
		},
		"loginResource"
	);
};

const forgotpassword = resolve => {
	require.ensure(
		["@/components/cms/auth/forgot-password.vue"],
		() => {
			resolve(require("@/components/cms/auth/forgot-password.vue"));
		},
		"forgotpassword"
	);
};

const resetpassword = resolve => {
	require.ensure(
		["@/components/cms/auth/reset-password.vue"],
		() => {
			resolve(require("@/components/cms/auth/reset-password.vue"));
		},
		"resetpassword"
	);
};
const permission = resolve => {
	require.ensure(
		["@/components/cms/403.vue"],
		() => {
			resolve(require("@/components/cms/403.vue"));
		},
		"permission"
	);
};
export default {
	routes: [
		{
			path: "/",
			name: "Home",
			component: login
		},
		{
			path: "/forgot-password",
			name: "Forgot Password",
			component: forgotpassword
		},
		{
			path: "/password/reset/:token",
			name: "Reset Password",
			component: resetpassword
		},
		{
			path: "/access-denied",
			name: "Access Denied",
			component: permission
		},
		{
			path: "/register",
			name: "Client Register",
			component: client_register
		},
		{
			path: "/resource/api",
			name: "Login API Resource",
			component: loginResource
		}
	]
};
