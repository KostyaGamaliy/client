<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		<div class="d-flex align-items-center justify-content-around">
			<div class="text-center display-4">
				Add a participant to the project
			</div>
			
			<router-link :to=" { name: 'members-view', params: { id: this.$route.params.id } } "
			             class="btn btn-outline-secondary me-3">
				<i class="fa fa-arrow-left"></i> Back
			</router-link>
		</div>
		
		<div class="container mt-4 p-0">
			<form @submit.prevent="submitForm(this.$route.params.id)">
				<div class="mb-3">
					<label for="user_id" class="form-label">Select user</label>
					<select class="form-select shadow-none" v-model="selectUser">
						<option v-for="user in users" :value="user.id">{{ user.name }}</option>
					</select>
				</div>
				
				<div v-if="errors.selectUser" class="alert alert-danger">{{ errors.selectUser[0] }}</div>
				
				<div class="mb-3">
					<label for="user_id" class="form-label">Select role</label>
					<select class="form-select shadow-none" v-model="selectRole">
						<option v-for="role in roles" :value="role.id">{{ role.name }}</option>
					</select>
				</div>
				
				<div v-if="errors.role" class="alert alert-danger">{{ errors.role[0] }}</div>
				
				<div class="mb-3" v-if="permissions.length > 0">
					<label for="permission_id" class="form-label">Permissions</label>
					<select class="form-select shadow-none"
					        id="inputPermission"
					        multiple
					        disabled>
						<option v-for="permission in permissions" :value="permission.id">{{ permission.description }}</option>
					</select>
				</div>
				
				<button type="submit" class="btn btn-outline-primary shadow-none">Add</button>
			</form>
		</div>
	</div>
</template>

<script>
import {Axios} from "axios";
import AxiosInstance from "@/services/AxiosInstance";
import router from "@/router";
import {roleValidation, userValidation} from "@/validation/member";

export default {
	name: "CreateMember",
	
	data() {
		return {
			users: {},
			roles: {},
			permissions: {},
			errors: {},
			selectUser: null,
			selectRole: null,
		}
	},
	
	methods: {
		submitForm(id) {
			this.errors.selectUser = userValidation(this.selectUser)
			this.errors.role = roleValidation(this.selectRole)
			
			if (!this.errors.selectUser && !this.errors.role) {
				AxiosInstance.post(`/projects/${id}/members/store`, {
					user_id: this.selectUser,
					role_id: this.selectRole
				}).then((response) => {
					router.go(-1);
				})
			}
		},
		
		getUsers(id) {
			AxiosInstance.get(`/projects/${id}/members/create`).then((response) => {
				this.users = response.data.users;
				this.roles = response.data.roles;
			})
		},
		
		getPermissions(id) {
			AxiosInstance.get(`/roles/${id}/get-permissions`).then((response) => {
				console.log(response.data.permissions)
				this.permissions = response.data.permissions
			})
		}
	},
	
	mounted() {
		const id = this.$route.params.id;
		this.getUsers(id);
	},
	
	watch: {
		selectRole: function (newVal, oldVal) {
			this.getPermissions(newVal);
		}
	},
}
</script>