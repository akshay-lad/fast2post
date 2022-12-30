<template>
	<div
		class="page-container"
		:style="{
			'padding-left': $store.state.isOpenSideBar ? '260px' : '0px'
		}"
	>
		<top></top>
		<div class="main-content">
			<div class="fix-header">
				<marquee
					>Attention : Due to Covid-19 our services might be delay/J&K and North East area might be delay/In COD order if order amount less then 2500RS then 50RS,amount between 2500RS - 5000RS then 2% of COD amount and above 5000RS then 1% order amount+fixed 100RS applied.</marquee
				>
			</div>
			<notice />
			<div class="section__content section__content--p30">
				<router-view />
			</div>
		</div>
	</div>
</template>
<script>
import Notice from '../notice.vue';
import top from "./top.vue";
export default {
	components: { top, Notice },
	mounted() {
		let width = document.documentElement.clientWidth;
		if (width <= 768) {
			this.$store.state.isOpenSideBar = false;
			this.$store.state.isMobileDevice = true;
		}
	}
};
</script>
<style scoped>
.fix-header {
	background: #268b07;
	color: white;
	margin-bottom: 20px;
}
.fix-header marquee {
	vertical-align: middle;
}
</style>
