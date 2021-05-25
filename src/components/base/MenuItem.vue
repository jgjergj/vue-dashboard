<template>
	<v-list-item
		:href="href"
		:rel="href && href !== '#' ? 'noopener' : undefined"
		:target="href && href !== '#' ? '_blank' : undefined"
		:to="item.to"
		:active-class="`primary ${!isDark ? 'black' : 'white'}--text`"
	>
		<v-list-item-icon
			v-if="text"
			class="v-list-item__icon--text"
			v-text="computedText"
		/>

		<v-list-item-icon v-else-if="item.icon">
			<v-icon v-text="item.icon" />
		</v-list-item-icon>

		<v-list-item-content v-if="item.title || item.subtitle">
			<v-list-item-title v-text="item.title" />

			<v-list-item-subtitle v-text="item.subtitle" />
		</v-list-item-content>
	</v-list-item>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";
	import Themeable from "vuetify/lib/mixins/themeable";

	@Component({     
		mixins: [Themeable],   
		props: {
			item: {
				type: Object,
				default: () => ({
					href: undefined,
					icon: undefined,
					subtitle: undefined,
					title: undefined,
					to: undefined,
				}),
			},
			text: {
				type: Boolean,
				default: false,
			},
		},
	})
	export default class MenuItem extends Vue {
		name = "MenuItem";
        isDark = undefined;

		get computedText(): string {
			if (!this.$props.item || !this.$props.item.title) return "";

			let text = "";

			this.$props.item.title.split(" ").forEach((val) => {
				text += val.substring(0, 1);
			});

			return text;
		}

		get href() {
			return this.$props.item.href || (!this.$props.item.to ? "#" : undefined);
		}
	}
</script>
