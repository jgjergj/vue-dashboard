<template>
  <v-tabs
    v-model="internalValue"
    :active-class="`${color} ${$vuetify.theme.dark ? 'black' : 'white'}--text`"
    class="v-tabs--pill"
    hide-slider
    v-bind="$attrs"
  >
    <slot />

    <slot name="items" />
  </v-tabs>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  // Mixins
  import Proxyable from 'vuetify/lib/mixins/proxyable'

  @Component({
    mixins: [Proxyable],
    props: {
      color: {
        type: String,
        default: 'primary',
      },
    }
  })
  export default class MaterialTabs extends Vue {
    name = 'MaterialTabs';
  }
</script>

<style lang="sass">
  .v-tabs--pill
    .v-tab,
    .v-tab:before
      border-radius: 24px

    &.v-tabs--icons-and-text
      .v-tab,
      .v-tab:before
        border-radius: 4px
</style>
