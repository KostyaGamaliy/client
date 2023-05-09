<template>
	<div class="bg-white p-4 rounded">
		<div class="lead">
			Task info
		</div>
		
		<div class="container mt-4">
			<div class="row">
				<div class="col-md-6">
					<h4>Name</h4>
					<p>{{ task.name }}</p>
				</div>
				
				<div class="col-md-6">
					<h4>Status</h4>
					<p>{{ task.status }}</p>
				</div>
			</div>
			
			<div class="row mt-4">
				<div class="col-md-12">
					<h4>Description</h4>
					<p>{{ task.description }}</p>
				</div>
				
				<div class="col-md-6">
					<h4>Who working on this task</h4>
					<p>{{ task.user ? task.user.name : '' }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";

export default {
	name: "DisplayTask",
	
	data() {
		return {
			task: {}
		}
	},
	
	methods: {
		getTask(id) {
			AxiosInstance.get(`/projects/tasks/${id}`).then((response) => {
				console.log(response.data.data)
				this.task = response.data.data;
			});
		}
	},
	
	mounted() {
		const id = this.$route.params.id;
		console.log(id)
		this.getTask(id);
	},
}
</script>