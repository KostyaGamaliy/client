<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		
		<div class="bg-white p-4 rounded">
			<div class="lead">
				Edit participant
			</div>
			
			<div class="container mt-4 p-0">
				<form @submit.prevent="submitForm(user.id, userRole.id)">
					<div class="mb-3">
						<label for="name" class="form-label">Name</label>
						<input type="text" id="name" class="form-control" v-model="user.name" disabled>
					</div>
					<div class="mb-3">
						<label for="user_id" class="form-label">Select role</label>
						<select class="form-select shadow-none" v-model="userRole.id">
							<option v-for="item in roles" :value="item.id" :selected="userRole.id === item.id">{{ item.name }}</option>
						</select>
					</div>
					
					<div v-if="errors.role" class="alert alert-danger">{{ errors.role[0] }}</div>
					
					<button type="submit" class="btn btn-outline-primary shadow-none">Update user</button>
					<router-link :to=" { name: 'members-view', params: { id: this.$route.params.projectId } } "
					             class="btn btn-outline-secondary mx-3">
						<i class="fa fa-arrow-left"></i> Back
					</router-link>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import router from "@/router";
import Swal from "sweetalert2";
import {roleValidation} from "@/validation/member";

export default {
	name: "EditMember",
	
	data() {
		return {
			user: {},
			userRole: {},
			roles: {},
			errors: {}
		}
	},
	
	methods: {
		getUser(id) {
			AxiosInstance.get(`/projects/${this.$route.params.projectId}/members/${id}`).then((response) => {
				this.user = response.data.member;
				response.data.role[0] ? this.userRole = response.data.role[0] : this.userRole.id = null;
			});
		},
		
		getRoles(id) {
			AxiosInstance.get(`/projects/${id}/members/create`).then((response) => {
				this.roles = response.data.roles
			})
		},
		
		submitForm(memberId, roleId) {
			this.errors.role = roleValidation(this.userRole.id)
			
			if (!this.errors.role) {
				AxiosInstance.put(`/projects/members/${memberId}/update/${roleId}/${this.$route.params.projectId}`).then((response) => {
					router.go(-1);
				}).catch(() => {
					Swal.fire({
						icon: 'error',
						title: 'Something went wrong...',
						text: 'Incorrect data entered!',
						timer: 2500,
						showConfirmButton: false,
					})
				})
			}
		}
	},
	
	mounted() {
		const userId = this.$route.params.memberId
		const projectId = this.$route.params.projectId
		
		this.getUser(userId);
		this.getRoles(projectId);
	}
}
</script>