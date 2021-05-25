<template>
  <v-main>
    <router-view />

    <dashboard-core-footer />
  </v-main>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Footer from './Footer.vue';

  @Component({
    components: {
      'dashboard-core-footer': Footer
    }
  })
  export default class CoreView extends Vue {
    name = 'DashboardCoreView';
  }
</script>
