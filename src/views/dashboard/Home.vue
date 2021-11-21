<template>
	<v-app>
		<dashboard-core-app-bar />

		<dashboard-core-drawer />

		<dashboard-core-view />

		<!-- <template>
			<div class="home">
				<div class="home">
					<p v-if="isLoggedIn">User: {{ username }}</p>
					<button class="btn" @click="login" v-if="!isLoggedIn">Login</button>
					<button class="btn" @click="logout" v-if="isLoggedIn">Logout</button>
					<button class="btn" @click="getProtectedApiData" v-if="isLoggedIn">
						Get API data
					</button>
				</div>

				<div v-if="dataEventRecordsItems && dataEventRecordsItems.length">
					<div v-for="dataEventRecordsItem of dataEventRecordsItems" :key="dataEventRecordsItem.id">
						<p>
							<em>Id:</em> {{ dataEventRecordsItem.Id }} <em>Details:</em>
							{{ dataEventRecordsItem.Name }} -
							{{ dataEventRecordsItem.Description }}
						</p>
					</div>
					<br />
				</div>
			</div>
		</template> -->
	</v-app>
</template>

<script lang="ts">
	import axios from "axios";
	import { Vue, Component } from "vue-property-decorator";
	import AppBar from "./components/core/AppBar.vue";
	import Drawer from "./components/core/Drawer.vue";
	import CoreView from "./components/core/View.vue";
	import AuthService from "@/services/auth.service";

	const auth = new AuthService();

	@Component({
		components: {
			"dashboard-core-app-bar": AppBar,
			"dashboard-core-drawer": Drawer,
			"dashboard-core-view": CoreView,
		},
	})
	export default class Home extends Vue {
		name = "Home";
		// currentUser: string | undefined = "";
		// accessTokenExpired: boolean | undefined = false;
		// isLoggedIn = false;

		// dataEventRecordsItems: [] = [];

		// get username(): string {
		// 	return this.currentUser ? this.currentUser : "";
		// }

		// public login() {
		// 	auth.login();
		// }

		// public logout() {
		// 	auth.logout();
		// }

		// public mounted() {
		// 	auth.getUser().then((user) => {
		// 		if (user) {
		// 			this.currentUser = user.profile.name;
		// 			this.accessTokenExpired = user.expired;
		// 		}

		// 		this.isLoggedIn = user !== null && !user.expired;
		// 	});
		// }

		// public getProtectedApiData() {
		// 	const authorizationHeader = "Authorization";
		// 	auth.getAccessToken().then((userToken: string) => {
		// 		axios.defaults.headers.common[
		// 			authorizationHeader
		// 		] = `Bearer ${userToken}`;

		// 		axios
		// 			.get("https://localhost:5001/api/States")
		// 			.then((response: any) => {
		// 				this.dataEventRecordsItems = response.data;
		// 			})
		// 			.catch((error: any) => {
		// 				alert(error);
		// 			});
		// 	});
		// }
	}
</script>
<style>
	.btn {
		color: #42b983;
		font-weight: bold;
		background-color: #007bff;
		border-color: #007bff;
		display: inline-block;
		font-weight: 400;
		text-align: center;
		vertical-align: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		background-color: transparent;
		border: 1px solid #42b983;
		padding: 0.375rem 0.75rem;
		margin: 10px;
		font-size: 1rem;
		line-height: 1.5;
		border-radius: 0.25rem;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}
</style>
