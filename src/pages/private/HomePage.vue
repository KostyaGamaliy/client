<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		<section class="absolute overflow-y-auto top-80 w-70p end-5">
			<h1>home</h1>
			<router-link to="projects"> All projects </router-link>
			<p>
				Username: {{ username }}<br>
				User email: {{ useremail }}<br>
				Is login: {{ loggedIn }}<br>
				Token: {{ token }}<br>
			</p>
		</section>
	</div>
</template>

<script>
import {mapState} from "pinia";
import {useAuthStore} from "@/store/Auth";

export default {
	name: "HomePage",
	components: {},
	data() {
		return {
			username: null,
			useremail: null,
		};
	},
	
	mounted() {
		const localStorageData = JSON.parse(window.localStorage.getItem('auth'));
		this.username = localStorageData.user.name;
		this.useremail = localStorageData.user.email;
	},
	
	computed: {
		...mapState(useAuthStore, ["loggedIn", "user", "token"])
	},
};
</script>

<style lang="scss"></style>
