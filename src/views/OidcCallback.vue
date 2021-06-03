<template>
	<div></div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
    import AuthService from "@/utils/AuthService";

    @Component
	export default class OidcCallback extends Vue {
		name = "OidcCallback";
		
        mounted(){
            const { code, scope, session_state, state } = this.$route.query;
			if (code && scope && session_state && state) {
				AuthService.signinRedirectCallback().then((user) => {
					this.$router.push("/");
					console.log("user: ", user);
				});
			}
        }
	}
</script>
