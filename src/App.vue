<template>
	<div>
		<router-view :key="$route.name" />
		<v-btn @click="login">Login</v-btn>
		<v-btn @click="getStates">Get States</v-btn>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";
	import { UserManager, WebStorageStateStore } from "oidc-client";
	import { StatesClient } from "@/utils/Api";
	// import authService from "./utils/AuthorizeService";
	// import { ApplicationPaths } from "./utils/ApiAuthorizationConstants";
	import axios from "axios";
	import AuthService from "@/utils/AuthService";

	import { HTTP } from "./utils/http-common";


	@Component
	export default class App extends Vue {
		// name = "App";
			name = this.$route.name

		constructor() {
			super();
		}

		// private userManager: UserManager;

		// constructor() {
		// 	super();

		// 	this.userManager = new UserManager({
		// 		// userStore: new Oidc.WebStorageStateStore(),
		// 		authority: "https://localhost:44304",
		// 		client_id: "vue-client",
		// 		redirect_uri: window.location.origin,
		// 		response_type: "code",
		// 		scope: "openid profile read write dashboard-api",
		// 		post_logout_redirect_uri: window.location.origin,
		// 		// silent_redirect_uri: window.location.origin + '/static/silent-renew.html',
		// 		// accessTokenExpiringNotificationTime: 10,
		// 		// automaticSilentRenew: true,
		// 		// filterProtocolClaims: true,
		// 		loadUserInfo: true,
		// 	});
		// }

		// async updated() {
		// 	// console.log(await this.$route);
		// 	// const { code, scope, session_state, state } = this.$route.query;
		// 	// if (code && scope && session_state && state) {
		// 	// 	this.userManager.signinRedirectCallback().then((user) => {
		// 	// 		console.log(user);
		// 	// 		this.$router.push("/");
		// 	// 	});
		// 	// }
		// 	// this.login();
		// }

		async updated() {
			// const { code, scope, session_state, state } = this.$route.query;
			// if (code && scope && session_state && state) {
			// 	auth.signinRedirectCallback().then((user) => {
			// 		this.$router.push("/");
			// 		console.log("user: ", user);
			// 	});
			// }
		}

		public async login(): Promise<any> {
			AuthService.login();
			// return this.userManager.signinRedirect();
		}

		public mounted() {
			// auth.getUser().then((user) => {
			// 	if (user !== null) {
			// 		this.currentUser = user.profile.name;
			// 		this.accessTokenExpired = user.expired;
			// 	}
			// 	console.log(user);
			// 	this.isLoggedIn = user !== null && !user.expired;
			// });
		}

		public async getStates(): Promise<void> {
			const statesCient = new StatesClient()
			// console.log(await statesCient.get());
		}
	}
</script>
