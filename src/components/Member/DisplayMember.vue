<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		<div class="d-flex align-items-center justify-content-around">
			<div class="text-center display-4">
				Members
			</div>
			
			<router-link v-if="project && project.id" :to="{ name: 'member-create', params: { id: this.$route.params.id } }"
			             class="btn btn-sm btn-primary me-3">
				<i class="fa fa-arrow-left"></i> Add a participant to the project
			</router-link>
			
			<router-link :to=" { name: 'project-view', params: { id: this.$route.params.id } } "
			             class="btn btn-outline-secondary me-3">
				<i class="fa fa-arrow-left"></i> Back
			</router-link>
		</div>
		
		<div class="rounded-1 mx-4 mt-3" v-if="project.users">
			<table class="table table-dark">
				<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col" class="text-center">Name</th>
					<th scope="col" class="text-center">Role</th>
					<th scope="col" class="text-center">Info</th>
					<th scope="col" class="text-center">Edit</th>
					<th scope="col" class="text-center" v-if="project.creator_id === mainUser.id">Delete</th>
				</tr>
				</thead>
				<tbody v-for="user in project.users" :key="user.id">
				<tr>
					<th scope="row">{{ user.id }}</th>
					<td class="text-center">{{ user.name }}</td>
					<template v-for="role in roles">
						<td v-if="role.user_id === user.id && role.project_id === project.id" class="text-center">{{ role.name }}</td>
					</template>
					<td class="text-center">
						<router-link type="button" class="btn btn-primary" :to="{ name: 'member-info', params: { projectId: project.id, memberId: user.id } }">INFO</router-link>
					</td>
					<td class="text-center">
							<router-link class="btn btn-success" type="submit" :to="{ name: 'member-edit', params: { projectId: project.id, memberId: user.id } }">
								EDIT
							</router-link>
					</td>
					<td class="text-center" v-if="project.creator_id === mainUser.id">
						<button v-if="mainUser.id !== user.id" type="button" class="btn btn-danger" @click="confirmDelete(this.$route.params.id, user.id)">
						Remove from the project
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
	name: "DisplayMember",
	
	data() {
		return {
			project: {},
			roles: {},
			mainUser: null,
		}
	},
	
	methods: {
		getProject(id) {
			AxiosInstance.get(`/projects/${id}`).then((response) => {
				this.project = response.data.data;
			});
		},
		
		getRoles() {
			AxiosInstance.get('/roles').then((response) => {
				this.roles = response.data.roles
			})
		},
		
		async confirmDelete(projectId, memberId) {
			if (confirm('Are you sure?')) {
				try {
					await this.deleteMember(projectId, memberId);
				} catch (error) {
					console.error(error);
				}
			}
		},
		
		async deleteMember(projectId, memberId) {
			await AxiosInstance.delete(`/projects/${projectId}/members/${memberId}/destroy`);
			window.location.reload();
		},
	},
	
	mounted() {
		const userData = JSON.parse(window.localStorage.getItem('auth'));
		const id = this.$route.params.id;
		this.getProject(id);
		this.mainUser = userData.user;
		this.getRoles();
	}
}
</script>