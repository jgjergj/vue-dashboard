import { UserManager, WebStorageStateStore, User } from "oidc-client";

class AuthService {

	private userManager: UserManager;

	constructor() {
		const AUTH0_DOMAIN = "https://localhost:44304"; // e.g. https://jerrie.auth0.com

		const settings: any = {
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
			authority: AUTH0_DOMAIN,

			// filterProtocolClaims: true,
			// metadata: {
			// 	issuer: AUTH0_DOMAIN + "/",
			// 	authorization_endpoint: AUTH0_DOMAIN + "/authorize",
			// 	userinfo_endpoint: AUTH0_DOMAIN + "/userinfo",
			// 	end_session_endpoint: AUTH0_DOMAIN + "/v2/logout",
			// 	jwks_uri: AUTH0_DOMAIN + "/.well-known/jwks.json",
			// },
		};

		this.userManager = new UserManager(settings);
	}

	public getUser(): Promise<User | null> {
		return this.userManager.getUser();
	}

	public login(): Promise<void> {
		return this.userManager.signinRedirect();
	}

	public logout(): Promise<void> {
		return this.userManager.signoutRedirect();
	}

	public async signinRedirectCallback() {
		return this.userManager.signinRedirectCallback();
	}

    public async isLoggedIn(): Promise<boolean> {
        const user: User | null = await this.getUser();

        return (user !== null && !user.expired);
    }

	public async getAccessToken(): Promise<string> {
		return (await this.userManager.getUser() as User).access_token;
	}
}

const authService = new AuthService();

export default authService;
