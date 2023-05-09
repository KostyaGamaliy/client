<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		<div class="d-flex align-items-center justify-content-around">
			<div class="text-center display-4">
				{{ project.name }}
			</div>
			
			<div class="d-flex align-items-center">
				<select v-model="chooseDashboard" class="form-select mx-5">
					<option hidden selected value="">Choose dashboard</option>
					<option v-for="dashboard in dashboards" :value="dashboard.id" :key="dashboard.id"
					        @click="getTasks(dashboard.id)">{{ dashboard.name }}
					</option>
				</select>
			</div>
			
			<router-link :to=" {name: 'projects'} " class="btn btn-outline-secondary me-3">
				<i class="fa fa-arrow-left"></i> Back
			</router-link>
		</div>
		
		
		<div v-if="tasks.length > 0" class="rounded-1 mx-4 mt-3">
			<table class="table table-dark">
				<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col" class="text-center">Name</th>
					<th scope="col" class="text-center">Status</th>
					<th scope="col" class="text-center">Info</th>
					<th scope="col" class="text-center">Edit</th>
					<th scope="col" class="text-center">Delete</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="task in tasks">
					<th scope="row">{{ task.id }}</th>
					<td class="text-center">{{ task.name }}</td>
					<td class="text-center">{{ task.status }}</td>
					<td>
						<router-link class="btn btn-info" :to="{ name: 'task-view', params: { id: task.id } }">
							INFO
						</router-link>
					</td>
					<td>
						<button class="btn btn-success" type="submit">
							EDIT
						</button>
					</td>
					<td>
						<button class="btn btn-danger" @click="confirmDelete(task.id)">
							DELETE
						</button>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";

export default {
	name: "DisplayProject",
	
	data() {
		return {
			project: {},
			dashboards: {},
			tasks: {},
			chooseDashboard: null,
		};
	},
	
	methods: {
		getProject(id) {
			AxiosInstance.get(`/projects/${id}`).then((response) => {
				this.project = response.data.data;
			});
		},
		
		getDashboards(id) {
			AxiosInstance(`/projects/${id}/dashboards`).then((response) => {
				this.dashboards = response.data.dashboards;
			})
		},
		
		getTasks(id) {
			AxiosInstance(`/projects/${id}/tasks`).then((response) => {
				this.tasks = response.data.tasks;
			})
		},
		
		async confirmDelete(id) {
			if (confirm('Are you sure?')) {
				try {
					await this.deleteTask(id);
				} catch (error) {
					console.error(error);
				}
			}
		},
		
		async deleteTask(id) {
			await AxiosInstance.delete(`/projects/tasks/${id}/destroy`);
			window.location.reload();
		}
	},
	
	mounted() {
		const id = this.$route.params.id;
		this.getProject(id);
		this.getDashboards(id);
	},
}
</script>