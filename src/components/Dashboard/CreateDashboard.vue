<template>
	<div class="bg-white p-4 rounded">
		<div class="lead">
			Add new table
		</div>
		
		<div class="container mt-4 p-0">
			<form @submit.prevent="submitForm(this.$route.params.id)">
				<label for="name">Name:</label>
				<input type="text" id="name" class="form-control" v-model="dashboard.name">
				
				<div v-if="errors.name" class="alert alert-danger">{{ errors.name[0] }}</div>
				
				<button type="submit" class="btn btn-outline-primary shadow-none">Create table</button>
			</form>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import router from "@/router";
import Swal from "sweetalert2";
import {nameValidation} from "@/validation/dashboard";

export default {
	name: "CreateDashboard",
	
	data() {
		return {
			dashboard: {
				name: null,
			},
			errors: {}
		}
	},
	
	methods: {
		submitForm(id) {
			this.errors.name = nameValidation(this.dashboard.name)
			
			if (!this.errors.name) {
				AxiosInstance.post(`/projects/${id}/dashboards/store`, {
					name: this.dashboard.name,
					project_id: id
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
	}
}
</script>