<template>
	<header class="header navbar navbar-expand-lg navbar-dark bg-dark px-4">
		<div class="navbar-brand">
			PMS
		</div>
		<div class="nav-item" v-if="pdfUrl">
			<a :href="`http://localhost:85/${pdfUrl}`" target="_blank" class="nav-link btn btn-success" @click="deleteLocalUrl">Show PDF</a>
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
import {mapActions, mapGetters, mapState} from "pinia";
import emitter from "tiny-emitter/instance";
import {useAuthStore} from "@/store/Auth";
import {useProjectStore} from "@/store/Project";

export default {
	name: "HeaderApp",
	
	data() {
		return {
			pdfUrl: null,
		}
	},
	
	beforeMount() {
		emitter.on("pdf-url-updated", (url) => {
			this.pdfUrl = url;
			localStorage.setItem('pdf_url', url)
		});
	},
	
	methods: {
		...mapActions(useAuthStore, ["logout"]),
		router() {
			return router;
		},
		
		deleteLocalUrl() {
			localStorage.removeItem('pdf_url')
			this.pdfUrl = null;
		}
	},
	
	computed: {
		...mapState(useAuthStore, ["loggedIn", "user", "token"]),
		...mapGetters(useProjectStore, ["getPdfPath"])
	},
};
</script>
