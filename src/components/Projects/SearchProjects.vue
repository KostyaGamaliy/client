<template>
	<div class="input-group my-5 d-flex flex-column justify-content-center align-items-center">
		<input v-model="searchQuery" type="search" class="form-control rounded input" placeholder="Searching by name..."
		       aria-label="Search" aria-describedby="search-addon" @input="handleSearch" />
	</div>
</template>

<script>
	export default {
		name: "SearchProjects",
		
		props: {
			perPage: {
				type: Number,
				required: true,
			},
		},
		
		data() {
			return {
				searchQuery: "",
			};
		},
		
		methods: {
			handleSearch() {
				this.$emit("search", this.searchQuery, 1, this.perPage);
			},
		},
	}
</script>

<style scoped>

.input {
	width: 85% !important;
}
</style>