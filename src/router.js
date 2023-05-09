import{ createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/Auth.js";

const routes = [
	{
		path: "/",
		name: "home",
		component: () => import("@/pages/private/HomePage.vue"),
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/pages/public/LoginPage.vue"),
	},
	{
		path: "/register",
		name: "register",
		component: () => import("@/pages/public/RegisterPage.vue"),
	},
	{
		path: "/projects",
		name: "projects",
		component: () => import("@/pages/private/ProjectsPage.vue"),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/projects/:id",
		name: "project-view",
		component: () => import("@/components/Project/DisplayProject.vue"),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/projects/:id/edit",
		name: "project-edit",
		component: () => import("@/components/Project/EditProject.vue"),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/projects/tasks/:id",
		name: "task-view",
		component: () => import("@/components/Task/DisplayTask.vue"),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/projects/:projectId/tasks/:taskId/edit",
		name: "task-edit",
		component: () => import("@/components/Task/EditTask.vue"),
		meta: {
			requiresAuth: true
		}
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'exact-active',
});

router.beforeResolve((to, from, next) => {
	if (to.name) {
		NProgress.start()
	}
	next()
})

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	
	if (requiresAuth && !authStore.loggedIn) {
		next({ name: 'login' })
	} else {
		next()
	}
})

router.afterEach((to, from) => {
	NProgress.done()
})

export default router;