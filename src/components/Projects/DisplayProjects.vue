<template>
	<div>
		<div class="container d-flex justify-content-evenly flex-wrap" v-if="projects.length>0">
			<div class="col" v-for="project in projects" :key="project.id">
				<div class="card my-1 mx-auto" style="width: 18rem;">
					<router-link :to="{ name: 'project-view', params: { id: project.id } }">
						<img :src="`http://localhost:85/storage/${project.preview_image}`" class="card-img-top"
						     style="width: 286px; height: 10rem" alt="Project Photo">
					</router-link>
					<div class="card-body">
						<h5 class="card-title text-truncate">{{ project.name }}</h5>
						<p class="card-text text-truncate">{{ project.descriptions }}</p>
					</div>
					<div class="d-flex justify-content-around pb-3">
							<button class="btn btn-primary" @click="downloadPDF(project.id)">Make PDF</button>
						<router-link type="button" class="btn btn-primary" :to="{ name: 'project-edit', params: { id: project.id } }">Edit</router-link>
						<button type="submit" class="btn btn-danger" @click="confirmDelete(project.id)">Delete</button>
					</div>
				</div>
			</div>
		</div>
		
		<div v-else>
			<h1 class="text-center text-white">Nothing found</h1>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import Pusher from "pusher-js";
export default {
	name: "DisplayProjects",
	
	props: {
		projects: {
			type: Array,
			default: () => [],
		},
	},
	
	methods: {
		async confirmDelete(id) {
			if (confirm('Are you sure?')) {
				try {
					await this.deleteProject(id);
				} catch (error) {
					console.error(error);
				}
			}
		},
		
		async deleteProject(id) {
			await AxiosInstance.delete(`/projects/${id}/destroy`);
			window.location.reload();
		},
		
		downloadPDF(id) {
			AxiosInstance.get(`/pdf-download/${id}`)
				.then(() => {
					const pusher = new Pusher('0ef8d31fe818b7949d4b', {
						cluster: 'eu',
						useTLS: true
					});
					
					const channel = pusher.subscribe('pms');
					channel.bind('pdf-ready', data => {
						window.open(data.url, '_blank');
					});
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
}
</script>