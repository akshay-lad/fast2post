<template>
	<div
		class="page-wrapper"
		@click="$store.state.isOpenAccountDropDown = false"
	>
		<top></top>
		<menu-bar></menu-bar>
		<main-container></main-container>
	</div>
</template>
<script>
import top from "./sidebar/top";
import menuBar from "./sidebar/menu";
import mainContainer from "./main-container/container";
import { _ } from "vue-underscore";
import $ from "jquery";
export default {
	components: { top, menuBar, mainContainer },
	mounted() {
		let _vm = this;
		this.axios
			.get("/load-menu")
			.then(function(response) {
				_vm.$store.state.menuList = response.data.data.menu;
				_vm.$store.state.userDetail = response.data.data.user;
				let path = _vm.$route.path.split("/");
				if (
					!_vm.$store.state.userDetail.isVerify &&
					_vm.$store.state.userDetail.usertype.name == "client" &&
					window.location.pathname !==
						"/client-profile/" + _vm.$store.state.userDetail.id
				) {
					window.location.href =
						"/client-profile/" + _vm.$store.state.userDetail.id;
				}
				let index = _.findIndex(_vm.$store.state.menuList, menu => {
					if (menu.child && menu.child.length > 0) {
						return _.findIndex(menu.child, submenu => {
							return submenu.url.indexOf(`/${path[1]}`) > -1;
						});
					} else {
						return menu.url.indexOf(`/${path[1]}`) > -1;
					}
				});
				if (index < 0) {
					if (
						_vm.$store.state.userDetail.isVerify &&
						_vm.$store.state.userDetail.isActive
					) {
						//	window.location.href = "/access-denied";
					}
				}

				_vm.$nextTick(() => {
					try {
						let arrow = $(".js-arrow");
						arrow.each(function() {
							let that = $(this);
							that.on("click", function(e) {
								e.preventDefault();
								that.find(".arrow").toggleClass("up");
								that.toggleClass("open");
								that.parent()
									.find(".js-sub-list")
									.slideToggle("250");
							});
						});
					} catch (error) {
						console.log(error);
					}
					try {
						$(".hamburger").on("click", function() {
							$(this).toggleClass("is-active");
							$(".navbar-mobile").slideToggle("500");
						});
						$(".menu-anchor").on("click", function() {
							$(this).toggleClass("is-active");
							$(".navbar-mobile").slideToggle("500");
						});
					} catch (error) {
						console.log(error);
					}
				});
			})
			.catch(function(error) {
				console.log("error:" + error);
			});
	}
};
</script>
