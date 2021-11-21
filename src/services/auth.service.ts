import { UserManager, WebStorageStateStore, User } from 'oidc-client';

export default class AuthService {
    private userManager: UserManager;

    constructor() {
        const STS_DOMAIN = 'https://localhost:44304';

        const settings: any = {
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            authority: STS_DOMAIN,
            client_id: 'vue-client',
            redirect_uri: 'http://localhost:8080/oidc-callback',
            automaticSilentRenew: true,
            silent_redirect_uri: 'http://localhost:8080/silent-renew.html',
            response_type: 'code',
            scope: 'openid profile read write dashboard-api',
            post_logout_redirect_uri: 'http://localhost:8080',
            filterProtocolClaims: true,
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

    public getAccessToken(): Promise<string> {
        return this.userManager.getUser().then((data: any) => {
            return data.access_token;
        });
    }
}
