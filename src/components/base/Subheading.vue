<template>
  <div class="text-h3 font-weight-light col col-12 text-left text--primary pa-0 mb-8">
    <h5 class="font-weight-light">
      {{ subheading }}
      <template v-if="text">
        <span
          class="text-text-subtitle-1"
          v-text="text"
        />
      </template>
    </h5>

    <div class="pt-2">
      <slot />
    </div>
  </div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component({
    props: {
      subheading: {
        type: String,
        default: '',
      },
      text: {
        type: String,
        default: '',
      },
    }
  })
  export default class Subheading extends Vue {
    name = 'Subheading';
    
  }
</script>
