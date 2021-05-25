<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";
	import { VCard } from "vuetify/lib";

	@Component({
		extends: VCard,
	})
	export default class Card extends Vue {
		name = "Card";
	}
</script>
