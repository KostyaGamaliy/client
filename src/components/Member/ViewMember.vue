<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		
		<div class="d-flex align-items-center justify-content-around">
			<div class="bg-white p-4 rounded">
				<div class="lead">
					User info
				</div>
			</div>
			
			<router-link :to=" { name: 'members-view', params: { id: this.$route.params.projectId } } "
			             class="btn btn-outline-secondary me-3">
				<i class="fa fa-arrow-left"></i> Back
			</router-link>
		</div>
		
		<div class="container mt-4">
			<div class="row">
				<div class="col-md-6">
					<h4>Name</h4>
					<p>{{ member.name }}</p>
				</div>
				
				<div class="col-md-6">
					<h4>Role name</h4>
					<p>{{ role.name }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";

export default {
	name: "ViewMember",
	
	data() {
		return {
			member: {},
			role: {},
		}
	},
	
	methods: {
		getUser(id) {
			AxiosInstance.get(`/projects/${this.$route.params.projectId}/members/${id}`).then((response) => {
				console.log(response.data)
				this.member = response.data.member;
				this.role = response.data.role[0];
			});
		}
	},
	
	mounted() {
		const memberId = this.$route.params.memberId
		this.getUser(memberId)
	}
}
</script>