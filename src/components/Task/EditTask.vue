<template>
	<div class="bg-white p-4 rounded">
		<div class="lead">
			Edit task
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
					<label for="name" class="form-label">Status</label>
					<input type="text" id="name" class="form-control" v-model="task.status">
				</div>
				
				<div v-if="errors.status" class="alert alert-danger">{{ errors.status[0] }}</div>
				
				<div class="mb-3">
					<label for="user_id" class="form-label">Select who will be doing this task</label>
					<select v-if="task.user" class="form-select shadow-none" v-model="task.user.id">
						<option v-for="user in users" :value="user.id" :selected="task.user.id === user.id">{{ user.name }}</option>
					</select>
				</div>
				
				<div v-if="errors.selectUser" class="alert alert-danger">{{ errors.selectUser[0] }}</div>
				
				<button type="submit" class="btn btn-outline-primary shadow-none">Update task</button>
			</form>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import router from "@/router";
import Swal from "sweetalert2";
import {descriptionValidation, nameValidation, statusValidation, usersValidation} from "@/validation/task";

export default {
	name: "EditTask",
	
	data() {
		return {
			task: {},
			users: {},
			errors: {}
		}
	},
	
	methods: {
		submitForm(id) {
			this.errors.name = nameValidation(this.task.name)
			this.errors.description = descriptionValidation(this.task.description)
			this.errors.status = statusValidation(this.task.status)
			this.errors.selectUser = usersValidation(this.task.user.id)
			
			if (!this.errors.name && !this.errors.description && !this.errors.status && !this.errors.selectUser) {
				AxiosInstance.put(`/projects/tasks/${this.task.id}/update`, {
					id: this.task.id,
					user_id: this.task.user.id,
					assigner_id: this.task.assigner_id,
					dashboard_id: this.task.dashboard_id,
					name: this.task.name,
					description: this.task.description,
					status: this.task.status
				}).then((response) => {
					router.push(`/projects/${id}`);
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
		},
		
		getTask(id) {
			AxiosInstance.get(`/projects/tasks/${id}`).then((response) => {
					this.task = response.data.data;
			});
		},
		
		getUsers(id) {
			AxiosInstance.get(`/projects/${id}`).then((response) => {
				this.users = response.data.data.users;
			});
		}
	},
	
	mounted() {
		const taskId = this.$route.params.taskId;
		const projectId = this.$route.params.projectId;
		
		this.getTask(taskId);
		this.getUsers(projectId);
	}
}
</script>