<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		<div class="d-flex align-items-center justify-content-around">
			<div class="text-center display-4">
				Create project
			</div>
			
			<router-link :to="{ name: 'projects' }" class="btn btn-outline-secondary me-3">
				<i class="fa fa-arrow-left"></i> Back
			</router-link>
		</div>
		
		<div class="mx-auto my-3" style="width: 900px">
			<form @submit.prevent="submitForm()">
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
				
				<button type="submit" class="btn btn-primary mt-3">Create</button>
			</form>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import router from "@/router";
import {descriptionsValidation, imageValidation, nameValidation} from "@/validation/project";

export default {
	name: "CreateProject",
	
	data() {
		return {
			project: {
				name: null,
				descriptions: null,
				preview_image: null,
			},
			userId: null,
			errors: {}
		}
	},
	
	methods: {
		handleImageChange(e) {
			this.project.preview_image = e.target.files[0]
		},
		
		submitForm() {
			this.errors.name = nameValidation(this.project.name)
			this.errors.descriptions = descriptionsValidation(this.project.descriptions)
			this.errors.preview_image = imageValidation(this.project.preview_image)
			
			if (!this.errors.name && !this.errors.descriptions && !this.errors.preview_image) {
				let formData = new FormData();
				formData.append('name', this.project.name);
				formData.append('descriptions', this.project.descriptions);
				formData.append('preview_image', typeof (this.project.preview_image) === "string" ? null : this.project.preview_image);
				formData.append('user_id', this.userId);
				
				AxiosInstance.post('/projects/store', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then((response) => {
					router.go(-1);
				})
			}
		}
	},
	
	mounted() {
		const userData = JSON.parse(window.localStorage.getItem('auth'));
		this.userId = userData.user.id;
	}
}
</script>