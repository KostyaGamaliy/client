import{ createRouter, createWebHistory } from "vue-router";

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

router.afterEach((to, from) => {
	NProgress.done()
})

export default router;