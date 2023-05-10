<template>
	<div class="mx-5">
		<div class="input-group my-5 d-flex justify-content-center align-items-center">
			<input v-model="searchQuery" type="search" class="col-md-5 ml-2 form-control rounded-start" placeholder="Searching by name..."
			       aria-label="Search" aria-describedby="search-addon" @input="handleSearch">
			<router-link to="projects/create" type="button" class="btn btn-primary rounded-end">Create project</router-link>
		</div>
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