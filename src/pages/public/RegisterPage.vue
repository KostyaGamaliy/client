<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		
		<div class="container">
			<div class="row justify-content-center mt-5">
				<div class="col-md-6">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title text-center mb-4">Register</h5>
							<form>
								<!-- Name input -->
								<div class="mb-4">
									<label for="name" class="form-label">Name</label>
									<input type="text" class="form-control" id="name" v-model="name">
									<span class="text-danger" v-if="nameError">{{ nameError }}</span>
								</div>
								
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
								
								<!-- Confirm Password input -->
								<div class="mb-4">
									<label for="confirmPassword" class="form-label">Confirm Password</label>
									<input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
									<span class="text-danger" v-if="confirmPasswordError">{{ confirmPasswordError }}</span>
								</div>
								
								<!-- Submit button -->
								<button type="submit" class="btn btn-primary btn-block" @click.prevent="sendCredentials">Register</button>
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
			name:null,
			email: null,
			password: null,
			confirmPassword: null,
			nameError:null,
			emailError: null,
			passwordError: null,
			confirmPasswordError:null,
		};
	},
	
	methods: {
		...mapActions(useAuthStore, ["registerUser"]),
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
		validateName() {
			if (!this.name) {
				this.nameError = "This field mustn\'t be empty";
			} else {
				this.nameError = null;
			}
		},
		validateConfirmPassword() {
			if (!this.confirmPassword) {
				this.confirmPasswordError = "This field mustn\'t be empty";
			}
			else if (this.password !== this.confirmPassword) {
				this.confirmPasswordError = 'Passwords do not match';
			} else {
				this.confirmPasswordError = null;
			}
		},
		sendCredentials() {
			this.validateName();
			this.validateEmail();
			this.validatePassword();
			this.validateConfirmPassword();
			if (!this.emailError && !this.passwordError && !this.nameError && !this.confirmPasswordError) {
				const userData = {
					'name':this.name,
					'email':this.email,
					'password':this.password,
					'confirmPassword':this.confirmPassword,
					'device_name': 'desktop'
				}
				// console.log(userData)
				this.registerUser(userData);
			}
		}
	},
};
</script>

<style lang="scss" scoped></style>