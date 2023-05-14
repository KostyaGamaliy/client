<template>
	<div class="bg-white p-4 rounded">
		<div class="lead">
			Edit table
		</div>
		
		<div class="container mt-4 p-0">
			<form @submit.prevent="submitForm($route.params.dashboardId)">
				<div class="mb-3">
					<label for="name" class="form-label">Name</label>
					<input type="text" id="name" class="form-control" v-model="dashboard.name">
				</div>
				
				<div v-if="errors.name" class="alert alert-danger">{{ errors.name[0] }}</div>
				
				<button type="submit" class="btn btn-outline-primary shadow-none">Update table</button>
			</form>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import router from "@/router";
import {nameValidation} from "@/validation/dashboard";

export default {
	name: "EditDashboard",
	
	data() {
		return {
			dashboard: {},
			errors: {}
		}
	},
	
	methods: {
		submitForm(id) {
			this.errors.name = nameValidation(this.dashboard.name)
			
			if (!this.errors.name) {
				AxiosInstance.put(`/projects/dashboards/${id}/update`, {
					name: this.dashboard.name,
					project_id: this.$route.params.projectId
				}).then((response) => {
					router.push(`/projects/${this.$route.params.projectId}`)
				})
			}
		},
		
		getDashboard(projectId, dashboardId) {
			AxiosInstance(`/projects/${projectId}/dashboards/${dashboardId}`).then((response) => {
				console.log(response.data)
				this.dashboard = response.data.data;
			})
		}
	},
	
	mounted() {
		const projectId = this.$route.params.projectId
		const dashboardId = this.$route.params.dashboardId
		
		this.getDashboard(projectId, dashboardId)
	}
}
</script>