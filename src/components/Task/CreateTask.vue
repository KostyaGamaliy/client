<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		
		<div class="bg-white p-4 rounded">
			<div class="lead">
				Add new task
			</div>
			
			<div class="container mt-4 p-0">
				<form @submit.prevent="submitForm($route.params.projectId)">
					<div class="mb-3">
						<label for="name" class="form-label">Name</label>
						<input type="text" id="name" class="form-control" v-model="task.name">
					</div>
					
					<div v-if="errors.name" class="alert alert-danger">{{ errors.name[0] }}</div>
					
					<div class="mb-3">
						<label for="name" class="form-label">Description</label>
						<input type="text" id="name" class="form-control" v-model="task.description">
					</div>
					
					<div v-if="errors.description" class="alert alert-danger">{{ errors.description[0] }}</div>
					
					<div class="mb-3">
						<label for="selectUser" class="form-label">Select who will be doing this task</label>
						<select class="form-select" id="selectUser" v-model="task.selectUser">
							<option v-for="(user, index) in users" :key="index" :value="user.id">{{ user.name }}</option>
						</select>
					</div>
					
					<div v-if="errors.selectUser" class="alert alert-danger">{{ errors.selectUser[0] }}</div>
					
					<button type="submit" class="btn btn-outline-primary shadow-none">Create table</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import router from "@/router";
import {descriptionValidation, nameValidation, usersValidation} from "@/validation/task";

export default {
	name: "CreateTask",
	
	data() {
		return {
			task: {
				name: null,
				description: null,
				selectUser: null
			},
			users: [],
			errors: {}
		}
	},
	
	methods: {
		submitForm(id) {
			this.errors.name = nameValidation(this.task.name)
			this.errors.description = descriptionValidation(this.task.description)
			this.errors.selectUser = usersValidation(this.task.selectUser)
			
			if (!this.errors.name && !this.errors.description && !this.errors.selectUser) {
				const auth = JSON.parse(localStorage.getItem('auth'));
				
				AxiosInstance.post(`/projects/tasks/store`, {
					name: this.task.name,
					descriptions: this.task.description,
					status: "Not started",
					user_id: this.task.selectUser,
					assigner_id: auth.user.id,
					dashboard_id: this.$route.params.dashboardId,
				}).then((response) => {
					router.push(`/projects/${id}`)
				})
			}
		},
		
		getUsers(id) {
			AxiosInstance.get(`/projects/${id}`).then((response) => {
				this.users = response.data.data.users;
			});
		}
	},
	
	mounted() {
		const projectId = this.$route.params.projectId;
		this.getUsers(projectId);
	}
}
</script>