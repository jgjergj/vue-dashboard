<template>
	<div></div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import AuthService from "../utils/AuthService";

	@Component
	export default class OidcSigInCallBack extends Vue {
		name = "OidcSigInCallBack";

		created(): void {
			AuthService.signinRedirectCallback()
				.then((redirectPath) => {
					this.$router.push("/");
				})
				.catch((err) => {
					console.error(err.message);
				});
		}
	}
</script>