<template>
	<div class="row form-group">
		<h2 class="title-2 col-md-6 header-title">{{ title }}</h2>
		<div class="col-md-4 col-8 pr-1" :class="addUrl && addUrl.length > 0?'':'offset-2'">
			<div class="input-group ">
				<input
					type="text"
					:id="searchId"
					:name="searchId"
					placeholder="Search..."
					class="form-control  au-input"
					:value="searchValue"
					@keypress.enter="$emit('search', $event.target.value)"
				/>
				<div class="input-group-btn">
					<button class="btn btn-outline-primary" @click="searchUpdate"><i class="fa fa-search"></i></button>
				</div>
			</div>
			</div>
			<div v-if="addUrl && addUrl.length > 0" class="col-md-2 col-4 text-right">
				
				<a v-if="directLink" :href="addUrl" class="btn btn-outline-primary btn-sm btn-add-new" :id="'add' + searchId">
					<i class="fas fa-plus"></i> Add New
				</a>
				<router-link
					v-else
					:to="addUrl"
					:id="'add' + searchId"
					class="btn btn-outline-primary btn-sm btn-add-new"
				>
					<i class="fas fa-plus"></i> Add New
				</router-link>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		addUrl: String,
		title: String,
		searchId: String,
		searchValue: String,
		directLink:Boolean
	},
	methods: {
		searchUpdate(){
			this.$emit('search', document.getElementById(this.searchId).value);
		}
	}
};
</script>
