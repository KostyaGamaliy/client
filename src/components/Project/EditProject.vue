<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-6 mx-auto">
				<h1 class="text-center">Edit Project</h1>
				<form @submit.prevent="submitForm">
					<div class="d-flex justify-content-center mb-3 border">
						<img :src="previewImageSrc" class="card-img-top rounded-2" style="width: 286px; height: 10rem" alt="none image">
					</div>
					
					<div class="form-group">
						<label for="name">Name:</label>
						<input type="text" id="name" class="form-control" v-model="project.name">
					</div>
					
					<div v-if="errors.name" class="alert alert-danger">{{ errors.name[0] }}</div>
					
					<div class="form-group">
						<label for="description">Description:</label>
						<textarea id="description" class="form-control" v-model="project.descriptions"></textarea>
					</div>
					
					<div v-if="errors.descriptions" class="alert alert-danger">{{ errors.descriptions[0] }}</div>
					
					<div class="form-group">
						<label for="image">Image:</label>
						<input type="file" id="image" class="form-control-file" @change="handleImageChange">
					</div>
					
					<div v-if="errors.preview_image" class="alert alert-danger">{{ errors.preview_image[0] }}</div>
					
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
import {descriptionsValidation, imageValidation, nameValidation} from "@/validation/project";

export default {
	data() {
		return {
			project: {},
			errors: {},
			previewImage: null,
		}
	},
	
	methods: {
		handleImageChange(e) {
			this.previewImage = e.target.files[0];
			this.project.preview_image = this.previewImage;
		},
		
		submitForm() {
			this.errors.name = nameValidation(this.project.name)
			this.errors.descriptions = descriptionsValidation(this.project.descriptions)
			this.errors.preview_image = imageValidation(this.project.preview_image)
			
			if (!this.errors.name && !this.errors.descriptions && !this.errors.preview_image) {
				AxiosInstance.post(`/projects/${this.project.id}/update`, {
					'name': this.project.name,
					'descriptions': this.project.descriptions,
					'preview_image': this.project.preview_image
				}, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then((response) => {
					router.go(-1);
				}).catch((e) => {
					this.errors = e.response.data.errors
				})
			}
		},
		
		getProject(id) {
			AxiosInstance.get(`/projects/${id}`).then((response) => {
				this.project = response.data.data;
			});
		},
	},
	
	computed: {
		previewImageSrc() {
			if (this.previewImage) {
				return URL.createObjectURL(this.previewImage);
			} else {
				return 'http://localhost:85/storage/images/default-img-for-project.jpg';
			}
		}
	},
	
	mounted() {
		const id = this.$route.params.id;
		this.getProject(id);
	},
}
</script>
