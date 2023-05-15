<template>
	<header-app />
	<search-projects :per-page="perPage" @search="handleSearch" @sortDate="handleSort"/>
	<display-projects :projects="displayedProjects"/>
	<pagination-projects :current-page="currentPage" :page-count="pageCount" :total-pages="totalPages" @page-change="currentPage = $event"/>
</template>

<script>
import DisplayProjects from "@/components/Projects/DisplayProjects.vue";
import PaginationProjects from "@/components/Projects/PaginationProjects.vue";
import SearchProjects from "@/components/Projects/SearchProjects.vue";
import HeaderApp from "@/components/HeaderApp.vue";
import AxiosInstance from "@/services/AxiosInstance";
import {mapState} from "pinia";
import {useAuthStore} from "@/store/Auth";

export default{
	name: "ProjectsPage",
	components:{DisplayProjects, PaginationProjects, SearchProjects, HeaderApp},
	data() {
		return {
			projects: [],
			searchQuery: '',
			dateSort: false,
			currentPage: 1,
			perPage: 8,
			totalPages: 0,
			displayedProjects: [],
			userId: null,
		}
	},
	
	methods: {
		getProjects() {
			AxiosInstance.get(`/projects?search=${this.searchQuery}&perPage=${this.perPage}&page=${this.currentPage}&userId=${this.userId}&byDate=${this.dateSort}`)
				.then((response) => {
					this.projects = response.data.data;
					this.displayedProjects = this.projects;
					this.totalPages = response.data.pagination.totalPages;
				});
		},
		handleSearch(query, page, perPage) {
			this.searchQuery = query;
			this.currentPage = page;
			this.perPage = perPage;
			this.getProjects();
		},
		handleSort(query, page, perPage, sortByDate) {
			this.searchQuery = query;
			this.currentPage = page;
			this.perPage = perPage;
			this.dateSort = sortByDate;
			this.getProjects();
		}
	},
	
	computed: {
		pageCount() {
			return this.totalPages;
		},
	},
	
	watch: {
		currentPage: function () {
			this.getProjects();
		},
		searchQuery: function () {
			this.currentPage = 1;
			this.getProjects();
		},
	},
	
	mounted() {
		const localStorageData = JSON.parse(window.localStorage.getItem('auth'));
		this.userId = localStorageData.user.id;
		this.getProjects();
	},
}
</script>