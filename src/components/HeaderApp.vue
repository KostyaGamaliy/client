<template>
	<header class="header navbar navbar-expand-lg navbar-dark bg-dark px-4">
		<div class="navbar-brand">
			PMS
		</div>
		<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item">
					<router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
				</li>
				<template v-if="!loggedIn">
					<li class="nav-item">
						<router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
					</li>
					<li class="nav-item">
						<router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
					</li>
				</template>
				<li class="nav-item" v-if="loggedIn">
					<span class="nav-link disabled" v-text="user.name"></span>
				</li>
				<li class="nav-item" v-if="loggedIn">
					<a type="button" class="nav-link" @click.prevent="logout">Logout</a>
				</li>
			</ul>
		</div>
	</header>

</template>

<script>
import router from "@/router";
import {mapActions, mapState} from "pinia";
import {useAuthStore} from "@/store/Auth";
import axiosInstance from "@/services/AxiosInstance";

export default {
	name: "HeaderApp",
	
	data() {
		return {};
	},
	
	methods: {
		...mapActions(useAuthStore, ["logout"]),
		router() {
			return router
		},
	},
	computed: {
		...mapState(useAuthStore, ["loggedIn", "user", "token"])
	},
};
</script>
