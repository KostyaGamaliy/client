<template>
	<section>
		<div class="container d-flex flex-column justify-content-center align-items-center">
			<h1 class="display-1">404</h1>
			<p class="lead mb-4">The page you are looking for does not exist.</p>
			<button class="btn btn-primary" @click="goToMain">Go to Main</button>
		</div>
	</section>
</template>

<script>
export default {
	name: 'NotFound',
	methods: {
		goToMain() {
			this.$router.push({ name: 'home' })
		}
	}
}
</script>

<style lang="scss" scoped></style>