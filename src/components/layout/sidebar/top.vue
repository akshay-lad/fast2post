<template>
	<!-- HEADER MOBILE-->
	<header class="header-mobile d-block d-lg-none">
		<div class="header-mobile__bar">
			<div class="container-fluid">
				<div class="header-mobile-inner">
					<a class="logo" href="/">
						Fast2Post
					</a>
					<button
						class="border-none hamburger hamburger--slider"
						type="button"
					>
						<span class="hamburger-box">
							<i class="fas fa-align-justify"></i>
						</span>
					</button>
				</div>
			</div>
		</div>
		<nav class="navbar-mobile">
			<div class="container-fluid">
				<ul class="navbar-mobile__list list-unstyled">
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
								class="navbar-mobile-sub__list list-unstyled js-sub-list"
							>
								<li
									v-for="child in item.child"
									:key="child.name"
								>
									<router-link
										class="menu-anchor"
										:to="child.url"
									>
										<i :class="child.icon"></i
										>{{ child.name }}
									</router-link>
								</li>
							</ul>
						</template>
						<router-link v-else class="menu-anchor" :to="item.url">
							<i :class="item.icon"></i>{{ item.name }}
						</router-link>
					</li>
				</ul>
			</div>
		</nav>
	</header>
	<!-- END HEADER MOBILE-->
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
.logo,
.logo.active {
	font-size: 25px;
	font-weight: 700;
	color: #666666 !important;
}
</style>
