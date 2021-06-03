<template>
	<v-app>
		<dashboard-core-app-bar />

		<dashboard-core-drawer />

		<dashboard-core-view />
	</v-app>
</template>

<script lang="ts">
	import axios from "axios";
	import { Vue, Component } from "vue-property-decorator";
	import AppBar from "./components/core/AppBar.vue";
	import Drawer from "./components/core/Drawer.vue";
	import CoreView from "./components/core/View.vue";

	@Component({
		components: {
			"dashboard-core-app-bar": AppBar,
			"dashboard-core-drawer": Drawer,
			"dashboard-core-view": CoreView,
		},
	})
	export default class Home extends Vue {
		name = "Home";
	}
</script>
