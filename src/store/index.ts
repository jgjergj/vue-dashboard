import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { WebStorageStateStore } from "oidc-client";

Vue.use(Vuex);

const settings: any = {
	authority: "https://localhost:44304",
	client_id: "vue-client",
	redirect_uri: "http://localhost:8080/oidc-callback",
	response_type: "code",
	scope: "openid profile read write dashboard-api",
	post_logout_redirect_uri: "http://localhost:8080",
	// silent_redirect_uri: window.location.origin + '/static/silent-renew.html',
	// accessTokenExpiringNotificationTime: 10,
	// automaticSilentRenew: true,
	// filterProtocolClaims: true,
	// loadUserInfo: true,

	userStore: new WebStorageStateStore({ store: window.localStorage }),

	// filterProtocolClaims: true,
	// metadata: {
	// 	issuer: AUTH0_DOMAIN + "/",
	// 	authorization_endpoint: AUTH0_DOMAIN + "/authorize",
	// 	userinfo_endpoint: AUTH0_DOMAIN + "/userinfo",
	// 	end_session_endpoint: AUTH0_DOMAIN + "/v2/logout",
	// 	jwks_uri: AUTH0_DOMAIN + "/.well-known/jwks.json",
	// },
};

export default new Vuex.Store({
	state: {
		barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
		barImage:
			"https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
		drawer: null,
	},
	mutations: {
		SET_BAR_IMAGE(state, payload) {
			state.barImage = payload;
		},
		SET_DRAWER(state, payload) {
			state.drawer = payload;
		},
	},
	actions: {},
	plugins: [createPersistedState()],
});
