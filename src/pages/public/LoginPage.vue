<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		
		<div class="container">
			<div class="row justify-content-center mt-5">
				<div class="col-md-6">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title text-center mb-4">Login</h5>
							<form>
								<!-- Email input -->
								<div class="mb-4">
									<label for="email" class="form-label">Email address</label>
									<input type="email" class="form-control" id="email" v-model="email">
									<span class="text-danger" v-if="emailError">{{ emailError }}</span>
								</div>
								
								<!-- Password input -->
								<div class="mb-4">
									<label for="password" class="form-label">Password</label>
									<input type="password" class="form-control" id="password" v-model="password">
									<span class="text-danger" v-if="passwordError">{{ passwordError }}</span>
								</div>
								
								<!-- Submit button -->
								<button type="submit" class="btn btn-primary btn-block" @click.prevent="sendCredentials">Login</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import router from "@/router";
import {useAuthStore} from "@/store/Auth";
import {mapActions} from "pinia";
export default {
	name: "LoginPage",
	
	data() {
		return {
			email: '',
			password: '',
			emailError: null,
			passwordError: null,
			rememberMe: false
		};
	},
	
	methods: {
		...mapActions(useAuthStore, ["loginUser"]),
		router() {
			return router
		},
		validateEmail() {
			if (!this.email) {
				this.emailError = 'This field mustn\'t be empty';
			} else if (!/\S+@\S+\.\S+/.test(this.email)) {
				this.emailError = 'Mail in the wrong format';
			} else {
				this.emailError = null;
			}
		},
		validatePassword() {
			if (!this.password) {
				this.passwordError = 'This field mustn\'t be empty';
			} else {
				this.passwordError = null;
			}
		},
		sendCredentials() {
			this.validateEmail();
			this.validatePassword();
			if (!this.emailError && !this.passwordError) {
				const userData = {
					'email': this.email,
					'password': this.password,
					'device_name': 'desktop'
				}
				this.loginUser(userData)
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>