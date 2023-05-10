<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		<section class="absolute overflow-y-auto top-80 w-70p end-5">
			<div class="container py-3">
				<div class="search d-flex align-items-center">
					<router-link to="projects" class="btn btn-primary"> All projects </router-link>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import {mapState} from "pinia";
import {useAuthStore} from "@/store/Auth";

export default {
	name: "HomePage",
	data() {
		return {
		};
	},
};
</script>

<style lang="scss"></style>
