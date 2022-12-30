const userTypeList = resolve => {
	require.ensure(
		["@/components/cms/user-types/list/index.vue"],
		() => {
			resolve(require("@/components/cms/user-types/list/index.vue"));
		},
		"user-type-list"
	);
};
const userTypeManage = resolve => {
	require.ensure(
		["@/components/cms/user-types/manage/index.vue"],
		() => {
			resolve(require("@/components/cms/user-types/manage/index.vue"));
		},
		"user-type-manage"
	);
};

const userList = resolve => {
	require.ensure(
		["@/components/cms/users/list/index.vue"],
		() => {
			resolve(require("@/components/cms/users/list/index.vue"));
		},
		"user-list"
	);
};
const userManage = resolve => {
	require.ensure(
		["@/components/cms/users/manage/index.vue"],
		() => {
			resolve(require("@/components/cms/users/manage/index.vue"));
		},
		"user-manage"
	);
};

const countryList = resolve => {
	require.ensure(
		["@/components/cms/countries/list/index.vue"],
		() => {
			resolve(require("@/components/cms/countries/list/index.vue"));
		},
		"country-list"
	);
};
const countryManage = resolve => {
	require.ensure(
		["@/components/cms/countries/manage/index.vue"],
		() => {
			resolve(require("@/components/cms/countries/manage/index.vue"));
		},
		"country-manage"
	);
};

const stateList = resolve => {
	require.ensure(
		["@/components/cms/states/list/index.vue"],
		() => {
			resolve(require("@/components/cms/states/list/index.vue"));
		},
		"states-list"
	);
};
const stateManage = resolve => {
	require.ensure(
		["@/components/cms/states/manage/index.vue"],
		() => {
			resolve(require("@/components/cms/states/manage/index.vue"));
		},
		"states-manage"
	);
};

const cityList = resolve => {
	require.ensure(
		["@/components/cms/cities/list/index.vue"],
		() => {
			resolve(require("@/components/cms/cities/list/index.vue"));
		},
		"cities-list"
	);
};
const cityManage = resolve => {
	require.ensure(
		["@/components/cms/cities/manage/index.vue"],
		() => {
			resolve(require("@/components/cms/cities/manage/index.vue"));
		},
		"cities-manage"
	);
};

const pincodeList = resolve => {
	require.ensure(
		["@/components/cms/pincodes/list/index.vue"],
		() => {
			resolve(require("@/components/cms/pincodes/list/index.vue"));
		},
		"pincodes-list"
	);
};
const pincodeManage = resolve => {
	require.ensure(
		["@/components/cms/pincodes/manage/index.vue"],
		() => {
			resolve(require("@/components/cms/pincodes/manage/index.vue"));
		},
		"pincodes-manage"
	);
};

const company = resolve => {
	require.ensure(
		["@/components/cms/company/index.vue"],
		() => {
			resolve(require("@/components/cms/company/index.vue"));
		},
		"company"
	);
};

const changepassword = resolve => {
	require.ensure(
		["@/components/cms/change-password/index.vue"],
		() => {
			resolve(require("@/components/cms/change-password/index.vue"));
		},
		"changepassword"
	);
};

const profile = resolve => {
	require.ensure(
		["@/components/cms/profile/index.vue"],
		() => {
			resolve(require("@/components/cms/profile/index.vue"));
		},
		"profile"
	);
};

const layout = resolve => {
	require.ensure(
		["@/components/layout/container"],
		() => {
			resolve(require("@/components/layout/container"));
		},
		"layout"
	);
};
export default {
	path: "/",
	component: layout,
	children: [
		{
			path: "/user-types",
			name: "User type list",
			component: userTypeList
		},
		{
			path: "/user-type/:id",
			name: "User type manage",
			component: userTypeManage
		},
		{
			path: "/users",
			name: "User list",
			component: userList
		},
		{
			path: "/user/:id",
			name: "User manage",
			component: userManage
		},
		{
			path: "/countries",
			name: "Country list",
			component: countryList
		},
		{
			path: "/country/:id",
			name: "Country manage",
			component: countryManage
		},
		{
			path: "/states",
			name: "Users list",
			component: stateList
		},
		{
			path: "/state/:id",
			name: "State manage",
			component: stateManage
		},
		{
			path: "/cities",
			name: "City list",
			component: cityList
		},
		{
			path: "/city/:id",
			name: "City manage",
			component: cityManage
		},
		{
			path: "/pincodes",
			name: "Pincode list",
			component: pincodeList
		},
		{
			path: "/pincode/:id",
			name: "Pincode manage",
			component: pincodeManage
		},
		{
			path: "company",
			name: "company manage",
			component: company
		},
		{
			path: "change-password",
			name: "Change Password",
			component: changepassword
		},
		{
			path: "profile",
			name: "Profile",
			component: profile
		}
	]
};
