<template>
	<v-container fluid tag="section">
		<v-row align="center" justify="center">
			<v-col cols="12">
				<base-material-card color="primary">
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							{{$route.name}}
						</div>
					</template>

					<v-card-text>
						<v-container class="pa-0" fluid>
							<component :is="datatableEntity" :entity=entity></component>
						</v-container>
					</v-card-text>
				</base-material-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";
	import MaterialCard from '/src/components/base/MaterialCard.vue';
	import entities from '../../constants/entities.json';
	
	@Component({
		components: {
			'base-material-card': MaterialCard},
	})
	export default class Crud extends Vue {
		name = "Crud";

		entity;
		
		constructor() {
			super();
			this.entity = entities.find(v => v.plural == this.$route.name)?.name;
			// console.log(this.entity);

		}

		//used for dynamic components
		get datatableEntity(){
			const e = () => import(`./components/${this.entity}.vue`)
			return e;
		}
	}
</script>

<style></style>
