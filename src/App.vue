<template>
	<div id="app" class="animsi tion">
		<div class="alert alert-dismissible"></div>
		<div
			class="page-wrapper"
			:class="{ 'opacity-6': $store.state.isLoaderShow }"
		>
			<router-view />
		</div>
		<div class="loader" v-if="$store.state.isLoaderShow"></div>
	</div>
</template>
<style scoped>
@import "/css/style.css";
</style>
<script>
export default {
	mounted() {
		document.body.className = this.$store.state.theme;
	}
};
</script>
