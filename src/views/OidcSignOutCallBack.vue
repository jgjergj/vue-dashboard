<template>
	<div></div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import AuthService from "../utils/AuthService";

	@Component
	export default class OidcSignOutCallBack extends Vue {
		name = "OidcSignOutCallBack";

		created(): void {
			AuthService.signoutRedirectCallback()
				.then(() => {
					this.$router.push("/");
				})
				.catch((err) => {
					console.error(err.message);
				});
		}
	}
</script>
