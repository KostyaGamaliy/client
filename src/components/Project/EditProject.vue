<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-6 mx-auto">
				<h1>Edit Project</h1>
				<form @submit.prevent="submitForm">
					<div class="form-group">
						<label for="name">Name:</label>
						<input type="text" id="name" class="form-control" v-model="project.name">
					</div>
					<div class="form-group">
						<label for="description">Description:</label>
						<textarea id="description" class="form-control" v-model="project.descriptions"></textarea>
					</div>
<!--					<div class="form-group">-->
<!--						<label for="image">Image:</label>-->
<!--						<input type="file" id="image" class="form-control-file" @change="handleImageChange">-->
<!--					</div>-->
					<div class="form-group">
						<button type="submit" class="btn btn-primary">Update</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>

import AxiosInstance from "@/services/AxiosInstance";
import router from "@/router";
import Swal from "sweetalert2";

export default {
	data() {
		return {
			project: {},
		}
	},
	
	methods: {
		// handleImageChange(e) {
		// 	this.project.preview_image = e.target.files[0]
		// },
		
		submitForm() {
			AxiosInstance.put(`/projects/${this.project.id}/update`, {
				name: this.project.name,
				descriptions: this.project.descriptions
			}).then((response) => {
				router.push('/projects');
			}).catch(()=>{
				Swal.fire({
					icon: 'error',
					title: 'Something went wrong...',
					text: 'Incorrect data entered!',
					timer: 2500,
					showConfirmButton: false,
				})
			})
		},
		
		getProject(id) {
			AxiosInstance.get(`/projects/${id}`).then((response) => {
				this.project = response.data.data;
			});
		},
	},
	
	mounted() {
		const id = this.$route.params.id;
		this.getProject(id);
	},
}
</script>
