import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AuthService from "../utils/AuthService";
import OidcCallback from "../views/OidcCallback.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		component: () => import("@/views/dashboard/Home.vue"),
		children: [
			{
				path: "/oidc-callback", // Needs to match redirectUri (redirect_uri if you use snake case) in you oidcSettings
				name: "oidcCallback",
				component: OidcCallback,
			},
			{
				name: "Dashboard",
				path: "",
				component: () => import("@/views/dashboard/Dashboard.vue"),
				async beforeEnter(to, from, next) {
					const loggedIn = await AuthService.isLoggedIn();
					if (loggedIn) {
						next();
					} else {
						AuthService.login();
					}
				},
			},
			// {
			// 	name: "Crud",
			// 	path: "/:crud",
			// 	component: () => import("@/views/crud/Crud.vue"),
			// },
			// Pages
			// {
			//   name: 'User Profile',
			//   path: 'pages/user',
			//   component: () => import('@/views/dashboard/pages/UserProfile.vue'),
			// },
			// {
			//   name: 'Notifications',
			//   path: 'components/notifications',
			//   component: () => import('@/views/dashboard/component/Notifications.vue'),
			// },
			// {
			//   name: 'Icons',
			//   path: 'components/icons',
			//   component: () => import('@/views/dashboard/component/Icons.vue'),
			// },
			// {
			//   name: 'Typography',
			//   path: 'components/typography',
			//   component: () => import('@/views/dashboard/component/Typography.vue'),
			// },
			// // Tables
			// {
			//   name: 'Regular Tables',
			//   path: 'tables/regular-tables',
			//   component: () => import('@/views/dashboard/tables/RegularTables.vue'),
			// },
			// // Maps
			// {
			//   name: 'Google Maps',
			//   path: 'maps/google-maps',
			//   component: () => import('@/views/dashboard/maps/GoogleMaps.vue'),
			// },
			// // Upgrade
			// {
			//   name: 'Upgrade',
			//   path: 'upgrade',
			//   component: () => import('@/views/dashboard/Upgrade.vue'),
			// },
		],
	},
];

const cruds = ["Types", "Statuses", "Currencies", "States", "Leagues"];

cruds.forEach((element) => {
	routes[0].children?.push({
		name: element,
		path: `/${element.toLowerCase()}`,
		component: () => import("@/views/crud/Crud.vue"),
		meta: {
			isSecure: true,
		},
	});
});

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.isSecure)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		AuthService.isLoggedIn().then((isLoggedIn: boolean) => {
			if (isLoggedIn) {
				next();
			} else {
				next("/");
			}
		});
	} else {
		next();
	}
});

export default router;
