<template>
	<div class="row form-group">
		<h2 class="title-2 col-md-6 header-title">{{ title }}</h2>
		<div class="col-md-6 text-right">
			<input
				type="text"
				:id="searchId"
				:name="searchId"
				placeholder="Search..."
				class="form-control search-box au-input"
				@keypress.enter="$emit('search', $event.target.value)"
			/>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: String,
		searchId: String
	}
};
</script>