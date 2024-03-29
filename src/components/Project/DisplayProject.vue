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
			
			<router-link v-if="project && project.id" :to="{ name: 'chat-show', params: { id: project.id } }"
			             class="btn btn-sm btn-primary me-3">
				<i class="fa fa-arrow-left"></i> Project chat
			</router-link>
			
			<router-link v-if="project && project.id" :to="{ name: 'dashboard-create', params: { id: project.id } }"
			             class="btn btn-sm btn-primary me-3">
				<i class="fa fa-arrow-left"></i> Create dashboard
			</router-link>
			
			<router-link v-if="project && project.id" :to="{ name: 'members-view', params: { id: project.id } }"
			             class="btn btn-sm btn-primary me-3">
				<i class="fa fa-arrow-left"></i> Show a participant on the project
			</router-link>
			
			<div class="d-flex flex-row justify-content-around shadow-sm" v-if="chooseDashboard">
				<router-link :to="{ name: 'task-create', params: { projectId: project.id, dashboardId: chooseDashboard } }"
				             class="btn btn-sm btn-primary me-3">
					<i class="fa fa-arrow-left"></i> Add task
				</router-link>
				<router-link :to="{ name: 'dashboard-edit', params: { projectId: project.id, dashboardId: chooseDashboard } }"
				             class="btn btn-sm btn-success me-3">
					<i class="fa fa-arrow-left"></i> Edit table
				</router-link>
				<button class="btn btn-sm btn-danger" @click="confirmDeleteTable(chooseDashboard)">
					Delete table
				</button>
			</div>
			
			<router-link :to=" { name: 'projects' } " class="btn btn-outline-secondary me-3">
				<i class="fa fa-arrow-left"></i> Back
			</router-link>
		</div>
		
		
		<div v-if="chooseDashboard !== null" class="rounded-1 mx-4 mt-3">
			<div v-if="tasks.length > 0">
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
						<td class="text-center">
							<router-link class="btn btn-info" :to="{ name: 'task-view', params: { id: task.id } }">
								INFO
							</router-link>
						</td>
						<td class="text-center" v-if="task.user_id == userId || project.creator_id == userId">
							<router-link class="btn btn-success"
							             :to="{ name: 'task-edit', params: { projectId: project.id, taskId: task.id } }">
								EDIT
							</router-link>
						</td>
						<td v-else></td>
						<td class="text-center" v-if="task.user_id == userId || project.creator_id == userId">
							<button class="btn btn-danger" @click="confirmDeleteTask(task.id)">
								DELETE
							</button>
						</td>
						<td v-else></td>
					</tr>
					</tbody>
				</table>
				
				<div class="container d-flex flex-column justify-content-center align-items-center">
					<button class="btn btn-primary" @click="downLoadPdf">Get data about project</button>
				</div>
			</div>
			
			<div v-else> No one data</div>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import router from "@/router";

export default {
	name: "DisplayProject",
	
	data() {
		return {
			project: {},
			dashboards: {},
			tasks: {},
			chooseDashboard: null,
			userId: null,
		};
	},
	
	methods: {
		getProject(id) {
			AxiosInstance.get(`/projects/${id}`)
				.then((response) => {
					this.project = response.data.data;
				})
				.catch(() => {
					router.push('/404')
				});
		},
		
		getDashboards(id) {
			AxiosInstance(`/projects/${id}/dashboards`).then((response) => {
				this.dashboards = response.data.dashboards;
			}).catch(() => {
				router.push('/404')
			})
		},
		
		getTasks(id) {
			AxiosInstance(`/projects/${id}/tasks`).then((response) => {
				this.tasks = response.data.tasks;
			}).catch(() => {
				router.push('/404')
			})
		},
		
		async confirmDeleteTable(id) {
			if (confirm('Are you sure?')) {
				try {
					await this.deleteTable(id);
				} catch (error) {
					console.error(error);
				}
			}
		},
		
		async deleteTable(id) {
			await AxiosInstance.delete(`/projects/dashboards/${id}/destroy`);
			window.location.reload();
		},
		
		async confirmDeleteTask(id) {
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
		},
		
		downLoadPdf() {
			AxiosInstance.post('/projects/create_pdf', {
				project_id: this.project.id
			}).catch((error) => {
				console.log(error);
			});
		}
	},
	
	mounted() {
		const id = this.$route.params.id;
		this.getProject(id);
		this.getDashboards(id);
		const userData = JSON.parse(window.localStorage.getItem('auth'));
		this.userId = userData.user.id;
	},
}
</script>