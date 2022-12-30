<template>
	<!-- MENU SIDEBAR-->
	<aside
		class="menu-sidebar d-none d-lg-block"
		:style="{ width: $store.state.isOpenSideBar ? '260px' : '0px' }"
	>
		<div class="logo">
			<a href="/dashboard">
				Fast2Post
				<!-- <img src="/images/icon/logo.png" alt="Cool Admin" /> -->
			</a>
		</div>
		<div class="menu-sidebar__content js-scrollbar1">
			<nav class="navbar-sidebar">
				<ul class="list-unstyled navbar__list">
					<li
						v-for="item in menuList"
						:key="item.name"
						:class="
							item.child && item.child.length > 0 ? 'has-sub' : ''
						"
					>
						<template v-if="item.child && item.child.length > 0">
							<a class="js-arrow" href="javascript:;">
								<i :class="item.icon"></i>{{ item.name }}
								<span
									class="fas fa-chevron-down float-right "
								></span
							></a>
							<ul
								class="list-unstyled navbar__sub-list js-sub-list"
							>
								<li
									v-for="child in item.child"
									:key="child.name"
								>
									<router-link :to="child.url">
										<i :class="child.icon"></i
										>{{ child.name }}
									</router-link>
								</li>
							</ul>
						</template>
						<router-link v-else class="js-arrow" :to="item.url">
							<i :class="item.icon"></i>{{ item.name }}
						</router-link>
					</li>
				</ul>
			</nav>
		</div>
	</aside>
	<!-- END MENU SIDEBAR-->
</template>
<script>
export default {
	computed: {
		menuList() {
			return this.$store.state.menuList;
		}
	}
};
</script>
<style scoped>
.logo a,
.logo a.active {
	font-size: 25px;
	font-weight: 700;
	color: #666666 !important;
	cursor: pointer;
}
.js-arrow.open .fa-chevron-down:before {
	content: "\f077";
}
</style>
