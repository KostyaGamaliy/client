<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		<div class="d-flex align-items-center justify-content-around">
			<div class="text-center display-4">
				Delete role
			</div>
			
			<router-link :to="{ name: 'members-view', params: {} }" class="btn btn-outline-secondary me-3">
				<i class="fa fa-arrow-left"></i> Back
			</router-link>
		</div>
		
		<div class="container mt-4 p-0">
			<form @submit.prevent="submitForm()">
				
				<div class="mb-3">
					<label for="user_id" class="form-label">Select role</label>
					<select class="form-select shadow-none" v-model="selectRole">
						<option v-for="item in roles" :value="item.id">{{ item.name }}</option>
					</select>
				</div>
				
				<div v-if="errors.role" class="alert alert-danger">{{ errors.role[0] }}</div>
				
				<button type="submit" class="btn btn-outline-primary shadow-none">Delete role</button>
			</form>
		</div>
	</div>
</template>

<script>
import {deleteRoleValidation} from "@/validation/role";
import AxiosInstance from "@/services/AxiosInstance";
import router from "@/router";

export default {
	name: "DeleteRole",
	
	data() {
		return {
			roles: {},
			selectRole: null,
			errors: {}
		}
	},
	
	methods: {
		getRoles(id) {
			AxiosInstance.get(`/projects/${id}/members/create`).then((response) => {
				this.roles = response.data.roles
			})
		},
		
		submitForm() {
			this.errors.name = deleteRoleValidation(this.selectRole)
			
			if (!this.errors.name) {
				AxiosInstance.delete(`/roles/${this.selectRole}/destroy`).then((response) => {
					router.go(-1);
				})
			}
		}
	},
	
	mounted() {
		const projectId = this.$route.params.id
		
		this.getRoles(projectId);
	}
}
</script>

<style scoped>

</style>