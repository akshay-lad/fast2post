const courierList = resolve => {
	require.ensure(
		["@/components/fast2post/courier/list/index.vue"],
		() => {
			resolve(require("@/components/fast2post/courier/list/index.vue"));
		},
		"courier-list"
	);
};
const courierManage = resolve => {
	require.ensure(
		["@/components/fast2post/courier/tab/index.vue"],
		() => {
			resolve(require("@/components/fast2post/courier/tab/index.vue"));
		},
		"courier-manage"
	);
};
const processingOrderList = resolve => {
	require.ensure(
		["@/components/fast2post/orders/list/processing/index.vue"],
		() => {
			resolve(require("@/components/fast2post/orders/list/processing/index.vue"));
		},
		"processing-orders-list"
	);
};
const returnOrderList = resolve => {
	require.ensure(
		["@/components/fast2post/orders/list/return/index.vue"],
		() => {
			resolve(require("@/components/fast2post/orders/list/return/index.vue"));
		},
		"return-orders-list"
	);
};
const allOrderList = resolve => {
	require.ensure(
		["@/components/fast2post/orders/list/all/index.vue"],
		() => {
			resolve(require("@/components/fast2post/orders/list/all/index.vue"));
		},
		"all-orders-list"
	);
};

const orderManage = resolve => {
	require.ensure(
		["@/components/fast2post/orders/manage/index.vue"],
		() => {
			resolve(require("@/components/fast2post/orders/manage/index.vue"));
		},
		"orders-manage"
	);
};
const clientList = resolve => {
	require.ensure(
		["@/components/fast2post/client/list/index.vue"],
		() => {
			resolve(require("@/components/fast2post/client/list/index.vue"));
		},
		"client-list"
	);
};

const clientManage = resolve => {
	require.ensure(
		["@/components/fast2post/client/manage/index.vue"],
		() => {
			resolve(require("@/components/fast2post/client/manage/index.vue"));
		},
		"client-manage"
	);
};

const deliveBoyList = resolve => {
	require.ensure(
		["@/components/fast2post/delivery-boy/list/index.vue"],
		() => {
			resolve(require("@/components/fast2post/delivery-boy/list/index.vue"));
		},
		"delivery-boy-list"
	);
};

const deliveryBoyManage = resolve => {
	require.ensure(
		["@/components/fast2post/delivery-boy/manage/index.vue"],
		() => {
			resolve(require("@/components/fast2post/delivery-boy/manage/index.vue"));
		},
		"delivery-boy-manage"
	);
};

const assignCourierList = resolve => {
	require.ensure(
		["@/components/fast2post/orders/assign-courier/index.vue"],
		() => {
			resolve(
				require("@/components/fast2post/orders/assign-courier/index.vue")
			);
		},
		"assign-courier"
	);
};

const pageList = resolve => {
	require.ensure(
		["@/components/fast2post/pages/list/index.vue"],
		() => {
			resolve(require("@/components/fast2post/pages/list/index.vue"));
		},
		"pageList"
	);
};

const pageManage = resolve => {
	require.ensure(
		["@/components/fast2post/pages/manage/index.vue"],
		() => {
			resolve(require("@/components/fast2post/pages/manage/index.vue"));
		},
		"pageManage"
	);
};

const serviceChargeManage = resolve => {
	require.ensure(
		["@/components/fast2post/service-charge/index.vue"],
		() => {
			resolve(require("@/components/fast2post/service-charge/index.vue"));
		},
		"service-charge"
	);
};

const ticketsManage = resolve => {
	require.ensure(
		["@/components/fast2post/tickets/list/index.vue"],
		() => {
			resolve(require("@/components/fast2post/tickets/list/index.vue"));
		},
		"tickets"
	);
};


const complainManage = resolve => {
	require.ensure(
		["@/components/fast2post/complain/index.vue"],
		() => {
			resolve(require("@/components/fast2post/complain/index.vue"));
		},
		"tickets"
	);
};

const commonReport = resolve => {
	require.ensure(
		["@/components/fast2post/reports/common/index.vue"],
		() => {
			resolve(require("@/components/fast2post/reports/common/index.vue"));
		},
		"courier-report"
	);
};
const deliveryBoyPincode = resolve => {
	require.ensure(
		["@/components/fast2post/delivery-boy-pincode/index.vue"],
		() => {
			resolve(
				require("@/components/fast2post/delivery-boy-pincode/index.vue")
			);
		},
		"delivery-boy-pincode"
	);
};
const developerApi = resolve => {
	require.ensure(
		["@/components/fast2post/developer-api/index.vue"],
		() => {
			resolve(require("@/components/fast2post/developer-api/index.vue"));
		},
		"developer-api"
	);
};

const syncLog = resolve => {
	require.ensure(
		["@/components/fast2post/client-sync-log/index.vue"],
		() => {
			resolve(
				require("@/components/fast2post/client-sync-log/index.vue")
			);
		},
		"client-sync-log"
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
			path: "/couriers",
			name: "Courier list",
			component: courierList
		},
		{
			path: "/courier/:id",
			name: "Courier Manage",
			component: courierManage
		},
		{
			path: "/orders/processing",
			name: "Order Processing List",
			component: processingOrderList
		},
		{
			path: "/orders/return",
			name: "Order Return List",
			component: returnOrderList
		},
		{
			path: "/orders/all",
			name: "Order All List",
			component: allOrderList
		},
		{
			path: "/order/:id",
			name: "Order Manage",
			component: orderManage
		},
		{
			path: "/clients",
			name: "Client List",
			component: clientList
		},
		{
			path: "/client/:id",
			name: "Client Manage",
			component: clientManage
		},
		{
			path: "/client-profile/:id",
			name: "Client Profile Manage",
			component: clientManage
		},
		{
			path: "/delivery-boys",
			name: "Delivery boy List",
			component: deliveBoyList
		},
		{
			path: "/delivery-boy/:id",
			name: "Delivery Boy Manage",
			component: deliveryBoyManage
		},
		{
			path: "/delivery-boy-profile/:id",
			name: "Delivery Boy Profile Manage",
			component: deliveryBoyManage
		},
		{
			path: "/assign-courier/:id",
			name: "Assign Courier",
			component: assignCourierList
		},
		{
			path: "/pages",
			name: "Page List",
			component: pageList
		},
		{
			path: "/page/:id",
			name: "Page Manage",
			component: pageManage
		},
		{
			path: "/service-charge",
			name: "Service Charge",
			component: serviceChargeManage
		},
		{
			path: "/tickets",
			name: "Tickets",
			component: ticketsManage
		},
		{
			path: "/complain",
			name: "Complain",
			component: complainManage
		},
		{
			path: "/reports/:status",
			name: "Reports",
			component: commonReport
		},
		{
			path: "delivery-boy-pincode",
			name: "Delivery Boy Pincode",
			component: deliveryBoyPincode
		},
		{
			path: "developer-api",
			name: "Developer API",
			component: developerApi
		},
		{
			path: "sync-log/:id",
			name: "Client sync log",
			component: syncLog
		}
	]
};
