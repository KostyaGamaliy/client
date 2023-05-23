<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		<div class="d-flex align-items-center justify-content-around">
			<div class="text-center display-4">
				Create role
			</div>
			
			<router-link :to=" { name: 'members-view', params: { id: this.$route.params.id } } "
			             class="btn btn-outline-secondary me-3">
				<i class="fa fa-arrow-left"></i> Back
			</router-link>
		</div>
		
		<div class="mx-auto my-3" style="width: 900px">
			<form @submit.prevent="submitForm()">
				<div class="form-group">
					<label for="name">Name:</label>
					<input type="text" id="name" class="form-control" v-model="role.name">
				</div>
				
				<div v-if="errors.name" class="alert alert-danger">{{ errors.name[0] }}</div>
				
				<button type="submit" class="btn btn-primary mt-3">Create</button>
			</form>
		</div>
	</div>
</template>

<script>
import {nameValidation} from "@/validation/role";
import AxiosInstance from "@/services/AxiosInstance";
import router from "@/router";

export default {
	name: "CreateRole",
	
	data() {
		return {
			role: {
				name: null,
				project_id: this.$route.params.id,
				user_id: 0,
			},
			errors: {}
		}
	},
	
	methods: {
		submitForm() {
			this.errors.name = nameValidation(this.role.name)
			
			if (!this.errors.name) {
				
				AxiosInstance.post('/roles/store', this.role, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then((response) => {
					router.go(-1);
				}).catch(e => {
					console.log(e)
				})
			}
		}
	}
}
</script>

<style scoped>

</style>